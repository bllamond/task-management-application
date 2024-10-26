import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      
      console.log(email , password);
      const token = response.data.token;

      console.log(response.data);
      localStorage.setItem('token', token);

      alert('Login Successful');
      navigate('/tasks');

    } catch (error) {
      console.log('Unable to login user:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='w-full h-screen flex'>
    
      <div className='w-[50%] h-[100%] bg-white-950 flex justify-center items-center'>
        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9 bg-gray-200' onSubmit={handleLogin}>
          <p>Demo email - test@gmail.com</p>
          <p>Demo password - test@password</p>

          <label>email</label>
          <br />
          <input
            className='w-[400px] h-[40px] rounded-xl bg-white-500 p-2'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          {/* Password input */}
          <label>Password</label>
          <br />
          <input
            className='w-[400px] h-[40px] rounded-xl bg-white-100 p-4'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          {/* Login button */}
          <button className='w-[200px] h-[50px] border hover:bg-blue-400' type='submit'>
            Log In
          </button>
        </form>
      </div>

      
      <div className='w-[50%] h-[100%] flex justify-center items-center bg-blue-400'>
        <h2 className='text-3xl text-white'>LOGIN</h2>
      </div>

    </div>
  );
};

export default Login;