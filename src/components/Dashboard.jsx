import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'
import ProgressChart from './ProgressChart'
import GoalsSection from './GoalsSection'
import MotivationalQuote from './MotivationalQuote'
import StatsCards from './StatsCards'

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient-secondary);
  padding: 20px;
  transition: background 0.3s ease;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 30px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Section = styled.div`
  background: var(--surface);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(32, 178, 170, 0.1);
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
`

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'var(--gradient)' : 'var(--surface-secondary)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'var(--border)'};
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.active ? 'var(--gradient)' : 'var(--border)'};
  }
`

function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('activities')
  const [activities, setActivities] = useState([])
  const [goals, setGoals] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Load activities from localStorage
    const savedActivities = localStorage.getItem('gymbuddy_activities')
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities))
    }

    // Load goals from localStorage
    const savedGoals = localStorage.getItem('gymbuddy_goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const addActivity = useCallback((activity) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      userId: user.id
    }
    const updatedActivities = [...activities, newActivity]
    setActivities(updatedActivities)
    localStorage.setItem('gymbuddy_activities', JSON.stringify(updatedActivities))
    setShowForm(false)
  }, [activities, user.id])

  const updateActivity = useCallback((id, updatedActivity) => {
    const updatedActivities = activities.map(activity =>
      activity.id === id ? { ...activity, ...updatedActivity } : activity
    )
    setActivities(updatedActivities)
    localStorage.setItem('gymbuddy_activities', JSON.stringify(updatedActivities))
  }, [activities])

  const deleteActivity = useCallback((id) => {
    const updatedActivities = activities.filter(activity => activity.id !== id)
    setActivities(updatedActivities)
    localStorage.setItem('gymbuddy_activities', JSON.stringify(updatedActivities))
  }, [activities])

  const addGoal = useCallback((goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      progress: 0
    }
    const updatedGoals = [...goals, newGoal]
    setGoals(updatedGoals)
    localStorage.setItem('gymbuddy_goals', JSON.stringify(updatedGoals))
  }, [goals, user.id])

  const updateGoal = useCallback((id, updatedGoal) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, ...updatedGoal } : goal
    )
    setGoals(updatedGoals)
    localStorage.setItem('gymbuddy_goals', JSON.stringify(updatedGoals))
  }, [goals])

  const deleteGoal = useCallback((id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id)
    setGoals(updatedGoals)
    localStorage.setItem('gymbuddy_goals', JSON.stringify(updatedGoals))
  }, [goals])

  // Memoize filtered data to prevent unnecessary re-renders
  const userActivities = useMemo(() => 
    activities.filter(activity => activity.userId === user.id), 
    [activities, user.id]
  )
  
  const userGoals = useMemo(() => 
    goals.filter(goal => goal.userId === user.id), 
    [goals, user.id]
  )

  return (
    <DashboardContainer>
      <Container>
        <Header>
          <Title>Welcome back, {user.name}! 💪</Title>
          <Subtitle>Ready to crush your fitness goals today?</Subtitle>
        </Header>

        <MotivationalQuote />

        <StatsCards activities={userActivities} goals={userGoals} />

        <TabContainer>
          <Tab 
            active={activeTab === 'activities'} 
            onClick={() => setActiveTab('activities')}
          >
            📊 Activities
          </Tab>
          <Tab 
            active={activeTab === 'progress'} 
            onClick={() => setActiveTab('progress')}
          >
            📈 Progress
          </Tab>
          <Tab 
            active={activeTab === 'goals'} 
            onClick={() => setActiveTab('goals')}
          >
            🎯 Goals
          </Tab>
        </TabContainer>

        {activeTab === 'activities' && (
          <Grid>
            <Section>
              <SectionTitle>
                🏋️ Add New Activity
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowForm(!showForm)}
                  style={{ marginLeft: 'auto', fontSize: '14px', padding: '8px 16px' }}
                >
                  {showForm ? 'Cancel' : 'Add Activity'}
                </button>
              </SectionTitle>
              {showForm && (
                <ActivityForm 
                  onSubmit={addActivity} 
                  onCancel={() => setShowForm(false)}
                />
              )}
            </Section>

            <Section>
              <SectionTitle>📋 Recent Activities</SectionTitle>
              <ActivityList 
                activities={userActivities.slice(0, 5)}
                onUpdate={updateActivity}
                onDelete={deleteActivity}
                showActions={true}
              />
            </Section>
          </Grid>
        )}

        {activeTab === 'progress' && (
          <Section>
            <SectionTitle>📈 Your Progress</SectionTitle>
            <ProgressChart activities={userActivities} />
          </Section>
        )}

        {activeTab === 'goals' && (
          <Section>
            <SectionTitle>🎯 Your Goals</SectionTitle>
            <GoalsSection 
              goals={userGoals}
              onAdd={addGoal}
              onUpdate={updateGoal}
              onDelete={deleteGoal}
            />
          </Section>
        )}

        {activeTab === 'activities' && (
          <Section>
            <SectionTitle>📋 All Activities</SectionTitle>
            <ActivityList 
              activities={userActivities}
              onUpdate={updateActivity}
              onDelete={deleteActivity}
              showActions={true}
            />
          </Section>
        )}
      </Container>
    </DashboardContainer>
  )
}

export default Dashboard
