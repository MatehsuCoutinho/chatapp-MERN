import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '/src/pages/HomePage.jsx'
import SignUpPage from '/src/pages/SignUpPage.jsx'
import LoginPage from '/src/pages/LoginPage.jsx'
import SettingsPage from '/src/pages/SettingsPage.jsx'
import ProfilePage from '/src/pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'



const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser)

  if (isCheckingAuth && !authUser) return (
    <div className=' flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )


  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to='/login' />}
        />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />

      </Routes>
    </div>
  )
}

export default App