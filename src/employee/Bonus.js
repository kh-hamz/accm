import React,{useState,useEffect} from "react";

function Bonus() {
    const [bonus,setBonus] = useState([]);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
    const fetchEmployeeFines = async () => {
        try {
          // Make a request to your employee data API endpoint
          const response = await fetch(
            "http://localhost:8000/api/employee/bonuses",
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
          const { bonusArray } = await response.json();
          setBonus(bonusArray);
        } catch (error) {
          console.error("Error during API request", error);
        }
      };
      fetchEmployeeFines();
    },[authToken]);

return(
<div className="employee-table">
<ul>
  <h1>Bonuses: </h1>
  {bonus.map((bonus, index) => (
      index === 0 ? (
        <li key={index} className="employee-table__row fine">
          <h2>Bonus ID: {bonus.bonusId}</h2>
          <p>Date of issue: {bonus.bonusDate}</p>
          <p>Amount: {bonus.bonusAmount}</p>
          <p>Reason of Bonus: {bonus.bonusReason}</p>
        </li>
      ) : (
        <li key={index} className="employee-table__row fine">
          <h2>Fine ID: {bonus.bonusId}</h2>
          <p>Date of issue: {bonus.bonusDate}</p>
          <p>Amount: {bonus.bonusAmount}</p>
          <p>Reason of Bonus: {bonus.bonusReason}</p>
        </li>
      )
  ))}
</ul>
</div>
)
}

export default Bonus