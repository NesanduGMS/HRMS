import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Leaveinfo = () => {
  const userId = localStorage.getItem('ID');

  const [leaveData, setLeaveData] = useState(null); // Initialize as null
  const [avlleave, setavlleave] = useState(null);   // Initialize as null

  useEffect(() => {
    axios.get(`http://localhost:3005/auth/maxleaves/${userId}`)
      .then((result) => {
        if (result.data.Status) {
          setLeaveData(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    axios.get(`http://localhost:3005/auth/avalleaves/${userId}`)
      .then((result) => {
        if (result.data.Status) {
          setavlleave(result.data.Result);
          console.log(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  // Check if leaveData or avlleave is not yet loaded
  if (!leaveData || !avlleave) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 relative">
      <h1 className="text-2xl font-bold mb-6 text-center">Leave Information</h1>
      <div className="grid grid-cols-2 gap-4 mb-16">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between items-center p-6 h-64 w-64 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold">NO PAY LEAVE</h2>
          <div>
            <p className="text-gray-600">Entitlement: {leaveData.No_Pay_Leave_Count ?? 'N/A'} days</p>
            <p className="text-gray-600">Used: {leaveData.No_Pay_Leave_Count - avlleave.No_Pay_Leaves ?? 'N/A'}  days</p>
            <p className="text-gray-600">Remaining:{avlleave.No_Pay_Leaves ?? 'N/A'} days</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between items-center p-6 h-64 w-64 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold">CASUAL LEAVE</h2>
          <div>
            <p className="text-gray-600">Entitlement: {leaveData.Casual_Leave_Count ?? 'N/A'} days</p>
            <p className="text-gray-600">Used: {leaveData.Casual_Leave_Count - avlleave.Casual_Leaves ?? 'N/A'} days</p>
            <p className="text-gray-600">Remaining: {avlleave.Casual_Leaves ?? 'N/A'} days</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between items-center p-6 h-64 w-64 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold">ANNUAL LEAVE</h2>
          <div>
            <p className="text-gray-600">Entitlement: {leaveData.Annual_Leave_Count ?? 'N/A'} days</p>
            <p className="text-gray-600">Used: {leaveData.Annual_Leave_Count - avlleave.Annual_Leaves ?? 'N/A'} days</p>
            <p className="text-gray-600">Remaining: {avlleave.Annual_Leaves ?? 'N/A'} days</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between items-center p-6 h-64 w-64 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold">MATERNITY LEAVE</h2>
          <div>
            <p className="text-gray-600">Entitlement: {leaveData.Maternity_Leave_Count ?? 'N/A'} weeks</p>
            <p className="text-gray-600">Used: {leaveData.Maternity_Leave_Count - avlleave.Maternity_Leaves ?? 'N/A'} weeks</p>
            <p className="text-gray-600">Remaining: {avlleave.Maternity_Leaves ?? 'N/A'} weeks</p>
          </div>
        </div>
      </div>

      {/* Apply Leave Button */}
      <Link to={'/dashboard/applyleave'}>
      <button className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        APPLY A LEAVE
      </button>
      </Link>

    </div>
  );
};

export default Leaveinfo;

