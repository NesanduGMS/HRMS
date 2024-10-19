
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const userId=localStorage.getItem('ID');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
       axios.get(`http://localhost:3005/auth/userprofile/${userId}`)
      .then((result) => {
        if (result.data.Status) {
          setProfileData(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-16">
      {/* Profile Picture */}
      <div className="w-40 h-40 rounded-full overflow-hidden mb-6 shadow-lg"> {/* Increased size */}
        <img
          src='https://via.placeholder.com/150'
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Name */}
      <h2 className="text-4xl font-bold mb-2">{profileData ? profileData.Full_Name : 'Loading...'}</h2> {/* Increased font size */}

      {/* Job Title */}
      <p className="text-lg text-gray-600 mb-4">{profileData ? profileData.Job_Title : 'Loading...'}</p>

      {/* Profile Info */}
      <div className="bg-white shadow-md rounded-lg p-8 w-3/4 md:w-1/2"> {/* Increased padding and width */}
        <p className="text-lg"><strong>Employment ID:</strong> {profileData ? profileData.Employee_Id : 'Loading...'}</p>
        <p className="text-lg"><strong>Employment Status:</strong> {profileData ? profileData.Employment_Status : 'Loading...'}</p>
        <p className="text-lg"><strong>Email:</strong> {profileData ? profileData.Company_Work_Mail : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default Profile;
