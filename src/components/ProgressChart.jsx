import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import styled from 'styled-components'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 5px;
`

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`

function ProgressChart({ activities }) {
  // Process data for charts
  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const getActivityData = () => {
    const last7Days = getLast7Days()
    const dailyMinutes = last7Days.map(day => {
      const dayActivities = activities.filter(activity => 
        activity.date.startsWith(day)
      )
      return dayActivities.reduce((total, activity) => total + activity.duration, 0)
    })

    return {
      labels: last7Days.map(day => new Date(day).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: 'Minutes',
        data: dailyMinutes,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true
      }]
    }
  }

  const getActivityTypeData = () => {
    const typeCount = {}
    activities.forEach(activity => {
      typeCount[activity.type] = (typeCount[activity.type] || 0) + 1
    })

    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
      '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#c44569'
    ]

    return {
      labels: Object.keys(typeCount),
      datasets: [{
        data: Object.values(typeCount),
        backgroundColor: colors.slice(0, Object.keys(typeCount).length),
        borderWidth: 0
      }]
    }
  }

  const getWeeklyCaloriesData = () => {
    const last7Days = getLast7Days()
    const dailyCalories = last7Days.map(day => {
      const dayActivities = activities.filter(activity => 
        activity.date.startsWith(day)
      )
      return dayActivities.reduce((total, activity) => total + (activity.calories || 0), 0)
    })

    return {
      labels: last7Days.map(day => new Date(day).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: 'Calories Burned',
        data: dailyCalories,
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 1
      }]
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  // Calculate stats
  const totalMinutes = activities.reduce((total, activity) => total + activity.duration, 0)
  const totalCalories = activities.reduce((total, activity) => total + (activity.calories || 0), 0)
  const totalActivities = activities.length
  const avgDuration = totalActivities > 0 ? Math.round(totalMinutes / totalActivities) : 0

  return (
    <div>
      <StatsGrid>
        <StatCard>
          <StatValue>{totalActivities}</StatValue>
          <StatLabel>Total Activities</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalMinutes}</StatValue>
          <StatLabel>Total Minutes</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalCalories}</StatValue>
          <StatLabel>Calories Burned</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{avgDuration}</StatValue>
          <StatLabel>Avg Duration (min)</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartsContainer>
        <ChartCard>
          <ChartTitle>📈 Weekly Activity Minutes</ChartTitle>
          <div style={{ height: '300px' }}>
            <Line data={getActivityData()} options={chartOptions} />
          </div>
        </ChartCard>

        <ChartCard>
          <ChartTitle>🍩 Activity Types</ChartTitle>
          <div style={{ height: '300px' }}>
            <Doughnut data={getActivityTypeData()} options={doughnutOptions} />
          </div>
        </ChartCard>
      </ChartsContainer>

      <ChartCard>
        <ChartTitle>🔥 Weekly Calories Burned</ChartTitle>
        <div style={{ height: '300px' }}>
          <Bar data={getWeeklyCaloriesData()} options={chartOptions} />
        </div>
      </ChartCard>
    </div>
  )
}

export default ProgressChart
