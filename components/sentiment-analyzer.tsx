'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Eye, Heart, AlertTriangle, Smile, Frown, Meh, TrendingUp, TrendingDown } from 'lucide-react'

interface SentimentAnalyzerProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

interface SentimentData {
  overall: {
    score: number
    label: 'positive' | 'neutral' | 'negative'
    confidence: number
  }
  emotions: {
    joy: number
    trust: number
    fear: number
    surprise: number
    sadness: number
    disgust: number
    anger: number
    anticipation: number
  }
  tone: {
    professional: number
    friendly: number
    urgent: number
    confident: number
    empathetic: number
  }
  keywords: {
    positive: string[]
    negative: string[]
    neutral: string[]
  }
}

export function SentimentAnalyzer({ isOpen, onClose, message }: SentimentAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)

  useEffect(() => {
    if (isOpen && message) {
      analyzeSentiment()
    }
  }, [isOpen, message])

  const analyzeSentiment = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI sentiment analysis
    setTimeout(() => {
      const mockData: SentimentData = {
        overall: {
          score: 0.75,
          label: 'positive',
          confidence: 0.89
        },
        emotions: {
          joy: 65,
          trust: 78,
          fear: 12,
          surprise: 25,
          sadness: 8,
          disgust: 5,
          anger: 3,
          anticipation: 72
        },
        tone: {
          professional: 85,
          friendly: 70,
          urgent: 30,
          confident: 80,
          empathetic: 60
        },
        keywords: {
          positive: ['help', 'success', 'growth', 'valuable', 'opportunity', 'benefit'],
          negative: ['challenge', 'problem', 'difficult'],
          neutral: ['company', 'team', 'process', 'development', 'meeting']
        }
      }
      
      setSentimentData(mockData)
      setIsAnalyzing(false)
    }, 2000)
  }

  const getSentimentIcon = (label: string) => {
    switch (label) {
      case 'positive': return <Smile className="h-5 w-5 text-green-500" />
      case 'negative': return <Frown className="h-5 w-5 text-red-500" />
      default: return <Meh className="h-5 w-5 text-yellow-500" />
    }
  }

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getEmotionColor = (emotion: string, value: number) => {
    const intensity = value / 100
    if (emotion === 'joy' || emotion === 'trust' || emotion === 'anticipation') {
      return `rgba(34, 197, 94, ${intensity})`
    } else if (emotion === 'fear' || emotion === 'anger' || emotion === 'disgust') {
      return `rgba(239, 68, 68, ${intensity})`
    } else {
      return `rgba(234, 179, 8, ${intensity})`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5 text-purple-500" />
            Sentiment Analysis
          </DialogTitle>
          <DialogDescription>
            AI-powered analysis of your message's emotional tone and impact
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {isAnalyzing ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                  <div className="text-lg font-medium">Analyzing message sentiment...</div>
                  <div className="text-sm text-gray-500">Processing emotional tone and keywords</div>
                </div>
              </CardContent>
            </Card>
          ) : sentimentData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Overall Sentiment */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {getSentimentIcon(sentimentData.overall.label)}
                      <span className="ml-2">Overall Sentiment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getSentimentColor(sentimentData.overall.label).split(' ')[0]}`}>
                        {Math.round(sentimentData.overall.score * 100)}%
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {sentimentData.overall.label} Sentiment
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span className="font-medium">{Math.round(sentimentData.overall.confidence * 100)}%</span>
                      </div>
                      <Progress value={sentimentData.overall.confidence * 100} className="h-2" />
                    </div>

                    <Badge className={getSentimentColor(sentimentData.overall.label)} variant="secondary">
                      {sentimentData.overall.label === 'positive' && <TrendingUp className="mr-1 h-3 w-3" />}
                      {sentimentData.overall.label === 'negative' && <TrendingDown className="mr-1 h-3 w-3" />}
                      {sentimentData.overall.label === 'neutral' && <Meh className="mr-1 h-3 w-3" />}
                      {sentimentData.overall.label.charAt(0).toUpperCase() + sentimentData.overall.label.slice(1)} Message
                    </Badge>
                  </CardContent>
                </Card>

                {/* Emotional Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Emotional Analysis</CardTitle>
                    <CardDescription>
                      Breakdown of emotions detected in your message
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(sentimentData.emotions).map(([emotion, value]) => (
                        <div key={emotion} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{emotion}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${value}%`,
                                backgroundColor: getEmotionColor(emotion, value)
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tone Analysis */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tone Analysis</CardTitle>
                    <CardDescription>
                      Professional tone characteristics of your message
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(sentimentData.tone).map(([tone, value]) => (
                        <div key={tone} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{tone}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Keywords Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                    <CardDescription>
                      Key words and phrases that influence sentiment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-600 mb-2">Positive Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {sentimentData.keywords.positive.map((keyword, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-red-600 mb-2">Negative Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {sentimentData.keywords.negative.map((keyword, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Neutral Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {sentimentData.keywords.neutral.map((keyword, index) => (
                          <Badge key={index} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
                  <div className="text-lg font-medium">No message to analyze</div>
                  <div className="text-sm text-gray-500">Please provide a message to analyze its sentiment</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            Close Analysis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
