'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, TrendingUp, Calendar, Target, Zap } from 'lucide-react'

interface TimingData {
  prospectId: string
  timezone: string
  optimalTimes: Array<{
    day: string
    time: string
    confidence: number
    reason: string
  }>
  activityPattern: {
    mostActiveDay: string
    mostActiveTime: string
    avgResponseTime: string
    onlineFrequency: string
  }
  recommendations: string[]
}

interface TimingAnalyzerProps {
  prospectId: string
  prospectName: string
}

export function TimingAnalyzer({ prospectId, prospectName }: TimingAnalyzerProps) {
  const [timingData, setTimingData] = useState<TimingData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeTiming = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/timing-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId, timezone: 'IST' })
      })
      
      const data = await response.json()
      setTimingData(data)
    } catch (error) {
      console.error('Failed to analyze timing:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800 border-green-200'
    if (confidence >= 80) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-orange-100 text-orange-800 border-orange-200'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-[#0A66C2]" />
          Outreach Timing AI
        </CardTitle>
        <CardDescription>
          AI-powered analysis of when {prospectName} is most active on LinkedIn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!timingData ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Analyze {prospectName}'s LinkedIn activity patterns to find the perfect time to reach out
              </p>
            </div>
            <Button
              onClick={analyzeTiming}
              disabled={isAnalyzing}
              className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-pulse" />
                  Analyzing Activity...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analyze Optimal Timing
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Activity Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-blue-900">Most Active</div>
                <div className="text-xs text-blue-700">{timingData.activityPattern.mostActiveDay}</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Clock className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-green-900">Best Time</div>
                <div className="text-xs text-green-700">{timingData.activityPattern.mostActiveTime}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Target className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-purple-900">Response Time</div>
                <div className="text-xs text-purple-700">{timingData.activityPattern.avgResponseTime}</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-orange-900">Frequency</div>
                <div className="text-xs text-orange-700">{timingData.activityPattern.onlineFrequency}</div>
              </div>
            </div>

            {/* Optimal Times */}
            <div>
              <h4 className="font-semibold mb-3">🎯 Best Times to Reach Out</h4>
              <div className="space-y-3">
                {timingData.optimalTimes.map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{time.day}</span>
                        <span className="text-sm text-gray-600">{time.time}</span>
                        <Badge className={getConfidenceBadge(time.confidence)}>
                          {time.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{time.reason}</p>
                    </div>
                    <div className="ml-4">
                      <Progress value={time.confidence} className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h4 className="font-semibold mb-3">🤖 AI Recommendations</h4>
              <div className="space-y-2">
                {timingData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-blue-800">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" className="bg-[#0A66C2] hover:bg-[#0A66C2]/90">
                Schedule Message
              </Button>
              <Button size="sm" variant="outline">
                Set Reminder
              </Button>
              <Button size="sm" variant="outline">
                Export Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
