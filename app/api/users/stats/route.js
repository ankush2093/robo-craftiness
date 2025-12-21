import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabase'
import { verifyAdmin } from '../../../../lib/auth'

// GET statistics for users (admin only)
export async function GET(request) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdmin(request)
    
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin login required.' },
        { status: 401 }
      )
    }

    const supabase = createServerClient()

    // Get all users for statistics calculation
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users for stats:', error)
      return NextResponse.json(
        { error: 'Failed to fetch statistics', details: error.message },
        { status: 500 }
      )
    }

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    const weekStart = new Date(todayStart)
    weekStart.setDate(weekStart.getDate() - 7)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
    const yearStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)

    // Calculate statistics
    const stats = {
      total: users.length,
      today: users.filter(user => new Date(user.created_at) >= todayStart).length,
      weekly: users.filter(user => new Date(user.created_at) >= weekStart).length,
      monthly: users.filter(user => new Date(user.created_at) >= monthStart).length,
      yearly: users.filter(user => new Date(user.created_at) >= yearStart).length,
      courseWise: {}
    }

    // Calculate course-wise statistics
    users.forEach(user => {
      const course = user.applied_for || 'Not Specified'
      stats.courseWise[course] = (stats.courseWise[course] || 0) + 1
    })

    return NextResponse.json({ stats }, { status: 200 })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

