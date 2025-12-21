'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    courseWise: {}
  })

  useEffect(() => {
    fetchUsers()
    fetchStats()
  }, [page])

  useEffect(() => {
    // Refresh stats after user operations
    fetchStats()
  }, [users])

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
    }
  }

  const fetchUsers = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/users?page=${page}&limit=20`)
      const data = await response.json()

      if (response.ok) {
        setUsers(data.users || [])
        setTotalPages(data.totalPages || 1)
        setTotal(data.total || 0)
      } else {
        if (response.status === 401) {
          router.push('/admin/login')
        } else {
          setError(data.error || 'Failed to fetch users')
        }
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh users list and stats
        fetchUsers()
        fetchStats()
      } else {
        alert(data.error || 'Failed to delete user')
      }
    } catch (err) {
      alert('Network error. Please try again.')
    }
  }

  const handleEdit = (user) => {
    setEditingUser({ ...user })
  }

  const handleSaveEdit = async () => {
    if (!editingUser) return

    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: editingUser.full_name,
          mobile_number: editingUser.mobile_number,
          email: editingUser.email,
          preferred_language: editingUser.preferred_language,
          applied_for: editingUser.applied_for,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setEditingUser(null)
        fetchUsers()
        fetchStats()
      } else {
        alert(data.error || 'Failed to update user')
      }
    } catch (err) {
      alert('Network error. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
    } catch (err) {
      console.error('Logout error:', err)
    }
    router.push('/admin/login')
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <div style={styles.headerActions}>
          <span style={styles.totalUsers}>Total Users: {stats.total}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={styles.statsContainer}>
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
        </div>
      </div>

      {/* Course-wise Statistics */}
      <div style={styles.courseStatsContainer}>
        <h2 style={styles.sectionTitle}>Course-wise Enrollment</h2>
        <div style={styles.courseStatsGrid}>
          {Object.entries(stats.courseWise).map(([course, count]) => (
            <div key={course} style={styles.courseStatCard}>
              <div style={styles.courseName}>{course}</div>
              <div style={styles.courseCount}>{count} Students</div>
            </div>
          ))}
          {Object.keys(stats.courseWise).length === 0 && (
            <div style={styles.noCourseData}>No course data available</div>
          )}
        </div>
      </div>

      {/* Student Details Section */}
      <div style={styles.studentsSection}>
        <h2 style={styles.sectionTitle}>Student Details</h2>
      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div style={styles.loading}>Loading users...</div>
      ) : (
        <>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Full Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Mobile</th>
                  <th style={styles.th}>Language</th>
                  <th style={styles.th}>Applied For</th>
                  <th style={styles.th}>Registered At</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{...styles.td, ...styles.noData}}>No users found</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td style={styles.td}>{editingUser?.id === user.id ? (
                        <input
                          type="text"
                          value={editingUser.full_name}
                          onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                          style={styles.input}
                        />
                      ) : user.full_name}</td>
                      <td style={styles.td}>{editingUser?.id === user.id ? (
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          style={styles.input}
                        />
                      ) : user.email}</td>
                      <td style={styles.td}>{editingUser?.id === user.id ? (
                        <input
                          type="text"
                          value={editingUser.mobile_number}
                          onChange={(e) => setEditingUser({ ...editingUser, mobile_number: e.target.value })}
                          style={styles.input}
                        />
                      ) : user.mobile_number}</td>
                      <td style={styles.td}>{editingUser?.id === user.id ? (
                        <select
                          value={editingUser.preferred_language}
                          onChange={(e) => setEditingUser({ ...editingUser, preferred_language: e.target.value })}
                          style={styles.input}
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : user.preferred_language}</td>
                      <td style={styles.td}>{editingUser?.id === user.id ? (
                        <select
                          value={editingUser.applied_for || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, applied_for: e.target.value })}
                          style={styles.input}
                        >
                          <option value="">Select Course</option>
                          <option value="IoT Technology">IoT Technology</option>
                          <option value="Robotics Technology">Robotics Technology</option>
                        </select>
                      ) : user.applied_for || '-'}</td>
                      <td style={styles.td}>{formatDate(user.created_at)}</td>
                      <td style={styles.td}>
                        {editingUser?.id === user.id ? (
                          <>
                            <button onClick={handleSaveEdit} style={styles.saveButton}>Save</button>
                            <button onClick={() => setEditingUser(null)} style={styles.cancelButton}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(user)} style={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={styles.pageButton}
              >
                Previous
              </button>
              <span style={styles.pageInfo}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={styles.pageButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  totalUsers: {
    fontSize: '16px',
    color: '#666',
    fontWeight: '600',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  error: {
    padding: '15px',
    backgroundColor: '#fee',
    color: '#c33',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
    borderBottom: '2px solid #dee2e6',
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #dee2e6',
    color: '#555',
  },
  noData: {
    textAlign: 'center',
    padding: '40px',
    color: '#999',
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    maxWidth: '200px',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  saveButton: {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '5px',
  },
  cancelButton: {
    padding: '6px 12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  pageButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  pageInfo: {
    fontSize: '16px',
    color: '#666',
    fontWeight: '600',
  },
  statsContainer: {
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
  statCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
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
  courseStatsContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    marginTop: 0,
  },
  courseStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  courseStatCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    border: '2px solid #e9ecef',
    transition: 'border-color 0.2s, background-color 0.2s',
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
  noCourseData: {
    textAlign: 'center',
    color: '#999',
    padding: '40px',
    fontSize: '16px',
  },
  studentsSection: {
    marginBottom: '20px',
  },
}

