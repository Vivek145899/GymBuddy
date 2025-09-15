import React, { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #666;
    border: 2px solid #e1e5e9;
    
    &:hover {
      background: #e9ecef;
    }
  }
`

function ActivityForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'cardio',
    name: '',
    duration: '',
    calories: '',
    notes: '',
    intensity: 'medium'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.duration) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit({
      ...formData,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories) || 0
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <FormGroup>
          <Label>Activity Type *</Label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength Training</option>
            <option value="yoga">Yoga</option>
            <option value="pilates">Pilates</option>
            <option value="swimming">Swimming</option>
            <option value="cycling">Cycling</option>
            <option value="running">Running</option>
            <option value="walking">Walking</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Intensity</Label>
          <Select
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label>Activity Name *</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Morning Run, Chest Workout"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Duration (minutes) *</Label>
          <Input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
            min="1"
            required
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label>Calories Burned</Label>
          <Input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="300"
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <Input
            type="datetime-local"
            name="date"
            defaultValue={new Date().toISOString().slice(0, 16)}
            onChange={handleChange}
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label>Notes</Label>
        <TextArea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="How did you feel? Any achievements or challenges?"
        />
      </FormGroup>

      <ButtonGroup>
        <Button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="primary">
          Add Activity
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default ActivityForm
