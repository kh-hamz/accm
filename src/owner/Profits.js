import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

function Profits() {
  const [profit, setProfit] = useState(" ");
  const [profitableDepartmnet, setProfitableDepartment] = useState(" ");
  const [lprofitableDepartmnet, setLProfitableDepartment] = useState(" ");

  useEffect(() => {
    const fetchProfits = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch("http://localhost:8000/api/owner/profit", {
          method: "POST",
          headers: {},
        });

        if (!response.ok) {
          // Handle authentication error
          console.error("Authentication failed");
          return;
        }

        // Assuming the API returns an object with an EmployeeName property
        const {
          OverallProfit,
          MostProfitableDepartment,
          LeastProfitableDepartment,
        } = await response.json();
        setProfit(OverallProfit);
        setProfitableDepartment(MostProfitableDepartment);
        setLProfitableDepartment(LeastProfitableDepartment);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    fetchProfits();
  });

  return (
    <div className="employee-table">
      <ul>
        <h1>OverallProfit: </h1>
        <li className="employee-table__row fine">
          <h2>Total Profit: {profit}</h2>
          <p>Most Profitable Department: {profitableDepartmnet}</p>
          <p>Least Profitable Department: {lprofitableDepartmnet}</p>
        </li>
        <li className="employee-table__graph">
          <h2>Transactions </h2>
            <LineChart/>
        </li>
        <li className="employee-table__graph1">
          <h2>Departments Profit</h2>
            <PieChart/>
        </li>
      </ul>
    </div>
  );
}

export default Profits;
