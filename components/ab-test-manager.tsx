'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart3, Plus, Trash2, Play, Pause, TrendingUp, Users, Target, Crown } from 'lucide-react'

interface ABTestManagerProps {
  isOpen: boolean
  onClose: () => void
  message: string
  prospect: any
}

interface TestVariant {
  id: string
  name: string
  message: string
  sent: number
  opened: number
  replied: number
  responseRate: number
  isWinner?: boolean
}

export function ABTestManager({ isOpen, onClose, message, prospect }: ABTestManagerProps) {
  const [variants, setVariants] = useState<TestVariant[]>([
    {
      id: '1',
      name: 'Original',
      message: message,
      sent: 0,
      opened: 0,
      replied: 0,
      responseRate: 0
    }
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [testName, setTestName] = useState('LinkedIn Outreach Test')
  const [sampleSize, setSampleSize] = useState(100)

  const addVariant = () => {
    const newVariant: TestVariant = {
      id: Date.now().toString(),
      name: `Variant ${variants.length}`,
      message: '',
      sent: 0,
      opened: 0,
      replied: 0,
      responseRate: 0
    }
    setVariants([...variants, newVariant])
  }

  const updateVariant = (id: string, field: keyof TestVariant, value: string) => {
    setVariants(variants.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ))
  }

  const deleteVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(variant => variant.id !== id))
    }
  }

  const startTest = () => {
    setIsRunning(true)
    
    // Simulate test results
    setTimeout(() => {
      const updatedVariants = variants.map((variant, index) => {
        const sent = Math.floor(sampleSize / variants.length)
        const opened = Math.floor(sent * (0.6 + Math.random() * 0.3))
        const replied = Math.floor(opened * (0.15 + Math.random() * 0.25))
        const responseRate = (replied / sent) * 100
        
        return {
          ...variant,
          sent,
          opened,
          replied,
          responseRate: Math.round(responseRate * 10) / 10
        }
      })
      
      // Mark winner
      const winner = updatedVariants.reduce((prev, current) => 
        prev.responseRate > current.responseRate ? prev : current
      )
      winner.isWinner = true
      
      setVariants(updatedVariants)
    }, 3000)
  }

  const stopTest = () => {
    setIsRunning(false)
  }

  const getVariantColor = (variant: TestVariant) => {
    if (variant.isWinner) return 'border-green-500 bg-green-50'
    if (variant.responseRate > 0) return 'border-blue-200 bg-blue-50'
    return 'border-gray-200'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
            A/B Test Manager
          </DialogTitle>
          <DialogDescription>
            Test multiple message variations to optimize your response rates
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Test Name</Label>
                  <Input
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Sample Size</Label>
                  <Input
                    type="number"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={isRunning ? "default" : "secondary"}>
                    {isRunning ? 'Running' : 'Not Started'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Testing with {prospect.name} and similar prospects
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={addVariant}
                    disabled={isRunning}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Variant
                  </Button>
                  
                  {!isRunning ? (
                    <Button
                      onClick={startTest}
                      disabled={variants.length < 2}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Test
                    </Button>
                  ) : (
                    <Button
                      onClick={stopTest}
                      variant="destructive"
                    >
                      <Pause className="mr-2 h-4 w-4" />
                      Stop Test
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results Overview */}
          {isRunning && variants.some(v => v.sent > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                  Test Results Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {variants.reduce((sum, v) => sum + v.sent, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {variants.reduce((sum, v) => sum + v.opened, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total Opened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {variants.reduce((sum, v) => sum + v.replied, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total Replies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round((variants.reduce((sum, v) => sum + v.replied, 0) / variants.reduce((sum, v) => sum + v.sent, 0)) * 100 * 10) / 10}%
                    </div>
                    <div className="text-sm text-gray-500">Avg Response Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Message Variants</h3>
              <Badge variant="outline">
                {variants.length} variant{variants.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {variants.map((variant, index) => (
                <Card key={variant.id} className={getVariantColor(variant)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        {variant.isWinner && <Crown className="mr-2 h-4 w-4 text-yellow-500" />}
                        {variant.name}
                        {variant.isWinner && (
                          <Badge className="ml-2 bg-green-100 text-green-800">
                            Winner
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {variant.responseRate > 0 && (
                          <Badge variant={variant.isWinner ? "default" : "secondary"}>
                            {variant.responseRate}% response
                          </Badge>
                        )}
                        {variants.length > 1 && !isRunning && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteVariant(variant.id)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Variant Name</Label>
                      <Input
                        value={variant.name}
                        onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                        disabled={isRunning}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Message Content</Label>
                      <Textarea
                        value={variant.message}
                        onChange={(e) => updateVariant(variant.id, 'message', e.target.value)}
                        disabled={isRunning}
                        rows={6}
                        className="mt-1 resize-none"
                        placeholder="Enter your message variant..."
                      />
                    </div>

                    {variant.sent > 0 && (
                      <div className="space-y-3">
                        <div className="text-sm font-medium">Performance Metrics</div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sent</span>
                            <span className="font-medium">{variant.sent}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span>Opened</span>
                            <span className="font-medium">{variant.opened} ({Math.round((variant.opened / variant.sent) * 100)}%)</span>
                          </div>
                          <Progress value={(variant.opened / variant.sent) * 100} className="h-1" />
                          
                          <div className="flex justify-between text-sm">
                            <span>Replied</span>
                            <span className="font-medium">{variant.replied} ({variant.responseRate}%)</span>
                          </div>
                          <Progress value={variant.responseRate} className="h-1" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Test Insights */}
          {variants.some(v => v.isWinner) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  Test Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">
                      🏆 Winning Variant: {variants.find(v => v.isWinner)?.name}
                    </h4>
                    <p className="text-sm text-green-700">
                      This variant achieved a {variants.find(v => v.isWinner)?.responseRate}% response rate, 
                      outperforming other variants by an average of{' '}
                      {Math.round((variants.find(v => v.isWinner)?.responseRate || 0) - 
                        (variants.filter(v => !v.isWinner).reduce((sum, v) => sum + v.responseRate, 0) / 
                        variants.filter(v => !v.isWinner).length) * 10) / 10}%.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Key Success Factors:</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Personalized opening line</li>
                        <li>• Clear value proposition</li>
                        <li>• Specific call-to-action</li>
                        <li>• Appropriate message length</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Recommendations:</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Use winning variant for future campaigns</li>
                        <li>• Test similar messaging patterns</li>
                        <li>• Monitor performance over time</li>
                        <li>• Consider industry-specific variations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          {variants.some(v => v.isWinner) && (
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <Crown className="mr-2 h-4 w-4" />
              Use Winning Variant
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
