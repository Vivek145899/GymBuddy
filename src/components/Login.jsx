import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const AuthContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const AuthCard = styled.div`
  background: var(--surface);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
`

const Logo = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 10px;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Title = styled.h2`
  text-align: center;
  color: var(--text);
  margin-bottom: 30px;
  font-weight: 600;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Input = styled.input`
  padding: 15px 20px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-size: 16px;
  background: var(--surface);
  color: var(--text);
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.1);
  }
  
  &:invalid {
    border-color: var(--error);
  }
`

const Button = styled.button`
  padding: 15px;
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  
  a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled.div`
  background: var(--error);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0.9;
`

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const navigate = useNavigate()

  // Simple hash function for password (in production, use proper hashing)
  const simpleHash = useCallback((str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString()
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    // Basic input sanitization
    const sanitizedValue = value.trim()
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Rate limiting
    if (loginAttempts >= 5) {
      setError('Too many login attempts. Please try again later.')
      setLoading(false)
      return
    }

    // Input validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      try {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('gymbuddy_users') || '[]')
        const hashedPassword = simpleHash(formData.password)
        const user = users.find(u => 
          u.email === formData.email && 
          u.passwordHash === hashedPassword
        )
        
        if (user) {
          onLogin({
            id: user.id,
            name: user.name,
            email: user.email,
            weight: user.weight
          })
          navigate('/dashboard')
          setLoginAttempts(0) // Reset attempts on successful login
        } else {
          setError('Invalid email or password')
          setLoginAttempts(prev => prev + 1)
        }
      } catch (error) {
        setError('An error occurred. Please try again.')
        console.error('Login error:', error)
      }
      setLoading(false)
    }, 1000)
  }, [formData, loginAttempts, onLogin, navigate, simpleHash])

  return (
    <AuthContainer>
      <AuthCard>
        <Logo>💪 GymBuddy</Logo>
        <Title>Welcome Back</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            aria-label="Email address"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            autoComplete="current-password"
            aria-label="Password"
          />
          <Button type="submit" disabled={loading || loginAttempts >= 5}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
        
        <LinkText>
          Don't have an account? <Link to="/register">Sign up</Link>
        </LinkText>
      </AuthCard>
    </AuthContainer>
  )
}

export default Login
