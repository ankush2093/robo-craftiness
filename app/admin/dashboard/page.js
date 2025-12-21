'use client'

import { useState, useEffect } from 'react'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    courseWise: {}
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/users/stats')
      const data = await response.json()

      if (response.ok) {
        setStats(data.stats || {
          total: 0,
          today: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0,
          courseWise: {}
        })
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Time-based enrollment chart data
  const timeChartData = {
    labels: ['Today', 'This Week', 'This Month', 'This Year'],
    datasets: [
      {
        label: 'Enrollments',
        data: [stats.today, stats.weekly, stats.monthly, stats.yearly],
        backgroundColor: [
          'rgba(0, 123, 255, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)',
        ],
        borderColor: [
          'rgba(0, 123, 255, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Course-wise chart data
  const courseLabels = Object.keys(stats.courseWise)
  const courseData = Object.values(stats.courseWise)
  
  const courseChartData = {
    labels: courseLabels.length > 0 ? courseLabels : ['No Data'],
    datasets: [
      {
        label: 'Students',
        data: courseData.length > 0 ? courseData : [0],
        backgroundColor: [
          'rgba(0, 123, 255, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(108, 117, 125, 0.8)',
        ],
        borderColor: [
          'rgba(0, 123, 255, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(108, 117, 125, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  }

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div>Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📅</div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Today</div>
            <div style={styles.statValue}>{stats.today}</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>This Week</div>
            <div style={styles.statValue}>{stats.weekly}</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📈</div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>This Month</div>
            <div style={styles.statValue}>{stats.monthly}</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📆</div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>This Year</div>
            <div style={styles.statValue}>{stats.yearly}</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Total Students</div>
            <div style={styles.statValue}>{stats.total}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartsGrid}>
        {/* Enrollment Over Time - Bar Chart */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Enrollments Over Time</h2>
          <div style={styles.chartContainer}>
            <Bar data={timeChartData} options={chartOptions} />
          </div>
        </div>

        {/* Course-wise Distribution - Doughnut Chart */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Course-wise Enrollment</h2>
          <div style={styles.chartContainer}>
            <Doughnut data={courseChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Course-wise Statistics Table */}
      <div style={styles.courseStatsCard}>
        <h2 style={styles.chartTitle}>Course-wise Statistics</h2>
        <div style={styles.courseStatsGrid}>
          {Object.entries(stats.courseWise).map(([course, count]) => (
            <div key={course} style={styles.courseStatItem}>
              <div style={styles.courseName}>{course}</div>
              <div style={styles.courseCount}>{count} Students</div>
            </div>
          ))}
          {Object.keys(stats.courseWise).length === 0 && (
            <div style={styles.noData}>No course data available</div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  statIcon: {
    fontSize: '36px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: '12px',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    marginTop: 0,
  },
  chartContainer: {
    height: '300px',
    position: 'relative',
  },
  courseStatsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  courseStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  courseStatItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    border: '2px solid #e9ecef',
  },
  courseName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  courseCount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  noData: {
    textAlign: 'center',
    color: '#999',
    padding: '40px',
    fontSize: '16px',
    gridColumn: '1 / -1',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
}
