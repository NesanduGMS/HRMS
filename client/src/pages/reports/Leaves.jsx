import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaves = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalLeaves, setTotalLeaves] = useState([]);

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
        setTotalLeaves(response.data.totalLeaves);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#17153B] to-[#433D8B]">
      <div className="p-6 max-w-md bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#17153B]">Fetch Total Leaves</h2>
        {loading && <p className="text-lg text-gray-700">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-6">
          <label htmlFor="department" className="block text-lg mb-2 font-medium text-[#2E236C]">
            Select Department:
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full p-3 border border-[#433D8B] rounded-md shadow-sm bg-[#17153B]" // Typing box color updated here
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
          <label htmlFor="startDate" className="block text-lg mb-2 font-medium text-[#2E236C]">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-[#433D8B] rounded-md shadow-sm bg-[#17153B]" // Typing box color updated here
          />
        </div>

        <div className="mb-6">
          <label htmlFor="endDate" className="block text-lg mb-2 font-medium text-[#2E236C]">
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-[#433D8B] rounded-md shadow-sm bg-[#17153B]" // Typing box color updated here
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#433D8B] text-white font-bold py-2 rounded-md hover:bg-[#2E236C]"
        >
          Fetch Total Leaves
        </button>

        {totalLeaves.length > 0 && (
          <div className="mt-6">
            <h3 className="text-3xl font-semibold text-[#17153B]">Total Leaves for {selectedDepartment}:</h3>
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-[#2E236C]">Leave Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-[#2E236C]">Total Leaves</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {totalLeaves.map((leave, index) => (
                  <tr key={index} className="hover:bg-blue-100">
                    <td className="px-4 py-2 text-sm text-gray-800">{leave.Leave_Type}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{leave.Total_Leave_Days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaves;
