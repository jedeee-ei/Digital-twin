import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const googleUser = request.cookies.get('google_user')?.value

    if (googleUser) {
      const user = JSON.parse(googleUser)
      return NextResponse.json({
        isLoggedIn: true,
        user: {
          email: user.email,
          name: user.name,
          picture: user.picture,
        }
      })
    }

    return NextResponse.json({ isLoggedIn: false })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ isLoggedIn: false }, { status: 500 })
  }
}
