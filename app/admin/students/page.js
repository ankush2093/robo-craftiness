'use client'

import { useState, useEffect } from 'react'

export default function StudentsPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchUsers()
  }, [page])

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
        setError(data.error || 'Failed to fetch users')
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
        fetchUsers()
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
      } else {
        alert(data.error || 'Failed to update user')
      }
    } catch (err) {
      alert('Network error. Please try again.')
    }
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
        <h1 style={styles.title}>Student Details</h1>
        <span style={styles.totalUsers}>Total Students: {total}</span>
      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div style={styles.loading}>Loading students...</div>
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
                    <td colSpan="7" style={{...styles.td, ...styles.noData}}>No students found</td>
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
    maxWidth: '1400px',
    margin: '0 auto',
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
  totalUsers: {
    fontSize: '18px',
    color: '#666',
    fontWeight: '600',
    backgroundColor: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
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
    borderRadius: '12px',
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
    fontWeight: '500',
  },
  pageInfo: {
    fontSize: '16px',
    color: '#666',
    fontWeight: '600',
  },
}


