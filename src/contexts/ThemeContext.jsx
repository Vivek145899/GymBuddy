import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('gymbuddy_theme')
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    localStorage.setItem('gymbuddy_theme', isDarkMode ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? 'brown' : 'brown', // dark chocolate vs warm brown
      secondary: isDarkMode ? '#795548' : '#a1887f', // cocoa vs soft mocha
      background: isDarkMode ? '#1b1b1b' : '#fbe9e7', // deep vs creamy beige
      surface: isDarkMode ? '#2e2e2e' : '#ffffff',
      surfaceSecondary: isDarkMode ? '#3e3e3e' : '#f5f5f5',
      text: isDarkMode ? '#f5f5f5' : '#3e2723', // light text vs espresso
      textSecondary: isDarkMode ? '#bdbdbd' : '#5d4037',
      border: isDarkMode ? '#5d4037' : '#d7ccc8',
      accent: isDarkMode ? '#8d6e63' : '#a1887f', // muted cocoa
      success: isDarkMode ? '#81c784' : '#388e3c',
      warning: isDarkMode ? '#ffb74d' : '#f57c00',
      error: isDarkMode ? '#e57373' : '#d32f2f',
      gradient: isDarkMode
        ? 'linear-gradient(135deg, #4e342e 0%, #795548 100%)'
        : 'linear-gradient(135deg, #6d4c41 0%, #a1887f 100%)',
      gradientSecondary: isDarkMode
        ? 'linear-gradient(135deg, #1b1b1b 0%, #2e2e2e 100%)'
        : 'linear-gradient(135deg, #fbe9e7 0%, #f5f5f5 100%)',
      gradientAccent: isDarkMode
        ? 'linear-gradient(135deg, #4e342e 0%, #795548 50%, #4e342e 100%)'
        : 'linear-gradient(135deg, #6d4c41 0%, #a1887f 50%, #6d4c41 100%)'
    }
    
  }    

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
