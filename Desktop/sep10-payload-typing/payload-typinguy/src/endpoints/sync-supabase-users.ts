import type { Endpoint } from 'payload/types'

export const syncSupabaseUsers: Endpoint = {
  path: '/sync/supabase-users',
  method: 'post',
  handler: async (req) => {
    try {
      // Import Supabase client dynamically to avoid build issues
      const { createClient } = await import('@supabase/supabase-js')
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

      if (!supabaseUrl || !supabaseServiceKey) {
        return Response.json({ 
          success: false, 
          error: 'Missing Supabase environment variables' 
        }, { status: 500 })
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey)

      // Fetch all users from Supabase Auth
      const { data: supabaseUsers, error } = await supabase.auth.admin.listUsers()
      
      if (error) {
        return Response.json({ 
          success: false, 
          error: error.message 
        }, { status: 500 })
      }

      // Get existing app users from Payload
      const existingUsers = await req.payload.find({
        collection: 'app-users',
        limit: 1000,
      })

      const existingUserIds = new Set(existingUsers.docs.map(user => user.supabaseId))

      const syncResults = {
        created: 0,
        updated: 0,
        errors: [] as string[],
        total: supabaseUsers.users.length
      }

      // Process each Supabase user
      for (const user of supabaseUsers.users) {
        try {
          const userData = {
            supabaseId: user.id,
            email: user.email || '',
            firstName: user.user_metadata?.first_name || '',
            lastName: user.user_metadata?.last_name || '',
            phone: user.phone || '',
            emailConfirmedAt: user.email_confirmed_at,
            createdAt: user.created_at,
            lastSignInAt: user.last_sign_in_at,
            isActive: !user.banned_until,
            userMetadata: user.user_metadata || {},
            appMetadata: user.app_metadata || {},
          }

          if (existingUserIds.has(user.id)) {
            // Update existing user
            await req.payload.update({
              collection: 'app-users',
              where: { supabaseId: { equals: user.id } },
              data: userData,
            })
            syncResults.updated++
          } else {
            // Create new user
            await req.payload.create({
              collection: 'app-users',
              data: userData,
            })
            syncResults.created++
          }
        } catch (error) {
          syncResults.errors.push(`Failed to sync user ${user.email}: ${error.message}`)
        }
      }

      return Response.json({
        success: true,
        message: 'Sync completed successfully',
        results: syncResults
      })

    } catch (error) {
      return Response.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }
  },
}