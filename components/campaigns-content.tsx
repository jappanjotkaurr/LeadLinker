'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import CampaignModal from '@/components/campaign-modal'
import { Plus, Play, Pause, MoreHorizontal, Users, Send, MessageCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const campaigns = [
  {
    id: 1,
    name: 'Tech Startup Outreach',
    status: 'active',
    progress: 75,
    prospects: 200,
    sent: 150,
    responses: 38,
    responseRate: 25.3,
    createdAt: '2024-01-15',
    industry: 'Technology',
    goal: 'Generate leads for our SaaS platform'
  },
  {
    id: 2,
    name: 'Enterprise Sales Campaign',
    status: 'paused',
    progress: 45,
    prospects: 150,
    sent: 89,
    responses: 21,
    responseRate: 23.6,
    createdAt: '2024-01-10',
    industry: 'Enterprise',
    goal: 'Book demos with enterprise clients'
  },
  {
    id: 3,
    name: 'SaaS Founders Network',
    status: 'completed',
    progress: 100,
    prospects: 180,
    sent: 180,
    responses: 52,
    responseRate: 28.9,
    createdAt: '2024-01-05',
    industry: 'SaaS',
    goal: 'Connect with SaaS founders for partnerships'
  },
]

export function CampaignsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your LinkedIn outreach campaigns</p>
        </div>
        <Button 
          className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, c) => sum + c.prospects, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Rate</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(campaigns.reduce((sum, c) => sum + c.responseRate, 0) / campaigns.length).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {campaign.industry} • Created {new Date(campaign.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        {campaign.status === 'active' ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Campaign
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Resume Campaign
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Campaign
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Goal:</strong> {campaign.goal}
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {campaign.prospects}
                    </div>
                    <div className="text-sm text-gray-500">Prospects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {campaign.sent}
                    </div>
                    <div className="text-sm text-gray-500">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {campaign.responses}
                    </div>
                    <div className="text-sm text-gray-500">Responses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {campaign.responseRate}%
                    </div>
                    <div className="text-sm text-gray-500">Response Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CampaignModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
