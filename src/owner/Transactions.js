import React,{useState,useEffect} from "react";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
    const fetchTransactions = async () => {
        try {
          // Make a request to your employee data API endpoint
          const response = await fetch(
            "http://localhost:8000/api/owner/transactions",
            {
              method: "POST",
              headers: {
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
          setTransactions([...transactionsArray]);
        } catch (error) {
          console.error("Error during API request", error);
        }
      };
      fetchTransactions();
    },[authToken]);

return(
<div className="employee-table">
<ul>
  {transactions.map((transaction, index) => (
        <li key={index} className="employee-table__row fine">
          <h2>Transaction Id: {transaction.transactionId}</h2>
          <p>Amount: {transaction.amount}</p>
          <p>Date Of Initation: {transaction.date}</p>
          <p>Vendor Id: {transaction.vendorId}</p>
          <p>Vendor Name:{transaction.name}</p>
          <p>Employee Id: {transaction.employeeId}</p>
          <p>Department Id: {transaction.departmentId}</p>
          <p>Paid: {(transaction.paid === 0)? "no":"yes"}</p>
        </li>
  ))}
</ul>
</div>
)
}

export default Transactions;