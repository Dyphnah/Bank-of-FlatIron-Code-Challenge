import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [formdata, setFormdata] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

 // Fetch data from server
  const baseUrl = "http://localhost:8001/transactions";
    useEffect(() => {
      fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
        })
        .catch((error) => {
          console.log("There was an error:", error);
        });
    }, []);

   //Handle search 
  const [search, setSearch] = useState("");
    const handleSearch = (searchInput) => {
    setSearch(searchInput);

    //filter transactions 

    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
       const filteredTransactions = data.filter((transaction) =>
          transaction.description
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
        setTransactions(filteredTransactions);
      })
  };

  // Hande input change
  function handleChange(event) {
    setFormdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  }

  // Post data 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setTransactions([...transactions, data]);
        setFormdata({
          date: "",
          description: "",
          category: "",
          amount: 0,
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      event.target.reset();
  };

  // Delete a transaction
  const handleDelete = (id) => {
    fetch(`${baseUrl}/${id}`, {
       method: "DELETE" })
       .then((response) => response.json())
       .then((data) => {
        console.log("request successful:", data);
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  });
}

  return (
    <div>
      <Search 
      handleSearch={handleSearch} 
      search={search} 
      />
      <AddTransactionForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <TransactionsList
        transactions={transactions}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AccountContainer;