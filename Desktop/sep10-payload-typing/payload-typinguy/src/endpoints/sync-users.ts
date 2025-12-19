import type { Endpoint } from 'payload/types'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ueeoxeuuozvsparoafuy.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZW94ZXV1b3p2c3Bhcm9hZnV5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzM0NDM2NiwiZXhwIjoyMDcyOTIwMzY2fQ.v5RszJMPz9f6zgxQ5kGBScqk_9o9ydGHg9zAnzOG_Yw'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export const syncUsersEndpoint: Endpoint = {
  path: '/sync-users',
  method: 'post',
  handler: async (req) => {
    try {
      // Fetch users from Supabase
      const { data: supabaseUsers, error } = await supabase.auth.admin.listUsers()
      
      if (error) {
        return Response.json({ 
          success: false, 
          error: error.message 
        }, { status: 500 })
      }

      let syncedCount = 0
      let createdCount = 0

      // For each Supabase user, create/update a Payload user
      for (const user of supabaseUsers.users) {
        const userData = {
          email: user.email || '',
          name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || user.email || 'Unknown User',
          // Add custom fields to store Supabase data
          supabase_id: user.id,
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          email_confirmed_at: user.email_confirmed_at,
          last_sign_in_at: user.last_sign_in_at,
          created_at: user.created_at,
        }

        try {
          // Check if user already exists by email
          const existingUsers = await req.payload.find({
            collection: 'users',
            where: { email: { equals: user.email } },
            limit: 1,
          })

          if (existingUsers.docs.length > 0) {
            // Update existing user
            await req.payload.update({
              collection: 'users',
              id: existingUsers.docs[0].id,
              data: userData,
            })
            syncedCount++
          } else {
            // Create new user
            await req.payload.create({
              collection: 'users',
              data: userData,
            })
            createdCount++
          }
        } catch (userError) {
          console.error(`Error processing user ${user.email}:`, userError)
        }
      }

      return Response.json({
        success: true,
        message: `Synced ${syncedCount} users, created ${createdCount} new users`,
        total: supabaseUsers.users.length
      })

    } catch (error) {
      console.error('Error syncing Supabase users:', error)
      return Response.json({ 
        success: false, 
        error: 'Failed to sync users' 
      }, { status: 500 })
    }
  },
}
