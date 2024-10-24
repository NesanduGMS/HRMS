import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployeePage.css'; // Import the CSS file for styling

const AddEmployeePage = () => {
  const [employee, setEmployee] = useState({
    First_Name: '',
    Last_Name: '',
    Full_Name: '',
    Recruitment_Date: '',
    Date_Of_Birth: '',
    Gender: 'Male',
    Marital_Status: false,
    Personal_Email: '', // This field will remain optional
    Country: '',
    Address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3005/api/employees/addEmployee', employee)
      .then(response => {
        alert('Employee added successfully!');
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  };

  return (
    <div className="add-employee-container">
      <h2 className="form-title">Add New Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <input className="form-input" name="First_Name" value={employee.First_Name} onChange={handleChange} placeholder="First Name" required />
        <input className="form-input" name="Last_Name" value={employee.Last_Name} onChange={handleChange} placeholder="Last Name" required />
        <input className="form-input" name="Full_Name" value={employee.Full_Name} onChange={handleChange} placeholder="Full Name" required />
        
        <label className="form-label">Recruitment Date:</label>
        <input className="form-input" name="Recruitment_Date" type="date" value={employee.Recruitment_Date} onChange={handleChange} required />
        
        <label className="form-label">Date of Birth:</label>
        <input className="form-input" name="Date_Of_Birth" type="date" value={employee.Date_Of_Birth} onChange={handleChange} required />
        
        <select className="form-input" name="Gender" value={employee.Gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <label className="marital-status-label">
          Marital Status:
          <input
            type="checkbox"
            name="Marital_Status"
            checked={employee.Marital_Status}
            onChange={() => setEmployee((prevEmployee) => ({
              ...prevEmployee,
              Marital_Status: !prevEmployee.Marital_Status
            }))}
          />
        </label>
        
        <input
          className="form-input"
          name="Personal_Email"
          value={employee.Personal_Email}
          onChange={handleChange}
          placeholder="Personal Email" // No 'required' attribute
        />
        <input className="form-input" name="Country" value={employee.Country} onChange={handleChange} placeholder="Country" required />
        <textarea className="form-input" name="Address" value={employee.Address} onChange={handleChange} placeholder="Address" required />
        
        <button type="submit" className="submit-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
