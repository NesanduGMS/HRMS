import React from 'react';
import { useNavigate } from 'react-router-dom';

const Manageemployee = () => {
  const navigate = useNavigate();

  // Navigate to the addEmployeePage on button click
  const handleAddEmployee = () => {
    navigate('/dashboard/addemployee');
  };

  const handleEditEmployee = () => {
    // Logic for editing employee details can be added here
    alert('Edit Employee Details functionality will be implemented!');
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
        Edit Employee Details
      </button>
    </div>
  );
};

export default Manageemployee;
