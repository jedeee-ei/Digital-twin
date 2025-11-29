import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = '895041577466-pavq1deo456keff96f34monjke65v2k1.apps.googleusercontent.com'

// Generate OAuth URL
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')

    if (action === 'signin') {
      // Construct redirect URI based on request origin
      const origin = request.nextUrl.origin
      const REDIRECT_URI = `${origin}/api/auth/google/callback`
      
      console.log('OAuth Signin - Origin:', origin)
      console.log('OAuth Signin - Redirect URI:', REDIRECT_URI)
      
      // Generate a random state for security
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      
      // Build the Google OAuth URL with minimal required parameters
      const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      googleAuthUrl.searchParams.set('client_id', CLIENT_ID)
      googleAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI)
      googleAuthUrl.searchParams.set('response_type', 'code')
      googleAuthUrl.searchParams.set('scope', 'openid email profile')
      googleAuthUrl.searchParams.set('state', state)
      
      console.log('OAuth Signin - URL:', googleAuthUrl.toString())
      
      // Create response and store state in cookie
      const response = NextResponse.redirect(googleAuthUrl.toString())
      
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
