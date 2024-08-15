
import React, { useState, useEffect } from "react";

function Contract() {
  const [startDate, setStartDate] = useState("");
  const [Duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [increment, setIncrement] = useState("");
  const [leaves, setLeaves] = useState("");
  const [sickLeaves, setSickLeaves] = useState("");
  const [pension, setPension] = useState("");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeContract = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch("http://localhost:8000/api/employee/contract", {
          method: "POST",
          headers: {
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          // Handle authentication error
          console.error("Authentication failed");
          return;
        }

        // Assuming the API returns an object with an EmployeeName property
        const {
          contractStartDate,
          contractDuration,
          contractAmount,
          annualIncrement,
          annualLeaves,
          sickLeaves,
          pension,
        } = await response.json();
        setStartDate(contractStartDate);
        setDuration(contractDuration);
        setAmount(contractAmount);
        setIncrement(annualIncrement);
        setLeaves(annualLeaves);
        setSickLeaves(sickLeaves);
        setPension(pension);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    fetchEmployeeContract();
  }, [authToken]);
  return(
    <div className="employee-table">
      <li className="employee-table__contract">
       <h1>Contract</h1>
       <h2>Start Date: {startDate}</h2>
       <h2>Duration of Contract: {Duration} years</h2>
       <h2>Salary: {amount}</h2>
       <h2>Yearly Increment: {increment}</h2>
       <h2>Annual Leaves allotted: {leaves}</h2>
       <h2>Annual Sick Leaves allotted: {sickLeaves}</h2>
       <h2>Pension amount: {pension}</h2>
       </li>
    </div>
  )
}

export default Contract;
