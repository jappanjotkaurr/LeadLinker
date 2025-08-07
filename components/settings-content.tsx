'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, CreditCard, Bell, Shield, Zap, SettingsIcon } from 'lucide-react'

export function SettingsContent() {
  const [linkedinConnected, setLinkedinConnected] = useState(true)
  const [dailyLimit, setDailyLimit] = useState([50])
  const [messageTone, setMessageTone] = useState('friendly')
  const [personalizationLevel, setPersonalizationLevel] = useState([75])
  const [notifications, setNotifications] = useState({
    newResponses: true,
    campaignUpdates: true,
    weeklyReports: false,
    systemAlerts: true
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and automation preferences</p>
      </div>

      {/* LinkedIn Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            LinkedIn Account Connection
          </CardTitle>
          <CardDescription>
            Connect your LinkedIn account to enable automated outreach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${linkedinConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>
                <p className="font-medium">LinkedIn Account</p>
                <p className="text-sm text-gray-500">
                  {linkedinConnected ? 'Connected as john@company.com' : 'Not connected'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {linkedinConnected ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Connected
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <XCircle className="mr-1 h-3 w-3" />
                  Disconnected
                </Badge>
              )}
              <Button 
                variant={linkedinConnected ? "outline" : "default"}
                onClick={() => setLinkedinConnected(!linkedinConnected)}
              >
                {linkedinConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
          
          {linkedinConnected && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Security Note:</strong> We use LinkedIn's official API and never store your login credentials. 
                Your account security is our top priority.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            AI Preferences
          </CardTitle>
          <CardDescription>
            Customize how AI generates your messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="message-tone">Message Tone</Label>
            <Select value={messageTone} onValueChange={setMessageTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal - Professional and business-focused</SelectItem>
                <SelectItem value="friendly">Friendly - Warm and approachable</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic - Energetic and excited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Personalization Level: {personalizationLevel[0]}%</Label>
            <Slider
              value={personalizationLevel}
              onValueChange={setPersonalizationLevel}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Basic</span>
              <span>Moderate</span>
              <span>Highly Personalized</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Sample Message Preview</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {messageTone === 'formal' && 
                "Dear [Name], I hope this message finds you well. I noticed your recent work at [Company] and believe our solution could provide significant value to your organization."
              }
              {messageTone === 'friendly' && 
                "Hi [Name]! I came across your profile and was impressed by your work at [Company]. I'd love to share something that might interest you and your team."
              }
              {messageTone === 'enthusiastic' && 
                "Hey [Name]! I'm really excited about what you're doing at [Company]! I have something amazing that I think could be a game-changer for your team."
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="mr-2 h-5 w-5" />
            Automation Settings
          </CardTitle>
          <CardDescription>
            Configure your outreach automation limits and timing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Daily Connection Limit: {dailyLimit[0]} connections</Label>
            <Slider
              value={dailyLimit}
              onValueChange={setDailyLimit}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              LinkedIn recommends staying under 100 connections per day to avoid restrictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                defaultValue="09:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                defaultValue="17:00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Delay Between Messages</Label>
            <Select defaultValue="5-15">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 minutes (Fast)</SelectItem>
                <SelectItem value="5-15">5-15 minutes (Recommended)</SelectItem>
                <SelectItem value="15-30">15-30 minutes (Conservative)</SelectItem>
                <SelectItem value="30-60">30-60 minutes (Very Safe)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label htmlFor={key} className="text-sm font-medium">
                  {key === 'newResponses' && 'New Responses'}
                  {key === 'campaignUpdates' && 'Campaign Updates'}
                  {key === 'weeklyReports' && 'Weekly Reports'}
                  {key === 'systemAlerts' && 'System Alerts'}
                </Label>
                <p className="text-xs text-gray-500">
                  {key === 'newResponses' && 'Get notified when prospects respond to your messages'}
                  {key === 'campaignUpdates' && 'Updates on campaign progress and completion'}
                  {key === 'weeklyReports' && 'Weekly performance summary reports'}
                  {key === 'systemAlerts' && 'Important system notifications and updates'}
                </p>
              </div>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Billing & Subscription
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Professional Plan</h4>
              <p className="text-sm text-gray-500">$49/month • Billed monthly</p>
              <p className="text-xs text-gray-400">Next billing date: February 15, 2024</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1,000</div>
              <div className="text-sm text-gray-500">Monthly Connections</div>
              <div className="text-xs text-gray-400">247 used this month</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Unlimited</div>
              <div className="text-sm text-gray-500">AI Messages</div>
              <div className="text-xs text-gray-400">1,247 generated</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">10</div>
              <div className="text-sm text-gray-500">Active Campaigns</div>
              <div className="text-xs text-gray-400">3 currently running</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              Change Plan
            </Button>
            <Button variant="outline">
              Update Payment Method
            </Button>
            <Button variant="outline">
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button className="bg-[#0A66C2] hover:bg-[#0A66C2]/90">
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
