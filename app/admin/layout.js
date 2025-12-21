'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      setIsLoading(false)
      return
    }

    // Check if admin is authenticated
    fetch('/api/users?page=1&limit=1')
      .then(res => {
        if (res.status === 401) {
          router.push('/admin/login')
        } else {
          setIsAuthenticated(true)
        }
      })
      .catch(() => {
        router.push('/admin/login')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [router, pathname])

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

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading...</div>
      </div>
    )
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTitle}>Admin Dashboard</div>
          <div style={styles.headerSubtitle}>Manage Students & Analytics</div>
        </div>
      </header>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarLogo}>Admin Panel</h2>
        </div>
        <nav style={styles.nav}>
          <Link 
            href="/admin/dashboard" 
            style={{
              ...styles.navItem,
              ...(pathname === '/admin/dashboard' || pathname === '/admin' ? styles.navItemActive : {})
            }}
          >
            <i className="fas fa-chart-line" style={styles.navIcon}></i>
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/admin/students" 
            style={{
              ...styles.navItem,
              ...(pathname === '/admin/students' ? styles.navItemActive : {})
            }}
          >
            <i className="fas fa-users" style={styles.navIcon}></i>
            <span>Student Details</span>
          </Link>
        </nav>
        <div style={styles.sidebarFooter}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <i className="fas fa-sign-out-alt" style={styles.navIcon}></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {children}
      </main>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: '250px',
    right: 0,
    height: '70px',
    backgroundColor: '#0f3d66',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: 0,
    lineHeight: 1.2,
  },
  headerSubtitle: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.7)',
    marginTop: '2px',
    fontWeight: '400',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    paddingTop: '70px',
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #333',
  },
  sidebarLogo: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  nav: {
    flex: 1,
    padding: '20px 0',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    color: '#ccc',
    textDecoration: 'none',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
  },
  navItemActive: {
    backgroundColor: '#2a2a2a',
    color: 'white',
    borderLeft: '3px solid #007bff',
  },
  navIcon: {
    marginRight: '12px',
    width: '20px',
    fontSize: '18px',
  },
  sidebarFooter: {
    padding: '20px',
    borderTop: '1px solid #333',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '15px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  mainContent: {
    marginLeft: '250px',
    marginTop: '70px',
    flex: 1,
    padding: '30px',
    minHeight: 'calc(100vh - 70px)',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
  },
}

