import React, { useState, useEffect } from "react";

function Fines() {
  const [fines, setFines] = useState([]);
  const [fineId, setFineId] = useState(" ");
  const [reason, setReason] = useState(" ");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeFines = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/employee/fines",
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
    fetchEmployeeFines();
  }, [authToken]);

  const sendMail = async () => {
    try {
      // Make a request to your employee data API endpoint
      const response = await fetch(
        "http://localhost:8000/api/employee/emailFines",
        {
          method: "POST",
          headers: {
            "auth-token": authToken,
            "fineId": fineId,
            "reason": reason,
            "subject": "Request fine withdrawl",
          },
        }
      );
      if (!response.ok) {
        // Handle authentication error
        console.error("Could not send email");
        return;
      }
      // Assuming the API returns an object with an EmployeeName property
      const { email } = await response.json();
      alert(email);
    } catch (error) {
      console.error("Error during API request", error);
    }
  };
  return (
    <div className="employee-table">
      <ul>
        <li className="employee-table__row data">
          <h2>Request withdrawl of fine:</h2>
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
            placeholder="Enter Valid Reason to withdraw fine"
          ></input>
          <button onClick={sendMail}>Submit</button>
        </li>
        <h1>Fines: </h1>
        {fines.map((fines, index) =>
          index === 0 ? (
            <li key={index} className="employee-table__row fine">
              <h2>Fine ID: {fines.fineId}</h2>
              <p>Date of issue: {fines.fineDate}</p>
              <p>Amount: {fines.fineAmount}</p>
              <p>Fine Type: {fines.fineType}</p>
              <p>Reason of Fine: {fines.reasonForFine}</p>
            </li>
          ) : (
            <li key={index} className="employee-table__row fine">
              <h2>Fine ID: {fines.fineId}</h2>
              <p>Date of issue: {fines.fineDate}</p>
              <p>Amount: {fines.fineAmount}</p>
              <p>Fine Type: {fines.fineType}</p>
              <p>Reason of Fine: {fines.reasonForFine}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Fines;
