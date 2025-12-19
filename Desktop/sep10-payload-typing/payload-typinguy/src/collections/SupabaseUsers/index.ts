import type { CollectionConfig } from 'payload/types'

export const SupabaseUsers: CollectionConfig = {
  slug: 'supabase-users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'created_at', 'last_sign_in_at'],
  },
  access: {
    read: () => true, // Allow reading for now
    create: () => false, // Don't allow creating through Payload
    update: () => false, // Don't allow updating through Payload
    delete: () => false, // Don't allow deleting through Payload
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'first_name',
      type: 'text',
    },
    {
      name: 'last_name',
      type: 'text',
    },
    {
      name: 'created_at',
      type: 'date',
    },
    {
      name: 'last_sign_in_at',
      type: 'date',
    },
    {
      name: 'email_confirmed_at',
      type: 'date',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'confirmed_at',
      type: 'date',
    },
    {
      name: 'recovery_sent_at',
      type: 'date',
    },
    {
      name: 'last_recovery_sent_at',
      type: 'date',
    },
    {
      name: 'email_change_sent_at',
      type: 'date',
    },
    {
      name: 'new_email',
      type: 'email',
    },
    {
      name: 'invited_at',
      type: 'date',
    },
    {
      name: 'action_link',
      type: 'text',
    },
    {
      name: 'email_change',
      type: 'text',
    },
    {
      name: 'email_change_token_current',
      type: 'text',
    },
    {
      name: 'email_change_confirm_status',
      type: 'number',
    },
    {
      name: 'banned_until',
      type: 'date',
    },
    {
      name: 'reauthentication_token',
      type: 'text',
    },
    {
      name: 'reauthentication_sent_at',
      type: 'date',
    },
    {
      name: 'is_sso_user',
      type: 'checkbox',
    },
    {
      name: 'deleted_at',
      type: 'date',
    },
    {
      name: 'is_anonymous',
      type: 'checkbox',
    },
    {
      name: 'app_metadata',
      type: 'json',
    },
    {
      name: 'user_metadata',
      type: 'json',
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'aud',
      type: 'text',
    },
    {
      name: 'aal',
      type: 'text',
    },
    {
      name: 'not_before',
      type: 'date',
    },
    {
      name: 'referrer_id',
      type: 'text',
    },
    {
      name: 'channel',
      type: 'text',
    },
  ],
  timestamps: false, // Supabase handles timestamps
}
