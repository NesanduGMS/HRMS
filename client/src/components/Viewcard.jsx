
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import person from '../assets/person.jpg';
import family from '../assets/family.jpg';

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

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Family Background Section with Gradient Overlay */}
      <div
        className="h-64 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(46, 35, 108, 0.7), rgba(46, 35, 108, 0.7)), url(${family})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-white text-4xl font-semibold">Personal Space</h1>
      </div>

      {/* Profile Picture */}
      <div className="bg-[#2E236C] h-56 flex items-center justify-center">
        <img
          src={person}
          alt="Profile"
          className="h-40 w-40 rounded-full object-cover shadow-lg border-4 border-[#C8ACD6]"
        />
      </div>

      {/* Person Information */}
      <div className="p-8 bg-[#C8ACD6]">
        {viewinfo && (
          <>
            <h2 className="text-3xl font-bold text-[#17153B] mb-4">{viewinfo.Full_Name}</h2>
            <p className="text-lg text-[#433D8B] mb-4">
              <strong>Date of Birth:</strong> {new Date(viewinfo.Date_Of_Birth).toLocaleDateString()}
            </p>
            <p className="text-lg text-[#433D8B] mb-4"><strong>Gender:</strong> {viewinfo.Gender}</p>
            <p className="text-lg text-[#433D8B] mb-6">
              <strong>Recruitment Date:</strong> {new Date(viewinfo.Recruitment_Date).toLocaleDateString()}
            </p>

            <div className="text-[#17153B] mb-6">
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <p className="mb-2"><strong>Personal Email:</strong> {viewinfo.Personal_Email}</p>
              <p className="mb-2"><strong>Country:</strong> {viewinfo.Country}</p>
              <p className="mb-2"><strong>Address:</strong> {viewinfo.Address}</p>

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

        {viewiem && (
          <div className="bg-[#17153B] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#C8ACD6] mb-4">Emergency Contact Info</h3>
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
