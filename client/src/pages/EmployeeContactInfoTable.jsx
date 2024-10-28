import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeContactInfoTable.css'; // Import CSS for styling

const EmployeeContactInfoTable = () => {
  const { employeeId } = useParams(); // Retrieves employeeId from the URL
  const [contactInfo, setContactInfo] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMobileNumber, setNewMobileNumber] = useState(''); // State for new mobile number

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/employees/getEmployeeContactInfo/${employeeId}`);
        setContactInfo(Array.isArray(response.data) ? response.data : [response.data]); // Ensure it's an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact info:', error);
        setError('Error fetching contact info');
        setLoading(false);
      }
    };
  
    fetchContactInfo();
  }, [employeeId]);

  const handleDelete = async (mobileNumber) => {
    try {
      await axios.delete(`http://localhost:3005/api/employees/deleteEmployeeContactInfo/${employeeId}/${mobileNumber}`);
      setContactInfo(contactInfo.filter(info => info.Employee_Mobile_Number !== mobileNumber));
    } catch (error) {
      console.error('Error deleting contact info:', error);
      setError('Error deleting contact info');
    }
  };

  const handleAdd = async () => {
    if (!newMobileNumber) return;
    try {
      const response = await axios.post(`http://localhost:3005/api/employees/addEmployeeContactInfo`, {
        employeeId,
        mobileNumber: newMobileNumber
      });
      setContactInfo([...contactInfo, response.data]);
      setNewMobileNumber(''); // Clear the input field
    } catch (error) {
      console.error('Error adding contact info:', error);
      setError('Error adding contact info');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (contactInfo.length === 0) {
    return <p>No contact information available.</p>;
  }

  return (
    <div className="employee-contact-info-page">
      <h2>Employee Contact Information</h2>
      <p>Employee ID: {employeeId}</p> {/* Display Employee ID at the beginning */}
      <table className="employee-contact-info-table">
        <thead>
          <tr>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactInfo.map((info) => (
            <tr key={info.Employee_Mobile_Number}>
              <td>{info.Employee_Mobile_Number}</td>
              <td>
                <button onClick={() => handleDelete(info.Employee_Mobile_Number)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-mobile-number">
        <input
          type="text"
          value={newMobileNumber}
          onChange={(e) => setNewMobileNumber(e.target.value)}
          placeholder="Enter new mobile number"
        />
        <button onClick={handleAdd}>Add Mobile Number</button>
      </div>
    </div>
  );
};

export default EmployeeContactInfoTable;