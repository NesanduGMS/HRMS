import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfessionalDetails = () => {
  const { employeeId } = useParams(); // Retrieve employeeId from the URL
  const [professionalData, setProfessionalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/employees/getProfessionalDetails/${employeeId}`);
        setProfessionalData(response.data);
      } catch (error) {
        console.error('Error fetching professional details:', error);
      }
    };

    fetchProfessionalData();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/api/employees/updateProfessionalDetails/${employeeId}`, professionalData);
      alert(response.data.message); // Show success message from backend
      setIsEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.error('Error saving professional details:', error);
      alert('Failed to update professional details. Please try again.');
    }
  };

  if (!professionalData) return <p>Loading...</p>;

  return (
    <div className="professional-details-page">
      <h2>Professional Details</h2>
      <form className="professional-form">
        <label>
          <strong>Job Title:</strong>
          <input
            type="text"
            name="Job_Title"
            value={professionalData.Job_Title}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <strong>Pay Grade:</strong>
          <select
            name="Pay_Grade"
            value={professionalData.Pay_Grade}
            onChange={handleChange}
            disabled={!isEditing}
          >
            {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12'].map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </label>
        <label>
          <strong>Employment Status:</strong>
          <select
            name="Employment_Status"
            value={professionalData.Employment_Status}
            onChange={handleChange}
            disabled={!isEditing}
          >
            {['Permanent', 'Fulltime intern', 'Parttime intern', 'Fulltime contract', 'Parttime contract', 'Freelance'].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
        <label>
          <strong>Skills:</strong>
          <input
            type="text"
            name="Skills"
            value={professionalData.Skills}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <strong>Basic Salary:</strong>
          <input
            type="number"
            name="Basic_Salary"
            value={professionalData.Basic_Salary}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <strong>Section ID:</strong>
          <input
            type="text"
            name="Section_Id"
            value={professionalData.Section_Id}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <strong>Availability Status:</strong>
          <input
            type="checkbox"
            name="Availability_Status"
            checked={professionalData.Availability_Status}
            onChange={(e) => handleChange({ target: { name: 'Availability_Status', value: e.target.checked } })}
            disabled={!isEditing}
          />
        </label>
        <label>
          <strong>Company Work Email:</strong>
          <input
            type="email"
            name="Company_Work_Mail"
            value={professionalData.Company_Work_Mail}
            onChange={handleChange}
            disabled={!isEditing}
          />
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

export default ProfessionalDetails;
