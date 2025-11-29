import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = '895041577466-pavq1deo456keff96f34monjke65v2k1.apps.googleusercontent.com'
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const storedState = request.cookies.get('oauth_state')?.value

    // Log for debugging
    console.log('OAuth Callback received - Error:', error, 'Code present:', !!code, 'State match:', state === storedState)

    // Handle OAuth errors from Google
    if (error) {
      console.error('OAuth error from Google:', error)
      return NextResponse.redirect(`${request.nextUrl.origin}?error=${error}`)
    }

    // Validate state parameter
    if (!state || state !== storedState) {
      console.error('State mismatch - received:', state, 'stored:', storedState)
      return NextResponse.redirect(`${request.nextUrl.origin}?error=invalid_state`)
    }

    if (!code) {
      console.error('No authorization code received')
      return NextResponse.redirect(`${request.nextUrl.origin}?error=no_code`)
    }

    if (!CLIENT_SECRET) {
      console.error('CLIENT_SECRET not configured')
      return NextResponse.redirect(`${request.nextUrl.origin}?error=config_error`)
    }

    // Construct redirect URI based on request origin
    const origin = request.nextUrl.origin
    const REDIRECT_URI = `${origin}/api/auth/google/callback`

    console.log('Token exchange - Origin:', origin)
    console.log('Token exchange - Redirect URI:', REDIRECT_URI)

    // Exchange code for token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }).toString(),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      console.error('Token exchange failed:', tokenData)
      return NextResponse.redirect(`${request.nextUrl.origin}?error=token_exchange_failed`)
    }

    console.log('Token exchange successful')

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    if (!userData.email) {
      console.error('Could not get user email from Google')
      return NextResponse.redirect(`${request.nextUrl.origin}?error=no_user_email`)
    }

    console.log('User authenticated:', userData.email)

    // Create response that redirects back to home with login data
    const response = NextResponse.redirect(request.nextUrl.origin)

    // Store user info in cookie/session
    response.cookies.set('google_user', JSON.stringify({
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      id: userData.id,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    response.cookies.set('google_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in || 3600
    })

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(`${request.nextUrl.origin}?error=callback_error&details=${error instanceof Error ? error.message : 'unknown'}`)
  }
}
