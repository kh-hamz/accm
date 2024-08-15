import { Pie } from "react-chartjs-2"; // Importing the Line component from the react-chartjs-2 library
import { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Importing the Chart.js library

const PieChart = () => {
  const [labels, setLabels] = useState([]);
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const graphs = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/departmentProfits",
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
        const { profitsArray } = await response.json();
        const profits = [...profitsArray];
        setLabels(profits.map((transaction) => transaction.Name));
        setText(profits.map((transaction) => transaction.totalAmount));
        setLoading(false);
        // Setting up the data for the datase
      } catch (error) {
        console.error("Error during API request", error);
        setLoading(false);
      }
    };
    graphs();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Department Profits Ratio",
        backgroundColor: ["#00A6B4", "#2E4057", "#FFD662"],
        borderColor: ["#00A6B4", "#2E4057", "#FFD662"],
        data: text,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
