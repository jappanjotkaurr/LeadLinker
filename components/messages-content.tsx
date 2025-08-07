'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Calendar, Sparkles, RefreshCw, Clock, Building, MapPin, TrendingUp, Presentation, Mic, Video, BarChart3, Target, Zap, Brain, MessageSquare, Users, Eye, Headphones } from 'lucide-react'
import { MessageEnhancer } from '@/components/message-enhancer'
import { TimingAnalyzer } from '@/components/timing-analyzer'
import { PitchboardCreator } from '@/components/pitchboard-creator'
import { MessageScheduler } from '@/components/message-scheduler'
import { VoiceRecorder } from '@/components/voice-recorder'
import { AIMessageOptimizer } from '@/components/ai-message-optimizer'
import { SentimentAnalyzer } from '@/components/sentiment-analyzer'
import { ABTestManager } from '@/components/ab-test-manager'

const selectedProspect = {
  id: 1,
  name: 'Sarah Johnson',
  jobTitle: 'VP of Engineering',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  avatar: '/professional-woman-diverse.png',
  linkedinUrl: 'https://linkedin.com/in/sarah-johnson-techcorp',
  recentActivity: [
    'Posted about AI in software development',
    'Shared article on team leadership',
    'Commented on industry trends'
  ],
  companyInfo: {
    size: '500-1000 employees',
    industry: 'Technology',
    recentNews: 'Raised $50M Series B funding'
  },
  engagement: {
    responseRate: 85,
    bestTimeToContact: '10:00 AM - 12:00 PM PST',
    preferredChannel: 'LinkedIn Messages'
  }
}

const messageTemplates = {
  'connection': {
    title: 'Connection Request',
    maxLength: 300,
    suggestions: [
      'Mention their recent post about AI',
      'Reference their company\'s recent funding',
      'Highlight mutual connections or interests'
    ]
  },
  'followup1': {
    title: 'Follow-up 1',
    maxLength: 500,
    suggestions: [
      'Thank them for connecting',
      'Share relevant industry insights',
      'Offer value before asking for anything'
    ]
  },
  'followup2': {
    title: 'Follow-up 2',
    maxLength: 500,
    suggestions: [
      'Reference their recent activity',
      'Share a relevant case study',
      'Suggest a brief call or meeting'
    ]
  },
  'followup3': {
    title: 'Follow-up 3',
    maxLength: 500,
    suggestions: [
      'Provide additional value',
      'Share success stories',
      'Make a clear call-to-action'
    ]
  }
}

