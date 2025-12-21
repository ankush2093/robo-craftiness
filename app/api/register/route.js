import { NextResponse } from 'next/server'
import { createServerClient } from '../../../lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    const { fullName, mobileNumber, email, preferredLanguage, appliedFor } = body

    // Validation
    if (!fullName || !mobileNumber || !email || !preferredLanguage || !appliedFor) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    console.log('🔄 Initializing Supabase client...')
    const supabase = createServerClient()
    console.log('✅ Supabase client initialized')

    // Insert data into Users table (trying both Users and users)
    // First try 'Users' (if created with quotes), then 'users' (PostgreSQL default)
    let data, error
    let tableName = 'Users'
    
    // Build insert object - try with applied_for first
    const insertData = {
      full_name: fullName,
      mobile_number: mobileNumber,
      email: email,
      preferred_language: preferredLanguage,
      applied_for: appliedFor,
      created_at: new Date().toISOString()
    }
    
    const result = await supabase
      .from(tableName)
      .insert([insertData])
      .select()
    
    data = result.data
    error = result.error

    // If Users doesn't work, try users (lowercase)
    if (error && error.code === 'PGRST205') {
      tableName = 'users'
      const result2 = await supabase
        .from(tableName)
        .insert([insertData])
        .select()
      
      data = result2.data
      error = result2.error
    }
    
    // If error is due to missing applied_for column, retry without it
    if (error && error.code === 'PGRST204' && error.message?.includes('applied_for')) {
      console.warn('⚠️ applied_for column not found, inserting without it')
      const insertDataWithoutAppliedFor = {
        full_name: fullName,
        mobile_number: mobileNumber,
        email: email,
        preferred_language: preferredLanguage,
        created_at: new Date().toISOString()
      }
      
      const result3 = await supabase
        .from(tableName)
        .insert([insertDataWithoutAppliedFor])
        .select()
      
      data = result3.data
      error = result3.error
      
      // Log that applied_for data was not saved
      if (!error) {
        console.warn(`⚠️ Note: applied_for value "${appliedFor}" was not saved - column doesn't exist in database`)
      }
    }

    if (error) {
      console.error('Supabase error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }

      // Return detailed error for debugging
      return NextResponse.json(
        { 
          error: 'Failed to save registration. Please check if the table exists in Supabase.',
          details: error.message,
          code: error.code,
          hint: error.hint || 'Make sure the table "Users" or "users" exists with columns: full_name, mobile_number, email, preferred_language, created_at (applied_for is optional)'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Registration successful',
        registration: data[0]
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    console.error('Error stack:', error.stack)
    
    // Check if it's a missing environment variables error
    if (error.message?.includes('Missing Supabase environment variables')) {
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message
      },
      { status: 500 }
    )
  }
}

// GET endpoint to view registrations (for admin/testing) and test connection
export async function GET() {
  try {
    console.log('🔄 GET /api/register - Testing Supabase connection...')
    const supabase = createServerClient()
    
    console.log('🔍 Attempting to fetch from Users table...')
    // Try Users first, then users
    let result = await supabase
      .from('Users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (result.error && result.error.code === 'PGRST205') {
      console.log('⚠️ Users table not found, trying users table...')
      result = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
    }

    if (result.error) {
      console.error('❌ Supabase error:', result.error)
      return NextResponse.json(
        { 
          error: 'Failed to fetch registrations',
          details: result.error.message,
          code: result.error.code,
          hint: 'Make sure the table "Users" or "users" exists in Supabase'
        },
        { status: 500 }
      )
    }

    console.log('✅ Successfully fetched', result.data?.length || 0, 'registrations')
    return NextResponse.json(
      { 
        count: result.data?.length || 0,
        registrations: result.data || [],
        message: 'Connection successful!'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ GET registrations error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
