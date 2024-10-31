
import React, { useState } from 'react';
import background from '../assets/background.jpg'; // Import background image
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios

const LoginPage = () => {
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    userid: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(''); // State for error message

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3005/auth/login', values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem('ID', result.data.Employeeid);
          localStorage.setItem('ROLE', result.data.ROLE);
          navigate('/dashboard');
        } else {
          setLoginError('Wrong username or password'); // Set error message
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError('An error occurred. Please try again.');
      });
  };

  return (
    <div
      className="flex justify-end items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        minHeight: '100vh', // Set minimum height for the background image
        height: '120vh', // Increase the height of the background image
      }}
    >
      {/* Left Side Text Section */}
      <div className="absolute left-20 mt-10 text-white ml-40"> {/* Added mt-10 for top margin */}
        <div className="bg-[#001F3F] p-4 rounded flex flex-col items-center"> {/* Dark navy blue color */}
          <h1 className="text-4xl font-bold mb-1 text-yellow-300">Jupiter (PVT) Limited</h1>
          <p className="text-sm mb-2 text-gray-200">Your trusted partner in excellence and innovation.</p>
        </div>
      </div>

      {/* Login Form Container with right margin */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-40 mr-60"> {/* Adjusted mt-40 for more vertical spacing */}
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {/* Login Error Message */}
        {loginError && <p className="text-red-500 text-center mb-4">{loginError}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-white bg-gray-800"
              placeholder="Enter your username"
              autoComplete="off"
              onChange={(e) => setValues({ ...values, userid: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-white bg-gray-800"
              placeholder="Enter your password"
              autoComplete="off"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>

          {/* Remember Me */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700">Remember Me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>

          {/* Log as Admin Button */}
          <button
            type="button" // This should not submit the form
            onClick={() => navigate('/adminlog')} // Navigate to /adminlog
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 mt-4"
          >
            Log as Admin
          </button>
        </form>

        {/* Additional Info Text */}
        <div className="mt-4 text-center text-gray-700">
          <p>Login here as an Employee or Supervisor.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

