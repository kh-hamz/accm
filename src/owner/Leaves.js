import React, { useState, useEffect } from "react";

function Leaves() {
  const [leavesLeft, setLeavesLeft] = useState("");
  const [sickLeavesLeft, setSickLeavesLeft] = useState("");
  const [leavesArray, setLeavesArray] = useState([]);
  const [startingDate, setStartingDate] = useState("");
  const [duration, setDuration] = useState("");
  const [reason, setReason] = useState("");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeLeavesLeft = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/employee/remainingLeaves",
          {
            method: "POST",
            headers: {
              "auth-token": authToken,
            },
          }
        );

        if (!response.ok) {
          // Handle authentication error
          console.error("Authentication error");
          return;
        }

        // Assuming the API returns an object with an EmployeeName property
        const { remainingLeaves, remainingSickLeaves } = await response.json();
        setLeavesLeft(remainingLeaves);
        setSickLeavesLeft(remainingSickLeaves);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    const fetchEmployeeLeaves = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/employee/Leaves",
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
        const { leavesArray } = await response.json();
        setLeavesArray(leavesArray);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    fetchEmployeeLeaves();
    fetchEmployeeLeavesLeft();
  }, [authToken]);

  const sendMail = async () => {
    try {
      // Make a request to your employee data API endpoint
      const response = await fetch(
        "http://localhost:8000/api/employee/emailLeaves",
        {
          method: "POST",
          headers: {
            "auth-token": authToken,
            "starting-date": startingDate,
            duration: duration,
            reason: reason,
            subject: "Request leave",
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
        {(leavesLeft||sickLeavesLeft)&&<li className="employee-table__row fine">
          {leavesLeft&&<h2>Leaves Left: {leavesLeft}</h2>}
          {sickLeavesLeft&&<h2>Sick Leaves Left: {sickLeavesLeft}</h2>}
        </li>}
        <li className="employee-table__row data">
          <h2>Request Leave:</h2>
          <p>Starting Date:</p>
          <input
            onChange={(e) => setStartingDate(e.target.value)}
            type="date"
            placeholder="Enter Starting Date"
          ></input>
          <p>Enter Duration:</p>
          <input
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            placeholder="Enter Duration of Leave in days"
          ></input>
          <p>Enter Valid Reason for leave:</p>
          <input
            onChange={(e) => setReason(e.target.value)}
            type="text"
            placeholder="Reason"
          ></input>
          <button onClick={sendMail}>Submit</button>
        </li>
        {(leavesArray===undefined)&&<h1>Leaves: </h1>}
         {(leavesArray===undefined) && leavesArray.map((leave, index) => (
          <li key={index} className="employee-table__row fine">
            <h2>Leave Id: {leave.leaveId}</h2>
            <p>Starting Date: {leave.startingDate}</p>
            <p>Duration: {leave.leaveDuration}</p>
            <p>Type: {leave.leaveType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaves;
