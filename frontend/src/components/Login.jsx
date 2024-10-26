import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);

      setIsLoading(false);
      navigate('/tasks');
    } catch (error) {
      console.log('Unable to login user:', error);
      alert('Login failed. Please try again.');
      setIsLoading(false); // Ensure loading state is reset on error
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <span className="text-gray-800 font-semibold text-lg">
          Loading
          <span className="animate-[bounce_1s_infinite]">.</span>
          <span className="animate-[bounce_1s_infinite_0.2s]">.</span>
          <span className="animate-[bounce_1s_infinite_0.4s]">.</span>
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back</h2>
        <div>
          <p className="text-gray-500 text-center">
            Demo email 1: <strong className="text-gray-800">vinay@gmail.com</strong>
          </p>
          <p className="text-gray-500 text-center">
            Demo password 1: <strong className="text-gray-800">test</strong>
          </p>
          <p className="text-gray-500 text-center">
            Demo email 2: <strong className="text-gray-800">vinay123@gmail.com</strong>
          </p>
          <p className="text-gray-500 text-center">
            Demo password 2: <strong className="text-gray-800">test</strong>
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            Log In
          </button>
        </form>
        <div className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
