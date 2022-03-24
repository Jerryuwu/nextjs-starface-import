import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

function isLoggedIn(): boolean {
  //TODO:check if user is logged in already
  return true
}

export function Middleware(req: NextRequest, e: NextFetchEvent) {
  if (isLoggedIn()) return
  return NextResponse.rewrite('http://localhost:3000/login')
}
export default Middleware
