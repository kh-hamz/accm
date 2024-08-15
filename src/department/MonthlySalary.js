import React,{useState,useEffect} from "react";

function MonthlySalary() {
    const [monthlySalary, setMonthlySalary] = useState([]);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
    const fetchEmployeeSalary = async () => {
        try {
          // Make a request to your employee data API endpoint
          const response = await fetch(
            "http://localhost:8000/api/employee/monthlySalary",
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
          const { salaryArray } = await response.json();
          setMonthlySalary(salaryArray);
        } catch (error) {
          console.error("Error during API request", error);
        }
      };
      fetchEmployeeSalary();
    },[authToken]);

return(
<div className="employee-table">
<ul>
  {monthlySalary.map((salaryArray, index) => (
      index === 0 ? (
        <li key={index} className="employee-table__row start">
          <h2>This Month's Salary</h2>
          <p>Date of issue: {salaryArray.salaryDate}</p>
          <p>Amount: {salaryArray.monthlySalary}</p>
        </li>
      ) : (
        <li key={index} className="employee-table__row">
          <h2>Previous Month's Salary</h2>
          <p>Date of issue: {salaryArray.salaryDate}</p>
          <p>Amount: {salaryArray.monthlySalary}</p>
        </li>
      )
  ))}
</ul>
</div>
)
}

export default MonthlySalary;