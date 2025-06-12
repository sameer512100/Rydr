import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import UserProtect from './pages/UserProtect'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/home' element={
          <UserProtect>
            <Home />
          </UserProtect>
        } />

        <Route path='/user/logout' element={
          <UserProtect>
            <UserLogout />
          </UserProtect>
        }></Route>
      </Routes>
    </div>
  )
}

export default App