import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ToggleButton = styled.button`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.isDark ? 'var(--gradient)' : 'var(--surface-secondary)'};
  border: 2px solid ${props => props.isDark ? 'transparent' : 'var(--border)'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isDark ? '0 2px 8px rgba(32, 178, 170, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.isDark ? '0 4px 12px rgba(32, 178, 170, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.15)'};
  }
`

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.isDark ? '26px' : '2px'};
  width: 20px;
  height: 20px;
  background: ${props => props.isDark ? 'white' : 'var(--surface)'};
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)'};
  border: 1px solid ${props => props.isDark ? 'transparent' : 'var(--border)'};
`

const ThemeIcon = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
    transform: scale(1.1);
  }
`

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <ToggleContainer>
      <ThemeIcon>{isDarkMode ? '🌙' : '☀️'}</ThemeIcon>
      <ToggleButton isDark={isDarkMode} onClick={toggleTheme}>
        <ToggleSlider isDark={isDarkMode} />
      </ToggleButton>
    </ToggleContainer>
  )
}

export default ThemeToggle
