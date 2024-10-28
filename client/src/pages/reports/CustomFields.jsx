import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EmployeeDropdown = ({ employeeIDs, onSelect, isOpen }) => {
  return (
    <div
      className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg ${
        !isOpen ? 'hidden' : ''
      }`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee ID</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employeeIDs.map((employeeID, index) => (
            <tr
              key={index}
              className="hover:bg-blue-100 cursor-pointer"
              onClick={() => onSelect(employeeID)}
            >
              <td className="px-4 py-2 text-sm text-gray-800">{employeeID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CareerProgressionReport = () => {
  const [employeeIDs, setEmployeeIDs] = useState([]);
  const [employeeID, setEmployeeID] = useState('');
  const [progressionData, setProgressionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch employee IDs on component mount
  useEffect(() => {
    const fetchEmployeeIDs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3005/api/ids');
        setEmployeeIDs(response.data);
      } catch (err) {
        setError('Error fetching employee IDs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeIDs();
  }, []);

  // Fetch career progression data
  const fetchCareerProgression = async () => {
    if (!employeeID) {
      alert('Please select an Employee ID.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3005/api/employees/career-progression', { Employee_Id: employeeID });
      setProgressionData(response.data);
      if (response.data.length === 0) {
        setError('No progression data found for the selected Employee ID.');
      }
    } catch (err) {
      setError('Error fetching career progression data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectEmployeeID = (id) => {
    setEmployeeID(id);
    setDropdownOpen(false); // Close dropdown immediately after selection
  };

  return (
    <div className="container mx-auto p-6 max-w-md relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Career Progression Report</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <label htmlFor="employeeID" className="block text-lg mb-2 font-medium">
          Employee ID:
        </label>
        <div ref={dropdownRef}>
          <div
            onClick={handleToggleDropdown}
            className="p-3 border border-gray-300 rounded-md cursor-pointer shadow-sm relative"
          >
            {employeeID || 'Select an Employee ID'}
          </div>
          <EmployeeDropdown
            employeeIDs={employeeIDs}
            onSelect={handleSelectEmployeeID}
            isOpen={dropdownOpen}
          />
        </div>
      </div>

      <button
        onClick={fetchCareerProgression}
        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch Career Progression'}
      </button>

      {loading && <p className="text-lg text-gray-700 mt-6">Loading progression data...</p>}

      {progressionData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Career Progression Details:</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Current Job Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Past Job Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Time Period (Years)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Performance Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {progressionData.map((record, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-800">{record.Employee_ID}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{record.Current_Job_Title}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{record.Past_Job_Title}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{record.Time_Period_Years}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{record.Rating_Performance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && progressionData.length === 0 && !error && (
        <p className="text-gray-700 mt-6">No progression data found for Employee ID {employeeID}.</p>
      )}
    </div>
  );
};

export default CareerProgressionReport;
