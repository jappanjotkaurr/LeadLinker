'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Zap, TrendingUp, Target, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

interface AIMessageOptimizerProps {
  isOpen: boolean
  onClose: () => void
  message: string
  onOptimizedMessage: (message: string) => void
}

interface OptimizationSuggestion {
  type: 'tone' | 'length' | 'personalization' | 'cta' | 'structure'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  before: string
  after: string
}

export function AIMessageOptimizer({ isOpen, onClose, message, onOptimizedMessage }: AIMessageOptimizerProps) {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedMessage, setOptimizedMessage] = useState('')
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([])
  const [scores, setScores] = useState({
    overall: 0,
    personalization: 0,
    clarity: 0,
    engagement: 0,
    callToAction: 0
  })

  const optimizeMessage = async () => {
    setIsOptimizing(true)
    
    // Simulate AI optimization
    setTimeout(() => {
      const optimized = `Hi Sarah,

I noticed your recent post about AI transforming software development - your insights on team productivity really resonated with me.

At TechCorp, with your recent $50M Series B funding, you're likely scaling your engineering team rapidly. I've helped similar high-growth tech companies (like yours) reduce deployment time by 60% while improving code quality.

I'd love to share a quick 5-minute case study of how we helped another VP of Engineering at a Series B company streamline their development processes.

Would you be open to a brief 15-minute call this week? I can show you exactly how this could work for your team.

Best regards,
[Your Name]

P.S. I saw you're hiring senior engineers - this solution could help your new hires become productive 40% faster.`

      setOptimizedMessage(optimized)
      
      const mockSuggestions: OptimizationSuggestion[] = [
        {
          type: 'personalization',
          title: 'Enhanced Personalization',
          description: 'Added specific reference to their recent post and company funding',
          impact: 'high',
          before: 'Hi Sarah, I hope this message finds you well.',
          after: 'Hi Sarah, I noticed your recent post about AI transforming software development...'
        },
        {
          type: 'structure',
          title: 'Improved Structure',
          description: 'Reorganized content with clear problem-solution-proof format',
          impact: 'high',
          before: 'Long paragraph with mixed topics',
          after: 'Separate paragraphs for context, solution, and call-to-action'
        },
        {
          type: 'cta',
          title: 'Stronger Call-to-Action',
          description: 'Made the ask more specific and time-bound',
          impact: 'medium',
          before: 'Would you be interested in learning more?',
          after: 'Would you be open to a brief 15-minute call this week?'
        },
        {
          type: 'tone',
          title: 'Professional Yet Personal',
          description: 'Balanced professional expertise with personal connection',
          impact: 'medium',
          before: 'Generic business language',
          after: 'Conversational tone with specific expertise'
        }
      ]
      
      setSuggestions(mockSuggestions)
      setScores({
        overall: 87,
        personalization: 92,
        clarity: 85,
        engagement: 88,
        callToAction: 83
      })
      
      setIsOptimizing(false)
    }, 3000)
  }

  const applyOptimization = () => {
    onOptimizedMessage(optimizedMessage)
    onClose()
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-blue-500" />
            AI Message Optimizer
          </DialogTitle>
          <DialogDescription>
            Enhance your message with AI-powered suggestions for maximum impact
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {!optimizedMessage ? (
            <div className="space-y-6">
              {/* Original Message */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Original Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{message || 'No message to optimize'}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* Optimize Button */}
              <div className="flex justify-center">
                <Button
                  onClick={optimizeMessage}
                  disabled={!message || isOptimizing}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Optimizing with AI...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Optimize Message
                    </>
                  )}
                </Button>
              </div>

              {isOptimizing && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-lg font-medium">AI is analyzing your message...</div>
                        <div className="text-sm text-gray-500 mt-1">This may take a few seconds</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Analyzing tone and sentiment</span>
                          <span>✓</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Checking personalization level</span>
                          <span>✓</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Optimizing call-to-action</span>
                          <span>⏳</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Enhancing structure</span>
                          <span>⏳</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Optimization Results */}
              <div className="space-y-6">
                {/* Score Dashboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-green-500" />
                      Optimization Scores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(scores.overall)}`}>
                        {scores.overall}/100
                      </div>
                      <div className="text-sm text-gray-500">Overall Score</div>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(scores).filter(([key]) => key !== 'overall').map(([key, score]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className={`font-medium ${getScoreColor(score)}`}>{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <Badge className={getImpactColor(suggestion.impact)}>
                            {suggestion.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs font-medium text-red-600 mb-1">BEFORE:</div>
                            <div className="text-xs bg-red-50 p-2 rounded">{suggestion.before}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-green-600 mb-1">AFTER:</div>
                            <div className="text-xs bg-green-50 p-2 rounded">{suggestion.after}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Optimized Message */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Optimized Message
                    </CardTitle>
                    <CardDescription>
                      AI-enhanced version with improved engagement potential
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={optimizedMessage}
                      onChange={(e) => setOptimizedMessage(e.target.value)}
                      rows={15}
                      className="resize-none"
                    />
                  </CardContent>
                </Card>

                {/* Comparison Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Improvement Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">67</div>
                        <div className="text-gray-500">Original Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">87</div>
                        <div className="text-gray-500">Optimized Score</div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Badge className="bg-green-100 text-green-800">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        +20 point improvement
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          {optimizedMessage && (
            <Button onClick={applyOptimization} className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Apply Optimization
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
