'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileText, Download, User, Briefcase, Activity, MessageSquare, Loader2 } from 'lucide-react'

interface LeadBriefProps {
  prospect: {
    id: number
    name: string
    jobTitle: string
    company: string
    location: string
    industry: string
    avatar?: string
    engagementScore: number
    lastActivity: string
  }
}

export function PdfLeadBrief({ prospect }: LeadBriefProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [briefData, setBriefData] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Mock data for the brief - in production, this would come from LinkedIn API
  const generateBriefData = () => {
    return {
      basicInfo: {
        name: prospect.name,
        title: prospect.jobTitle,
        company: prospect.company,
        location: prospect.location,
        industry: prospect.industry,
        experience: '8+ years',
        connections: '2,500+',
        followers: '1,200'
      },
      interests: [
        'Sales Automation',
        'B2B Marketing',
        'Leadership Development',
        'Tech Innovation',
        'Team Building'
      ],
      recentActivity: [
        {
          type: 'post',
          content: 'Shared insights about Q4 sales strategies',
          engagement: '45 likes, 12 comments',
          date: '2 days ago'
        },
        {
          type: 'comment',
          content: 'Commented on a post about AI in sales',
          engagement: '8 likes',
          date: '4 days ago'
        },
        {
          type: 'connection',
          content: 'Connected with 3 new sales professionals',
          date: '1 week ago'
        }
      ],
      iceBreakers: [
        `Hi ${prospect.name.split(' ')[0]}, I noticed your recent post about Q4 sales strategies. Your insights on pipeline management really resonated with me.`,
        `Hello ${prospect.name.split(' ')[0]}, I see you're passionate about sales automation. I'd love to share some tools that have helped similar ${prospect.industry.toLowerCase()} companies increase their conversion rates.`,
        `Hi ${prospect.name.split(' ')[0]}, Your experience at ${prospect.company} in ${prospect.industry} is impressive. I work with similar companies and would love to connect.`,
        `Hello ${prospect.name.split(' ')[0]}, I saw your comment about AI in sales - it's clear you're staying ahead of industry trends. Would love to exchange insights.`
      ],
      companyInsights: {
        size: '500-1000 employees',
        revenue: '$50M - $100M',
        growth: '+15% YoY',
        challenges: ['Lead generation', 'Sales process optimization', 'Team scaling'],
        recentNews: 'Recently expanded to European markets'
      },
      recommendedApproach: {
        timing: 'Best to reach out Tuesday-Thursday, 10-11 AM',
        channel: 'LinkedIn message followed by email',
        tone: 'Professional but friendly, focus on industry insights',
        followUp: 'Wait 5-7 days before follow-up if no response'
      }
    }
  }

  const handleGenerateBrief = async () => {
    setIsGenerating(true)
    
    // Simulate API call to generate brief
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const data = generateBriefData()
    setBriefData(data)
    setIsGenerating(false)
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prospect,
          briefData
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${prospect.name.replace(/\s+/g, '_')}_Lead_Brief.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Generate Brief
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Lead Brief - {prospect.name}
          </DialogTitle>
          <DialogDescription>
            AI-generated 1-page brief with insights and ice-breaker suggestions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!briefData ? (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Generate Lead Brief</h3>
              <p className="text-gray-600 mb-4">
                Create a comprehensive 1-page brief with LinkedIn insights, interests, and ice-breaker suggestions.
              </p>
              <Button 
                onClick={handleGenerateBrief} 
                disabled={isGenerating}
                className="bg-[#2563EB] hover:bg-[#2563EB]/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Brief...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Brief
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header with Download Button */}
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-sm">
                  Generated {new Date().toLocaleDateString()}
                </Badge>
                <Button onClick={handleDownloadPDF} className="bg-[#2563EB] hover:bg-[#2563EB]/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Name</p>
                      <p className="font-semibold">{briefData.basicInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Title</p>
                      <p className="font-semibold">{briefData.basicInfo.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Company</p>
                      <p className="font-semibold">{briefData.basicInfo.company}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Industry</p>
                      <p className="font-semibold">{briefData.basicInfo.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Experience</p>
                      <p className="font-semibold">{briefData.basicInfo.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Connections</p>
                      <p className="font-semibold">{briefData.basicInfo.connections}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {briefData.interests.map((interest: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent LinkedIn Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {briefData.recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {activity.type}
                          </Badge>
                          <span className="text-sm text-gray-500">{activity.date}</span>
                        </div>
                        <p className="text-sm">{activity.content}</p>
                        {activity.engagement && (
                          <p className="text-xs text-gray-500 mt-1">{activity.engagement}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ice Breakers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Ice-Breaker Suggestions
                  </CardTitle>
                  <CardDescription>
                    Personalized conversation starters based on their activity and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {briefData.iceBreakers.map((iceBreaker: string, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs mt-1">
                            Option {index + 1}
                          </Badge>
                          <p className="text-sm flex-1">{iceBreaker}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Company Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Company Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Company Size</p>
                      <p className="font-semibold">{briefData.companyInsights.size}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="font-semibold">{briefData.companyInsights.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Growth</p>
                      <p className="font-semibold text-green-600">{briefData.companyInsights.growth}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recent News</p>
                      <p className="font-semibold">{briefData.companyInsights.recentNews}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Key Challenges</p>
                    <div className="flex flex-wrap gap-2">
                      {briefData.companyInsights.challenges.map((challenge: string, index: number) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Approach */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Outreach Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Best Timing</p>
                      <p className="text-sm">{briefData.recommendedApproach.timing}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Preferred Channel</p>
                      <p className="text-sm">{briefData.recommendedApproach.channel}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tone & Style</p>
                      <p className="text-sm">{briefData.recommendedApproach.tone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Follow-up Strategy</p>
                      <p className="text-sm">{briefData.recommendedApproach.followUp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
