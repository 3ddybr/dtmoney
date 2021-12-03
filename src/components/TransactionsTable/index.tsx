import { deleteDoc } from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import deleteImg from '../../assets/delete.svg';
import { useTransactions } from "../../hooks/useTransactions";
import { firestoreDB } from '../../services/firebase';


import { Container } from "./styles";

export function TransactionsTable (){
    const {transactions} = useTransactions();

    async function handleDelete(id:string){
        if(window.confirm("Dejesa realmente excluir?")){
            await deleteDoc(doc(firestoreDB, `transactions/${id}`));
        }        
    }

    const token= localStorage.getItem('refreshTokenDtMoney');
    // console.log("console do tokem", token);

    if(token ===null){
        return (
            <Container>
                <h1>Faca o login pra visualizar a tabela</h1>            
            </Container>
        )
    }else{
        return(
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {transactions.map(transaction=> (                        
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>

                                    <td className={transaction.type}>
                                        {new Intl.NumberFormat('pt-BR',{//formata para moeda BR
                                            style:'currency',
                                            currency:'BRL'
                                        }).format(transaction.amount)}
                                        </td>

                                    <td>{transaction.category}</td>

                                    <td>
                                        {new Intl.DateTimeFormat('pt-BR').format( //formata para data BR
                                            new Date(transaction.createdAt)
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>handleDelete(transaction.id)}>
                                            <img src={deleteImg} alt="Excluir"/>
                                        </button>                                    
                                    </td>
                                </tr>
                        ))}                    
                    </tbody>
                </table>
            </Container>
        )
    }
}