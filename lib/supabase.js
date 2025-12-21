import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client (uses service role key)
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log('=== Supabase Connection Check ===')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Present' : '❌ Missing')
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Present' : '❌ Missing')
  
  if (supabaseUrl) {
    console.log('Supabase URL:', supabaseUrl)
  }
  
  if (supabaseServiceKey) {
    // Show first and last 10 chars of key for verification (for debugging)
    const keyPreview = supabaseServiceKey.length > 20 
      ? `${supabaseServiceKey.substring(0, 20)}...${supabaseServiceKey.substring(supabaseServiceKey.length - 10)}`
      : 'Key too short'
    console.log('Service Role Key Preview:', keyPreview)
    console.log('Key Length:', supabaseServiceKey.length, 'characters')
  }
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables!')
    throw new Error('Missing Supabase environment variables')
  }

  const client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('✅ Supabase client created successfully!')
  console.log('==============================')
  
  return client
}

