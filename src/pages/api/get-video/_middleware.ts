// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const country = req.geo?.country?.toLowerCase() || 'US'
  const isIOS = req.headers.get('user-agent')?.includes('iPhone') || false

  let response = NextResponse.next()

  response.headers.set('country', country)
  response.headers.set('isIOS', isIOS.toString())

  return response
}
