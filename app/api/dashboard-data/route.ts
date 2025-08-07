import { NextResponse } from 'next/server'

// Mock database - in production, this would be your actual database
const mockData = {
  campaigns: [
    {
      id: '1',
      name: 'Tech Startup Outreach',
      status: 'active',
      progress: Math.floor(Math.random() * 100),
      prospects: 200,
      sent: Math.floor(Math.random() * 200),
      responses: Math.floor(Math.random() * 50),
      responseRate: (Math.random() * 30 + 10).toFixed(1),
      createdAt: '2024-01-15',
      industry: 'Technology',
      goal: 'Generate leads for our SaaS platform',
      lastActivity: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Enterprise Sales Campaign',
      status: Math.random() > 0.5 ? 'active' : 'paused',
      progress: Math.floor(Math.random() * 100),
      prospects: 150,
      sent: Math.floor(Math.random() * 150),
      responses: Math.floor(Math.random() * 40),
      responseRate: (Math.random() * 25 + 15).toFixed(1),
      createdAt: '2024-01-10',
      industry: 'Enterprise',
      goal: 'Book demos with enterprise clients',
      lastActivity: new Date().toISOString()
    },
    {
      id: '3',
      name: 'SaaS Founders Network',
      status: 'completed',
      progress: 100,
      prospects: 180,
      sent: 180,
      responses: Math.floor(Math.random() * 60 + 40),
      responseRate: (Math.random() * 35 + 20).toFixed(1),
      createdAt: '2024-01-05',
      industry: 'SaaS',
      goal: 'Connect with SaaS founders for partnerships',
      lastActivity: new Date().toISOString()
    }
  ],
  prospects: [
    {
      id: 1,
      name: 'Sarah Johnson',
      jobTitle: 'VP of Engineering',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      engagementScore: Math.floor(Math.random() * 100),
      status: ['connected', 'pending', 'responded', 'not_contacted'][Math.floor(Math.random() * 4)],
      industry: 'Technology',
      lastActivity: `${Math.floor(Math.random() * 7) + 1} days ago`,
      avatar: '/professional-woman-diverse.png',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      notes: 'Interested in AI automation solutions',
      tags: ['Hot Lead', 'Decision Maker']
    },
    {
      id: 2,
      name: 'Michael Chen',
      jobTitle: 'CTO',
      company: 'StartupXYZ',
      location: 'New York, NY',
      engagementScore: Math.floor(Math.random() * 100),
      status: ['connected', 'pending', 'responded', 'not_contacted'][Math.floor(Math.random() * 4)],
      industry: 'SaaS',
      lastActivity: `${Math.floor(Math.random() * 5) + 1} hours ago`,
      avatar: '/professional-man.png',
      email: 'michael.chen@startupxyz.com',
      phone: '+1 (555) 987-6543',
      linkedinUrl: 'https://linkedin.com/in/michaelchen',
      notes: 'Looking for scalable solutions',
      tags: ['Technical', 'Startup']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      jobTitle: 'Head of Marketing',
      company: 'GrowthCo',
      location: 'Austin, TX',
      engagementScore: Math.floor(Math.random() * 100),
      status: ['connected', 'pending', 'responded', 'not_contacted'][Math.floor(Math.random() * 4)],
      industry: 'Marketing',
      lastActivity: `${Math.floor(Math.random() * 24) + 1} minutes ago`,
      avatar: '/professional-woman-marketing.png',
      email: 'emily.rodriguez@growthco.com',
      phone: '+1 (555) 456-7890',
      linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
      notes: 'Focused on growth marketing strategies',
      tags: ['Marketing', 'Growth']
    }
  ],
  analytics: {
    totalSent: Math.floor(Math.random() * 2000 + 1000),
    responseRate: (Math.random() * 30 + 15).toFixed(1),
    meetingsBooked: Math.floor(Math.random() * 100 + 50),
    conversionRate: (Math.random() * 10 + 5).toFixed(1),
    chartData: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      connections: Math.floor(Math.random() * 30 + 10),
      responses: Math.floor(Math.random() * 15 + 5)
    })),
    responseRateTrends: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rate: Math.random() * 15 + 15 // 15-30% response rate
    })),
    industryPerformance: [
      { name: 'Technology', value: 28.5, color: '#2563EB', prospects: 245 },
      { name: 'SaaS', value: 32.1, color: '#059669', prospects: 189 },
      { name: 'Marketing', value: 24.8, color: '#DC2626', prospects: 156 },
      { name: 'Finance', value: 19.3, color: '#D97706', prospects: 134 },
      { name: 'Healthcare', value: 26.7, color: '#7C3AED', prospects: 98 }
    ]
  },
  notifications: [
    {
      id: 1,
      type: 'success',
      title: 'New Response Received',
      message: 'Sarah Johnson responded to your message',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Campaign Update',
      message: 'Tech Startup Outreach campaign is 75% complete',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Daily Limit Approaching',
      message: 'You have sent 45/50 daily connection requests',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]
}

export async function GET() {
  try {
    // Simulate some real-time changes
    mockData.analytics.totalSent += Math.floor(Math.random() * 5)
    mockData.analytics.meetingsBooked += Math.floor(Math.random() * 2)
    
    // Add random new notification occasionally
    if (Math.random() > 0.8) {
      const newNotification = {
        id: Date.now(),
        type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as 'success' | 'info' | 'warning',
        title: 'Real-time Update',
        message: 'New activity detected in your campaigns',
        timestamp: new Date().toISOString(),
        read: false
      }
      mockData.notifications.unshift(newNotification)
      
      // Keep only last 10 notifications
      if (mockData.notifications.length > 10) {
        mockData.notifications = mockData.notifications.slice(0, 10)
      }
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
