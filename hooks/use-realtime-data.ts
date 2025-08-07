'use client'

import { useState, useEffect, useCallback } from 'react'

interface RealtimeData {
  campaigns: any[]
  prospects: any[]
  messages: any[]
  analytics: any
  notifications: any[]
  lastUpdated: Date
}

export function useRealtimeData() {
  const [data, setData] = useState<RealtimeData>({
    campaigns: [],
    prospects: [],
    messages: [],
    analytics: {},
    notifications: [],
    lastUpdated: new Date()
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/dashboard-data')
      if (!response.ok) throw new Error('Failed to fetch data')
      
      const newData = await response.json()
      setData({
        ...newData,
        lastUpdated: new Date()
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000)
    
    return () => clearInterval(interval)
  }, [fetchData])

  const updateCampaign = useCallback(async (campaignId: string, updates: any) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (response.ok) {
        await fetchData() // Refresh data after update
      }
    } catch (err) {
      console.error('Failed to update campaign:', err)
    }
  }, [fetchData])

  const addProspect = useCallback(async (prospectData: any) => {
    try {
      const response = await fetch('/api/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prospectData)
      })
      
      if (response.ok) {
        await fetchData()
      }
    } catch (err) {
      console.error('Failed to add prospect:', err)
    }
  }, [fetchData])

  const sendMessage = useCallback(async (messageData: any) => {
    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      })
      
      if (response.ok) {
        await fetchData()
      }
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
    updateCampaign,
    addProspect,
    sendMessage
  }
}
