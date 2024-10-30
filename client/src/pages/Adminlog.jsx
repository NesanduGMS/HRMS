import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example of making a login request
    try {
      const response = await axios.post('http://localhost:3005/admin/login', {
        email,
        password,
      });
      setMessage('Login successful!');
      navigate('/admin');
      console.log(response.data); // handle response
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#17153B]"> {/* Background color */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center text-[#2E236C]">Admin Login</h1> {/* Header color */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-[#2E236C]" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-[#433D8B] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6] text-white bg-gray-800" // Added text-white and bg-gray-800
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-[#2E236C]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-[#433D8B] focus:outline-none focus:ring-2 focus:ring-[#C8ACD6] text-white bg-gray-800" // Added text-white and bg-gray-800
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#433D8B] hover:bg-[#2E236C] text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-[#C8ACD6]">{message}</p>} {/* Display message */}
      </div>
    </div>
  );
};

export default AdminLog;
