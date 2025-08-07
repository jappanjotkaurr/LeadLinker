'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Share2, Maximize2 } from 'lucide-react'

export function ProjectFlowchart() {
  const downloadFlowchart = () => {
    // Create SVG content for download
    const svgContent = document.querySelector('#project-flowchart')?.outerHTML
    if (svgContent) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'linkedin-sales-automation-flowchart.svg'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Architecture</h1>
          <p className="text-gray-600 dark:text-gray-400">LinkedIn Sales Automation Dashboard - System Flow</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadFlowchart}>
            <Download className="mr-2 h-4 w-4" />
            Download SVG
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Maximize2 className="mr-2 h-4 w-4" />
            Full Screen
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Architecture & User Flow</CardTitle>
          <CardDescription>
            Complete workflow from prospect identification to successful outreach
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="w-full overflow-x-auto">
            <svg
              id="project-flowchart"
              viewBox="0 0 1400 1000"
              className="w-full h-auto border rounded-lg bg-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="1400" height="1000" fill="#f8fafc" />
              
              {/* Title */}
              <text x="700" y="30" textAnchor="middle" className="text-2xl font-bold" fill="#1e293b">
                LinkedIn Sales Automation Dashboard - System Flow
              </text>
              
              {/* User Entry Point */}
              <g id="user-entry">
                <rect x="50" y="80" width="120" height="60" rx="30" fill="#3b82f6" />
                <text x="110" y="105" textAnchor="middle" fill="white" className="text-sm font-medium">User Login</text>
                <text x="110" y="120" textAnchor="middle" fill="white" className="text-xs">Dashboard Access</text>
              </g>

              {/* Dashboard Hub */}
              <g id="dashboard-hub">
                <rect x="250" y="60" width="160" height="100" rx="10" fill="#10b981" />
                <text x="330" y="85" textAnchor="middle" fill="white" className="text-sm font-bold">Main Dashboard</text>
                <text x="330" y="105" textAnchor="middle" fill="white" className="text-xs">• Real-time Analytics</text>
                <text x="330" y="120" textAnchor="middle" fill="white" className="text-xs">• Campaign Overview</text>
                <text x="330" y="135" textAnchor="middle" fill="white" className="text-xs">• Performance Metrics</text>
              </g>

              {/* Prospect Management */}
              <g id="prospect-management">
                <rect x="50" y="220" width="140" height="80" rx="10" fill="#8b5cf6" />
                <text x="120" y="245" textAnchor="middle" fill="white" className="text-sm font-bold">Prospect</text>
                <text x="120" y="260" textAnchor="middle" fill="white" className="text-sm font-bold">Management</text>
                <text x="120" y="280" textAnchor="middle" fill="white" className="text-xs">• Import/Export</text>
                <text x="120" y="295" textAnchor="middle" fill="white" className="text-xs">• Profile Analysis</text>
              </g>

              {/* Campaign Creation */}
              <g id="campaign-creation">
                <rect x="250" y="220" width="140" height="80" rx="10" fill="#f59e0b" />
                <text x="320" y="245" textAnchor="middle" fill="white" className="text-sm font-bold">Campaign</text>
                <text x="320" y="260" textAnchor="middle" fill="white" className="text-sm font-bold">Creation</text>
                <text x="320" y="280" textAnchor="middle" fill="white" className="text-xs">• Target Audience</text>
                <text x="320" y="295" textAnchor="middle" fill="white" className="text-xs">• Message Templates</text>
              </g>

              {/* Message Generator */}
              <g id="message-generator">
                <rect x="450" y="220" width="140" height="80" rx="10" fill="#ef4444" />
                <text x="520" y="245" textAnchor="middle" fill="white" className="text-sm font-bold">AI Message</text>
                <text x="520" y="260" textAnchor="middle" fill="white" className="text-sm font-bold">Generator</text>
                <text x="520" y="280" textAnchor="middle" fill="white" className="text-xs">• Personalization</text>
                <text x="520" y="295" textAnchor="middle" fill="white" className="text-xs">• Tone Analysis</text>
              </g>

              {/* AI Features Layer */}
              <g id="ai-features">
                <rect x="650" y="180" width="200" height="160" rx="10" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" />
                <text x="750" y="205" textAnchor="middle" fill="white" className="text-lg font-bold">AI Enhancement Suite</text>
                
                {/* Voice Recorder */}
                <rect x="670" y="220" width="80" height="30" rx="5" fill="#10b981" />
                <text x="710" y="240" textAnchor="middle" fill="white" className="text-xs">Voice Recorder</text>
                
                {/* Sentiment Analysis */}
                <rect x="760" y="220" width="80" height="30" rx="5" fill="#f59e0b" />
                <text x="800" y="240" textAnchor="middle" fill="white" className="text-xs">Sentiment Analysis</text>
                
                {/* A/B Testing */}
                <rect x="670" y="260" width="80" height="30" rx="5" fill="#ef4444" />
                <text x="710" y="280" textAnchor="middle" fill="white" className="text-xs">A/B Testing</text>
                
                {/* Message Optimizer */}
                <rect x="760" y="260" width="80" height="30" rx="5" fill="#8b5cf6" />
                <text x="800" y="280" textAnchor="middle" fill="white" className="text-xs">AI Optimizer</text>
                
                {/* Pitchboard Creator */}
                <rect x="670" y="300" width="80" height="30" rx="5" fill="#06b6d4" />
                <text x="710" y="320" textAnchor="middle" fill="white" className="text-xs">Pitchboard</text>
                
                {/* Timing Analyzer */}
                <rect x="760" y="300" width="80" height="30" rx="5" fill="#84cc16" />
                <text x="800" y="320" textAnchor="middle" fill="white" className="text-xs">Timing Analysis</text>
              </g>

              {/* Scheduling System */}
              <g id="scheduling">
                <rect x="900" y="220" width="140" height="80" rx="10" fill="#06b6d4" />
                <text x="970" y="245" textAnchor="middle" fill="white" className="text-sm font-bold">Smart</text>
                <text x="970" y="260" textAnchor="middle" fill="white" className="text-sm font-bold">Scheduling</text>
                <text x="970" y="280" textAnchor="middle" fill="white" className="text-xs">• Optimal Timing</text>
                <text x="970" y="295" textAnchor="middle" fill="white" className="text-xs">• Auto Follow-ups</text>
              </g>

              {/* LinkedIn Integration */}
              <g id="linkedin-integration">
                <rect x="1100" y="180" width="140" height="120" rx="10" fill="#0a66c2" />
                <text x="1170" y="210" textAnchor="middle" fill="white" className="text-sm font-bold">LinkedIn</text>
                <text x="1170" y="225" textAnchor="middle" fill="white" className="text-sm font-bold">Integration</text>
                <text x="1170" y="250" textAnchor="middle" fill="white" className="text-xs">• Direct Messaging</text>
                <text x="1170" y="265" textAnchor="middle" fill="white" className="text-xs">• Profile Scraping</text>
                <text x="1170" y="280" textAnchor="middle" fill="white" className="text-xs">• Connection Requests</text>
                <text x="1170" y="295" textAnchor="middle" fill="white" className="text-xs">• Response Tracking</text>
              </g>

              {/* Analytics & Reporting */}
              <g id="analytics">
                <rect x="50" y="400" width="160" height="100" rx="10" fill="#dc2626" />
                <text x="130" y="425" textAnchor="middle" fill="white" className="text-sm font-bold">Analytics &</text>
                <text x="130" y="440" textAnchor="middle" fill="white" className="text-sm font-bold">Reporting</text>
                <text x="130" y="460" textAnchor="middle" fill="white" className="text-xs">• Response Rates</text>
                <text x="130" y="475" textAnchor="middle" fill="white" className="text-xs">• Engagement Metrics</text>
                <text x="130" y="490" textAnchor="middle" fill="white" className="text-xs">• ROI Tracking</text>
              </g>

              {/* Referral System */}
              <g id="referrals">
                <rect x="250" y="400" width="140" height="100" rx="10" fill="#059669" />
                <text x="320" y="425" textAnchor="middle" fill="white" className="text-sm font-bold">Referral</text>
                <text x="320" y="440" textAnchor="middle" fill="white" className="text-sm font-bold">System</text>
                <text x="320" y="460" textAnchor="middle" fill="white" className="text-xs">• Mentor Network</text>
                <text x="320" y="475" textAnchor="middle" fill="white" className="text-xs">• Credit System</text>
                <text x="320" y="490" textAnchor="middle" fill="white" className="text-xs">• Leaderboard</text>
              </g>

              {/* Settings & Configuration */}
              <g id="settings">
                <rect x="450" y="400" width="140" height="100" rx="10" fill="#6b7280" />
                <text x="520" y="425" textAnchor="middle" fill="white" className="text-sm font-bold">Settings &</text>
                <text x="520" y="440" textAnchor="middle" fill="white" className="text-sm font-bold">Configuration</text>
                <text x="520" y="460" textAnchor="middle" fill="white" className="text-xs">• Account Setup</text>
                <text x="520" y="475" textAnchor="middle" fill="white" className="text-xs">• Automation Rules</text>
                <text x="520" y="490" textAnchor="middle" fill="white" className="text-xs">• Notifications</text>
              </g>

              {/* Data Flow Layer */}
              <g id="data-flow">
                <rect x="650" y="400" width="200" height="100" rx="10" fill="#374151" stroke="#6b7280" strokeWidth="2" />
                <text x="750" y="425" textAnchor="middle" fill="white" className="text-lg font-bold">Data Processing Layer</text>
                <text x="750" y="450" textAnchor="middle" fill="white" className="text-xs">• Real-time Updates</text>
                <text x="750" y="465" textAnchor="middle" fill="white" className="text-xs">• API Integrations</text>
                <text x="750" y="480" textAnchor="middle" fill="white" className="text-xs">• Database Management</text>
                <text x="750" y="495" textAnchor="middle" fill="white" className="text-xs">• Performance Optimization</text>
              </g>

              {/* Success Metrics */}
              <g id="success-metrics">
                <rect x="900" y="400" width="140" height="100" rx="10" fill="#7c3aed" />
                <text x="970" y="425" textAnchor="middle" fill="white" className="text-sm font-bold">Success</text>
                <text x="970" y="440" textAnchor="middle" fill="white" className="text-sm font-bold">Metrics</text>
                <text x="970" y="460" textAnchor="middle" fill="white" className="text-xs">• Conversion Rates</text>
                <text x="970" y="475" textAnchor="middle" fill="white" className="text-xs">• Pipeline Growth</text>
                <text x="970" y="490" textAnchor="middle" fill="white" className="text-xs">• Revenue Impact</text>
              </g>

              {/* External Integrations */}
              <g id="external-integrations">
                <rect x="1100" y="400" width="140" height="100" rx="10" fill="#f97316" />
                <text x="1170" y="425" textAnchor="middle" fill="white" className="text-sm font-bold">External</text>
                <text x="1170" y="440" textAnchor="middle" fill="white" className="text-sm font-bold">Integrations</text>
                <text x="1170" y="460" textAnchor="middle" fill="white" className="text-xs">• CRM Systems</text>
                <text x="1170" y="475" textAnchor="middle" fill="white" className="text-xs">• Email Platforms</text>
                <text x="1170" y="490" textAnchor="middle" fill="white" className="text-xs">• Calendar Apps</text>
              </g>

              {/* Process Flow Arrows */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
                </marker>
              </defs>

              {/* Main Flow Arrows */}
              <line x1="170" y1="110" x2="250" y2="110" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="330" y1="160" x2="330" y2="220" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="190" y1="260" x2="250" y2="260" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="390" y1="260" x2="450" y2="260" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="590" y1="260" x2="650" y2="260" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="850" y1="260" x2="900" y2="260" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="1040" y1="260" x2="1100" y2="260" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Vertical Flow to Analytics */}
              <line x1="130" y1="300" x2="130" y2="400" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="320" y1="300" x2="320" y2="400" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="520" y1="300" x2="520" y2="400" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="750" y1="340" x2="750" y2="400" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="970" y1="300" x2="970" y2="400" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="1170" y1="300" x2="1170" y2="400" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Feedback Loops */}
              <path d="M 1170 180 Q 1300 100 1300 450 Q 1300 550 130 550 Q 50 550 50 450" 
                    stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />

              {/* Data Flow Connections */}
              <line x1="650" y1="450" x2="590" y2="450" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="850" y1="450" x2="900" y2="450" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />

              {/* Legend */}
              <g id="legend">
                <rect x="50" y="600" width="1200" height="120" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <text x="70" y="625" className="text-lg font-bold" fill="#1e293b">System Components Legend</text>
                
                <rect x="70" y="640" width="20" height="15" fill="#3b82f6" />
                <text x="100" y="652" className="text-sm" fill="#1e293b">User Interface</text>
                
                <rect x="200" y="640" width="20" height="15" fill="#10b981" />
                <text x="230" y="652" className="text-sm" fill="#1e293b">Core Features</text>
                
                <rect x="330" y="640" width="20" height="15" fill="#6366f1" />
                <text x="360" y="652" className="text-sm" fill="#1e293b">AI Enhancement</text>
                
                <rect x="470" y="640" width="20" height="15" fill="#0a66c2" />
                <text x="500" y="652" className="text-sm" fill="#1e293b">LinkedIn Integration</text>
                
                <rect x="630" y="640" width="20" height="15" fill="#374151" />
                <text x="660" y="652" className="text-sm" fill="#1e293b">Data Processing</text>
                
                <rect x="770" y="640" width="20" height="15" fill="#f97316" />
                <text x="800" y="652" className="text-sm" fill="#1e293b">External Systems</text>
                
                <line x1="70" y1="670" x2="90" y2="670" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="100" y="675" className="text-sm" fill="#1e293b">Data Flow</text>
                
                <line x1="200" y1="670" x2="220" y2="670" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                <text x="230" y="675" className="text-sm" fill="#1e293b">Feedback Loop</text>
                
                <line x1="350" y1="670" x2="370" y2="670" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                <text x="380" y="675" className="text-sm" fill="#1e293b">API Connection</text>
              </g>

              {/* Key Features Callouts */}
              <g id="callouts">
                <circle cx="750" cy="260" r="80" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                <text x="750" y="370" textAnchor="middle" className="text-sm font-bold" fill="#ef4444">AI-Powered Core</text>
                
                <circle cx="1170" cy="240" r="90" fill="none" stroke="#0a66c2" strokeWidth="2" strokeDasharray="5,5" />
                <text x="1170" y="360" textAnchor="middle" className="text-sm font-bold" fill="#0a66c2">LinkedIn Native</text>
              </g>

              {/* Performance Indicators */}
              <g id="performance">
                <rect x="50" y="750" width="300" height="80" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                <text x="200" y="775" textAnchor="middle" className="text-lg font-bold" fill="#059669">Performance Metrics</text>
                <text x="200" y="795" textAnchor="middle" className="text-sm" fill="#047857">• 40% Higher Response Rates</text>
                <text x="200" y="810" textAnchor="middle" className="text-sm" fill="#047857">• 60% Time Savings</text>
                <text x="200" y="825" textAnchor="middle" className="text-sm" fill="#047857">• 300% More Qualified Leads</text>
              </g>

              <g id="technology-stack">
                <rect x="400" y="750" width="300" height="80" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                <text x="550" y="775" textAnchor="middle" className="text-lg font-bold" fill="#1d4ed8">Technology Stack</text>
                <text x="550" y="795" textAnchor="middle" className="text-sm" fill="#1e40af">• Next.js 15 + React 18</text>
                <text x="550" y="810" textAnchor="middle" className="text-sm" fill="#1e40af">• AI SDK + OpenAI Integration</text>
                <text x="550" y="825" textAnchor="middle" className="text-sm" fill="#1e40af">• Real-time WebSocket Updates</text>
              </g>

              <g id="security-compliance">
                <rect x="750" y="750" width="300" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                <text x="900" y="775" textAnchor="middle" className="text-lg font-bold" fill="#d97706">Security & Compliance</text>
                <text x="900" y="795" textAnchor="middle" className="text-sm" fill="#b45309">• LinkedIn API Compliance</text>
                <text x="900" y="810" textAnchor="middle" className="text-sm" fill="#b45309">• GDPR Data Protection</text>
                <text x="900" y="825" textAnchor="middle" className="text-sm" fill="#b45309">• Enterprise-Grade Security</text>
              </g>

              <g id="scalability">
                <rect x="1100" y="750" width="250" height="80" rx="10" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="2" />
                <text x="1225" y="775" textAnchor="middle" className="text-lg font-bold" fill="#7c3aed">Scalability</text>
                <text x="1225" y="795" textAnchor="middle" className="text-sm" fill="#6d28d9">• Multi-tenant Architecture</text>
                <text x="1225" y="810" textAnchor="middle" className="text-sm" fill="#6d28d9">• Auto-scaling Infrastructure</text>
                <text x="1225" y="825" textAnchor="middle" className="text-sm" fill="#6d28d9">• Global CDN Distribution</text>
              </g>

              {/* Footer */}
              <text x="700" y="950" textAnchor="middle" className="text-sm" fill="#6b7280">
                LinkedIn Sales Automation Dashboard - Complete System Architecture
              </text>
              <text x="700" y="970" textAnchor="middle" className="text-xs" fill="#9ca3af">
                Built with Next.js 15, AI SDK, and modern web technologies for enterprise-scale sales automation
              </text>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Flow Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="mr-2 bg-blue-500">1</Badge>
              User Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Login:</strong> Secure authentication and dashboard access</p>
            <p><strong>Dashboard:</strong> Real-time metrics and campaign overview</p>
            <p><strong>Navigation:</strong> Intuitive flow between all features</p>
            <p><strong>Personalization:</strong> Customized experience based on user data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="mr-2 bg-green-500">2</Badge>
              Core Workflow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Prospect Import:</strong> CSV upload or manual entry</p>
            <p><strong>Campaign Setup:</strong> Target audience and goals</p>
            <p><strong>Message Creation:</strong> AI-powered personalization</p>
            <p><strong>Scheduling:</strong> Optimal timing analysis</p>
            <p><strong>LinkedIn Integration:</strong> Direct message sending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="mr-2 bg-purple-500">3</Badge>
              AI Enhancement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Voice Recording:</strong> Personal audio messages</p>
            <p><strong>Sentiment Analysis:</strong> Emotional tone optimization</p>
            <p><strong>A/B Testing:</strong> Message variant performance</p>
            <p><strong>Smart Optimization:</strong> AI-driven improvements</p>
            <p><strong>Visual Pitchboards:</strong> Story-style presentations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="mr-2 bg-orange-500">4</Badge>
              Data Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Real-time Updates:</strong> Live performance tracking</p>
            <p><strong>API Integration:</strong> LinkedIn and external systems</p>
            <p><strong>Database Management:</strong> Efficient data storage</p>
            <p><strong>Performance Optimization:</strong> Fast response times</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="mr-2 bg-red-500">5</Badge>
              Analytics & Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Response Tracking:</strong> Real-time engagement metrics</p>
            <p><strong>Performance Analytics:</strong> Campaign effectiveness</p>
            <p><strong>ROI Calculation:</strong> Revenue impact measurement</p>
            <p><strong>Predictive Insights:</strong> Future performance forecasting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="mr-2 bg-cyan-500">6</Badge>
              Integration Layer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>LinkedIn API:</strong> Native platform integration</p>
            <p><strong>CRM Systems:</strong> Salesforce, HubSpot connectivity</p>
            <p><strong>Email Platforms:</strong> Follow-up automation</p>
            <p><strong>Calendar Apps:</strong> Meeting scheduling</p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Architecture Details</CardTitle>
          <CardDescription>
            System components and technology stack breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Frontend Layer</h4>
              <ul className="text-sm space-y-1">
                <li>• Next.js 15 App Router</li>
                <li>• React 18 with Hooks</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS styling</li>
                <li>• shadcn/ui components</li>
                <li>• Recharts for analytics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-600 mb-2">AI & ML Layer</h4>
              <ul className="text-sm space-y-1">
                <li>• AI SDK integration</li>
                <li>• OpenAI GPT models</li>
                <li>• Sentiment analysis</li>
                <li>• Voice transcription</li>
                <li>• Message optimization</li>
                <li>• Predictive analytics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">Backend Services</h4>
              <ul className="text-sm space-y-1">
                <li>• Next.js API routes</li>
                <li>• Server Actions</li>
                <li>• WebSocket connections</li>
                <li>• Database integration</li>
                <li>• File upload handling</li>
                <li>• Cron job scheduling</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">External APIs</h4>
              <ul className="text-sm space-y-1">
                <li>• LinkedIn API v2</li>
                <li>• OpenAI API</li>
                <li>• Email service APIs</li>
                <li>• Calendar APIs</li>
                <li>• CRM integrations</li>
                <li>• Analytics services</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
