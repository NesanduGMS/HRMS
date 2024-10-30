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

  const [successMessage, setSuccessMessage] = useState(''); // State for success message

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
      const response = await axios.post('http://localhost:3005/api/employees/addEmployeeDetails', employeeDetails);
      const { message, Employee_Id } = response.data;
      setSuccessMessage(`Add successful! The new Employee ID is ${Employee_Id}`); // Set success message
    } catch (error) {
      console.error('Error adding employee details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-primaryDark min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-primary p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-accentLight text-center mb-6">Add New Employee</h2>
        
        {/* Success Message */}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Personal Details */}
          <h3 className="text-lg font-semibold text-accentDark">Employee Personal Details</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.First_Name" placeholder="First Name" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Last_Name" placeholder="Last Name" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Full_Name" placeholder="Full Name" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Recruitment_Date" type="date" onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Date_Of_Birth" type="date" required onChange={handleChange} />
          <select className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Gender" required onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label className="marital-status-label flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name="employee.Marital_Status"
              checked={employeeDetails.employee.Marital_Status}
              onChange={() => setEmployeeDetails((prevDetails) => ({
                ...prevDetails,
                employee: {
                  ...prevDetails.employee,
                  Marital_Status: !prevDetails.employee.Marital_Status,
                },
              }))}
            />
            Marital Status
          </label>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Personal_Email" placeholder="Personal Email" onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Country" placeholder="Country" required onChange={handleChange} />
          <textarea className="form-input w-full p-2 bg-white rounded text-primaryDark" name="employee.Address" placeholder="Address" required onChange={handleChange} />

          {/* Contact Info */}
          <h3 className="text-lg font-semibold text-accentDark">Contact Information</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="contactInfo.Employee_Mobile_Number" placeholder="Employee Mobile Number" required onChange={handleChange} />

          {/* Available Leaves */}
          <h3 className="text-lg font-semibold text-accentDark">Available Leaves</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="availableLeaves.Annual_Leaves" type="number" placeholder="Annual Leaves" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="availableLeaves.Casual_Leaves" type="number" placeholder="Casual Leaves" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="availableLeaves.Maternity_Leaves" type="number" placeholder="Maternity Leaves" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="availableLeaves.No_Pay_Leaves" type="number" placeholder="No Pay Leaves" required onChange={handleChange} />

          {/* Professional Details */}
          <h3 className="text-lg font-semibold text-accentDark">Professional Details</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Job_Title" placeholder="Job Title" required onChange={handleChange} />
          <select className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Pay_Grade" required onChange={handleChange}>
            <option value="">Select Pay Grade</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="L4">L4</option>
            <option value="L5">L5</option>
          </select>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Employment_Status" placeholder="Employment Status" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Skills" placeholder="Skills" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Basic_Salary" type="number" placeholder="Basic Salary" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Section_Id" placeholder="Section ID" required onChange={handleChange} />
          <label className="availability-status-label flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name="professionalDetails.Availability_Status"
              checked={employeeDetails.professionalDetails.Availability_Status}
              onChange={() => setEmployeeDetails((prevDetails) => ({
                ...prevDetails,
                professionalDetails: {
                  ...prevDetails.professionalDetails,
                  Availability_Status: !prevDetails.professionalDetails.Availability_Status,
                },
              }))}
            />
            Availability Status
          </label>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="professionalDetails.Company_Work_Mail" placeholder="Company Work Email" required onChange={handleChange} />

          {/* Past Job Position */}
          <h3 className="text-lg font-semibold text-accentDark">Past Job Position</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="pastJobPosition.Job_Title" placeholder="Job Title" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="pastJobPosition.Time_Period_Years" type="number" placeholder="Time Period (Years)" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="pastJobPosition.Rating_Performance" type="number" placeholder="Rating Performance" required onChange={handleChange} />

          {/* Emergency Information */}
          <h3 className="text-lg font-semibold text-accentDark">Emergency Information</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="emergencyInfo.Dependant_Mobile_Number" placeholder="Dependant Mobile Number" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="emergencyInfo.Dependant_Name" placeholder="Dependant Name" required onChange={handleChange} />
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="emergencyInfo.Dependant_Address" placeholder="Dependant Address" required onChange={handleChange} />

          {/* Supervisor Details */}
          <h3 className="text-lg font-semibold text-accentDark">Supervisor Details</h3>
          <input className="form-input w-full p-2 bg-white rounded text-primaryDark" name="supervisorDetails.Supervisor_Id" placeholder="Supervisor ID" required onChange={handleChange} />

          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-[#17153B] to-[#2E236C] text-white font-semibold border border-[#433D8B] hover:from-[#2E236C] hover:to-[#17153B] transition-all"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
