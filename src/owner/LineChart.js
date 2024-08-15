import { Bar } from "react-chartjs-2"; // Importing the Line component from the react-chartjs-2 library
import { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Importing the Chart.js library

const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const graphs = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/owner/transactions",
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
        const { transactionsArray } = await response.json();
        const transactions = [...transactionsArray];
        setLabels(
          transactions.map(
            (transaction) => transaction.name + " " + transaction.transactionId
          )
        );
        setText(transactions.map((transaction) => transaction.amount));
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
        label: 'Transaction Amount',
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: text,
      },
    ],
  };

  return (
      <Bar data={data} />
  );
};

export default LineChart;
