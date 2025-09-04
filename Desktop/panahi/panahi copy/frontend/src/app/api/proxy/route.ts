import { NextRequest, NextResponse } from 'next/server'

// Standard error response shape
interface ErrorResponse {
  code: string
  message: string
  details?: any
}

// Validate and sanitize the request
function validateRequest(req: NextRequest): ErrorResponse | null {
  const url = req.nextUrl.searchParams.get('endpoint')
  
  if (!url) {
    return {
      code: 'MISSING_ENDPOINT',
      message: 'Endpoint parameter is required'
    }
  }

  // Only allow safe endpoints (no admin routes, no auth routes)
  const forbiddenPatterns = [
    '/admin',
    '/auth',
    '/users/login',
    '/users/register',
    '/api-keys'
  ]

  if (forbiddenPatterns.some(pattern => url.includes(pattern))) {
    return {
      code: 'FORBIDDEN_ENDPOINT',
      message: 'This endpoint is not accessible through the proxy'
    }
  }

  return null
}

export async function GET(req: NextRequest) {
  try {
    // Validate the request
    const validationError = validateRequest(req)
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 })
    }

    const endpoint = req.nextUrl.searchParams.get('endpoint')!
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    
    // Construct the full URL to the Payload CMS
    const targetUrl = `${cmsUrl}/api${endpoint}`
    
    // Forward the request to Payload CMS
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward any relevant headers from the original request
        ...(req.headers.get('accept') && { 'Accept': req.headers.get('accept')! }),
        ...(req.headers.get('accept-language') && { 'Accept-Language': req.headers.get('accept-language')! }),
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({
        code: 'CMS_ERROR',
        message: 'Failed to fetch data from CMS',
        details: errorData
      }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Validate the request
    const validationError = validateRequest(req)
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 })
    }

    const endpoint = req.nextUrl.searchParams.get('endpoint')!
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    const targetUrl = `${cmsUrl}/api${endpoint}`
    
    // Get the request body
    const body = await req.json()
    
    // Forward the request to Payload CMS
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.get('accept') && { 'Accept': req.headers.get('accept')! }),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({
        code: 'CMS_ERROR',
        message: 'Failed to submit data to CMS',
        details: errorData
      }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred'
    }, { status: 500 })
  }
}
