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

  return (
    <div className="min-h-screen bg-[#17153B] p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Employees</h2>
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handleAddEmployee}
          className="bg-[#433D8B] text-white px-6 py-3 rounded-lg transition duration-200 hover:bg-[#2E236C]"
        >
          Add Employee
        </button>
        <button
          onClick={handleEditEmployee}
          className="bg-[#433D8B] text-white px-6 py-3 rounded-lg transition duration-200 hover:bg-[#2E236C]"
        >
          View & Edit Employee
        </button>
      </div>

      {showEditOptions && (
        <div className="flex flex-col items-center mt-6">
          <h3 className="text-xl mb-4">Enter Employee ID:</h3>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            className="p-2 mb-4 rounded-lg border border-[#C8ACD6] bg-[#17153B] text-white w-64"
          />
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSectionNavigation('personal-details')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Employee Personal Details
            </button>
            <button
              onClick={() => handleSectionNavigation('contact-info')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Contact Information
            </button>
            <button
              onClick={() => handleSectionNavigation('available-leaves')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Available Leaves
            </button>
            <button
              onClick={() => handleSectionNavigation('professional-details')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Professional Details
            </button>
            {/* <button
              onClick={() => handleSectionNavigation('past-job-position')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Past Job Position
            </button> */}
            <button
              onClick={() => handleSectionNavigation('emergency-info')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Emergency Information
            </button>
            {/* <button
              onClick={() => handleSectionNavigation('supervisor-details')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
            >
              Supervisor Details
            </button> */}
            <button
              onClick={() => handleSectionNavigation('user-account')}
              className="bg-[#433D8B] text-white px-4 py-2 rounded-lg hover:bg-[#2E236C] transition"
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
