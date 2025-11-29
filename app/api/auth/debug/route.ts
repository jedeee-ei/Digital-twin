import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    clientIdConfigured: !!process.env.GOOGLE_CLIENT_ID,
    clientSecretConfigured: !!process.env.GOOGLE_CLIENT_SECRET,
    origin: request.nextUrl.origin,
    autoDetectedRedirectUri: `${request.nextUrl.origin}/api/auth/google/callback`,
    timestamp: new Date().toISOString()
  })
}
