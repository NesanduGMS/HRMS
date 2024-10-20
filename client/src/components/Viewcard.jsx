

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Viewcard = () => {
//   const ID = localStorage.getItem('ID');
//   const [viewinfo, setViewinfo] = useState(null);
//   const [viewiem, setViewiem] = useState(null);
//   const [viewicon, setViewcon] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3005/auth/viewinfoa/${ID}`)
//       .then((result) => {
//         if (result.data.Status) {
//           setViewinfo(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [ID]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3005/auth/viewinfob/${ID}`)
//       .then((result) => {
//         if (result.data.Status) {
//           setViewiem(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [ID]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3005/auth/viewinfoc/${ID}`)
//       .then((result) => {
//         if (result.data.Status) {
//           setViewcon(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [ID]);

//   console.log(viewinfo);
//   console.log(viewiem);
//   console.log(viewicon);

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"> {/* Increased width to max-w-2xl */}
//       {/* Profile Picture */}
//       <div className="bg-gray-200 h-56 flex items-center justify-center"> {/* Increased height */}
//         <img
//           src="https://via.placeholder.com/150"
//           alt="John Doe"
//           className="h-40 w-40 rounded-full object-cover shadow-lg"
//         /> {/* Increased profile picture size */}
//       </div>

//       {/* Person Information */}
//       <div className="p-8"> {/* Increased padding */}
//         {/* Name and Personal Details */}
//         {viewinfo && (
//           <>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">{viewinfo.Full_Name}</h2> {/* Increased font size */}
//             <p className="text-lg text-gray-600 mb-4"><strong>Date of Birth:</strong> {viewinfo.Date_Of_Birth}</p> {/* Added more margin */}
//             <p className="text-lg text-gray-600 mb-4"><strong>Gender:</strong> {viewinfo.Gender}</p>
//             <p className="text-lg text-gray-600 mb-6"><strong>Recruitment Date:</strong> {viewinfo.Recruitment_Date}</p> {/* Increased bottom margin */}

//             {/* Contact Info */}
//             <div className="text-gray-700 mb-6"> {/* Increased bottom margin */}
//               <h3 className="text-xl font-semibold mb-4">Contact Info</h3> {/* Increased font size and margin */}
//               <p className="mb-2"><strong>Personal Email:</strong> {viewinfo.Personal_Email}</p> {/* Added margin */}
//               <p className="mb-2"><strong>Country:</strong> {viewinfo.Country}</p>
//               <p className="mb-2"><strong>Address:</strong> {viewinfo.Address}</p>

//               {/* Dynamically rendering Mobile Numbers */}
//                 <p className="mb-2"><strong>Mobile Numbers:</strong></p>
//                 <ul className="list-disc list-inside pl-4">
//                 {viewicon && viewicon.Employee_Mobile_Number && viewicon.Employee_Mobile_Number.length > 0 ? (
//                     viewicon.Employee_Mobile_Number.map((number, index) => (
//                     <li key={index}>{number}</li>
//                     ))
//                 ) : (
//                     <li>No mobile numbers available</li>
//                 )}
//                 </ul>
//             </div>
//           </>
//         )}

//         {/* Emergency Contact Info Card */}
//         {viewiem && (
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md"> {/* Card for emergency details */}
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact Info</h3> {/* Increased font size and margin */}
//             <p className="text-lg text-gray-600 mb-4"><strong>Dependant Name:</strong> {viewiem.Dependant_Name}</p>
//             <p className="text-lg text-gray-600 mb-4"><strong>Dependant Mobile Number:</strong> {viewiem.Dependant_Mobile_Number}</p>
//             <p className="text-lg text-gray-600 mb-2"><strong>Dependant Address:</strong> {viewiem.Dependant_Address}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Viewcard;



import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Viewcard = () => {
  const ID = localStorage.getItem('ID');
  const [viewinfo, setViewinfo] = useState(null);
  const [viewiem, setViewiem] = useState(null);
  const [viewicon, setViewcon] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/auth/viewinfoa/${ID}`)
      .then((result) => {
        if (result.data.Status) {
          setViewinfo(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ID]);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/auth/viewinfob/${ID}`)
      .then((result) => {
        if (result.data.Status) {
          setViewiem(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ID]);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/auth/viewinfoc/${ID}`)
      .then((result) => {
        if (result.data.Status) {
          setViewcon(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ID]);

  console.log(viewinfo);
  console.log(viewiem);
  console.log(viewicon);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"> {/* Increased width to max-w-2xl */}
      {/* Profile Picture */}
      <div className="bg-gray-200 h-56 flex items-center justify-center"> {/* Increased height */}
        <img
          src="https://via.placeholder.com/150"
          alt="John Doe"
          className="h-40 w-40 rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Person Information */}
      <div className="p-8"> {/* Increased padding */}
        {/* Name and Personal Details */}
        {viewinfo && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{viewinfo.Full_Name}</h2> {/* Increased font size */}
            <p className="text-lg text-gray-600 mb-4">
              <strong>Date of Birth:</strong> {new Date(viewinfo.Date_Of_Birth).toLocaleDateString()}
            </p> {/* Formatted Date of Birth */}
            <p className="text-lg text-gray-600 mb-4"><strong>Gender:</strong> {viewinfo.Gender}</p>
            <p className="text-lg text-gray-600 mb-6">
              <strong>Recruitment Date:</strong> {new Date(viewinfo.Recruitment_Date).toLocaleDateString()}
            </p> {/* Formatted Recruitment Date */}

            {/* Contact Info */}
            <div className="text-gray-700 mb-6"> {/* Increased bottom margin */}
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3> {/* Increased font size and margin */}
              <p className="mb-2"><strong>Personal Email:</strong> {viewinfo.Personal_Email}</p> {/* Added margin */}
              <p className="mb-2"><strong>Country:</strong> {viewinfo.Country}</p>
              <p className="mb-2"><strong>Address:</strong> {viewinfo.Address}</p>

              {/* Dynamically rendering Mobile Numbers */}
              <p className="mb-2"><strong>Mobile Numbers:</strong></p>
              <ul className="list-disc list-inside pl-4">
                {viewicon && viewicon.Employee_Mobile_Number && viewicon.Employee_Mobile_Number.length > 0 ? (
                  viewicon.Employee_Mobile_Number.map((number, index) => (
                    <li key={index}>{number}</li>
                  ))
                ) : (
                  <li>No mobile numbers available</li>
                )}
              </ul>
            </div>
          </>
        )}

        {/* Emergency Contact Info Card */}
        {viewiem && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md"> {/* Card for emergency details */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact Info</h3> {/* Increased font size and margin */}
            <p className="text-lg text-gray-600 mb-4"><strong>Dependant Name:</strong> {viewiem.Dependant_Name}</p>
            <p className="text-lg text-gray-600 mb-4"><strong>Dependant Mobile Number:</strong> {viewiem.Dependant_Mobile_Number}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Dependant Address:</strong> {viewiem.Dependant_Address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewcard;






