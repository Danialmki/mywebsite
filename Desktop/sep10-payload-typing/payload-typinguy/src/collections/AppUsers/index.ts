import type { CollectionConfig } from 'payload/types'

export const AppUsers: CollectionConfig = {
  slug: 'app-users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt', 'lastSignInAt'],
    description: 'Read-only collection of Supabase Auth users from your TypinGuy app',
  },
  access: {
    read: () => true, // Allow reading for admin users
    create: () => false, // Read-only from admin UI
    update: () => false, // Read-only from admin UI
    delete: () => false, // Read-only from admin UI
  },
  fields: [
    {
      name: 'supabaseId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'Supabase Auth user ID',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'emailConfirmedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastSignInAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        readOnly: true,
        description: 'Whether the user account is active',
      },
    },
    {
      name: 'userMetadata',
      type: 'json',
      admin: {
        readOnly: true,
        description: 'Additional user metadata from Supabase',
      },
    },
    {
      name: 'appMetadata',
      type: 'json',
      admin: {
        readOnly: true,
        description: 'Application-specific metadata from Supabase',
      },
    },
  ],
  timestamps: true,
  versions: false, // Disable versions for read-only data
}
