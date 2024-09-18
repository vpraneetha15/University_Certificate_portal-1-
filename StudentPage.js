import React, { useState } from 'react';
import UpdateDetails from './UpdateDetails';
import UploadForm from './UploadForm';
import './StudentPage.css';

const StudentPage = ({ regNo, setUserType }) => {
  const [uploadedCertificates, setUploadedCertificates] = useState([]);
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpdateDetails, setShowUpdateDetails] = useState(true); // Set to true for first login
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleUploadClick = () => {
    setShowUploadForm(true);
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
    } else {
      alert('Password changed successfully.');
      setShowChangePassword(false);
    }
  };

  const handleDetailsSubmit = (details) => {
    console.log(details);
    setShowUpdateDetails(false);
  };

  return (
    <div className="student-page-container">
      <div className="header">
        <div className="welcome-box">
          <h2>Welcome, {regNo}</h2>
        </div>
      </div>
      <div className="content">
        <div className="upload-section">
          <button className="upload-btn" onClick={handleUploadClick}>
            Upload Certificate
          </button>
          {showUploadForm && <UploadForm onUploadSuccess={handleUploadSuccess} />}
        </div>
        <div className="certificates-box">
          <h3>Uploaded Certificates</h3>
          <ul>
            {uploadedCertificates.map((file, index) => (
              <li key={index}>
                {file.name} <a href={file.url} download={file.name}><button>Download</button></a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sidebar-buttons">
        <button onClick={() => setShowChangePassword(true)}>Change Password</button>
      </div>

      {showChangePassword && (
        <div className="modal" align="center">
          <div className="modal-content">
            <h2>Change Password</h2>
            <label>Current Password:        </label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            /><br></br><br></br>
            <label>New Password:  </label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            /><br></br><br></br>
            <label>Confirm New Password:</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            /><br></br><br></br>
            {passwordError && <p className="error">{passwordError}</p>}
            <button className="modal-btn" onClick={handleChangePassword}>Change</button><br></br><br></br>
            <button className="modal-btn" onClick={() => setShowChangePassword(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showUpdateDetails && (
        <div className="modal">
          <div className="modal-content">
            <UpdateDetails regNo={regNo} onSubmit={handleDetailsSubmit} />
            <button className="modal-btn" onClick={() => setShowUpdateDetails(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
