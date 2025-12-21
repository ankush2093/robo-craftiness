import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabase'
import { comparePassword } from '../../../../lib/password'

export async function POST(request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Fetch admin from database
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single()

    if (error) {
      // Check if table doesn't exist
      if (error.code === 'PGRST205' || error.message?.includes('does not exist')) {
        console.error('Admins table does not exist. Please run schema.sql in Supabase.')
        return NextResponse.json(
          { 
            error: 'Database not set up. Please run schema.sql in Supabase SQL Editor first.',
            hint: 'The admins table does not exist. Run the SQL from schema.sql file in your Supabase dashboard.'
          },
          { status: 500 }
        )
      }
      console.error('Error fetching admin:', error)
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, admin.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create session token (simple approach - in production use JWT)
    // For now, we'll use a simple token stored in cookie
    const token = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64')
    
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        admin: {
          id: admin.id,
          username: admin.username
        },
        token
      },
      { status: 200 }
    )

    // Set httpOnly cookie for security
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

