import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext' 
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



const CaptainSignup = () => {
  const navigate = useNavigate()


  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    const {captain, setCaptain} = React.useContext(CaptainDataContext)
    
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');


    const submitHandler = async (e) => {
      e.preventDefault()
      const captainData   = {
        fullname:{
          firstname: firstName,
          lastname: lastName
        },
        password: password,
        email: email,
        vehicle: {
          vehicleType: vehicleType,
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: Number(vehicleCapacity)
        }
      }


      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if(response.status === 201){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
      else{
        console.error('Error creating captain account:', response.data);
      }


      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('') 
      setVehicleCapacity('')
      setVehicleType('')
    }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img
        className="w-24 h-24 mx-auto mb-10 object-contain rounded-full shadow-lg bg-white"
        src="https://www.pngmart.com/files/4/Taxi-Driver-Transparent-Background.png"
        alt="Captain Logo"
      />

          <form onSubmit={submitHandler}>
            <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder='password'
            />


            <h3 className='text-lg font-medium mb-2 mt-6'>Vehicle Information</h3>
            <div className='flex flex-col gap-5 mb-7 bg-[#f6f6f6] p-5 rounded-xl shadow'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1 text-gray-700'>Vehicle Type</label>
                  <select
                    required
                    className='bg-white rounded-lg px-4 py-2 border w-full text-lg focus:ring-2 focus:ring-blue-400 transition'
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="" disabled>Select type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Moto</option>
                  </select>
                </div>
                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1 text-gray-700'>Vehicle Color</label>
                  <input
                    required
                    className='bg-white rounded-lg px-4 py-2 border w-full text-lg focus:ring-2 focus:ring-blue-400 transition'
                    type="text"
                    placeholder='e.g. Red'
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1 text-gray-700'>Vehicle Plate</label>
                  <input
                    required
                    className='bg-white rounded-lg px-4 py-2 border w-full text-lg focus:ring-2 focus:ring-blue-400 transition'
                    type="text"
                    placeholder='e.g. MH12AB1234'
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-sm font-medium mb-1 text-gray-700'>Seating Capacity</label>
                  <input
                    required
                    className='bg-white rounded-lg px-4 py-2 border w-full text-lg focus:ring-2 focus:ring-blue-400 transition'
                    type="number"
                    min="1"
                    max="10"
                    placeholder='e.g. 4'
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create Captain account</button>
          </form>
          <p className='text-center'>
            Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
          </p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup