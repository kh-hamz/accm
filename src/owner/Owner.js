import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {Routes,Route,Link, useNavigate} from "react-router-dom"
import Transactions from "./Transactions";
import Contract from "./Contract";
import Fines from './Fine'
import Bonus from './Bonus'
import Leaves from "./Leaves";
import Profits from "./Profits";

function Owner() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [employeeName, setEmployeeName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [jobPost, setJobPost] = useState("");
  const [jobDesignation, setJobDesignation] = useState("");
  const [employeePhoto, setEmployeePhoto] = useState();
  const [jobDuration, setJobDuration] = useState("");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch("http://localhost:8000/api/employee", {
          method: "POST",
          headers: {
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          // Handle authentication error
          console.error("Authentication failed");
          return;
        }

        // Assuming the API returns an object with an EmployeeName property
        const { Name, departmentName, jobPost, jobDesignation,jobDuration,jobGrade } =
          await response.json();
        setEmployeeName(Name);
        setDepartmentName(departmentName);
        setJobDesignation(jobDesignation);
        setJobPost(jobPost);
        setJobDuration(jobDuration);
        setJobDesignation(jobGrade);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };

    const fetchEmployeePhoto = async () => {
      try {
        // Make a request to your employee data API endpoint
        const response = await fetch(
          "http://localhost:8000/api/employee/photo",
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

        // Assuming the API returns an object with an EmployeePhoto property
        const EmployeePhoto = await response.blob();
        const photUrl = URL.createObjectURL(EmployeePhoto);
        setEmployeePhoto(photUrl);
      } catch (error) {
        console.error("Error during API request", error);
      }
    };
    
    // Call the function when the component mounts
    fetchEmployeeData();
    fetchEmployeePhoto();
  }, [authToken]);

  return (
    <div className="employee">
      <ul className=" links">
        <img className="image" src="../logo.png" alt="meatmasters"/>
        <li onClick={()=>navigate('/Owner')} className="link">
          <Link to='/Owner'>Transactions</Link>
        </li>
        <li onClick={()=>navigate('/Owner/Contract')} className="link">
          <Link to="/Owner/Contract">Contracts</Link>
        </li>
        <li onClick={()=>navigate('/Owner/Fines')} className="link">
          <Link to="/Owner/Fines">Fines</Link>
        </li>
        <li onClick={()=>navigate('/Owner/Leaves')} className="link">
          <Link to='/Owner/Leaves'>Leaves</Link>
        </li>
        <li onClick={()=>navigate('/Owner/bonus')} className="link">
          <Link to='/Owner/Bonus'>Bonuses</Link>
        </li>
        <li onClick={()=>navigate('/Owner/Profits')} className="link">
          <Link to='/Owner/Profits'>Profits</Link>
        </li>
      </ul>
      <section className="main">
        <div className="container">
          <div className="heading">
            <div className="img__wrapper">
              <img src={employeePhoto} alt="Employee" />
            </div>
            <div className="info">
              <div className="info__item">
                <h1>{employeeName}</h1>
                <h4>Department: {departmentName}</h4>
                <h4>Post: {jobPost}</h4>
                <h4>Designation: {jobDesignation}</h4>
                <h4>Job Duration: {jobDuration} years</h4>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Transactions/>}></Route>
            <Route path="/Contract" element={<Contract />}></Route>
            <Route path="/Fines" element={<Fines/>}></Route>
            <Route path="/Bonus" element={<Bonus/>}></Route>
            <Route path="/Leaves" element={<Leaves />}></Route>
            <Route path="/Transactions" element={<Leaves />}></Route>
            <Route path="/Profits" element={<Profits />}></Route>
          </Routes>
        </div>
        <div className="sidebar">
          <h1>Attendance</h1>
          <Calendar onChange={setDate} value={date} />
          <h1>Notification Center</h1>
        </div>
      </section>
    </div>
  );
}

export default Owner;
