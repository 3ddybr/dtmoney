import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
// import { api } from '../services/api';

import { signInWithPopup } from '@firebase/auth'
import { authFirebase, providerGoogle } from '../services/firebase'


import { addDoc, collection } from '@firebase/firestore';
import { firestoreDB } from '../services/firebase';
import { onSnapshot} from 'firebase/firestore';

interface Transaction {
    id:string;
    title:string;
    amount: number;
    type: string;
    category: string;
    createdAt:string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>//omiti apenas esses dois campos 

interface TransactionProviderProps{ //quando as props vao receber qualquer conteúdo do tipo react usa-se ReactNode
    children:ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction:(transaction:TransactionInput) => Promise<void>;
    signInGoogle: () => Promise<void>;
    photoURL: string | null;
}
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

interface UserProps {
    displayName:string | null; 
    photoURL:string | null;
    uid:string;
    refreshToken:string;
    getIdToken:(forceRefresh?: boolean | undefined) => Promise<string>;
}


const databaseRef = collection(firestoreDB, 'transactions');

export function TransactionsProvider({children}:TransactionProviderProps) {
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    
    useEffect (()=> { 
        onSnapshot(databaseRef, (querySnapshot)=>{
            const transaction: Transaction[] = []
           
            querySnapshot.forEach((doc)=>{
                transaction.push({
                    id: doc.id,                    
                    title: doc.data().title,
                    amount: doc.data().amount,
                    type: doc.data().type,
                    category: doc.data().category,
                    createdAt:doc.data().createdAt,
                });
            });
            setTransactions(transaction);
        })
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {

        await addDoc(databaseRef, {
            ...transactionInput,
            createdAt: new Date().toISOString()
        })
    };


//////////////////////////Login Social Google//////////////////////////////////////////
    const [user, setUser] = useState<UserProps>({} as UserProps)
    // const displayName = user.displayName;
    const photoURL = user.photoURL;
    // const uid = user.uid;
    const refreshToken = user.refreshToken;

    if( refreshToken !== "" && refreshToken !== undefined && refreshToken !== null) {
        localStorage.setItem('refreshTokenDtMoney', refreshToken) //salva o refreshToken no localStorage
        
    } else {
        localStorage.removeItem('refreshTokenDtMoney') //remove o refreshToken do localStorage
    }

    async function signInGoogle () {
        signInWithPopup(authFirebase, providerGoogle)
            .then(result => {
                const {displayName, photoURL, uid, refreshToken, getIdToken} = result.user
                setUser({displayName, photoURL, uid, refreshToken, getIdToken, })
            })
            .catch(error => {
                console.log(error)
            })
        return
    }        
    console.log("console log do estado user",photoURL)

//////////////////////////Fim Login Social Google//////////////////////////////////////////



    return(
        <TransactionsContext.Provider value={{transactions, createTransaction, signInGoogle, photoURL}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context= useContext(TransactionsContext);
    return context;
}
