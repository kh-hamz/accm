import React, { useState, useEffect } from "react";

function Contract() {
  const [contracts, setContracts] = useState([]);
  const [vendorContracts, setVendorContracts] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeContracts = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/contracts",
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
        const { contractArray } = await response.json();
        setContracts([...contractArray]);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    const fetchVendorContracts = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/contractsVendors",
          {
            method: "POST",
            headers: {},
          }
        );

        if (!response.ok) {
          // Handle authentication error
          console.error("Authentication failed");
          return;
        }

        // Assuming the API returns an object with an EmployeeName property
        const { vendorContracts } = await response.json();
        setVendorContracts([...vendorContracts]);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    fetchVendorContracts();
    fetchEmployeeContracts();
  }, [authToken]);
  return (
    <div className="employee-table">
      <ul>
        {contracts.map((contract, index) => (
          <li key={index} className="employee-table__contract">
            <h1>Employee Contract</h1>
            <h2>Contract Id: {contract.contractId}</h2>
            <h2>Name: {contract.name}</h2>
            <h2>Employee Id: {contract.employeeId}</h2>
            <h2>Date of Signing: {contract.date}</h2>
            <h2>Duration of Contract: {contract.duration}</h2>
            <h2>Amount: {contract.amount}</h2>
            <h2>Annual Increment: {contract.annualIncrement}</h2>
            <h2>Annual Leaves: {contract.annualLeaves}</h2>
            <h2>Sick Leaves: {contract.sickLeaves}</h2>
            <h2>Pension: {contract.pension}</h2>
          </li>
        ))}
        {vendorContracts.map((contract, index) => (
          <li key={index} className="employee-table__contract">
            <h1>Vendor Contract</h1>
            {contract.contractId && <h2>Contract Id: {contract.contractId}</h2>}
            {contract.date && <h2>Date of Signing: {contract.date}</h2>}
            {contract.duration && (
              <h2>Duration of Contract: {contract.duration}</h2>
            )}
            {contract.amount && <h2>Amount: {contract.amount}</h2>}
            <h2>Name: {contract.name}</h2>
            <h2>Vendor Id: {contract.vendorId}</h2>
            <h2>Phone Number: {contract.phoneNumber}</h2>
            <h2>Address: {contract.address}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contract;
