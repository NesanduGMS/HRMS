// LeaveReportPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LeaveReportPage = () => {
  const { id_to_transfer } = useParams();  // You can use this if you want to use the `id_to_transfer`
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the leave report data when the component loads
    axios.get('http://localhost:3001/api/reports/leave-report')
      .then(response => {
        setLeaves(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Leave Reports</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {leaves.length > 0 ? (
            leaves.map(leave => (
              <div key={leave.Request_Id}>
                <p>Employee ID: {leave.Employee_Id}</p>
                <p>Leave Type: {leave.Leave_Type}</p>
                <p>Start Date: {new Date(leave.Start_Date).toDateString()}</p>
                <p>Time Period: {leave.Time_Period_Days} days</p>
                <p>Approval Status: {leave.Approval_Status ? 'Approved' : 'Pending'}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaveReportPage;
