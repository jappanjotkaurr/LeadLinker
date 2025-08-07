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
import { Send, Calendar, Sparkles, RefreshCw, Clock, Building, MapPin, TrendingUp, Presentation } from 'lucide-react'
import { MessageEnhancer } from '@/components/message-enhancer'
import { TimingAnalyzer } from '@/components/timing-analyzer'
import { PitchboardCreator } from '@/components/pitchboard-creator'

const selectedProspect = {
  id: 1,
  name: 'Sarah Johnson',
  jobTitle: 'VP of Engineering',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  avatar: '/professional-woman-diverse.png',
  recentActivity: [
    'Posted about AI in software development',
    'Shared article on team leadership',
    'Commented on industry trends'
  ],
  companyInfo: {
    size: '500-1000 employees',
    industry: 'Technology',
    recentNews: 'Raised $50M Series B funding'
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

  const currentTemplate = messageTemplates[messageType as keyof typeof messageTemplates]

  const generateMessage = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleMessages = {
        connection: `Hi ${selectedProspect.name}, I came across your recent post about AI in software development and found your insights really valuable. As someone working in the same space, I'd love to connect and potentially share some thoughts on how AI is transforming our industry. Looking forward to connecting!`,
        followup1: `Hi ${selectedProspect.name}, thanks for connecting! I saw that ${selectedProspect.company} recently raised $50M in Series B funding - congratulations! I work with tech companies in similar growth stages and have some insights on scaling engineering teams that might be relevant. Would you be interested in a brief chat about your current challenges?`,
        followup2: `Hi ${selectedProspect.name}, I noticed you shared that article on team leadership - it really resonated with me. I recently helped a similar-sized tech company streamline their development processes and increase team productivity by 40%. Would you be open to a 15-minute call to discuss how this might apply to your team at ${selectedProspect.company}?`,
        followup3: `Hi ${selectedProspect.name}, I wanted to share a quick success story that might interest you. We recently helped a VP of Engineering at a Series B company (similar to ${selectedProspect.company}) reduce their deployment time by 60% while improving code quality. I'd love to show you how this could work for your team. Are you available for a brief call this week?`
      }
      
      setMessage(sampleMessages[messageType as keyof typeof sampleMessages] || '')
      setIsGenerating(false)
    }, 2000)
  }

  const scheduleMessage = () => {
    // Handle message scheduling
    console.log('Scheduling message:', { messageType, message, prospect: selectedProspect.id })
  }

  const sendMessage = () => {
    // Handle immediate sending
    console.log('Sending message:', { messageType, message, prospect: selectedProspect.id })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Message Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Create personalized LinkedIn messages with AI assistance</p>
        </div>
        <Button 
          onClick={() => setShowPitchboardCreator(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Presentation className="mr-2 h-4 w-4" />
          Create Pitchboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Prospect Profile */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prospect Profile</CardTitle>
              <CardDescription>
                Information about your selected prospect
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
                Create personalized messages with AI assistance
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
                  <span className={`text-xs ${
                    message.length > currentTemplate.maxLength 
                      ? 'text-red-500' 
                      : 'text-gray-500'
                  }`}>
                    {message.length}/{currentTemplate.maxLength}
                  </span>
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
                  Send Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Message Enhancer Section */}
      <MessageEnhancer />

      {/* Pitchboard Creator Modal */}
      <PitchboardCreator 
        isOpen={showPitchboardCreator}
        onClose={() => setShowPitchboardCreator(false)}
      />
    </div>
  )
}
