import React, { useState, useEffect } from "react";

function Fines() {
  const [fines, setFines] = useState([]);
  const [allFines, setAllFines] = useState([]);
  const [reason, setReason] = useState(" ");
  const [fineId, setFineId] = useState(" ");
  const [emloyeeFines,setEmployeeFines] = useState([]);
  const [fineAmount,setFineAmount] = useState(" ");
  const [fineReason,setFineReason] = useState(" ");
  const [fineType,setFineType] = useState(" ");

  useEffect(() => {
    const fetchEmployeeSalaries = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/salaries",
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
        const {fineArray} = await response.json();
        setEmployeeFines([...fineArray]);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    const fetchFines = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/allFines",
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
        const { fines } = await response.json();
        setAllFines([...fines]);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    const fetchDeletedFines = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/deletedFines",
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
        const { fines } = await response.json();
        setFines([...fines]);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    fetchEmployeeSalaries();
    fetchFines();
    fetchDeletedFines();
  }, []);
  const deleteFine = async () => {
    try {
      // Make a request to your employee data API endpoint
      const response = await fetch(
        "http://localhost:8000/api/department/removeFines",
        {
          method: "POST",
          headers: {
            fineId: fineId,
            reason: reason,
          },
        }
      );
      if (!response.ok) {
        // Handle authentication error
        alert("Please enter a fineId that is present in database");
        return;
      }
      // Assuming the API returns an object with an EmployeeName property
      const { mssg } = await response.json();
      alert(mssg);
    } catch (error) {
      alert("Error during API request", error);
    }
  };

  const addFine = async (index) => {
    try {
      // Make a request to your employee data API endpoint
      const response = await fetch(
        "http://localhost:8000/api/department/addFine",
        {
          method: "POST",
          headers: {
            salaryId: emloyeeFines[index].salaryId,
            reason: fineReason,
            fineType: fineType,
            fineAmount: fineAmount,
          },
        }
      );
      if (!response.ok) {
        // Handle authentication error
        alert("No field can be empty please fill required fields first");
        return;
      }
      // Assuming the API returns an object with an EmployeeName property
      const { mssg } = await response.json();
      alert(mssg);
    } catch (error) {
      alert("Error during API request", error);
    }
  };

  return (
    <div className="employee-table">
      <ul>
        <li className="employee-table__row data">
          <h2>Withdraw Fine of Employee:</h2>
          <p>Fine Id:</p>
          <input
            onChange={(e) => setFineId(e.target.value)}
            type="text"
            placeholder="Enter Fine Id"
          ></input>
          <p>Reason:</p>
          <input
            onChange={(e) => setReason(e.target.value)}
            type="text"
            placeholder="Enter reason of withdawl"
          ></input>
          <button onClick={() => deleteFine()}>Submit</button>
        </li>
        <li className="employee-table__row data">
          <h2>Select Employee To Fine:</h2>
          {emloyeeFines.map((fines, index) => (
            <p key={index} onClick={() => addFine(index)}>
              SalaryId: {fines.salaryId} EmployeeId: {fines.employeeId}{" "}
              EmployeeName: {fines.employeeName}
            </p>
          ))}
          <input
            onChange={(e) => setFineAmount(e.target.value)}
            type="text"
            placeholder="Enter amount of fine before clicking first"
          ></input>
          <input
            onChange={(e) => setFineReason(e.target.value)}
            type="text"
            placeholder="Enter reason of giving fine before clicking on an employee first"
          ></input>
          <input
            onChange={(e) => setFineType(e.target.value)}
            type="text"
            placeholder="Enter type of fine before clicking on an employee first"
          ></input>
        </li>
        <h1>Deleted Fines</h1>
        {fines.map((transaction, index) => (
          <li key={index} className="employee-table__row fine">
            <h2>Fine Id: {transaction.deletedFineId}</h2>
            <p>Fine Type: {transaction.fineType}</p>
            <p>Reason of Deletion: {transaction.reasonForFine}</p>
            <p>Amount: {transaction.fineAmount}</p>
            <p>Salary Id of Fine:{transaction.salaryId}</p>
            <p>Date of Deletion: {transaction.deletedDate}</p>
          </li>
        ))}
        <h1>All Fines</h1>
        {allFines.map((transaction, index) => (
          <li key={index} className="employee-table__row fine">
            <h2>Fine Id: {transaction.fineId}</h2>
            <p>Fine Type: {transaction.fineType}</p>
            <p>Reason of Deletion: {transaction.reasonForFine}</p>
            <p>Amount: {transaction.fineAmount}</p>
            <p>Salary Id of Fine:{transaction.salaryId}</p>
            <p>Date of Issue: {transaction.dateOfIssue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fines;
