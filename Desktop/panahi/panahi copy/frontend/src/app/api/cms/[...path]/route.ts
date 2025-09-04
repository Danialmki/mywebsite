import { NextRequest, NextResponse } from 'next/server'

// Standard error response shape
interface ErrorResponse {
  code: string
  message: string
  details?: any
}

// Validate and sanitize the request path
function validateRequest(path: string[]): ErrorResponse | null {
  // Only allow safe endpoints (no admin routes, no auth routes)
  const forbiddenPatterns = [
    'admin',
    'auth',
    'users/login',
    'users/register',
    'api-keys'
  ]

  if (forbiddenPatterns.some(pattern => path.some(segment => segment.includes(pattern)))) {
    return {
      code: 'FORBIDDEN_ENDPOINT',
      message: 'This endpoint is not accessible through the proxy'
    }
  }

  return null
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Validate the request
    const validationError = validateRequest(params.path)
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 })
    }

    const path = params.path.join('/')
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    const apiKey = process.env.CMS_API_KEY
    
    if (!apiKey) {
      console.error('CMS_API_KEY environment variable is not set')
      return NextResponse.json({
        code: 'CONFIGURATION_ERROR',
        message: 'Server configuration error'
      }, { status: 500 })
    }
    
    // Construct the full URL to the Payload CMS
    const targetUrl = `${cmsUrl}/api/${path}`
    
    // Forward the request to Payload CMS with API key authentication
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `users API-Key ${apiKey}`,
        // Forward any relevant headers from the original request
        ...(req.headers.get('accept') && { 'Accept': req.headers.get('accept')! }),
        ...(req.headers.get('accept-language') && { 'Accept-Language': req.headers.get('accept-language')! }),
      },
      cache: 'no-store'
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
    console.error('CMS proxy error:', error)
    return NextResponse.json({
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred'
    }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Validate the request
    const validationError = validateRequest(params.path)
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 })
    }

    const path = params.path.join('/')
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    const apiKey = process.env.CMS_API_KEY
    
    if (!apiKey) {
      console.error('CMS_API_KEY environment variable is not set')
      return NextResponse.json({
        code: 'CONFIGURATION_ERROR',
        message: 'Server configuration error'
      }, { status: 500 })
    }
    
    const targetUrl = `${cmsUrl}/api/${path}`
    
    // Get the request body
    const body = await req.json()
    
    // Forward the request to Payload CMS with API key authentication
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `users API-Key ${apiKey}`,
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
    console.error('CMS proxy error:', error)
    return NextResponse.json({
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred'
    }, { status: 500 })
  }
}
