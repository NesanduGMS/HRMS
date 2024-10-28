import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employee.css'; // Import the custom CSS file

const Employee = () => {
  const [departments, setDepartments] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPayGrade, setSelectedPayGrade] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch departments, job titles, and pay grades from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentResponse, jobTitleResponse, payGradeResponse] = await Promise.all([
          axios.get('http://localhost:3005/api/departments'),
          axios.get('http://localhost:3005/api/jobtitles'),
          axios.get('http://localhost:3005/api/paygrades'),
        ]);

        setDepartments(departmentResponse.data);
        setJobTitles(jobTitleResponse.data);
        setPayGrades(payGradeResponse.data);
      } catch (error) {
        setError('Error fetching data from the server.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch employees based on selected filters
  const fetchEmployees = async () => {
    if (!selectedDepartment && !selectedPayGrade && !selectedJobTitle) {
      alert('Please select at least one filter (department, pay grade, or job title).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3005/api/employees/filter', {
        params: {
          department: selectedDepartment || null,
          payGrade: selectedPayGrade || null,
          jobTitle: selectedJobTitle || null,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      setError('Error fetching employee data. Please try again.');
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    fetchEmployees();
  };

  return (
    <div className="container mx-auto p-6 max-w-md relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Fetch Employees</h2>
      {loading && <p className="text-lg text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Department Dropdown */}
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

      {/* Pay Grade Dropdown */}
      <div className="mb-6">
        <label htmlFor="payGrade" className="block text-lg mb-2 font-medium">
          Select Pay Grade:
        </label>
        <select
          value={selectedPayGrade}
          onChange={(e) => setSelectedPayGrade(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <option value="">Select a pay grade</option>
          {payGrades.map((payGrade, index) => (
            <option key={index} value={payGrade}>
              {payGrade}
            </option>
          ))}
        </select>
      </div>

      {/* Job Title Dropdown */}
      <div className="mb-6">
        <label htmlFor="jobTitle" className="block text-lg mb-2 font-medium">
          Select Job Title:
        </label>
        <select
          value={selectedJobTitle}
          onChange={(e) => setSelectedJobTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <option value="">Select a job title</option>
          {jobTitles.map((jobTitle, index) => (
            <option key={index} value={jobTitle}>
              {jobTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-400"
      >
        Fetch Employees
      </button>

      {/* Employee Results Table */}
      {employees.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Employees:</h3>
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Employee ID</th>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b">Job Title</th>
                <th className="py-2 px-4 border-b">Pay Grade</th>
                <th className="py-2 px-4 border-b">Work Section</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.Employee_Id} className="text-center">
                  <td className="py-2 px-4 border-b">{employee.Employee_Id}</td>
                  <td className="py-2 px-4 border-b">{employee.Full_Name}</td>
                  <td className="py-2 px-4 border-b">{employee.Gender}</td>
                  <td className="py-2 px-4 border-b">{employee.Country}</td>
                  <td className="py-2 px-4 border-b">{employee.Job_Title}</td>
                  <td className="py-2 px-4 border-b">{employee.Pay_Grade}</td>
                  <td className="py-2 px-4 border-b">{employee.Work_Section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employee;
