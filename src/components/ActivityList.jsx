import React, { useState } from 'react'
import styled from 'styled-components'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const ActivityItem = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid ${props => {
    const colors = {
      cardio: '#ff6b6b',
      strength: '#4ecdc4',
      yoga: '#45b7d1',
      pilates: '#96ceb4',
      swimming: '#feca57',
      cycling: '#ff9ff3',
      running: '#54a0ff',
      walking: '#5f27cd',
      other: '#c44569'
    }
    return colors[props.type] || '#667eea'
  }};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`

const ActivityName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const ActivityType = styled.span`
  background: ${props => {
    const colors = {
      cardio: '#ff6b6b',
      strength: '#4ecdc4',
      yoga: '#45b7d1',
      pilates: '#96ceb4',
      swimming: '#feca57',
      cycling: '#ff9ff3',
      running: '#54a0ff',
      walking: '#5f27cd',
      other: '#c44569'
    }
    return colors[props.type] || '#667eea'
  }};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

const ActivityDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`

const DetailItem = styled.div`
  text-align: center;
`

const DetailLabel = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 500;
  margin-bottom: 4px;
`

const DetailValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`

const ActivityNotes = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
  font-style: italic;
`

const ActivityDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 10px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.edit {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a6fd8;
    }
  }
  
  &.delete {
    background: #ff6b6b;
    color: white;
    
    &:hover {
      background: #ff5252;
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin: 0;
`

function ActivityList({ activities, onUpdate, onDelete, showActions = false }) {
  const [editingId, setEditingId] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleEdit = (activity) => {
    setEditingId(activity.id)
    // You could open a modal or inline form here
    // For now, we'll just show an alert
    const newName = prompt('Edit activity name:', activity.name)
    if (newName && newName !== activity.name) {
      onUpdate(activity.id, { name: newName })
    }
    setEditingId(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      onDelete(id)
    }
  }

  if (activities.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>🏃‍♂️</EmptyIcon>
        <EmptyText>No activities recorded yet. Start your fitness journey!</EmptyText>
      </EmptyState>
    )
  }

  return (
    <ListContainer>
      {activities.map(activity => (
        <ActivityItem key={activity.id} type={activity.type}>
          <ActivityHeader>
            <ActivityName>{activity.name}</ActivityName>
            <ActivityType type={activity.type}>{activity.type}</ActivityType>
          </ActivityHeader>
          
          <ActivityDetails>
            <DetailItem>
              <DetailLabel>Duration</DetailLabel>
              <DetailValue>{activity.duration} min</DetailValue>
            </DetailItem>
            
            {activity.calories > 0 && (
              <DetailItem>
                <DetailLabel>Calories</DetailLabel>
                <DetailValue>{activity.calories}</DetailValue>
              </DetailItem>
            )}
            
            <DetailItem>
              <DetailLabel>Intensity</DetailLabel>
              <DetailValue style={{ textTransform: 'capitalize' }}>
                {activity.intensity}
              </DetailValue>
            </DetailItem>
          </ActivityDetails>
          
          {activity.notes && (
            <ActivityNotes>"{activity.notes}"</ActivityNotes>
          )}
          
          <ActivityDate>{formatDate(activity.date)}</ActivityDate>
          
          {showActions && (
            <ActionButtons>
              <ActionButton 
                className="edit" 
                onClick={() => handleEdit(activity)}
              >
                Edit
              </ActionButton>
              <ActionButton 
                className="delete" 
                onClick={() => handleDelete(activity.id)}
              >
                Delete
              </ActionButton>
            </ActionButtons>
          )}
        </ActivityItem>
      ))}
    </ListContainer>
  )
}

export default ActivityList
