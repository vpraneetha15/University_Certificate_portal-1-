import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import axios from 'axios';

const Registration = () => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!regNo || !name || !email || !phoneNumber || !year || !branch || !section || !password) {
      alert('Please fill all the fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8085n/register', {
        regNo, name, email, phoneNumber, year, branch, section, password
      });
  
      if (response.data.success) {
        setSuccessMessage('Successfully registered! Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2><center>Registration</center></h2>
      {successMessage ? (
        <p className="success-message">{successMessage}</p>
      ) : (
        <form className="registration-form">
          <label>Reg No:</label>
          <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} /><br /><br />
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><br /><br />
          <label>Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select><br /><br />
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AIML">AIML</option>
            <option value="AIDS">AIDS</option>
            <option value="CSC">CSC</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select><br /><br />
          <label>Section:</label>
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} /><br /><br />
          <button type="button" onClick={handleRegister}>Register</button>
        </form>
      )}
    </div>
  );
};

export default Registration;
