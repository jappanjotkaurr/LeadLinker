'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Calendar, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react'

interface TimingAnalyzerProps {
  isOpen: boolean
  onClose: () => void
  prospect: any
}

interface TimingAnalysis {
  bestDays: string[]
  bestTimes: string[]
  timezone: string
  confidence: number
  reasoning: string
  insights: string[]
}

export function TimingAnalyzer({ isOpen, onClose, prospect }: TimingAnalyzerProps) {
  const [analysis, setAnalysis] = useState<TimingAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && prospect) {
      analyzeOptimalTiming()
    }
  }, [isOpen, prospect])

  const analyzeOptimalTiming = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/timing-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectData: prospect })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAnalysis(data.timingAnalysis)
      }
    } catch (error) {
      console.error('Failed to analyze timing:', error)
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return 'High Confidence'
    if (confidence >= 60) return 'Medium Confidence'
    return 'Low Confidence'
  }

  if (!prospect) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-[#2563EB]" />
            Optimal Outreach Timing
          </DialogTitle>
          <DialogDescription>
            AI-powered analysis for {prospect.name} at {prospect.company}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-[#2563EB] mx-auto mb-4" />
              <p className="text-gray-600">Analyzing optimal timing patterns...</p>
            </div>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            {/* Confidence Score */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Analysis Confidence</h3>
                    <p className="text-sm text-gray-600">Based on industry patterns and role analysis</p>
                  </div>
                  <Badge className={`${getConfidenceColor(analysis.confidence)} bg-transparent border`}>
                    {getConfidenceLabel(analysis.confidence)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Score</span>
                    <span className={`font-semibold ${getConfidenceColor(analysis.confidence)}`}>
                      {analysis.confidence}%
                    </span>
                  </div>
                  <Progress value={analysis.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Best Days */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Best Days to Reach Out
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.bestDays.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="font-medium text-green-800">{day}</span>
                        <Badge className="bg-green-500 text-white">Optimal</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Times */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="mr-2 h-5 w-5" />
                    Best Times ({analysis.timezone})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.bestTimes.map((time, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="font-medium text-blue-800">{time}</span>
                        <Badge className="bg-blue-500 text-white">Peak</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reasoning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Analysis Reasoning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{analysis.reasoning}</p>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="outline" onClick={analyzeOptimalTiming}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Re-analyze
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90">
                  Schedule Outreach
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Failed to analyze timing. Please try again.</p>
            <Button onClick={analyzeOptimalTiming} className="mt-4">
              Retry Analysis
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
