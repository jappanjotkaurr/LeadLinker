'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { Users, Send, MessageCircle, Calendar, Plus, Upload, Zap, RefreshCw, Bell, TrendingUp, Activity } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Static chart data to ensure it always renders
const chartData = [
  { date: '2024-01-01', connections: 12, responses: 3 },
  { date: '2024-01-02', connections: 15, responses: 5 },
  { date: '2024-01-03', connections: 8, responses: 2 },
  { date: '2024-01-04', connections: 20, responses: 8 },
  { date: '2024-01-05', connections: 18, responses: 6 },
  { date: '2024-01-06', connections: 25, responses: 10 },
  { date: '2024-01-07', connections: 22, responses: 9 },
]

const recentActivity = [
  {
    id: 1,
    action: 'Campaign "Tech Startup Outreach" launched',
    time: '2 hours ago',
    status: 'success'
  },
  {
    id: 2,
    action: 'New connection accepted from Sarah Johnson',
    time: '4 hours ago',
    status: 'success'
  },
  {
    id: 3,
    action: 'Follow-up message sent to 15 prospects',
    time: '6 hours ago',
    status: 'info'
  },
  {
    id: 4,
    action: 'Meeting booked with David Chen',
    time: '1 day ago',
    status: 'success'
  },
]

const activeCampaigns = [
  { name: 'Tech Startup Outreach', progress: 75, sent: 150, responses: 38 },
  { name: 'Enterprise Sales Campaign', progress: 45, sent: 89, responses: 21 },
  { name: 'SaaS Founders Network', progress: 90, sent: 200, responses: 52 },
]

export function RealtimeDashboard() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Activity className="mr-3 h-8 w-8 text-[#2563EB]" />
            Live Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
            Real-time LinkedIn automation overview
            <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
              Live
            </Badge>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Prospects
          </Button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +180 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +12 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Live Performance
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse" />
            </CardTitle>
            <CardDescription>
              Real-time connection requests and responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    className="text-gray-600"
                  />
                  <YAxis className="text-gray-600" />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="connections" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    name="Connections"
                    dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responses" 
                    stroke="#059669" 
                    strokeWidth={3}
                    name="Responses"
                    dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions from your campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>
            Your currently running outreach campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{campaign.name}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <Progress value={campaign.progress} className="w-32" />
                    <span className="text-sm text-gray-500">{campaign.progress}% complete</span>
                  </div>
                </div>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>{campaign.sent} sent</span>
                  <span>{campaign.responses} responses</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
