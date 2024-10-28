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
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Profile Picture */}
      <div className="bg-[#2E236C] h-56 flex items-center justify-center"> {/* Background color from the palette */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="h-40 w-40 rounded-full object-cover shadow-lg border-4 border-[#C8ACD6]" // Border color from the palette
        />
      </div>

      {/* Person Information */}
      <div className="p-8 bg-[#C8ACD6]"> {/* Background color from the palette */}
        {/* Name and Personal Details */}
        {viewinfo && (
          <>
            <h2 className="text-3xl font-bold text-[#17153B] mb-4">{viewinfo.Full_Name}</h2> {/* Text color from the palette */}
            <p className="text-lg text-[#433D8B] mb-4">
              <strong>Date of Birth:</strong> {new Date(viewinfo.Date_Of_Birth).toLocaleDateString()}
            </p>
            <p className="text-lg text-[#433D8B] mb-4"><strong>Gender:</strong> {viewinfo.Gender}</p>
            <p className="text-lg text-[#433D8B] mb-6">
              <strong>Recruitment Date:</strong> {new Date(viewinfo.Recruitment_Date).toLocaleDateString()}
            </p>

            {/* Contact Info */}
            <div className="text-[#17153B] mb-6">
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <p className="mb-2"><strong>Personal Email:</strong> {viewinfo.Personal_Email}</p>
              <p className="mb-2"><strong>Country:</strong> {viewinfo.Country}</p>
              <p className="mb-2"><strong>Address:</strong> {viewinfo.Address}</p>

              {/* Dynamically rendering Mobile Numbers */}
              <p className="mb-2"><strong>Mobile Numbers:</strong></p>
              <ul className="list-disc list-inside pl-4">
                {viewicon && viewicon.length > 0 ? (
                  viewicon.map((employee, index) => (
                    <li key={index}>{employee.Employee_Mobile_Number || 'No mobile number available'}</li>
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
          <div className="bg-[#17153B] p-6 rounded-lg shadow-md"> {/* Card background color from the palette */}
            <h3 className="text-xl font-semibold text-[#C8ACD6] mb-4">Emergency Contact Info</h3> {/* Header color from the palette */}
            <p className="text-lg text-[#C8ACD6] mb-4"><strong>Dependant Name:</strong> {viewiem.Dependant_Name}</p>
            <p className="text-lg text-[#C8ACD6] mb-4"><strong>Dependant Mobile Number:</strong> {viewiem.Dependant_Mobile_Number}</p>
            <p className="text-lg text-[#C8ACD6] mb-2"><strong>Dependant Address:</strong> {viewiem.Dependant_Address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewcard;
