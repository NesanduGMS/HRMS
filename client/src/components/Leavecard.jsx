

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaveForm() {
  const EmployeeId = localStorage.getItem('ID'); // Retrieve employee ID from localStorage

  const [sup, setSup] = useState(''); // Supervisor ID state
  const [error, setError] = useState(null); // Error handling state
  const navigate = useNavigate();

  // Initial state for leave details
  const [leaveDetail, setLeaveDetail] = useState({
    leaveType: '',
    startDate: '',
    numDays: '',
    supervisorId: ''
  }); 

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure supervisorId is included in leave details before making the request
    const leaveData = { ...leaveDetail, supervisorId: sup };

    axios.post(`http://localhost:3005/auth/addleavereq/${EmployeeId}`, leaveData)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/leaveinfo'); // Redirect to leave info page on success
        } else {
          alert(result.data.Error); // Show error message if there is an issue
        }
      })
      .catch(err => console.log(err.message)); // Log any errors
  };

  // Fetch supervisor data on component mount
  useEffect(() => {
    axios.get(`http://localhost:3005/auth/selsupervisor/${EmployeeId}`)
      .then(result => {
        if (result.data.Status) {
          setSup(result.data.Result.Supervisor_Id || ''); // Set supervisor ID if available
        } else {
          setError(result.data.Error); // Handle any errors
        }
      })
      .catch(err => setError(err.message)); // Handle request errors
  }, [EmployeeId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-300 p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">LEAVE FORM</h2>

        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Leave Type Select Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              name="leaveType"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              required
              value={leaveDetail.leaveType}
              onChange={(e) => setLeaveDetail({ ...leaveDetail, leaveType: e.target.value })}
            >
              <option value="">Select Leave Type</option>
              <option value="annual">Annual</option>
              <option value="casual">Casual</option>
              <option value="maternity">Maternity</option>
              <option value="nopay">No Pay</option>
            </select>
          </div>

          {/* Start Date Input Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              required
              value={leaveDetail.startDate}
              onChange={(e) => setLeaveDetail({ ...leaveDetail, startDate: e.target.value })}
            />
          </div>

          {/* Number of Days Input Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="numDays">NUMBER OF DAYS</label>
            <input
              type="text"
              id="numDays"
              name="numDays"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              required
              value={leaveDetail.numDays}
              onChange={(e) => setLeaveDetail({ ...leaveDetail, numDays: e.target.value })}
            />
          </div>

          {/* Supervisor ID Input Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="supervisorId">SUPERVISOR ID</label>
            <input
              type="text"
              id="supervisorId"
              name="supervisorId"
              value={sup} // Supervisor ID should be read-only
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeaveForm;

