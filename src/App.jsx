import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from './contexts/ThemeContext'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
`

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('gymbuddy_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('gymbuddy_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('gymbuddy_user')
    localStorage.removeItem('gymbuddy_activities')
    localStorage.removeItem('gymbuddy_goals')
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <GlobalStyles />
          <AppContainer>
            {user && <Navbar user={user} onLogout={handleLogout} />}
            <MainContent>
              <Routes>
                <Route 
                  path="/" 
                  element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
                />
                <Route 
                  path="/login" 
                  element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
                />
                <Route 
                  path="/register" 
                  element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} 
                />
                <Route 
                  path="/dashboard" 
                  element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
                />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
