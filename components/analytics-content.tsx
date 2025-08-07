'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download, TrendingUp, TrendingDown, Users, Send, MessageCircle, Calendar } from 'lucide-react'

const responseRateData = [
  { date: '2024-01-01', rate: 18.5 },
  { date: '2024-01-02', rate: 22.3 },
  { date: '2024-01-03', rate: 19.8 },
  { date: '2024-01-04', rate: 25.1 },
  { date: '2024-01-05', rate: 28.4 },
  { date: '2024-01-06', rate: 24.7 },
  { date: '2024-01-07', rate: 26.9 },
]

const campaignPerformanceData = [
  { name: 'Tech Startup Outreach', sent: 150, responses: 38, meetings: 12, responseRate: 25.3 },
  { name: 'Enterprise Sales', sent: 89, responses: 21, meetings: 8, responseRate: 23.6 },
  { name: 'SaaS Founders', sent: 180, responses: 52, meetings: 18, responseRate: 28.9 },
  { name: 'Marketing Directors', sent: 95, responses: 19, meetings: 6, responseRate: 20.0 },
]

const industryData = [
  { name: 'Technology', value: 35, color: '#0A66C2' },
  { name: 'SaaS', value: 28, color: '#059669' },
  { name: 'Marketing', value: 20, color: '#D97706' },
  { name: 'Finance', value: 17, color: '#DC2626' },
]

const messageTemplateData = [
  { template: 'AI-Generated Personal', sent: 245, responses: 68, rate: 27.8 },
  { template: 'Industry Insight', sent: 189, responses: 42, rate: 22.2 },
  { template: 'Company News Reference', sent: 156, responses: 39, rate: 25.0 },
  { template: 'Mutual Connection', sent: 134, responses: 31, rate: 23.1 },
  { template: 'Generic Template', sent: 98, responses: 15, rate: 15.3 },
]

export function AnalyticsContent() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your LinkedIn outreach performance</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +18% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.1%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -0.5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Rate Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Response Rate Trends</CardTitle>
            <CardDescription>
              Daily response rates over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseRateData}>
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
                  stroke="#0A66C2" 
                  strokeWidth={3}
                  dot={{ fill: '#0A66C2', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Industry Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Industry Performance</CardTitle>
            <CardDescription>
              Response rates by target industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Response Rate']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>
            Detailed performance metrics for each campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead className="text-right">Messages Sent</TableHead>
                <TableHead className="text-right">Responses</TableHead>
                <TableHead className="text-right">Meetings</TableHead>
                <TableHead className="text-right">Response Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignPerformanceData.map((campaign) => (
                <TableRow key={campaign.name}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="text-right">{campaign.sent}</TableCell>
                  <TableCell className="text-right">{campaign.responses}</TableCell>
                  <TableCell className="text-right">{campaign.meetings}</TableCell>
                  <TableCell className="text-right">{campaign.responseRate}%</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        campaign.responseRate >= 25 
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : campaign.responseRate >= 20
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {campaign.responseRate >= 25 ? 'Excellent' : campaign.responseRate >= 20 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message Template Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Best Performing Message Templates</CardTitle>
          <CardDescription>
            Which message types generate the highest response rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Type</TableHead>
                <TableHead className="text-right">Messages Sent</TableHead>
                <TableHead className="text-right">Responses</TableHead>
                <TableHead className="text-right">Response Rate</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messageTemplateData
                .sort((a, b) => b.rate - a.rate)
                .map((template) => (
                <TableRow key={template.template}>
                  <TableCell className="font-medium">{template.template}</TableCell>
                  <TableCell className="text-right">{template.sent}</TableCell>
                  <TableCell className="text-right">{template.responses}</TableCell>
                  <TableCell className="text-right">{template.rate}%</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        template.rate >= 25 
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : template.rate >= 20
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {template.rate >= 25 ? 'Use More' : template.rate >= 20 ? 'Optimize' : 'Avoid'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
