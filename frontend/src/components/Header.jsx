import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <nav className='flex h-20 justify-around p-3 border-b border-zinc-800 items-center bg-gray-800 text-zinc-100'>
        <Link to= '/' ><h1 className='text-3xl'>Authorization with MongoDb</h1></Link>
        <ul className='flex gap-8'>
          {isUserSignedIn ? (
            <>
            <li><button onClick={handleSignOut} className='hover:text-blue-600 text-2xl'>Sign Out</button></li>
            </>
          ): (

              <>
              <Link to="/login"><li className='hover:text-blue-600 text-2xl'>Login</li></Link>
              <Link to="/register"><li className='hover:text-blue-600 text-2xl'>SignUp</li></Link>
              </>

            ) }
            
        </ul>
        
    </nav>

    

  )
}

export default Header