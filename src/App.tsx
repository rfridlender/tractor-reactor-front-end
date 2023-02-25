import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewPost from './pages/NewPost/NewPost'

import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import * as authService from './services/authService'

import { User } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(authService.getUser())

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/signup" element={<Signup handleAuthEvt={handleAuthEvt} />} />
        <Route path="/login" element={<Login handleAuthEvt={handleAuthEvt} />} />
        <Route path="/posts/new" element={
          <ProtectedRoute user={user}>
            {user && <NewPost user={user} />}
          </ProtectedRoute>
        } />
        <Route path="/change-password" element={
          <ProtectedRoute user={user}>
            <ChangePassword handleAuthEvt={handleAuthEvt} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
