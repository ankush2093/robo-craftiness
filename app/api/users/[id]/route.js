import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabase'
import { verifyAdmin } from '../../../../lib/auth'

// GET single user by ID (admin only)
export async function GET(request, { params }) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdmin(request)
    
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin login required.' },
        { status: 401 }
      )
    }

    const { id } = params
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to fetch user', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ user: data }, { status: 200 })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

// PUT/PATCH - Update user (admin only)
export async function PUT(request, { params }) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdmin(request)
    
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin login required.' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    
    // Extract allowed fields for update
    const { full_name, mobile_number, email, preferred_language, applied_for } = body

    // Build update object (only include provided fields)
    const updateData = {}
    if (full_name !== undefined) updateData.full_name = full_name
    if (mobile_number !== undefined) updateData.mobile_number = mobile_number
    if (email !== undefined) updateData.email = email
    if (preferred_language !== undefined) updateData.preferred_language = preferred_language
    if (applied_for !== undefined) updateData.applied_for = applied_for

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        )
      }
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to update user', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'User updated successfully', user: data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

// DELETE user (admin only)
export async function DELETE(request, { params }) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdmin(request)
    
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin login required.' },
        { status: 401 }
      )
    }

    const { id } = params
    const supabase = createServerClient()

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete user', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}


