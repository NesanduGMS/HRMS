import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Manageemployee = () => {
  const navigate = useNavigate();
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [employeeId, setEmployeeId] = useState('');

  // Navigate to the addEmployeePage on button click
  const handleAddEmployee = () => {
    navigate('/dashboard/addemployee');
  };

  const handleEditEmployee = () => {
    setShowEditOptions(true);
  };

  const handleSectionNavigation = (section) => {
    navigate(`/dashboard/edit-employee/${employeeId}/${section}`);
  };

  const handleUserAccount = () => {
    navigate(`/dashboard/user-account/${employeeId}`);
  };

  return (
    <div>
      <h2>Manage Employees</h2>
      <button
        onClick={handleAddEmployee}
        style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
      >
        Add Employee
      </button>

      <button
        onClick={handleEditEmployee}
        style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
      >
        View & Edit Employee
      </button>

      {showEditOptions && (
        <div style={{ marginTop: '20px' }}>
          <h3>Enter Employee ID:</h3>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            style={{ padding: '5px', margin: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => handleSectionNavigation('personal-details')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Employee Personal Details
            </button>
            <button
              onClick={() => handleSectionNavigation('contact-info')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Contact Information
            </button>
            <button
              onClick={() => handleSectionNavigation('available-leaves')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Available Leaves
            </button>
            <button
              onClick={() => handleSectionNavigation('professional-details')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Professional Details
            </button>
            <button
              onClick={() => handleSectionNavigation('past-job-position')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Past Job Position
            </button>
            <button
              onClick={() => handleSectionNavigation('emergency-info')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Emergency Information
            </button>
            <button
              onClick={() => handleSectionNavigation('supervisor-details')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              Supervisor Details
            </button>
            <button
              onClick={() => handleSectionNavigation('user-account')}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '5px', borderRadius: '5px' }}
            >
              User Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageemployee;
