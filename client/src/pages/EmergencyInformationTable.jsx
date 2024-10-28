import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmergencyInformationTable.css'; // Import CSS for styling

const EmergencyInformationTable = () => {
  const { employeeId } = useParams(); // Retrieves employeeId from the URL
  const [emergencyInfo, setEmergencyInfo] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDependant, setNewDependant] = useState({
    mobileNumber: '',
    name: '',
    address: '',
    employeeId: employeeId
  }); // State for new dependant information

  useEffect(() => {
    const fetchEmergencyInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/employees/getEmergencyInfo/${employeeId}`);
        setEmergencyInfo(Array.isArray(response.data) ? response.data : [response.data]); // Ensure it's an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emergency info:', error);
        setError('Error fetching emergency info');
        setLoading(false);
      }
    };

    fetchEmergencyInfo();
  }, [employeeId]);

  const handleDelete = async (mobileNumber) => {
    try {
      await axios.delete(`http://localhost:3005/api/employees/deleteEmergencyInfo/${mobileNumber}/${employeeId}`);
      setEmergencyInfo(emergencyInfo.filter(info => info.Dependant_Mobile_Number !== mobileNumber));
    } catch (error) {
      console.error('Error deleting emergency info:', error);
      setError('Error deleting emergency info');
    }
  };

  const handleAdd = async () => {
    if (!newDependant.mobileNumber || !newDependant.name || !newDependant.address) return;
    try {
      const response = await axios.post(`http://localhost:3005/api/employees/addEmergencyInfo`, newDependant);
      setEmergencyInfo([...emergencyInfo, response.data]);
      setNewDependant({ mobileNumber: '', name: '', address: '', employeeId: employeeId }); // Clear the input fields
    } catch (error) {
      console.error('Error adding emergency info:', error);
      setError('Error adding emergency info');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (emergencyInfo.length === 0) {
    return <p>No emergency information available.</p>;
  }

  return (
    <div className="emergency-info-page">
      <h2>Emergency Information</h2>
      <p>Employee ID: {employeeId}</p> {/* Display Employee ID at the beginning */}
      <table className="emergency-info-table">
        <thead>
          <tr>
            <th>Mobile Number</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emergencyInfo.map((info) => (
            <tr key={info.Dependant_Mobile_Number}>
              <td>{info.Dependant_Mobile_Number}</td>
              <td>{info.Dependant_Name}</td>
              <td>{info.Dependant_Address}</td>
              <td>
                <button onClick={() => handleDelete(info.Dependant_Mobile_Number)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-dependant">
        <input
          type="text"
          value={newDependant.mobileNumber}
          onChange={(e) => setNewDependant({ ...newDependant, mobileNumber: e.target.value })}
          placeholder="Enter mobile number"
        />
        <input
          type="text"
          value={newDependant.name}
          onChange={(e) => setNewDependant({ ...newDependant, name: e.target.value })}
          placeholder="Enter name"
        />
        <input
          type="text"
          value={newDependant.address}
          onChange={(e) => setNewDependant({ ...newDependant, address: e.target.value })}
          placeholder="Enter address"
        />
        <button onClick={handleAdd}>Add Dependant</button>
      </div>
    </div>
  );
};

export default EmergencyInformationTable;