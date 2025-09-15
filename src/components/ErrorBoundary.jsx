import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-secondary);
  padding: 20px;
`

const ErrorCard = styled.div`
  background: var(--surface);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
`

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`

const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 15px;
  font-weight: 700;
`

const ErrorMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
`

const RetryButton = styled.button`
  padding: 15px 30px;
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
  }
`

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>Oops! Something went wrong</ErrorTitle>
            <ErrorMessage>
              We're sorry, but something unexpected happened. 
              Please try refreshing the page or contact support if the problem persists.
            </ErrorMessage>
            <RetryButton onClick={this.handleRetry}>
              Try Again
            </RetryButton>
          </ErrorCard>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
