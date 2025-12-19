import type { Endpoint } from 'payload/types'

interface SupabaseWebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: any
  old_record?: any
  schema: string
}

export const supabaseWebhook: Endpoint = {
  path: '/webhooks/supabase-user',
  method: 'post',
  handler: async (req) => {
    try {
      const payload: SupabaseWebhookPayload = await req.json()

      // Only process auth.users table events
      if (payload.table !== 'users' || payload.schema !== 'auth') {
        return Response.json({ 
          success: true, 
          message: 'Event not relevant to auth.users' 
        })
      }

      const { type, record, old_record } = payload

      switch (type) {
        case 'INSERT':
        case 'UPDATE':
          await upsertAppUser(req, record)
          break
        case 'DELETE':
          await deleteAppUser(req, old_record?.id)
          break
        default:
          return Response.json({ 
            success: false, 
            error: `Unsupported event type: ${type}` 
          }, { status: 400 })
      }

      return Response.json({
        success: true,
        message: `Successfully processed ${type} event for user ${record?.email || old_record?.email}`
      })

    } catch (error) {
      return Response.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }
  },
}

async function upsertAppUser(req: any, user: any) {
  const userData = {
    supabaseId: user.id,
    email: user.email || '',
    firstName: user.raw_user_meta_data?.first_name || '',
    lastName: user.raw_user_meta_data?.last_name || '',
    phone: user.phone || '',
    emailConfirmedAt: user.email_confirmed_at,
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at,
    isActive: !user.banned_until,
    userMetadata: user.raw_user_meta_data || {},
    appMetadata: user.raw_app_meta_data || {},
  }

  // Check if user exists
  const existingUsers = await req.payload.find({
    collection: 'app-users',
    where: { supabaseId: { equals: user.id } },
    limit: 1,
  })

  if (existingUsers.docs.length > 0) {
    // Update existing user
    await req.payload.update({
      collection: 'app-users',
      where: { supabaseId: { equals: user.id } },
      data: userData,
    })
  } else {
    // Create new user
    await req.payload.create({
      collection: 'app-users',
      data: userData,
    })
  }
}

async function deleteAppUser(req: any, supabaseId: string) {
  if (!supabaseId) return

  const existingUsers = await req.payload.find({
    collection: 'app-users',
    where: { supabaseId: { equals: supabaseId } },
    limit: 1,
  })

  if (existingUsers.docs.length > 0) {
    await req.payload.delete({
      collection: 'app-users',
      where: { supabaseId: { equals: supabaseId } },
    })
  }
}
