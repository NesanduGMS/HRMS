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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Request ID</th>
              <th className="px-4 py-2 border-b">Employee ID</th>
              <th className="px-4 py-2 border-b">Leave Type</th>
              <th className="px-4 py-2 border-b">Start Date</th>
              <th className="px-4 py-2 border-b">Time Period</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(request => (
              <tr key={request.Request_Id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">{request.Request_Id}</td>
                <td className="px-4 py-2 border-b text-center">{request.Employee_Id}</td>
                <td className="px-4 py-2 border-b text-center">{request.Leave_Type}</td>
                <td className="px-4 py-2 border-b text-center">{formatDate(request.Start_Date)}</td>
                <td className="px-4 py-2 border-b text-center">{request.Time_Period_Days}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleApprove(request.Request_Id)}
                    className={`px-4 py-2 rounded ${
                      request.Approval_Status === 1 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
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


