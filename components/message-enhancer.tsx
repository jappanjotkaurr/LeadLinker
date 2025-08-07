'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Zap, Copy, RefreshCw, Crown, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface EnhancementResult {
  originalMessage: string
  enhancedMessage: string
  improvements: string[]
  remainingChats: number
  response: string
}

export function MessageEnhancer() {
  const [originalMessage, setOriginalMessage] = useState('')
  const [result, setResult] = useState<EnhancementResult | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [dailyLimit, setDailyLimit] = useState(5)
  const [usedChats, setUsedChats] = useState(0)

  const enhanceMessage = async () => {
    if (!originalMessage.trim()) return
    
    setIsEnhancing(true)
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: originalMessage })
      })
      
      const data = await response.json()
      
      if (data.limitReached) {
        alert(data.error)
        return
      }
      
      setResult(data)
      setUsedChats(dailyLimit - data.remainingChats)
    } catch (error) {
      console.error('Failed to enhance message:', error)
    } finally {
      setIsEnhancing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const affiliateTools = [
    {
      name: 'Calendly',
      description: 'Schedule meetings seamlessly',
      url: 'https://calendly.com?ref=linkedinai',
      logo: '📅',
      category: 'Scheduling'
    },
    {
      name: 'HubSpot CRM',
      description: 'Manage your prospects effectively',
      url: 'https://hubspot.com?ref=linkedinai',
      logo: '🎯',
      category: 'CRM'
    },
    {
      name: 'Sendinblue',
      description: 'Email marketing automation',
      url: 'https://sendinblue.com?ref=linkedinai',
      logo: '📧',
      category: 'Email'
    },
    {
      name: 'Loom',
      description: 'Record personalized video messages',
      url: 'https://loom.com?ref=linkedinai',
      logo: '🎥',
      category: 'Video'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Message Enhancer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-[#0A66C2]" />
              AI Message Enhancer
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {usedChats}/{dailyLimit} chats used
              </Badge>
              <Progress value={(usedChats / dailyLimit) * 100} className="w-16 h-2" />
            </div>
          </CardTitle>
          <CardDescription>
            Transform your LinkedIn messages with AI-powered enhancements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {usedChats >= dailyLimit ? (
            <Alert>
              <Crown className="h-4 w-4" />
              <AlertDescription>
                Daily AI chat limit reached. 
                <Button variant="link" className="p-0 h-auto ml-1 text-[#0A66C2]">
                  Upgrade to Pro
                </Button> 
                for unlimited AI enhancements.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Original Message
                </label>
                <Textarea
                  value={originalMessage}
                  onChange={(e) => setOriginalMessage(e.target.value)}
                  placeholder="Hi [Name], I came across your profile and wanted to connect..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={enhanceMessage}
                disabled={!originalMessage.trim() || isEnhancing}
                className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90"
              >
                {isEnhancing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Enhancing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Enhance Message ({dailyLimit - usedChats} left)
                  </>
                )}
              </Button>
            </>
          )}

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-green-700">
                    ✨ AI-Enhanced Message
                  </label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(result.enhancedMessage)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 whitespace-pre-wrap">
                    {result.enhancedMessage}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">🎯 Improvements Made:</h4>
                <ul className="space-y-1">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>AI Insight:</strong> {result.response}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Affiliate Tools Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="mr-2 h-5 w-5 text-[#0A66C2]" />
            Recommended Tools
          </CardTitle>
          <CardDescription>
            Supercharge your outreach with these integrated tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {affiliateTools.map((tool, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{tool.logo}</span>
                    <div>
                      <h4 className="font-medium text-sm">{tool.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{tool.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(tool.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Try Free
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800">
              💡 <strong>Pro Tip:</strong> Integrate these tools with your campaigns for 3x better results. 
              We earn a small commission when you sign up, helping us keep LinkedinAI Pro affordable.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
