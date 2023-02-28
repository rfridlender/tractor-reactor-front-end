import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewPost from './pages/NewPost/NewPost'
import EditPost from './pages/EditPost/EditPost'

import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import * as authService from './services/authService'
import * as profileService from './services/profileService'


import { Profile, User } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(authService.getUser())
  const [profile, setProfile] = useState<Profile | null>(null)
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const data = await profileService.getProfile(user.profile.id)
        setProfile(data)
      }
    }
    fetchProfile()
  }, [user])

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
      <NavBar user={user} profile={profile} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} profile={profile} />} />
        <Route path="/signup" element={<Signup handleAuthEvt={handleAuthEvt} />} />
        <Route path="/login" element={<Login handleAuthEvt={handleAuthEvt} />} />
        <Route path="/posts/new" element={
          <ProtectedRoute user={user}>
            {user && profile && <NewPost user={user} profile={profile} />}
          </ProtectedRoute>
        } />
        <Route path="/posts/:postId/edit" element={
          <ProtectedRoute user={user}>
            {user && profile && <EditPost user={user} profile={profile} />}
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
