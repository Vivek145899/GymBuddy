import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ThemeToggle from './ThemeToggle'

const NavbarContainer = styled.nav`
  background: var(--surface);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
`

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

const NavLink = styled(Link)`
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const UserName = styled.span`
  color: var(--text);
  font-weight: 500;
`

const LogoutButton = styled.button`
  background: var(--error);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--error);
    opacity: 0.9;
    transform: translateY(-1px);
  }
`

function Navbar({ user, onLogout }) {
  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/dashboard">💪 GymBuddy</Logo>
        
        <NavLinks>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/dashboard">Activities</NavLink>
          <NavLink to="/dashboard">Progress</NavLink>
          <NavLink to="/dashboard">Goals</NavLink>
        </NavLinks>
        
        <UserInfo>
          <ThemeToggle />
          <UserName>Welcome, {user.name}</UserName>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </UserInfo>
      </NavContent>
    </NavbarContainer>
  )
}

export default Navbar
