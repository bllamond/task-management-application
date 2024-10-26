import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post('https://task-management-application-xgnp.onrender.com/auth/register', { email, password })
      .then(() => {
        alert('Registration Successful');
        setEmail('');
        setPassword('');
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert('Email already registered. Please use a different email or log in.');
        } else {
          alert('Error creating user. Please try again later.');
        }
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
