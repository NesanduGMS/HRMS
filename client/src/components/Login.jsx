import React, { useState } from 'react';
import axios from 'axios';
import background from '../assets/background.jpg'; // Import background image

const LoginPage = () => {
  // States for form inputs and messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Send a POST request to the backend login API
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        User_Id: username, // Adjust the field name to match the backend expectation
        User_Password: password,
      });

      // Get the token from the response
      const { token } = response.data;

      // Save the token in localStorage if "Remember Me" is checked, else use sessionStorage
      const rememberMe = document.getElementById('remember').checked;
      if (rememberMe) {
        localStorage.setItem('token', token); // Save token in localStorage for persistence across sessions
      } else {
        sessionStorage.setItem('token', token); // Save token in sessionStorage for the current session only
      }

      // Handle successful login
      setSuccessMessage('Login successful');
      setErrorMessage('');

      // Optionally redirect to another page, e.g., the dashboard
      // window.location.href = '/dashboard';
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      setErrorMessage('Invalid credentials, please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="flex justify-end items-center bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${background})`, 
        minHeight: '100vh', // Set minimum height for the background image
        height: '120vh' // Increase the height of the background image
      }} 
    >
      {/* Left Side Text Section */}
      <div className="absolute left-20 mt-10 text-white ml-40">
        {/* Rectangle with company name and description */}
        <div className="bg-[#001F3F] p-4 rounded flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-1 text-yellow-300">Jupiter (PVT) Limited</h1>
          <p className="text-sm mb-2 text-gray-200">Your trusted partner in excellence and innovation.</p>
        </div>
      </div>

      {/* Login Form Container with right margin */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-40 mr-60">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {/* Display Success or Error Message */}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

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
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Handle input change
              autoComplete="off"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle input change
              autoComplete="off"
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
