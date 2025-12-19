'use client'

import { useState } from 'react'
import { Button } from '@payloadcms/ui'

export const SyncSupabaseUsers: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSync = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/sync/supabase-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (result.success) {
        setMessage(`✅ Sync completed! Created: ${result.results.created}, Updated: ${result.results.updated}`)
        // Refresh the page to show updated data
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setMessage(`❌ Sync failed: ${result.error}`)
      }
    } catch (error) {
      setMessage(`❌ Sync failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', margin: '20px 0' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>
        Supabase Users Sync
      </h3>
      <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
        Manually sync users from Supabase Auth to this collection.
      </p>
      <Button
        onClick={handleSync}
        disabled={isLoading}
        style={{ marginBottom: '10px' }}
      >
        {isLoading ? 'Syncing...' : 'Sync Users from Supabase'}
      </Button>
      {message && (
        <div style={{ 
          padding: '10px', 
          borderRadius: '4px', 
          backgroundColor: message.includes('✅') ? '#f0f9ff' : '#fef2f2',
          color: message.includes('✅') ? '#0369a1' : '#dc2626',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}
    </div>
  )
}
