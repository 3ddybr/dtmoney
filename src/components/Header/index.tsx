import { useTransactions } from "../../hooks/useTransactions";
import logoImg from '../../assets/logo.svg'
import googleImg from '../../assets/google.svg'

import { Container , Content} from './styles'


interface HeaderProps {
    onOpenNewTransactionModal: ()=> void;
}

export function Header ({onOpenNewTransactionModal}:HeaderProps) {
    const {signInGoogle, photoURL} = useTransactions();
    const img = photoURL ? photoURL : googleImg;
    
    return (
        <Container>
            <Content>
            <img src={logoImg} alt="dt money"/>

            <div id="button">
                <button type="button" onClick={onOpenNewTransactionModal} >
                    Nova Transação
                </button>
                <button onClick={signInGoogle}>
                    Logar <img src={img} alt="Login Google"/>
                </button>
                
            </div>
            </Content>
        </Container>
    )
}