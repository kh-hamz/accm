import React, { useState, useEffect } from "react";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [unpaidTransactions,setUnpaidTransactions] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeFines = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/department/vendors",
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
        const { VendorsArray } = await response.json();
        setVendors(VendorsArray);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    const fetchUnpaidDues = async () => {
        try {
          // Make a request to your employee data API endpoint
          const response = await fetch(
            "http://localhost:8000/api/department/unpaidTransactions",
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
          const { unpaidDuesArray } = await response.json();
          setUnpaidTransactions([...unpaidDuesArray]);
        } catch (error) {
          console.error("Error during API request", error);
        }
      };
    fetchEmployeeFines();
    fetchUnpaidDues();
  }, [authToken]);

  const email = async(index) => {
    try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/department/emailVendors",
          {
            method: "POST",
            headers: {
              "auth-token":authToken,
              "vendor-email": unpaidTransactions[index].email, 
              "transaction-amount": unpaidTransactions[index].amount,
              "transaction-date": unpaidTransactions[index].date,
              "subject": "Pending Payment",
            },
          }
        );
        if (!response.ok) {
          // Handle authentication error
          console.error("Could not send email");
          return;
        }
        // Assuming the API returns an object with an EmployeeName property
        const {email} = await response.json();
        alert(email);
      } catch (error) {
        console.error("Error during API request", error);
      }
  }

  return (
    <div className="employee-table">
      <ul>
        <li className="employee-table__row data">
          <h2>Select Vendor to send email of unpaid Transaction:</h2>
          {unpaidTransactions.map((Transactions, index) => (
            <p key={index} onClick={() => email(index)}>
              VendorId: {Transactions.vendorId}  Name: {Transactions.name} <br></br>
              Transaction Id: {Transactions.transactionId} Amount: {Transactions.amount} Date Initiated: {Transactions.date}
            </p>
          ))}
        </li>
        <h1>Vendors: </h1>
        {vendors.map((vendor, index) => (
          <li key={index} className="employee-table__row fine">
            <h2>Vendor ID: {vendor.vendorId}</h2>
            <p>Name: {vendor.name}</p>
            <p>Phone Number: {vendor.phoneNumber}</p>
            <p>Address: {vendor.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vendors;
