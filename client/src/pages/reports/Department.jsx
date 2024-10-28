import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DepartmentDropdown = ({ departments, onSelect, isOpen }) => {
  return (
    <div
      className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg ${
        !isOpen ? 'hidden' : ''
      }`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Department Name</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departments.map((department, index) => (
            <tr
              key={index}
              className="hover:bg-blue-100 cursor-pointer"
              onClick={() => onSelect(department)}
            >
              <td className="px-4 py-2 text-sm text-gray-800">{department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepartmentLoading(true);
      setError(null); // Reset error when starting a new request
      try {
        const response = await axios.get('http://localhost:3005/api/departments');
        setDepartments(response.data);
      } catch (error) {
        setError('Error fetching departments. Please try again.');
      } finally {
        setDepartmentLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch employees based on selected department
  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedDepartment) {
        setEmployeesLoading(true);
        setError(null); // Reset error when starting a new request
        try {
          const response = await axios.post('http://localhost:3005/api/employees/departmentName', {
            departments: selectedDepartment,
          });
          setEmployees(response.data);
          console.log('Employee Data:', response.data); // Log the data to inspect structure
        } catch (error) {
          setError('Error fetching employees. Please try again.');
        } finally {
          setEmployeesLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [selectedDepartment]);

  const handleSelectDepartment = (departmentName) => {
    setSelectedDepartment(departmentName);
    setDropdownOpen(false); // Close dropdown on selection
  };

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!selectedDepartment) {
      alert('Please select a department first.');
    } else {
      alert(`You have selected: ${selectedDepartment}`);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Select Department</h2>

      {departmentLoading && <p className="text-lg text-gray-700">Loading departments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!departmentLoading && !error && (
        <div className="mb-6">
          <label htmlFor="department" className="block text-lg mb-2 font-medium">
            Choose a Department:
          </label>
          <div ref={dropdownRef}>
            <div
              onClick={handleToggleDropdown}
              className="p-3 border border-gray-300 rounded-md cursor-pointer shadow-sm relative"
            >
              {selectedDepartment || 'Select a department'}
            </div>
            <DepartmentDropdown
              departments={departments}
              onSelect={handleSelectDepartment}
              isOpen={dropdownOpen}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
      >
        Confirm Selection
      </button>

      {/* Display employee report */}
      {employeesLoading && <p className="text-lg text-gray-700 mt-6">Loading employees...</p>}
      {!employeesLoading && employees.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Employees in {selectedDepartment}:</h3>
          <table className="min-w-full divide-y divide-gray-200 mt-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Full Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Gender</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Country</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={index}>
                  {/* Handle different possible key names for Employee ID */}
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {employee.Employee_id || employee.employee_id || employee.Employee_Id || 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{employee.Full_Name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{employee.Gender}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{employee.Country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!employeesLoading && employees.length === 0 && !error && (
        <p className="text-gray-700 mt-6">No employees found for {selectedDepartment}.</p>
      )}
    </div>
  );
};

export default Department;
