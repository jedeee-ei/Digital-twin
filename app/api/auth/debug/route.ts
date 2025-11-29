import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    clientIdConfigured: !!process.env.GOOGLE_CLIENT_ID,
    clientSecretConfigured: !!process.env.GOOGLE_CLIENT_SECRET,
    redirectUriConfigured: !!process.env.GOOGLE_REDIRECT_URI,
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'NOT SET',
    origin: request.nextUrl.origin,
    timestamp: new Date().toISOString()
  })
}
