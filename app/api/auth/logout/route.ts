import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true })
    
    // Clear authentication cookies
    response.cookies.set('google_user', '', {
      httpOnly: true,
      maxAge: 0
    })
    
    response.cookies.set('google_access_token', '', {
      httpOnly: true,
      maxAge: 0
    })
    
    response.cookies.set('oauth_state', '', {
      httpOnly: true,
      maxAge: 0
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
