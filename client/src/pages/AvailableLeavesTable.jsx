import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AvailableLeavesTable.css'; // Import CSS for styling

const AvailableLeaves = () => {
  const { employeeId } = useParams(); // Retrieve employeeId from the URL
  const [leaveData, setLeaveData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/employees/getAvailableLeaves/${employeeId}`);
        setLeaveData(response.data);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchLeaveData();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({ ...prevData, [name]: parseInt(value, 10) }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/api/employees/updateAvailableLeaves/${employeeId}`, leaveData);
      alert(response.data.message); // Show success message from backend
      setIsEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.error('Error saving leave data:', error);
      alert('Failed to update leave data. Please try again.');
    }
  };

  if (!leaveData) return <p>Loading...</p>;

  return (
    <div className="available-leaves-page">
      <h2>Available Leaves</h2>
      <form className="leave-form">
        <label>
          <strong>Employee ID:</strong>
          <input type="text" name="Employee_Id" value={leaveData.Employee_Id} readOnly />
        </label>
        <label>
          <strong>Annual Leaves:</strong>
          <input type="number" name="Annual_Leaves" value={leaveData.Annual_Leaves} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Casual Leaves:</strong>
          <input type="number" name="Casual_Leaves" value={leaveData.Casual_Leaves} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>Maternity Leaves:</strong>
          <input type="number" name="Maternity_Leaves" value={leaveData.Maternity_Leaves} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          <strong>No Pay Leaves:</strong>
          <input type="number" name="No_Pay_Leaves" value={leaveData.No_Pay_Leaves} onChange={handleChange} disabled={!isEditing} />
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

export default AvailableLeaves;
