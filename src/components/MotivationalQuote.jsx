import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const QuoteContainer = styled.div`
  background: var(--gradient);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  color: white;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(32, 178, 170, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(32, 178, 170, 0.4);
  }
`

const QuoteIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
`

const QuoteText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 15px;
  line-height: 1.6;
  opacity: 0.95;
  position: relative;
  z-index: 1;
`

const QuoteAuthor = styled.p`
  font-weight: 600;
  font-size: 1rem;
  opacity: 0.8;
  position: relative;
  z-index: 1;
`

const RefreshButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`

const motivationalQuotes = [
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown"
  },
  {
    text: "Your body can do it. It's your mind that you have to convince.",
    author: "Unknown"
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Unknown"
  },
  {
    text: "Don't wish for it, work for it.",
    author: "Unknown"
  },
  {
    text: "Success isn't always about greatness. It's about consistency.",
    author: "Dwayne Johnson"
  },
  {
    text: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  },
  {
    text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
    author: "Khloe Kardashian"
  },
  {
    text: "The first wealth is health.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Exercise is king. Nutrition is queen. Put them together and you've got a kingdom.",
    author: "Jack LaLanne"
  },
  {
    text: "Strength does not come from physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt"
  },
  {
    text: "A healthy outside starts from the inside.",
    author: "Robert Urich"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
]

function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0])

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    setCurrentQuote(motivationalQuotes[randomIndex])
  }

  useEffect(() => {
    // Change quote every 30 seconds
    const interval = setInterval(getRandomQuote, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <QuoteContainer>
      <QuoteIcon>💪</QuoteIcon>
      <QuoteText>"{currentQuote.text}"</QuoteText>
      <QuoteAuthor>- {currentQuote.author}</QuoteAuthor>
      <RefreshButton onClick={getRandomQuote}>
        🔄 New Quote
      </RefreshButton>
    </QuoteContainer>
  )
}

export default MotivationalQuote
