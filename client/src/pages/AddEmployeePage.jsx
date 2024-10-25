import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployeePage.css';

const AddEmployeePage = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    employee: {
      //Employee_Id: '',
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
      Pay_Grade: '', // ENUM options will be shown in the select input
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
      const response = await axios.post('http://localhost:3005/api/employees/addEmployeeDetails', employeeDetails);
      alert('Employee details added successfully!');
    } catch (error) {
      console.error('Error adding employee details:', error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2 className="form-title">Add New Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        {/* Employee Personal Details */}
        <h3 className="section-title">Employee Personal Details</h3>
        {/* <input className="form-input" name="Employee_Id" value={employeeDetails.employee.Employee_Id} onChange={handleChange} placeholder="Employee ID" required /> */}
        <input className="form-input" name="First_Name" value={employeeDetails.employee.First_Name} onChange={handleChange} placeholder="First Name" required />
        <input className="form-input" name="Last_Name" value={employeeDetails.employee.Last_Name} onChange={handleChange} placeholder="Last Name" required />
        <input className="form-input" name="Full_Name" value={employeeDetails.employee.Full_Name} onChange={handleChange} placeholder="Full Name" required />
        <input className="form-input" name="Recruitment_Date" type="date" value={employeeDetails.employee.Recruitment_Date} onChange={handleChange} />
        <input className="form-input" name="Date_Of_Birth" type="date" value={employeeDetails.employee.Date_Of_Birth} onChange={handleChange} required />
        <select className="form-input" name="Gender" value={employeeDetails.employee.Gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label className="marital-status-label">
          Marital Status:
          <input
            type="checkbox"
            name="Marital_Status"
            checked={employeeDetails.employee.Marital_Status}
            onChange={() => setEmployeeDetails((prevDetails) => ({
              ...prevDetails,
              employee: {
                ...prevDetails.employee,
                Marital_Status: !prevDetails.employee.Marital_Status,
              },
            }))}
          />
        </label>
        <input className="form-input" name="Personal_Email" value={employeeDetails.employee.Personal_Email} onChange={handleChange} placeholder="Personal Email" />
        <input className="form-input" name="Country" value={employeeDetails.employee.Country} onChange={handleChange} placeholder="Country" required />
        <textarea className="form-input" name="Address" value={employeeDetails.employee.Address} onChange={handleChange} placeholder="Address" required />

        {/* Contact Info */}
        <h3 className="section-title">Contact Information</h3>
        <input className="form-input" name="contactInfo.Employee_Mobile_Number" value={employeeDetails.contactInfo.Employee_Mobile_Number} onChange={handleChange} placeholder="Employee Mobile Number" required />

        {/* Available Leaves */}
        <h3 className="section-title">Available Leaves</h3>
        <input className="form-input" name="availableLeaves.Annual_Leaves" type="number" value={employeeDetails.availableLeaves.Annual_Leaves} onChange={handleChange} placeholder="Annual Leaves" required />
        <input className="form-input" name="availableLeaves.Casual_Leaves" type="number" value={employeeDetails.availableLeaves.Casual_Leaves} onChange={handleChange} placeholder="Casual Leaves" required />
        <input className="form-input" name="availableLeaves.Maternity_Leaves" type="number" value={employeeDetails.availableLeaves.Maternity_Leaves} onChange={handleChange} placeholder="Maternity Leaves" required />
        <input className="form-input" name="availableLeaves.No_Pay_Leaves" type="number" value={employeeDetails.availableLeaves.No_Pay_Leaves} onChange={handleChange} placeholder="No Pay Leaves" required />

        {/* Professional Details */}
        <h3 className="section-title">Professional Details</h3>
        <input className="form-input" name="professionalDetails.Job_Title" value={employeeDetails.professionalDetails.Job_Title} onChange={handleChange} placeholder="Job Title" required />
        
        {/* Pay Grade selection with ENUM values */}
        <select className="form-input" name="professionalDetails.Pay_Grade" value={employeeDetails.professionalDetails.Pay_Grade} onChange={handleChange} required>
          <option value="">Select Pay Grade</option>
          <option value="L1">L1</option>
          <option value="L2">L2</option>
          <option value="L3">L3</option>
          <option value="L4">L4</option>
          <option value="L5">L5</option>
          <option value="L6">L6</option>
          <option value="L7">L7</option>
          <option value="L8">L8</option>
          <option value="L9">L9</option>
          <option value="L10">L10</option>
          <option value="L11">L11</option>
          <option value="L12">L12</option>
        </select>
        
        <input className="form-input" name="professionalDetails.Employment_Status" value={employeeDetails.professionalDetails.Employment_Status} onChange={handleChange} placeholder="Employment Status" required />
        <input className="form-input" name="professionalDetails.Skills" value={employeeDetails.professionalDetails.Skills} onChange={handleChange} placeholder="Skills" required />
        <input className="form-input" name="professionalDetails.Basic_Salary" type="number" value={employeeDetails.professionalDetails.Basic_Salary} onChange={handleChange} placeholder="Basic Salary" required />
        <input className="form-input" name="professionalDetails.Section_Id" value={employeeDetails.professionalDetails.Section_Id} onChange={handleChange} placeholder="Section ID" required />
        <label className="availability-status-label">
          Availability Status:
          <input
            type="checkbox"
            name="Availability_Status"
            checked={employeeDetails.professionalDetails.Availability_Status}
            onChange={() => setEmployeeDetails((prevDetails) => ({
              ...prevDetails,
              professionalDetails: {
                ...prevDetails.professionalDetails,
                Availability_Status: !prevDetails.professionalDetails.Availability_Status,
              },
            }))}
          />
        </label>
        <input className="form-input" name="professionalDetails.Company_Work_Mail" value={employeeDetails.professionalDetails.Company_Work_Mail} onChange={handleChange} placeholder="Company Work Email" required />

        {/* Past Job Position */}
        <h3 className="section-title">Past Job Position</h3>
        <input className="form-input" name="pastJobPosition.Job_Title" value={employeeDetails.pastJobPosition.Job_Title} onChange={handleChange} placeholder="Job Title" required />
        <input className="form-input" name="pastJobPosition.Time_Period_Years" type="number" value={employeeDetails.pastJobPosition.Time_Period_Years} onChange={handleChange} placeholder="Time Period (Years)" required />
        <input className="form-input" name="pastJobPosition.Rating_Performance" type="number" value={employeeDetails.pastJobPosition.Rating_Performance} onChange={handleChange} placeholder="Rating Performance" required />

        {/* Emergency Info */}
        <h3 className="section-title">Emergency Information</h3>
        <input className="form-input" name="emergencyInfo.Dependant_Mobile_Number" value={employeeDetails.emergencyInfo.Dependant_Mobile_Number} onChange={handleChange} placeholder="Dependent Mobile Number" />
        <input className="form-input" name="emergencyInfo.Dependant_Name" value={employeeDetails.emergencyInfo.Dependant_Name} onChange={handleChange} placeholder="Dependent Name" />
        <input className="form-input" name="emergencyInfo.Dependant_Address" value={employeeDetails.emergencyInfo.Dependant_Address} onChange={handleChange} placeholder="Dependent Address" />

        {/* Supervisor Details */}
        <h3 className="section-title">Supervisor Details</h3>
        <input className="form-input" name="supervisorDetails.Supervisor_Id" value={employeeDetails.supervisorDetails.Supervisor_Id} onChange={handleChange} placeholder="Supervisor ID" required />

        <button type="submit" className="submit-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;