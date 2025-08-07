'use client'

import { useState, useEffect } from 'react'
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
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { RefreshCw, TrendingUp, TrendingDown, Users, MessageSquare, Target, Award } from 'lucide-react'

// Static data to ensure charts always render
const responseRateData = [
  { date: '2024-01-01', rate: 12 },
  { date: '2024-01-02', rate: 15 },
  { date: '2024-01-03', rate: 18 },
  { date: '2024-01-04', rate: 22 },
  { date: '2024-01-05', rate: 19 },
  { date: '2024-01-06', rate: 25 },
  { date: '2024-01-07', rate: 28 }
]

const industryData = [
  { industry: 'Technology', rate: 32, count: 145 },
  { industry: 'Finance', rate: 28, count: 89 },
  { industry: 'Healthcare', rate: 24, count: 67 },
  { industry: 'Marketing', rate: 35, count: 123 },
  { industry: 'Sales', rate: 29, count: 98 }
]

const campaignPerformanceData = [
  { name: 'Tech Outreach Q1', sent: 450, responses: 89, rate: 19.8 },
  { name: 'Finance Leaders', sent: 320, responses: 76, rate: 23.8 },
  { name: 'Startup Founders', sent: 280, responses: 84, rate: 30.0 },
  { name: 'Marketing VPs', sent: 190, responses: 67, rate: 35.3 }
]

const COLORS = ['#2563EB', '#7C3AED', '#DC2626', '#059669', '#D97706']

export function AnalyticsContent() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your LinkedIn outreach performance and insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="bg-[#2563EB] hover:bg-[#2563EB]/90"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Connections
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  1,247
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
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
                  28.4%
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+3.2%</span>
              <span className="text-sm text-gray-500 ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-gray-600 font-medium">4 performing well</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  15.7%
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-red-600 font-medium">-1.1%</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Rate Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Response Rate Trends</CardTitle>
            <CardDescription>Daily response rates over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [`${value}%`, 'Response Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#2563EB" 
                  strokeWidth={3}
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Industry Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Industry Performance</CardTitle>
            <CardDescription>Response rates by target industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'rate' ? `${value}%` : value,
                    name === 'rate' ? 'Response Rate' : 'Total Sent'
                  ]}
                />
                <Bar dataKey="rate" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Detailed performance metrics for your active campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignPerformanceData.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{campaign.name}</h4>
                  <p className="text-sm text-gray-500">
                    {campaign.sent} sent • {campaign.responses} responses
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {campaign.rate}%
                    </p>
                    <p className="text-sm text-gray-500">Response Rate</p>
                  </div>
                  <Progress value={campaign.rate} className="w-20" />
                  <Badge 
                    variant={campaign.rate > 25 ? "default" : campaign.rate > 15 ? "secondary" : "destructive"}
                  >
                    {campaign.rate > 25 ? "Excellent" : campaign.rate > 15 ? "Good" : "Needs Work"}
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
