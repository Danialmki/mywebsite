import { NextRequest, NextResponse } from 'next/server'

// Standard error response shape
interface ErrorResponse {
  code: string
  message: string
  details?: any
}

// Standard success response shape
interface AuthResponse {
  success: boolean
  message: string
  user?: any
  token?: string
}

// Validate CSRF token for sensitive operations
function validateCSRF(req: NextRequest): boolean {
  const csrfToken = req.headers.get('x-csrf-token')
  const origin = req.headers.get('origin')
  
  // In production, you should validate against a stored CSRF token
  // For now, we'll check if the request is from an allowed origin
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    'https://YOUR-FRONTEND.DOMAIN' // Replace with your actual frontend domain
  ]
  
  return allowedOrigins.includes(origin || '') && !!csrfToken
}

// Set secure cookies for authentication
function setAuthCookies(response: NextResponse, token: string, user: any) {
  const isProduction = process.env.NODE_ENV === 'production'
  
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
  
  // Set user info in a separate cookie (non-sensitive data only)
  response.cookies.set('user-info', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }), {
    httpOnly: false, // Allow client-side access
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { action: string[] } }
) {
  try {
    const action = params.action[0]
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'
    
    // Validate CSRF for sensitive operations
    if (['login', 'register', 'logout'].includes(action) && !validateCSRF(req)) {
      return NextResponse.json({
        code: 'CSRF_ERROR',
        message: 'Invalid CSRF token'
      }, { status: 403 })
    }

    switch (action) {
      case 'login': {
        const { email, password } = await req.json()
        
        if (!email || !password) {
          return NextResponse.json({
            code: 'VALIDATION_ERROR',
            message: 'Email and password are required'
          }, { status: 400 })
        }

        // Use credentials: 'include' for cookie-based auth
        const response = await fetch(`${cmsUrl}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        })

        if (!response.ok) {
          const error = await response.json()
          return NextResponse.json({
            code: 'AUTH_ERROR',
            message: 'Invalid credentials',
            details: error
          }, { status: 401 })
        }

        const data = await response.json()
        const authResponse = NextResponse.json({
          success: true,
          message: 'Login successful',
          user: data.user
        })

        // Set secure cookies
        setAuthCookies(authResponse, data.token, data.user)
        
        return authResponse
      }

      case 'register': {
        const userData = await req.json()
        
        // Validate required fields
        if (!userData.email || !userData.password || !userData.name) {
          return NextResponse.json({
            code: 'VALIDATION_ERROR',
            message: 'Name, email, and password are required'
          }, { status: 400 })
        }

        // Create user
        const createResponse = await fetch(`${cmsUrl}/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          credentials: 'include'
        })

        if (!createResponse.ok) {
          const error = await createResponse.json()
          return NextResponse.json({
            code: 'REGISTRATION_ERROR',
            message: 'Registration failed',
            details: error
          }, { status: 400 })
        }

        const createResult = await createResponse.json()

        // Login the user
        const loginResponse = await fetch(`${cmsUrl}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
          credentials: 'include'
        })

        if (!loginResponse.ok) {
          return NextResponse.json({
            code: 'LOGIN_ERROR',
            message: 'Registration successful but login failed'
          }, { status: 500 })
        }

        const loginResult = await loginResponse.json()
        const authResponse = NextResponse.json({
          success: true,
          message: 'Registration successful',
          user: createResult.doc
        })

        // Set secure cookies
        setAuthCookies(authResponse, loginResult.token, createResult.doc)
        
        return authResponse
      }

      case 'logout': {
        const authResponse = NextResponse.json({
          success: true,
          message: 'Logout successful'
        })

        // Clear auth cookies
        authResponse.cookies.delete('auth-token')
        authResponse.cookies.delete('user-info')
        
        return authResponse
      }

      case 'me': {
        const token = req.cookies.get('auth-token')?.value
        
        if (!token) {
          return NextResponse.json({
            code: 'NO_TOKEN',
            message: 'No authentication token found'
          }, { status: 401 })
        }

        const response = await fetch(`${cmsUrl}/api/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include'
        })

        if (!response.ok) {
          return NextResponse.json({
            code: 'AUTH_ERROR',
            message: 'Invalid or expired token'
          }, { status: 401 })
        }

        const user = await response.json()
        return NextResponse.json({
          success: true,
          user: user.user
        })
      }

      default:
        return NextResponse.json({
          code: 'INVALID_ACTION',
          message: 'Invalid authentication action'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred'
    }, { status: 500 })
  }
}
