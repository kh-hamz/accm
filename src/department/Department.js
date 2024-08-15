import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {Routes,Route,Link, useNavigate} from "react-router-dom"
import MonthlySalary from "./MonthlySalary";
import Contract from "./Contract";
import Fines from './Fine'
import Bonus from './Bonus'
import Leaves from "./Leaves";
import Vendors from "./Vendors";
import Transactions from "./Transactions";

function Department() {
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
        <li onClick={()=>navigate('/Department')} className="link">
          <Link to='/Department'>Salary</Link>
        </li>
        <li onClick={()=>navigate('/Department/contract')} className="link">
          <Link to="/Department/contract">Contracts</Link>
        </li>
        <li onClick={()=>navigate('/Department/fines')} className="link">
          <Link to='/Department/fines'>Fines</Link>
        </li>
        <li onClick={()=>navigate('/Department/bonus')} className="link">
          <Link to='/Department/bonus'>Bonuses</Link>
        </li>
        <li onClick={()=>navigate('/Department/leaves')} className="link">
          <Link to='/Department/leaves'>Leaves</Link>
        </li>
        <li onClick={()=>navigate('/Department/vendors')} className="link">
          <Link to='/Department/vendors'>Vendors</Link>
        </li>
        <li onClick={()=>navigate('/Department/Transactions')} className="link">
          <Link to='/Department/Transactions'>Transactions</Link>
        </li>
        <li onClick={()=>navigate('/Department')} className="link">
          <Link to='/Department'>Employee</Link>
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
            <Route path="/" element={<MonthlySalary/>}></Route>
            <Route path="/contract" element={<Contract />}></Route>
            <Route path="/fines" element={<Fines/>}></Route>
            <Route path="/bonus" element={<Bonus/>}></Route>
            <Route path="/leaves" element={<Leaves />}></Route>
            <Route path="/vendors" element={<Vendors/>}></Route>
            <Route path="/Transactions" element={<Transactions/>}></Route>
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

export default Department;
