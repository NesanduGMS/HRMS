import axios from 'axios';
import React, { useState } from 'react';

const AdminDash = () => {
  const [employeeId, setEmployeeId] = useState('');

  const handleAppoint = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    try {
      const result = await axios.put(`http://localhost:3005/admin/selecthr/${employeeId}`);

      if (result.data.Status) {
        alert('HR Manager Appointed');
      } else {
        console.log('Error in appointing HR Manager');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#17153B] flex items-center justify-center">
      <div className="bg-[#2E236C] p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-3xl font-semibold mb-6 text-[#C8ACD6]">Admin Dashboard</h1>
        <form onSubmit={handleAppoint}>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg border-[#433D8B] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6] text-white bg-gray-800" // Input styles
          />
          <button
            type="submit"
            className="bg-[#433D8B] hover:bg-[#2E236C] text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full"
          >
            Appoint as HR MANAGER
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDash;
