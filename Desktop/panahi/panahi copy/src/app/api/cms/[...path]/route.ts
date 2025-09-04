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
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await the params to get the path
    const { path } = await params
    
    // Validate the request
    const validationError = validateRequest(path)
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 })
    }

    const pathString = path.join('/')
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    const apiKey = process.env.CMS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({
        code: 'MISSING_API_KEY',
        message: 'CMS API key is not configured'
      }, { status: 500 })
    }

    // Forward the request to the CMS with the API key
    const response = await fetch(`${cmsUrl}/api/${pathString}`, {
      method: 'GET',
      headers: {
        'Authorization': `users API-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    const data = await response.text()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      }
    })

  } catch (error) {
    console.error('CMS proxy error:', error)
    return NextResponse.json({
      code: 'PROXY_ERROR',
      message: 'Failed to proxy request to CMS',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await the params to get the path
    const { path } = await params
    
    // Validate the request
    const validationError = validateRequest(path)
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 })
    }

    const pathString = path.join('/')
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    const apiKey = process.env.CMS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({
        code: 'MISSING_API_KEY',
        message: 'CMS API key is not configured'
      }, { status: 500 })
    }

    const body = await req.text()

    // Forward the request to the CMS with the API key
    const response = await fetch(`${cmsUrl}/api/${pathString}`, {
      method: 'POST',
      headers: {
        'Authorization': `users API-Key ${apiKey}`,
        'Content-Type': req.headers.get('Content-Type') || 'application/json',
      },
      body
    })

    const data = await response.text()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      }
    })

  } catch (error) {
    console.error('CMS proxy error:', error)
    return NextResponse.json({
      code: 'PROXY_ERROR',
      message: 'Failed to proxy request to CMS',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
