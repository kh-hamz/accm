import React, { useState, useEffect } from "react";

function Fines() {
  const [fines, setFines] = useState([]);
  const [fineId, setFineId] = useState(" ");
  const [reason, setReason] = useState(" ");
  const [emloyeeFines,setEmployeeFines] = useState([]);
  const [fineAmount,setFineAmount] = useState(" ");
  const [fineReason,setFineReason] = useState(" ");
  const [fineType,setFineType] = useState(" ");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeFines = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/department/fines",
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
        const { fineArray } = await response.json();
        setFines(fineArray);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    const fetchEmployeeSalaries = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/department/salaries",
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
        const {fineArray} = await response.json();
        setEmployeeFines([...fineArray]);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    fetchEmployeeSalaries();
    fetchEmployeeFines();
  }, [authToken]);

  const deleteFine = async () => {
    try {
      // Make a request to your employee data API endpoint
      const response = await fetch(
        "http://localhost:8000/api/department/removeFines",
        {
          method: "POST",
          headers: {
            "fineId": fineId,
            "reason": reason,
          },
        }
      );
      if (!response.ok) {
        // Handle authentication error
        alert("Please enter a fineId that is present in database");
        return;
      }
      // Assuming the API returns an object with an EmployeeName property
      const {mssg} = await response.json();
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
            "salaryId": emloyeeFines[index].salaryId,
            "reason": fineReason,
            "fineType": fineType,
            "fineAmount":fineAmount,
          },
        }
      );
      if (!response.ok) {
        // Handle authentication error
        alert("No field can be empty please fill required fields first");
        return;
      }
      // Assuming the API returns an object with an EmployeeName property
      const {mssg} = await response.json();
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
          <button onClick={()=>deleteFine()}>Submit</button>
        </li>
        <li className="employee-table__row data">
          <h2>Select Employee To Fine:</h2>
          {emloyeeFines.map((fines,index)=>(
            <p key={index} onClick={()=>addFine(index)}>SalaryId: {fines.salaryId} EmployeeId: {fines.employeeId} EmployeeName: {fines.employeeName}</p>
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
        <h1>Fines: </h1>
        {fines.map((fines, index) =>
          (
            <li key={index} className="employee-table__row fine">
              <h2>Fine ID: {fines.fineId}</h2>
              <p>Date of issue: {fines.formattedDateOfIssue}</p>
              <p>Amount: {fines.fineAmount}</p>
              <p>Fine Type: {fines.fineType}</p>
              <p>Reason of Fine: {fines.reasonForFine}</p>
              <p>Issued Against Salary id: {fines.salaryId}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Fines;
