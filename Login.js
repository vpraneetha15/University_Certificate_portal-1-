import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = ({ setUserType, setRegNo }) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [studentError, setStudentError] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8085/admin', {
        adminUsername,
        adminPassword
      });
  
      if (response.data.success) {
        setAdminError('');
        setUserType('admin');
        navigate('/admin'); // Navigate to Admin Page
      } else {
        setAdminError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      setAdminError('Incorrect username or password');
    }
  };

  const handleStudentLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8085/student', {
        reg_no: studentUsername,
        password: studentPassword
      });

      if (response.data.success) {
        setStudentError('');
        setRegNo(studentUsername); // Set the registration number
        setUserType('student');
        navigate('/student'); // Navigate to Student Page
      } else {
        setStudentError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during student login:', error);
      setStudentError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        /><br /><br />
        <button onClick={handleAdminLogin}>Login</button>
        {adminError && <p className="error">{adminError}</p>}
      </div>
      <div className="login-box">
        <h2>Student Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={studentUsername}
          onChange={(e) => setStudentUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={studentPassword}
          onChange={(e) => setStudentPassword(e.target.value)}
        /><br /><br />
        <button onClick={handleStudentLogin}>Login</button>
        {studentError && <p className="error">{studentError}</p>}
        <p className="register-link" onClick={() => navigate('/register')}>Click here to register</p>
      </div>
    </div>
  );
};

export default Login;
