import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [user, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    fetchUsers();
  }, [])

  const fetchUsers = () =>{
    axios
    .get('http://localhost:5000/auth/register')
    .then((res) => {
      console.log(res.data);
      
    })
  }

  const handleRegister = (event) => {
    event.preventDefault();
    axios
        .post('http://localhost:5000/auth/register', { email, password })
        .then(() => {
            alert('Registration Successful');
            setEmail('');
            setPassword('');
            fetchUsers();
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
    <div className='w-full h-screen flex'>
        <div className='w-[50%] h-[100%] flex justify-center items-center'>
          <form className='text-center border rounded-lg bg-gray-200 w-[600px] h-[400px] p-9'>
          {/* Email Input */}
          <label>Email</label>
          <br />
          <input className=' w-[400px] h-[40px] rounded-xl p-2 ' type='text' placeholder='Enter your email '
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          {/* Password */}
          <label>Password</label>
          <br />
          <input className=' w-[400px] h-[40px] rounded-xl p-2 ' type='password' placeholder='Enter your password ' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <br />
          <br />
          {/* Btn */}
          <button className=' w-[200px] h-[50px] border hover:bg-blue-400 ' type='submit' onClick={handleRegister} >Sign Up</button>
          </form>
        </div>
        <div className=' w-[50%] h-[100%] flex justify-center items-center bg-blue-400 ' >
          <h2 className=' text-3xl text-white ' >SIGNUP</h2>
        </div>
    </div>
  )
}

export default SignUp