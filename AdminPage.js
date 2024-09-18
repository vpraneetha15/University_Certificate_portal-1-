import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [courseName, setCourseName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Dummy data for students
  const studentData = [
    { regNo: '101', name: 'Alice', course: 'Math', department: 'CSE', year: '1', certificateUrl: '#' },
    { regNo: '102', name: 'Bob', course: 'Science', department: 'CSE', year: '2', certificateUrl: '#' },
    { regNo: '103', name: 'Charlie', course: 'Math', department: 'CSE', year: '1', certificateUrl: '#' },
    { regNo: '104', name: 'David', course: 'English', department: 'CSE', year: '3', certificateUrl: '#' },
    // Add more student data as needed
  ];

  const handleSearch = () => {
    const results = studentData.filter(student => 
      student.course.toLowerCase().includes(courseName.toLowerCase()) &&
      (selectedDepartment ? student.department === selectedDepartment : true) &&
      (selectedYear ? student.year === selectedYear : true)
    );
    setFilteredStudents(results);
  };

  return (
    <div className="admin-page-container">
      <div className="welcome-box">
        <h2>Welcome Admin</h2>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        </div>
        <div className="deparmnet">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="AIML">AIML</option>
          <option value="AIDS">AIDS</option>
          <option value="CSC">CSC</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
          {/* Add more departments as needed */}
        </select>
        </div>
        <div className="year">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          {/* Add more years as needed */}
        </select>
        </div>
        <div className="search-button">
        <button onClick={handleSearch}>Search</button>
      </div><br></br>
      <div className="results-container">
        <table>
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Course</th>
              <th>Department</th>
              <th>Year</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.regNo}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>
                  <a href={student.certificateUrl} download>
                    <button>Download</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;