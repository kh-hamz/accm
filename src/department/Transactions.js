import React,{useState,useEffect} from "react";

function Transactions() {
    const [transactions,setTransactions] = useState([]);
    const [transactionAmount,setTransactionAmount] = useState(" ");
    const [vendorId,setVendorId] = useState(" ");
    const [paid,setPaid] = useState(" ");

    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
    const fetchEmployeeFines = async () => {
        try {
          // Make a request to your employee data API endpoint
          const response = await fetch(
            "http://localhost:8000/api/department/getTransactions",
            {
              method: "POST",
              headers: {
                "auth-token": authToken,
              },
            }
          );
  
          if (!response.ok) {
            // Handle authentication error
            console.error("Authentication failed");
            return;
          }
  
          // Assuming the API returns an object with an EmployeeName property
          const { transactionsArray } = await response.json();
          setTransactions(transactionsArray);
        } catch (error) {
          console.error("Error during API request", error);
        }
      };
      fetchEmployeeFines();
    },[authToken]);


const addTransaction = async()=> {
    try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/department/addTransactions",
          {
            method: "POST",
            headers: {
              "auth-token": authToken,
              "transaction-amount" :transactionAmount,
              "vendorId": vendorId,
              "paid": paid,
            },
          }
        );

        if (!response.ok) {
          // Handle authentication error
          alert("No field can be empty fill required fields first");
          return;
        }

        // Assuming the API returns an object with an EmployeeName property
        const { mssg } = await response.json();
        alert(mssg);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };

return(
<div className="employee-table">
<ul>
<li className="employee-table__row data">
            <h2>Add Transaction:</h2>
            <p>Transaction Amount:</p>
            <input onChange={(e)=>setTransactionAmount(e.target.value)}type="text" placeholder="Enter Transaction Amount"></input>
            <p>Vendor Id:</p>
            <input onChange={(e)=>setVendorId(e.target.value)} type="text" placeholder="Enter Vendor Id with whom transaction is initiated"></input>
            <p>Payment of transaction made:</p>
            <input onChange={(e)=>setPaid(e.target.value)} type="text" placeholder="Enter status of payment"></input>
            <button onClick={addTransaction}>Submit</button>
        </li>
  <h1>Transactions: </h1>
  {transactions.map((transaction, index) => (
       (
        <li key={index} className="employee-table__row fine">
          <h2>Transaction ID: {transaction.transactionId}</h2>
          <p>Amount: {transaction.amount}</p>
          <p>Date of Initiation: {transaction.date}</p>
          <p>Paid: {transaction.paid===0?"no":"yes"}</p>
          <p>Vendor Name: {transaction.vendorName}</p>
        </li>
      ) 
  ))}
</ul>
</div>
)
}

export default Transactions