import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaveappeal = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const supID = localStorage.getItem('ID');

  useEffect(() => {
    axios.get(`http://localhost:3005/auth/leaves/${supID}`)
      .then((result) => {
        if (result.data.Status) {
          setLeaveRequests(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleApprove = (id) => {
    axios.put(`http://localhost:3005/auth/approveleave/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.Request_Id === id ? { ...request, Approval_Status: 1 } : request
            )
          );
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-6 min-h-screen bg-[#17153B] text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#C8ACD6]">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#2E236C] border border-[#433D8B] rounded-lg shadow-md">
          <thead>
            <tr className="text-[#C8ACD6]">
              <th className="px-4 py-3 border-b border-[#433D8B]">Request ID</th>
              <th className="px-4 py-3 border-b border-[#433D8B]">Employee ID</th>
              <th className="px-4 py-3 border-b border-[#433D8B]">Leave Type</th>
              <th className="px-4 py-3 border-b border-[#433D8B]">Start Date</th>
              <th className="px-4 py-3 border-b border-[#433D8B]">Time Period</th>
              <th className="px-4 py-3 border-b border-[#433D8B]">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(request => (
              <tr key={request.Request_Id} className="hover:bg-[#433D8B] transition-colors duration-200">
                <td className="px-4 py-2 border-b border-[#433D8B] text-center">{request.Request_Id}</td>
                <td className="px-4 py-2 border-b border-[#433D8B] text-center">{request.Employee_Id}</td>
                <td className="px-4 py-2 border-b border-[#433D8B] text-center">{request.Leave_Type}</td>
                <td className="px-4 py-2 border-b border-[#433D8B] text-center">{formatDate(request.Start_Date)}</td>
                <td className="px-4 py-2 border-b border-[#433D8B] text-center">{request.Time_Period_Days}</td>
                <td className="px-4 py-2 border-b border-[#433D8B] text-center">
                  <button
                    onClick={() => handleApprove(request.Request_Id)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      request.Approval_Status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                    disabled={request.Approval_Status === 1}
                  >
                    {request.Approval_Status === 1 ? 'Approved' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaveappeal;
