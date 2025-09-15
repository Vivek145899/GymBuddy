import React from 'react'
import styled from 'styled-components'

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`

const StatCard = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient);
    opacity: 0.8;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(32, 178, 170, 0.15);
  }
`

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 8px;
`

const StatLabel = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StatSubtext = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
  opacity: 0.7;
`

function StatsCards({ activities, goals }) {
  // Calculate stats
  const totalActivities = activities.length
  const totalMinutes = activities.reduce((total, activity) => total + activity.duration, 0)
  const totalCalories = activities.reduce((total, activity) => total + (activity.calories || 0), 0)
  const activeGoals = goals.filter(goal => goal.progress < goal.target).length
  const completedGoals = goals.filter(goal => goal.progress >= goal.target).length
  
  // Calculate this week's stats
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  const thisWeekActivities = activities.filter(activity => 
    new Date(activity.date) >= oneWeekAgo
  )
  
  const thisWeekMinutes = thisWeekActivities.reduce((total, activity) => total + activity.duration, 0)
  const thisWeekCalories = thisWeekActivities.reduce((total, activity) => total + (activity.calories || 0), 0)
  
  // Calculate average duration
  const avgDuration = totalActivities > 0 ? Math.round(totalMinutes / totalActivities) : 0
  
  // Calculate streak (consecutive days with activities)
  const calculateStreak = () => {
    if (activities.length === 0) return 0
    
    const activityDates = [...new Set(activities.map(activity => 
      activity.date.split('T')[0]
    ))].sort().reverse()
    
    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    let currentDate = today
    
    for (let i = 0; i < activityDates.length; i++) {
      if (activityDates[i] === currentDate) {
        streak++
        const date = new Date(currentDate)
        date.setDate(date.getDate() - 1)
        currentDate = date.toISOString().split('T')[0]
      } else {
        break
      }
    }
    
    return streak
  }
  
  const currentStreak = calculateStreak()

  return (
    <StatsContainer>
      <StatCard>
        <StatIcon>🏃‍♂️</StatIcon>
        <StatValue>{totalActivities}</StatValue>
        <StatLabel>Total Activities</StatLabel>
        <StatSubtext>{thisWeekActivities.length} this week</StatSubtext>
      </StatCard>

      <StatCard>
        <StatIcon>⏱️</StatIcon>
        <StatValue>{totalMinutes}</StatValue>
        <StatLabel>Total Minutes</StatLabel>
        <StatSubtext>{thisWeekMinutes} this week</StatSubtext>
      </StatCard>

      <StatCard>
        <StatIcon>🔥</StatIcon>
        <StatValue>{totalCalories}</StatValue>
        <StatLabel>Calories Burned</StatLabel>
        <StatSubtext>{thisWeekCalories} this week</StatSubtext>
      </StatCard>

      <StatCard>
        <StatIcon>📊</StatIcon>
        <StatValue>{avgDuration}</StatValue>
        <StatLabel>Avg Duration</StatLabel>
        <StatSubtext>minutes per activity</StatSubtext>
      </StatCard>

      <StatCard>
        <StatIcon>🔥</StatIcon>
        <StatValue>{currentStreak}</StatValue>
        <StatLabel>Day Streak</StatLabel>
        <StatSubtext>consecutive days</StatSubtext>
      </StatCard>

      <StatCard>
        <StatIcon>🎯</StatIcon>
        <StatValue>{activeGoals}</StatValue>
        <StatLabel>Active Goals</StatLabel>
        <StatSubtext>{completedGoals} completed</StatSubtext>
      </StatCard>
    </StatsContainer>
  )
}

export default StatsCards