export function MessagesContent() {
  const [messageType, setMessageType] = useState('connection')
  const [message, setMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPitchboardCreator, setShowPitchboardCreator] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [showAIOptimizer, setShowAIOptimizer] = useState(false)
  const [showSentimentAnalyzer, setShowSentimentAnalyzer] = useState(false)
  const [showABTester, setShowABTester] = useState(false)
  const [messageScore, setMessageScore] = useState(0)
  const [sentiment, setSentiment] = useState({ score: 0, label: 'neutral' })

  const currentTemplate = messageTemplates[messageType as keyof typeof messageTemplates]

  const generateMessage = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation with more sophisticated content
    setTimeout(() => {
      const sampleMessages = {
        connection: `Hi ${selectedProspect.name}, I came across your recent post about AI in software development and found your insights really valuable. As someone working in the same space, I'd love to connect and potentially share some thoughts on how AI is transforming our industry. Looking forward to connecting!`,
        followup1: `Hi ${selectedProspect.name}, thanks for connecting! I saw that ${selectedProspect.company} recently raised $50M in Series B funding - congratulations! I work with tech companies in similar growth stages and have some insights on scaling engineering teams that might be relevant. Would you be interested in a brief chat about your current challenges?`,
        followup2: `Hi ${selectedProspect.name}, I noticed you shared that article on team leadership - it really resonated with me. I recently helped a similar-sized tech company streamline their development processes and increase team productivity by 40%. Would you be open to a 15-minute call to discuss how this might apply to your team at ${selectedProspect.company}?`,
        followup3: `Hi ${selectedProspect.name}, I wanted to share a quick success story that might interest you. We recently helped a VP of Engineering at a Series B company (similar to ${selectedProspect.company}) reduce their deployment time by 60% while improving code quality. I'd love to show you how this could work for your team. Are you available for a brief call this week?`
      }
      
      const generatedMessage = sampleMessages[messageType as keyof typeof sampleMessages] || ''
      setMessage(generatedMessage)
      
      // Simulate AI scoring
      setMessageScore(Math.floor(Math.random() * 30) + 70) // 70-100 score
      
      // Simulate sentiment analysis
      const sentiments = [
        { score: 0.8, label: 'positive' },
        { score: 0.6, label: 'positive' },
        { score: 0.2, label: 'neutral' }
      ]
      setSentiment(sentiments[Math.floor(Math.random() * sentiments.length)])
      
      setIsGenerating(false)
    }, 2000)
  }

  const scheduleMessage = () => {
    setShowScheduler(true)
  }

  const sendMessage = () => {
    // Redirect to LinkedIn with pre-filled message
    const linkedinUrl = `https://www.linkedin.com/messaging/compose/?recipient=${selectedProspect.linkedinUrl.split('/in/')[1]}`
    
    // Store message in localStorage for potential retrieval
    localStorage.setItem('draftMessage', JSON.stringify({
      recipient: selectedProspect.name,
      message: message,
      timestamp: new Date().toISOString()
    }))
    
    // Open LinkedIn in new tab
    window.open(linkedinUrl, '_blank')
    
    // Show success notification
    console.log('Redirecting to LinkedIn for:', { messageType, message, prospect: selectedProspect.id })
  }

  const handleVoiceMessage = (audioBlob: Blob) => {
    // Convert voice to text and append to message
    console.log('Voice message recorded:', audioBlob)
    setMessage(prev => prev + '\n\n[Voice message transcription would appear here]')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Message Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Create personalized LinkedIn messages with advanced AI assistance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setShowVoiceRecorder(true)}
            variant="outline"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
          >
            <Mic className="mr-2 h-4 w-4" />
            Voice Message
          </Button>
          <Button 
            onClick={() => setShowAIOptimizer(true)}
            variant="outline"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
          >
            <Brain className="mr-2 h-4 w-4" />
            AI Optimize
          </Button>
          <Button 
            onClick={() => setShowPitchboardCreator(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Presentation className="mr-2 h-4 w-4" />
            Create Pitchboard
          </Button>
        </div>
      </div>

      {/* AI Insights Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Message Score</p>
                <p className="text-2xl font-bold text-blue-600">{messageScore}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Response Rate</p>
                <p className="text-2xl font-bold text-green-600">{selectedProspect.engagement.responseRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Sentiment</p>
                <p className={`text-2xl font-bold capitalize ${
                  sentiment.label === 'positive' ? 'text-green-600' : 
                  sentiment.label === 'negative' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {sentiment.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Best Time</p>
                <p className="text-sm font-bold text-orange-600">10-12 PM PST</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Prospect Profile */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prospect Profile</CardTitle>
              <CardDescription>
                AI-enhanced information about your selected prospect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedProspect.avatar || "/placeholder.svg"} alt={selectedProspect.name} />
                  <AvatarFallback>
                    {selectedProspect.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedProspect.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProspect.jobTitle}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Building className="h-4 w-4 mr-1" />
                    {selectedProspect.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedProspect.location}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Company Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Industry:</span>
                    <span>{selectedProspect.companyInfo.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size:</span>
                    <span>{selectedProspect.companyInfo.size}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-500">Recent News:</span>
                    <span className="text-right flex-1 ml-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {selectedProspect.companyInfo.recentNews}
                      </Badge>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Recent Activity
                </h4>
                <ul className="space-y-2">
                  {selectedProspect.recentActivity.map((activity, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Engagement Insights
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Response Rate:</span>
                    <span className="text-green-600 font-medium">{selectedProspect.engagement.responseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Best Time:</span>
                    <span>{selectedProspect.engagement.bestTimeToContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Preferred Channel:</span>
                    <span>{selectedProspect.engagement.preferredChannel}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing Analyzer */}
          <TimingAnalyzer 
            prospectId={selectedProspect.id.toString()} 
            prospectName={selectedProspect.name} 
          />
        </div>

        {/* Right Panel - Message Composition */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>
                Create personalized messages with advanced AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message Type
                </label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="connection">Connection Request</SelectItem>
                    <SelectItem value="followup1">Follow-up 1</SelectItem>
                    <SelectItem value="followup2">Follow-up 2</SelectItem>
                    <SelectItem value="followup3">Follow-up 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message Content
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${
                      message.length > currentTemplate.maxLength 
                        ? 'text-red-500' 
                        : 'text-gray-500'
                    }`}>
                      {message.length}/{currentTemplate.maxLength}
                    </span>
                    {messageScore > 0 && (
                      <Badge variant={messageScore >= 80 ? "default" : messageScore >= 60 ? "secondary" : "destructive"}>
                        Score: {messageScore}
                      </Badge>
                    )}
                  </div>
                </div>
                <Textarea
                  placeholder={`Write your ${currentTemplate.title.toLowerCase()} here...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Personalization Suggestions
                </h4>
                <div className="space-y-2">
                  {currentTemplate.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={generateMessage}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSentimentAnalyzer(true)}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Analyze
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowABTester(true)}
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  A/B Test
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn Preview
                </h4>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">You</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Your Name</div>
                      <div className="text-xs text-gray-500">to {selectedProspect.name}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {message || `Your ${currentTemplate.title.toLowerCase()} will appear here...`}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={scheduleMessage}
                  disabled={!message.trim()}
                  className="flex-1"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim() || message.length > currentTemplate.maxLength}
                  className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send on LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Message Enhancer Section */}
      <MessageEnhancer />

      {/* Modals */}
      <PitchboardCreator 
        isOpen={showPitchboardCreator}
        onClose={() => setShowPitchboardCreator(false)}
      />
      
      <MessageScheduler
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        message={message}
        prospect={selectedProspect}
      />
      
      <VoiceRecorder
        isOpen={showVoiceRecorder}
        onClose={() => setShowVoiceRecorder(false)}
        onVoiceMessage={handleVoiceMessage}
      />
      
      <AIMessageOptimizer
        isOpen={showAIOptimizer}
        onClose={() => setShowAIOptimizer(false)}
        message={message}
        onOptimizedMessage={setMessage}
      />
      
      <SentimentAnalyzer
        isOpen={showSentimentAnalyzer}
        onClose={() => setShowSentimentAnalyzer(false)}
        message={message}
      />
      
      <ABTestManager
        isOpen={showABTester}
        onClose={() => setShowABTester(false)}
        message={message}
        prospect={selectedProspect}
      />
    </div>
  )
}
