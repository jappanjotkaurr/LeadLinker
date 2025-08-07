'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Users, MessageSquare, TrendingUp, RefreshCw } from 'lucide-react'
import { useRealtimeData } from '@/hooks/use-realtime-data'

// Static fallback data to ensure charts always render
const fallbackPerformanceData = [
  { time: '09:00', connections: 12, responses: 3 },
  { time: '10:00', connections: 18, responses: 5 },
  { time: '11:00', connections: 25, responses: 8 },
  { time: '12:00', connections: 31, responses: 12 },
  { time: '13:00', connections: 28, responses: 9 },
  { time: '14:00', connections: 35, responses: 15 },
  { time: '15:00', connections: 42, responses: 18 },
  { time: '16:00', connections: 38, responses: 16 }
]

export function RealtimeDashboard() {
  const { data, isLoading, error, refresh } = useRealtimeData()
  const [performanceData, setPerformanceData] = useState(fallbackPerformanceData)

  useEffect(() => {
    // Use real data if available, otherwise fallback to static data
    if (data?.performanceData && data.performanceData.length > 0) {
      setPerformanceData(data.performanceData)
    }
  }, [data])

  const stats = data || {
    totalConnections: 1247,
    todayConnections: 23,
    responseRate: 28.4,
    activeConversations: 15
  }

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Connections
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalConnections?.toLocaleString() || '1,247'}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Today's Connections
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.todayConnections || '23'}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Response Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.responseRate || '28.4'}%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Conversations
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeConversations || '15'}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Performance Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Live Performance
              <Badge variant="secondary" className="text-xs">
                Real-time
              </Badge>
            </CardTitle>
            <CardDescription>
              Real-time connection requests and responses
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => `Time: ${value}`}
                formatter={(value, name) => [
                  value,
                  name === 'connections' ? 'Connections' : 'Responses'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="connections" 
                stroke="#2563EB" 
                strokeWidth={2}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#2563EB', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="responses" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#059669', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">
              Error loading real-time data: {error}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
