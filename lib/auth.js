// Admin authentication utilities

export function verifyAdminToken(request) {
  try {
    const token = request.cookies.get('admin_token')?.value
    
    if (!token) {
      return null
    }

    // Decode token (simple approach - in production use JWT verification)
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [adminId] = decoded.split(':')
    
    if (!adminId) {
      return null
    }

    return { adminId }
  } catch (error) {
    return null
  }
}

export async function verifyAdmin(request) {
  const tokenData = verifyAdminToken(request)
  
  if (!tokenData) {
    return { isValid: false, admin: null }
  }

  // Verify admin still exists in database
  try {
    const { createServerClient } = await import('./supabase')
    const supabase = createServerClient()
    
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, username')
      .eq('id', tokenData.adminId)
      .single()

    if (error || !admin) {
      return { isValid: false, admin: null }
    }

    return { isValid: true, admin }
  } catch (error) {
    return { isValid: false, admin: null }
  }
}


