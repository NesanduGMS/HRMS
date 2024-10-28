import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeePage = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    employee: {
      First_Name: '',
      Last_Name: '',
      Full_Name: '',
      Recruitment_Date: '',
      Date_Of_Birth: '',
      Gender: 'Male',
      Marital_Status: false,
      Personal_Email: '',
      Country: '',
      Address: '',
    },
    contactInfo: {
      Employee_Mobile_Number: '',
    },
    availableLeaves: {
      Annual_Leaves: 0,
      Casual_Leaves: 0,
      Maternity_Leaves: 0,
      No_Pay_Leaves: 0,
    },
    professionalDetails: {
      Job_Title: '',
      Pay_Grade: '',
      Employment_Status: '',
      Skills: '',
      Basic_Salary: 0,
      Section_Id: '',
      Availability_Status: false,
      Company_Work_Mail: '',
    },
    pastJobPosition: {
      Job_Title: '',
      Time_Period_Years: 0,
      Rating_Performance: 0,
    },
    emergencyInfo: {
      Dependant_Mobile_Number: '',
      Dependant_Name: '',
      Dependant_Address: '',
    },
    supervisorDetails: {
      Supervisor_Id: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name.split('.');

    setEmployeeDetails((prevDetails) => {
      if (fieldName.length > 1) {
        return {
          ...prevDetails,
          [fieldName[0]]: {
            ...prevDetails[fieldName[0]],
            [fieldName[1]]: value,
          },
        };
      } else {
        return {
          ...prevDetails,
          employee: {
            ...prevDetails.employee,
            [name]: value,
          },
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3005/api/employees/addEmployeeDetails',
        employeeDetails
      );
      const { message, Employee_Id } = response.data;
      alert(`${message} The new Employee ID is ${Employee_Id}`);
    } catch (error) {
      console.error('Error adding employee details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#17153B] to-[#433D8B] p-4">
      <div className="max-w-2xl w-full bg-[#2E236C] rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-[#C8ACD6] text-center mb-8">Add New Employee</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold text-[#C8ACD6] mb-4">Employee Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="First_Name"
              value={employeeDetails.employee.First_Name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="Last_Name"
              value={employeeDetails.employee.Last_Name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="Full_Name"
              value={employeeDetails.employee.Full_Name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              type="date"
              name="Recruitment_Date"
              value={employeeDetails.employee.Recruitment_Date}
              onChange={handleChange}
            />
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              type="date"
              name="Date_Of_Birth"
              value={employeeDetails.employee.Date_Of_Birth}
              onChange={handleChange}
              required
            />
            <select
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="Gender"
              value={employeeDetails.employee.Gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label className="flex items-center space-x-2 text-[#C8ACD6]">
              <span>Marital Status:</span>
              <input
                type="checkbox"
                name="Marital_Status"
                checked={employeeDetails.employee.Marital_Status}
                onChange={() =>
                  setEmployeeDetails((prevDetails) => ({
                    ...prevDetails,
                    employee: {
                      ...prevDetails.employee,
                      Marital_Status: !prevDetails.employee.Marital_Status,
                    },
                  }))
                }
                className="form-checkbox h-5 w-5 text-[#17153B] border-none"
              />
            </label>
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="Personal_Email"
              value={employeeDetails.employee.Personal_Email}
              onChange={handleChange}
              placeholder="Personal Email"
            />
            <input
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="Country"
              value={employeeDetails.employee.Country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
            <textarea
              className="w-full p-3 rounded-md border-none focus:ring-2 focus:ring-[#17153B] text-[#2E236C] placeholder-gray-500 bg-[#C8ACD6]"
              name="Address"
              value={employeeDetails.employee.Address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#17153B] hover:bg-[#433D8B] text-white rounded-md font-semibold transition-colors"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
