import React, { useState } from "react";
import LoginForm from "./form/form";
import { useNavigate } from "react-router-dom";
import './App.css'

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async ({ username, password }) => {
    // Replace this with actual authentication logic (e.g., API call)
    let fetchData = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch("http://localhost:8000/api/auth", fetchData)
      .then(async (response) => {
        // Handle response you get from the API
        if (!response.ok) {
          // Handle authentication error
          console.error("Authentication failed");
          const { errors } = await response.json();
          console.log(errors[0].msg);
          setError(errors[0].msg);
          return;
        }
        // Assuming the API returns a token
        const { accountType, authtoken } = await response.json();
        console.log(authtoken);
        // Store the token in local storage or state
        localStorage.setItem("authToken", authtoken);

        // Call the handleLogin function or update the UI as needed
        if (accountType === "employee") navigate("/Employee");
        if (accountType ==="Department Head") navigate("/Department")
        if (accountType==="owner") navigate("/Owner");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='form'>
      <div className="temp">
      <LoginForm handleLogin={handleLogin} />
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      </div>
    </div>
  );
}

export default LoginPage;
