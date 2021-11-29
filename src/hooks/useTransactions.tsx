import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
// import { api } from '../services/api';


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
}
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );


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
            console.log("Console de todas as transacoes",transaction);
            setTransactions(transaction);
        })
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {

        await addDoc(databaseRef, {
            ...transactionInput,
            createdAt: new Date().toISOString()
        })
    };

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context= useContext(TransactionsContext);
    return context;
}
