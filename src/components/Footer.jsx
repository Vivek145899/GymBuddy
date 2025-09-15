import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: var(--gradient-secondary);
  color: var(--text-secondary);
  padding: 30px 20px;
  text-align: center;
  margin-top: auto;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gradient);
    opacity: 0.3;
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
  opacity: 0.8;
`

const FooterLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: var(--secondary);
    text-decoration: underline;
    transform: translateY(-1px);
  }
`


function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © 2025 GymBuddy - Created by{' '}
          <FooterLink href="#" target="_blank" rel="noopener noreferrer">
            Vivek Kumar Yadav
          </FooterLink>
          . All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
