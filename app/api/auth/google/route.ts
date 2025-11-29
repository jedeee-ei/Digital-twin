import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = '895041577466-pavq1deo456keff96f34monjke65v2k1.apps.googleusercontent.com'
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'

// Generate OAuth URL
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')

    if (action === 'signin') {
      // Generate a random state for security
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      
      // Build the Google OAuth URL with all required parameters
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'openid profile email',
        state: state,
        access_type: 'offline',
        prompt: 'consent'
      })
      
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
      
      // Create response and store state in cookie
      const response = NextResponse.redirect(googleAuthUrl)
      
      response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 10 // 10 minutes
      })
      
      return response
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('OAuth route error:', error)
    return NextResponse.json({ error: 'OAuth initialization failed' }, { status: 500 })
  }
}
