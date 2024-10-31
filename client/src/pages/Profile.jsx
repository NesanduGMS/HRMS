
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import person from '../assets/person.jpg';
import office from '../assets/office.jpg';

const Profile = () => {
  const userId = localStorage.getItem('ID');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/auth/userprofile/${userId}`)
      .then((result) => {
        if (result.data.Status) {
          setProfileData(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div
      className="min-h-screen flex flex-col items-center py-12"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(23, 21, 59, 0.85), rgba(46, 35, 108, 0.85)), url(${office})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-11/12 md:w-1/2 lg:w-1/3">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full overflow-hidden mx-auto shadow-lg mb-6 border-4 border-[#C8ACD6]">
          <img
            src={person}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Name & Job Title */}
        <h2 className="text-3xl font-extrabold text-center text-[#2E236C] mb-2">
          {profileData ? profileData.Full_Name : 'Loading...'}
        </h2>
        <p className="text-lg text-center text-[#433D8B] opacity-80 mb-6">
          {profileData ? profileData.Job_Title : 'Loading...'}
        </p>

        {/* Profile Information */}
        <div className="bg-[#C8ACD6] rounded-lg p-6 mb-4 shadow-md text-[#17153B]">
          <p className="text-md font-medium mb-2">
            <strong>Employment ID:</strong> {profileData ? profileData.Employee_Id : 'Loading...'}
          </p>
          <p className="text-md font-medium mb-2">
            <strong>Employment Status:</strong> {profileData ? profileData.Employment_Status : 'Loading...'}
          </p>
          <p className="text-md font-medium">
            <strong>Email:</strong> {profileData ? profileData.Company_Work_Mail : 'Loading...'}
          </p>
        </div>
      </div>

      {/* "View Personal Information" Button */}
      <Link to="/dashboard/personalinfo">
        <button
          className="mt-8 bg-gradient-to-r from-[#433D8B] to-[#2E236C] text-white px-8 py-4 rounded-full shadow-md hover:from-[#2E236C] hover:to-[#17153B] hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          VIEW PERSONAL INFORMATION
        </button>
      </Link>
    </div>
  );
};

export default Profile;
