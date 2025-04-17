import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
  const token = request.nextUrl.searchParams.get('token')
 
  if (!token || (token !== process.env.REVALIDATE_KEY)) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Invalid Token',
    })
  }

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}