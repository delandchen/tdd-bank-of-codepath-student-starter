import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from 'axios';
import { useEffect } from "react"

export default function Home({ transactions, setTransactions, transfers, setTransfers, filterInputValue, error, setError,
  isLoading, setIsLoading, isCreating, setIsCreating, setNewTransactionForm, newTransactionForm }) {

  const getResults = async () => {
    try {
      // Get transaction data from endpoint using Axios
      const transactionsData = await axios.get("http://localhost:3001/bank/transactions").then((res) => {
        return res.data.transactions;
      })
      setTransactions(transactionsData);
      console.log("Transactions state was succesfully set, value is: ", transactionsData);

      // Get transfers data from endpoint using Axios
      const transfersData = await axios.get("http://localhost:3001/bank/transfers").then((res) => {
        return res.data.transfers;
      });
      setTransfers(transfersData)
      console.log("Transfers state was succesfully set, value is: ", transfersData);
    }
    catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    setIsLoading(true); // *****For some reason, destructoring setIsLoading makes it undefined****
    getResults();
    setIsLoading(false);

  }, []);


  const filteredTransactions = transactions?.filter((transaction) => {
    return (filterInputValue.length ? transaction.description?.toLowerCase()
      .includes(filterInputValue.toLowerCase()) : transactions)
  })


  const handleOnSubmitNewTransaction = () => {
    return;
  }

  return (
    <div className="home">
      <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating}
        form={newTransactionForm} setForm={setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction} />

      {(isLoading) ? <h1 className="loading"> Loading... </h1> :
        <BankActivity transactions={filteredTransactions} />}

      {(error) ? <h2 className="error"> {error} </h2> : null}
    </div>
  )
}
