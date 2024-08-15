import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './App';
import Employee from './employee/Employee';
import Department from './department/Department';
import Owner from './owner/Owner';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route,} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Employee/*" element={<Employee />} />
        <Route path="/Department/*" element={<Department/>}/>
        <Route path="/Owner/*" element ={<Owner />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
