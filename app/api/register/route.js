import { NextResponse } from 'next/server'

// In-memory storage (replace with database in production)
let registrations = []

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

    // Create registration object
    const registration = {
      id: Date.now().toString(),
      fullName,
      mobileNumber,
      email,
      preferredLanguage,
      appliedFor,
      timestamp: new Date().toISOString()
    }

    // Store registration (in production, save to database)
    registrations.push(registration)
    
    // Log to console (in production, save to database)
    console.log('New Registration:', registration)

    return NextResponse.json(
      { 
        message: 'Registration successful',
        registration 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to view registrations (for admin/testing)
export async function GET() {
  return NextResponse.json(
    { 
      count: registrations.length,
      registrations 
    },
    { status: 200 }
  )
}

