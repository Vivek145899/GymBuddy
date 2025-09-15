import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ThemeToggle from './ThemeToggle'

const LandingContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(32, 178, 170, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0, 206, 209, 0.3) 0%, transparent 50%);
    z-index: 0;
  }
`

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.15;
  z-index: 0;
  filter: brightness(0.8) contrast(1.2);
`

const ThemeToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`

const Content = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  position: relative;
  z-index: 1;
`

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Tagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  opacity: 0.9;
  font-weight: 300;
`

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 40px;
  opacity: 0.8;
  line-height: 1.6;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledButton = styled(Link)`
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  
  &.primary {
    background: white;
    color: #667eea;
  }
  
  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`

const Features = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`

const Feature = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
    background: linear-gradient(135deg, rgba(32, 178, 170, 0.1) 0%, rgba(0, 206, 209, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(32, 178, 170, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  z-index: 1;
`

const FeatureDesc = styled.p`
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`

const Quote = styled.div`
  margin-top: 60px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`

const QuoteText = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 15px;
  opacity: 0.9;
`

const QuoteAuthor = styled.p`
  font-weight: 600;
  opacity: 0.8;
`

function LandingPage() {
  return (
    <LandingContainer>
      <BackgroundImage />
      <ThemeToggleContainer>
        <ThemeToggle />
      </ThemeToggleContainer>
      
      <Content>
        <Logo>💪 GymBuddy</Logo>
        <Tagline>Your Ultimate Fitness Companion</Tagline>
        <Description>
          Track your workouts, monitor your progress, and achieve your fitness goals 
          with GymBuddy. The modern way to build a stronger, healthier you.
        </Description>
        
        <ButtonGroup>
          <StyledButton to="/register" className="primary">
            Get Started
          </StyledButton>
          <StyledButton to="/login" className="secondary">
            Sign In
          </StyledButton>
        </ButtonGroup>

        <Features>
          <Feature>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Track Progress</FeatureTitle>
            <FeatureDesc>
              Monitor your fitness journey with detailed analytics and progress charts
            </FeatureDesc>
          </Feature>
          
          <Feature>
            <FeatureIcon>🏋️</FeatureIcon>
            <FeatureTitle>Workout Logging</FeatureTitle>
            <FeatureDesc>
              Log your workouts, track calories burned, and set personal records
            </FeatureDesc>
          </Feature>
          
          <Feature>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Goal Setting</FeatureTitle>
            <FeatureDesc>
              Set and achieve your fitness goals with personalized tracking
            </FeatureDesc>
          </Feature>
          
          <Feature>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Always Accessible</FeatureTitle>
            <FeatureDesc>
              Access your fitness data anywhere, anytime with our responsive design
            </FeatureDesc>
          </Feature>
        </Features>

        <Quote>
          <QuoteText>
            "The only bad workout is the one that didn't happen."
          </QuoteText>
          <QuoteAuthor>- Unknown</QuoteAuthor>
        </Quote>
      </Content>
    </LandingContainer>
  )
}

export default LandingPage
