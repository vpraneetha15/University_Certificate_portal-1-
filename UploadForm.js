import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [formData, setFormData] = useState({
        regNo: '',
        name: '',
        course: '',
        department: '',
        year: '',
        certificate: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('regNo', formData.regNo);
        data.append('name', formData.name);
        data.append('course', formData.course);
        data.append('department', formData.department);
        data.append('year', formData.year);
        data.append('certificate', formData.certificate);

        axios.post('http://localhost:8085/upload', data)
            .then(res => {
                console.log(res.data);
                alert('File uploaded and data saved to database');
            })
            .catch(err => {
                console.error(err);
                alert('Error uploading file');
            });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Registration Number:</label>
                <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Course:</label>
                <input type="text" name="course" value={formData.course} onChange={handleChange} required />
            </div>
            <div>
                <label>Department:</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
            </div>
            <div>
                <label>Year:</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
                <label>Certificate (PDF):</label>
                <input type="file" name="certificate" accept=".pdf" onChange={handleFileChange} required />
            </div>
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
