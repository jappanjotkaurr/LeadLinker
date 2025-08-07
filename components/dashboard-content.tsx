'use client'

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
import { Users, Send, MessageCircle, Calendar, Plus, Upload, Zap } from 'lucide-react'

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

export function DashboardContent() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your sales automation overview.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-[#0A66C2] hover:bg-[#0A66C2]/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Prospects
          </Button>
          <Button variant="outline">
            <Zap className="mr-2 h-4 w-4" />
            Generate Messages
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +180 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Daily connection requests and responses over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="connections" 
                  stroke="#0A66C2" 
                  strokeWidth={2}
                  name="Connections"
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#059669" 
                  strokeWidth={2}
                  name="Responses"
                />
              </LineChart>
            </ResponsiveContainer>
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
            {[
              { name: 'Tech Startup Outreach', progress: 75, sent: 150, responses: 38 },
              { name: 'Enterprise Sales Campaign', progress: 45, sent: 89, responses: 21 },
              { name: 'SaaS Founders Network', progress: 90, sent: 200, responses: 52 },
            ].map((campaign, index) => (
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
