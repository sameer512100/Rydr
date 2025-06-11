import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    // Handle login logic here
    setUserData({
      email: email,
      password: password
    })
    // Reset form fields
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16  mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt="" />
      <form onSubmit={(e)=>{
        e.preventDefault();
        submitHandler(e);
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>

        <input 
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email" 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'type="password" placeholder='Enter Password'/>
        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>

        <p className='text-center'>New here?<Link to={'/signup'} className='text-blue-700'>Create new Account</Link></p>


      </form>
        </div>
        <div>
          <Link to={'/captain-login'} className='bg-[#e4e47a] flex items-center justify-center text-black font-semibold mb-7 rounded px-4 py-2 border-black w-full text-lg placeholder:text-base'>
          Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin