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

const SuccessMessage = styled.div`
  background: var(--success);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0.9;
`

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    weight: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
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

  const validateForm = useCallback(() => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return false
    }

    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters')
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (formData.weight && (isNaN(formData.weight) || parseFloat(formData.weight) < 0)) {
      setError('Please enter a valid weight')
      return false
    }

    return true
  }, [formData])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      try {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('gymbuddy_users') || '[]')
        const existingUser = users.find(u => u.email === formData.email)
        
        if (existingUser) {
          setError('User with this email already exists')
          setLoading(false)
          return
        }

        // Create new user with hashed password
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          passwordHash: simpleHash(formData.password),
          weight: parseFloat(formData.weight) || 0,
          createdAt: new Date().toISOString()
        }

        users.push(newUser)
        localStorage.setItem('gymbuddy_users', JSON.stringify(users))

        setSuccess('Account created successfully!')
        
        // Auto login
        setTimeout(() => {
          onLogin({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            weight: newUser.weight
          })
          navigate('/dashboard')
        }, 1500)
        
        setLoading(false)
      } catch (error) {
        setError('An error occurred. Please try again.')
        console.error('Registration error:', error)
        setLoading(false)
      }
    }, 1000)
  }, [formData, validateForm, onLogin, navigate, simpleHash])

  return (
    <AuthContainer>
      <AuthCard>
        <Logo>💪 GymBuddy</Logo>
        <Title>Join GymBuddy</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength="2"
            autoComplete="name"
            aria-label="Full name"
          />
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
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            autoComplete="new-password"
            aria-label="Password"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            aria-label="Confirm password"
          />
          <Input
            type="number"
            name="weight"
            placeholder="Weight (kg) - Optional"
            value={formData.weight}
            onChange={handleChange}
            step="0.1"
            min="0"
            aria-label="Weight in kilograms"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Form>
        
        <LinkText>
          Already have an account? <Link to="/login">Sign in</Link>
        </LinkText>
      </AuthCard>
    </AuthContainer>
  )
}

export default Register
