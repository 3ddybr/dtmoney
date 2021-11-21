import { useState } from "react";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {TransactionsProvider } from "./hooks/useTransactions";

import { GlobalStyle } from "./styles/global";


Modal.setAppElement('#root');
//Movel-se o estado do componente para dentro do componente Pai (superior) para compartilhar ele com os filhos (abaixo)
//trouxe pro App pra compartilhar com o Header e o NewTransactionModal
export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false);
    }


  return (
  //  obrigatoriamente o .Provider ele tem que ter um "value={[]}"
    <TransactionsProvider > 
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>

      <NewTransactionModal 
        isOpen= {isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

       <GlobalStyle />
    </TransactionsProvider>
  );
}