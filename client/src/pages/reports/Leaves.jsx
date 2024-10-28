import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaves.css'; // Import the custom CSS file

const Leaves = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalLeaves, setTotalLeaves] = useState([]); // Initialize with an empty array

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const fetchTotalLeaves = async () => {
    if (selectedDepartment && startDate && endDate) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3005/api/leaves', {
          department: selectedDepartment,
          startDate,
          endDate,
        });
        setTotalLeaves(response.data.totalLeaves); // Store the array of leaves
      } catch (error) {
        setError('Error fetching leaves data. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please select department and date range.');
    }
  };

  const handleSubmit = () => {
    fetchTotalLeaves();
  };

  return (
    <div className="container mx-auto p-6 max-w-md relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Fetch Total Leaves</h2>
      {loading && <p className="text-lg text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <label htmlFor="department" className="block text-lg mb-2 font-medium">
          Select Department:
        </label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <option value="">Select a department</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="startDate" className="block text-lg mb-2 font-medium">
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full custom-date-input"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="endDate" className="block text-lg mb-2 font-medium">
          End Date:
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full custom-date-input"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-400"
      >
        Fetch Total Leaves
      </button>

      {totalLeaves.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Total Leaves for {selectedDepartment}:</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Leave Type</th>
                <th className="py-2">Total Leaves</th>
              </tr>
            </thead>
            <tbody>
              {totalLeaves.map((leave, index) => (
                <tr key={index}>
                  <td className="py-2">{leave.Leave_Type}</td>
                  <td className="py-2">{leave.Total_Leave_Days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaves;
