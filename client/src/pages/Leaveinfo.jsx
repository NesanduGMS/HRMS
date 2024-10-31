
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import newrr from '../assets/newrr.jpg';

// const Leaveinfo = () => {
//   const userId = localStorage.getItem('ID');
//   const [leaveData, setLeaveData] = useState(null);
//   const [avlleave, setavlleave] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3005/auth/maxleaves/${userId}`)
//       .then((result) => {
//         if (result.data.Status) {
//           setLeaveData(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [userId]);

//   useEffect(() => {
//     axios.get(`http://localhost:3005/auth/avalleaves/${userId}`)
//       .then((result) => {
//         if (result.data.Status) {
//           setavlleave(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [userId]);

//   if (!leaveData || !avlleave) {
//     return <div className="text-white text-2xl flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <div
//       className="flex flex-col items-center min-h-screen p-6"
//       style={{
//         backgroundImage: `linear-gradient(to bottom, rgba(23, 21, 59, 0.85), rgba(67, 61, 139, 0.85)), url(${newrr})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <h1 className="text-4xl font-extrabold text-[#C8ACD6] mb-10">Leave Information</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-5xl">
        
//         {/* Card Component */}
//         {[
//           { title: 'NO PAY LEAVE', entitlement: leaveData.No_Pay_Leave_Count, used: leaveData.No_Pay_Leave_Count - avlleave.No_Pay_Leaves, remaining: avlleave.No_Pay_Leaves },
//           { title: 'CASUAL LEAVE', entitlement: leaveData.Casual_Leave_Count, used: leaveData.Casual_Leave_Count - avlleave.Casual_Leaves, remaining: avlleave.Casual_Leaves },
//           { title: 'ANNUAL LEAVE', entitlement: leaveData.Annual_Leave_Count, used: leaveData.Annual_Leave_Count - avlleave.Annual_Leaves, remaining: avlleave.Annual_Leaves },
//           { title: 'MATERNITY LEAVE', entitlement: leaveData.Maternity_Leave_Count, used: leaveData.Maternity_Leave_Count - avlleave.Maternity_Leaves, remaining: avlleave.Maternity_Leaves, unit: 'weeks' },
//         ].map((leave, index) => (
//           <div key={index} className="bg-[#2E236C] bg-opacity-80 rounded-lg h-72 w-full p-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300">
//             <h2 className="text-xl font-semibold text-[#C8ACD6]">{leave.title}</h2>
//             <div className="space-y-2 text-white text-sm">
//               <p>Entitlement: {leave.entitlement ?? 'N/A'} {leave.unit || 'days'}</p>
//               <p>Used: {leave.used ?? 'N/A'} {leave.unit || 'days'}</p>
//               <p>Remaining: {leave.remaining ?? 'N/A'} {leave.unit || 'days'}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Apply Leave Button */}
//       <Link to="/dashboard/applyleave">
//         <button className="mt-12 bg-[#433D8B] hover:bg-[#2E236C] text-white px-8 py-4 rounded-lg font-bold transition duration-200 shadow-md hover:shadow-lg">
//           APPLY FOR LEAVE
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Leaveinfo;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newrr from '../assets/newrr.jpg';

const Leaveinfo = () => {
  const userId = localStorage.getItem('ID');
  const [leaveData, setLeaveData] = useState(null);
  const [avlleave, setavlleave] = useState(null);

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
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  if (!leaveData || !avlleave) {
    return <div className="text-white text-2xl flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen p-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(23, 21, 59, 0.85), rgba(67, 61, 139, 0.85)), url(${newrr})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-extrabold text-[#C8ACD6] mb-10">Leave Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        
        {/* Card Component */}
        {[
          { title: 'NO PAY LEAVE', entitlement: leaveData.No_Pay_Leave_Count, used: leaveData.No_Pay_Leave_Count - avlleave.No_Pay_Leaves, remaining: avlleave.No_Pay_Leaves },
          { title: 'CASUAL LEAVE', entitlement: leaveData.Casual_Leave_Count, used: leaveData.Casual_Leave_Count - avlleave.Casual_Leaves, remaining: avlleave.Casual_Leaves },
          { title: 'ANNUAL LEAVE', entitlement: leaveData.Annual_Leave_Count, used: leaveData.Annual_Leave_Count - avlleave.Annual_Leaves, remaining: avlleave.Annual_Leaves },
          { title: 'MATERNITY LEAVE', entitlement: leaveData.Maternity_Leave_Count, used: leaveData.Maternity_Leave_Count - avlleave.Maternity_Leaves, remaining: avlleave.Maternity_Leaves, unit: 'weeks' },
        ].map((leave, index) => (
          <div key={index} className="bg-[#2E236C] bg-opacity-80 rounded-lg p-6 shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 flex flex-col justify-between aspect-square">
            <h2 className="text-xl font-semibold text-[#C8ACD6]">{leave.title}</h2>
            <div className="space-y-2 text-white text-sm">
              <p>Entitlement: {leave.entitlement ?? 'N/A'} {leave.unit || 'days'}</p>
              <p>Used: {leave.used ?? 'N/A'} {leave.unit || 'days'}</p>
              <p>Remaining: {leave.remaining ?? 'N/A'} {leave.unit || 'days'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Leave Button */}
      <Link to="/dashboard/applyleave">
        <button className="mt-12 bg-[#433D8B] hover:bg-[#2E236C] text-white px-8 py-4 rounded-lg font-bold transition duration-200 shadow-md hover:shadow-lg">
          APPLY FOR LEAVE
        </button>
      </Link>
    </div>
  );
};

export default Leaveinfo;


