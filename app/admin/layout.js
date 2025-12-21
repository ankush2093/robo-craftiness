'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      <header style={{
        ...styles.header,
        left: isMobile ? '0' : (isSidebarCollapsed ? '80px' : '250px'),
        width: isMobile ? '100%' : (isSidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 250px)'),
      }}>
        <div style={styles.headerContent}>
          {!isMobile && (
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              style={styles.toggleButton}
              aria-label="Toggle sidebar"
            >
              <i className={`fas fa-${isSidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
            </button>
          )}
          <div>
            <div style={styles.headerTitle}>Admin Dashboard</div>
            <div style={styles.headerSubtitle}>Manage Students & Analytics</div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        width: isSidebarCollapsed && !isMobile ? '80px' : '250px',
        transform: isMobile && !isMobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
      }}>
        <div style={styles.sidebarHeader}>
          {(!isSidebarCollapsed || isMobile) && <h2 style={styles.sidebarLogo}>Admin Panel</h2>}
          {isSidebarCollapsed && !isMobile && <h2 style={styles.sidebarLogoIcon}>A</h2>}
        </div>
        <nav style={styles.nav}>
          <Link 
            href="/admin/dashboard" 
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            style={{
              ...styles.navItem,
              ...(pathname === '/admin/dashboard' || pathname === '/admin' ? styles.navItemActive : {}),
              justifyContent: (isSidebarCollapsed && !isMobile) ? 'center' : 'flex-start',
            }}
            title={(isSidebarCollapsed && !isMobile) ? 'Dashboard' : ''}
          >
            <i className="fas fa-chart-line" style={{
              ...styles.navIcon,
              marginRight: (isSidebarCollapsed && !isMobile) ? '0' : '12px',
            }}></i>
            {(!isSidebarCollapsed || isMobile) && <span>Dashboard</span>}
          </Link>
          <Link 
            href="/admin/students" 
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            style={{
              ...styles.navItem,
              ...(pathname === '/admin/students' ? styles.navItemActive : {}),
              justifyContent: (isSidebarCollapsed && !isMobile) ? 'center' : 'flex-start',
            }}
            title={(isSidebarCollapsed && !isMobile) ? 'Student Details' : ''}
          >
            <i className="fas fa-users" style={{
              ...styles.navIcon,
              marginRight: (isSidebarCollapsed && !isMobile) ? '0' : '12px',
            }}></i>
            {(!isSidebarCollapsed || isMobile) && <span>Student Details</span>}
          </Link>
        </nav>
        <div style={styles.sidebarFooter}>
          <button 
            onClick={handleLogout} 
            style={{
              ...styles.logoutButton,
              justifyContent: (isSidebarCollapsed && !isMobile) ? 'center' : 'flex-start',
            }}
            title={(isSidebarCollapsed && !isMobile) ? 'Logout' : ''}
          >
            <i className="fas fa-sign-out-alt" style={{
              ...styles.navIcon,
              marginRight: (isSidebarCollapsed && !isMobile) ? '0' : '12px',
            }}></i>
            {(!isSidebarCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={styles.mobileMenuToggle}
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      )}

      {/* Main Content */}
      <main style={{
        ...styles.mainContent,
        marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '80px' : '250px'),
      }}>
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
    height: '70px',
    backgroundColor: '#0f3d66',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'left 0.3s ease, width 0.3s ease',
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  toggleButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    transition: 'background-color 0.2s',
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
    zIndex: 1000,
    transition: 'width 0.3s ease, transform 0.3s ease',
    overflow: 'hidden',
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarLogo: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    whiteSpace: 'nowrap',
  },
  sidebarLogoIcon: {
    margin: 0,
    fontSize: '24px',
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
    width: '20px',
    fontSize: '18px',
    flexShrink: 0,
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
    marginTop: '70px',
    flex: 1,
    padding: '30px',
    minHeight: 'calc(100vh - 70px)',
    transition: 'margin-left 0.3s ease',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 998,
  },
  mobileMenuToggle: {
    position: 'fixed',
    top: '15px',
    left: '15px',
    zIndex: 1001,
    backgroundColor: '#0f3d66',
    color: 'white',
    border: 'none',
    width: '45px',
    height: '45px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
  },
}

