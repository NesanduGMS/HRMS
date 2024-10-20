// import React from 'react';

// function LeaveCard({ title, days }) {
//   return (
//     <div className="bg-gray-300 rounded-lg shadow-md p-4"> {/* Tailwind CSS classes for styling */}
//       <div className="text-center">
//         <h5 className="text-lg font-bold mb-2">{title}</h5>
//         <p className="text-gray-700">{days} days</p>
//       </div>
//     </div>
//   );
// }

// export default LeaveCard;

import React, { useState } from 'react';

function LeaveForm() {
  const [formData, setFormData] = useState({
    name: '',
    leaveType: '',
    department: '',
    startDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center h-screen"> {/* Centers the form vertically and horizontally */}
      <div className="bg-gray-300 p-6 rounded-lg shadow-md max-w-md w-full">
        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">LEAVE FORM</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              required
            />
          </div>

          {/* Leave Type Select Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="vacation">Vacation Leave</option>
            </select>
          </div>

          {/* Department Select Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              required
            >
              <option value="">Select Department</option>
              <option value="hr">Human Resources</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
            </select>
          </div>

          {/* Start Date Input Field */}
          <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Add focus styles for better visibility
              required
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



