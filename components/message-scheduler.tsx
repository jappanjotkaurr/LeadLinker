'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, Send, Zap, TrendingUp, Users, Target } from 'lucide-react'

interface MessageSchedulerProps {
  isOpen: boolean
  onClose: () => void
  message: string
  prospect: any
}

export function MessageScheduler({ isOpen, onClose, message, prospect }: MessageSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [timezone, setTimezone] = useState('PST')
  const [frequency, setFrequency] = useState('once')
  const [isScheduling, setIsScheduling] = useState(false)

  const optimalTimes = [
    { time: '9:00 AM', score: 85, reason: 'High engagement time' },
    { time: '10:00 AM', score: 92, reason: 'Peak activity period' },
    { time: '11:00 AM', score: 88, reason: 'Business hours optimal' },
    { time: '2:00 PM', score: 78, reason: 'Post-lunch engagement' },
    { time: '3:00 PM', score: 82, reason: 'Afternoon productivity' }
  ]

  const handleSchedule = async () => {
    setIsScheduling(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Message scheduled:', {
        message,
        prospect: prospect.name,
        date: selectedDate,
        time: selectedTime,
        timezone,
        frequency
      })
      setIsScheduling(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-500" />
            Schedule Message
          </DialogTitle>
          <DialogDescription>
            Schedule your message for optimal engagement with {prospect.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Optimal Times Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                AI-Recommended Times
              </CardTitle>
              <CardDescription>
                Based on {prospect.name}'s activity patterns and industry data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {optimalTimes.map((timeSlot, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTime === timeSlot.time
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTime(timeSlot.time)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{timeSlot.time}</div>
                        <div className="text-sm text-gray-500">{timeSlot.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${
                          timeSlot.score >= 90 ? 'text-green-600' :
                          timeSlot.score >= 80 ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {timeSlot.score}%
                        </div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manual Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Custom Time</Label>
              <Input
                type="time"
                value={selectedTime.includes(':') ? selectedTime.split(' ')[0] : ''}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PST">Pacific (PST)</SelectItem>
                  <SelectItem value="EST">Eastern (EST)</SelectItem>
                  <SelectItem value="CST">Central (CST)</SelectItem>
                  <SelectItem value="MST">Mountain (MST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Send Once</SelectItem>
                  <SelectItem value="daily">Daily Follow-up</SelectItem>
                  <SelectItem value="weekly">Weekly Follow-up</SelectItem>
                  <SelectItem value="sequence">Auto Sequence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Message Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                {message || 'No message content'}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedTime || isScheduling}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isScheduling ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Message
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
