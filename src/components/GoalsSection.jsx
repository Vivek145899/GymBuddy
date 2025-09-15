import React, { useState } from 'react'
import styled from 'styled-components'

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const GoalForm = styled.form`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
`

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const GoalItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid ${props => {
    const progress = props.progress
    if (progress >= 100) return '#51cf66'
    if (progress >= 75) return '#ffd43b'
    if (progress >= 50) return '#ffa94d'
    return '#ff6b6b'
  }};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`

const GoalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const GoalType = styled.span`
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

const GoalDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
`

const ProgressContainer = styled.div`
  margin-bottom: 15px;
`

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: ${props => Math.min(props.progress, 100)}%;
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`

const GoalActions = styled.div`
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
  
  &.update {
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

function GoalsSection({ goals, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'workout',
    target: '',
    unit: 'times',
    deadline: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.target) {
      alert('Please fill in all required fields')
      return
    }

    onAdd({
      ...formData,
      target: parseInt(formData.target)
    })
    
    setFormData({
      title: '',
      description: '',
      type: 'workout',
      target: '',
      unit: 'times',
      deadline: ''
    })
    setShowForm(false)
  }

  const handleUpdateProgress = (goalId) => {
    const currentProgress = prompt('Enter current progress:', '0')
    if (currentProgress !== null) {
      const progress = parseInt(currentProgress)
      if (!isNaN(progress)) {
        onUpdate(goalId, { progress: Math.min(progress, goal.target) })
      }
    }
  }

  const handleDelete = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      onDelete(goalId)
    }
  }

  return (
    <GoalsContainer>
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>
          🎯 Add New Goal
        </Button>
      ) : (
        <GoalForm onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>Goal Title *</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Run 5K"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Goal Type</Label>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="workout">Workout</option>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="weight">Weight</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your goal and why it's important to you..."
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Target *</Label>
              <Input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="100"
                min="1"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Unit</Label>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="times">Times</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="kg">Kilograms</option>
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </Select>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Deadline (Optional)</Label>
            <Input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </FormGroup>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: '12px 24px',
                background: '#f8f9fa',
                color: '#666',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <Button type="submit">Add Goal</Button>
          </div>
        </GoalForm>
      )}

      {goals.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🎯</EmptyIcon>
          <EmptyText>No goals set yet. Create your first fitness goal!</EmptyText>
        </EmptyState>
      ) : (
        <GoalsList>
          {goals.map(goal => (
            <GoalItem key={goal.id} progress={goal.progress}>
              <GoalHeader>
                <GoalTitle>{goal.title}</GoalTitle>
                <GoalType>{goal.type}</GoalType>
              </GoalHeader>
              
              {goal.description && (
                <GoalDescription>{goal.description}</GoalDescription>
              )}
              
              <ProgressContainer>
                <ProgressBar>
                  <ProgressFill progress={goal.progress} />
                </ProgressBar>
                <ProgressText>
                  <span>{goal.progress} / {goal.target} {goal.unit}</span>
                  <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
                </ProgressText>
              </ProgressContainer>
              
              {goal.deadline && (
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              )}
              
              <GoalActions>
                <ActionButton 
                  className="update" 
                  onClick={() => handleUpdateProgress(goal.id)}
                >
                  Update Progress
                </ActionButton>
                <ActionButton 
                  className="delete" 
                  onClick={() => handleDelete(goal.id)}
                >
                  Delete
                </ActionButton>
              </GoalActions>
            </GoalItem>
          ))}
        </GoalsList>
      )}
    </GoalsContainer>
  )
}

export default GoalsSection
