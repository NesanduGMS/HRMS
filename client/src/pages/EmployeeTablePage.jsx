import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeTablePage.css'; // Import CSS for styling

const EmployeeTablePage = () => {
  const { employeeId } = useParams(); // Retrieves employeeId from the URL
  const [employeeData, setEmployeeData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/employees/getEmployeeTable/${employeeId}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/api/employees/updateEmployee/${employeeId}`, employeeData);
      alert(response.data.message); // Show success message from the backend
      setIsEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.error('Error saving employee data:', error);
      alert('Failed to update employee data. Please try again.'); // Optional error alert
    }
  };
  

  if (!employeeData) return <p>Loading...</p>;

  return (
    <div className="employee-table-page">
      <h2>Employee Personal Details</h2>
      <form className="employee-form">
        <label>
          <strong>Employee ID:</strong>
          <input type="text" name="Employee_Id" value={employeeData.Employee_Id} readOnly />
        </label>
        <label>
          <strong>Full Name:</strong>
          <input type="text" name="Full_Name" value={employeeData.Full_Name} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>First Name:</strong>
          <input type="text" name="First_Name" value={employeeData.First_Name} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Last Name:</strong>
          <input type="text" name="Last_Name" value={employeeData.Last_Name} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Recruitment Date:</strong>
          <input type="date" name="Recruitment_Date" value={employeeData.Recruitment_Date.split('T')[0]} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Date of Birth:</strong>
          <input type="date" name="Date_Of_Birth" value={employeeData.Date_Of_Birth.split('T')[0]} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Gender:</strong>
          <select name="Gender" value={employeeData.Gender} onChange={handleChange} disabled={!isEditing}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          <strong>Marital Status:</strong>
          <select name="Marital_Status" value={employeeData.Marital_Status ? 'true' : 'false'} onChange={handleChange} disabled={!isEditing}>
            <option value="true">Married</option>
            <option value="false">Single</option>
          </select>
        </label>
        <label>
          <strong>Personal Email:</strong>
          <input type="email" name="Personal_Email" value={employeeData.Personal_Email} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Country:</strong>
          <input type="text" name="Country" value={employeeData.Country} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Address:</strong>
          <input type="text" name="Address" value={employeeData.Address} onChange={handleChange} disabled={!isEditing} />
        </label>
      </form>
      <button onClick={() => setIsEditing((prev) => !prev)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && (
        <button onClick={handleSaveChanges}>Save Changes</button>
      )}
    </div>
  );
};

export default EmployeeTablePage;
