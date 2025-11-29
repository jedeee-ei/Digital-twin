import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = '895041577466-pavq1deo456keff96f34monjke65v2k1.apps.googleusercontent.com'
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your_client_secret_here'
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'

// Generate OAuth URL
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')

  if (action === 'signin') {
    // Generate a random state for security
    const state = Math.random().toString(36).substring(2, 15)
    
    // Store state in session/cookie (you could use a more secure method)
    const response = NextResponse.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `response_type=code&` +
      `scope=openid profile email&` +
      `state=${state}`
    )
    
    // Store state in cookie
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10 // 10 minutes
    })
    
    return response
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
