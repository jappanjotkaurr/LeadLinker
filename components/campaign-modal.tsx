'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus } from 'lucide-react'

interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CampaignModal({ isOpen, onClose }: CampaignModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    companySize: '',
    location: '',
    brandVoice: '',
    goal: '',
    jobRoles: [] as string[],
    triggers: [] as string[]
  })
  
  const [newRole, setNewRole] = useState('')

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Consulting'
  ]

  const brandVoices = [
    'Formal',
    'Friendly',
    'Enthusiastic'
  ]

  const availableTriggers = [
    'Job Change',
    'Company Funding',
    'Hiring Posts',
    'Company Growth',
    'New Product Launch'
  ]

  const addJobRole = () => {
    if (newRole.trim() && !formData.jobRoles.includes(newRole.trim())) {
      setFormData(prev => ({
        ...prev,
        jobRoles: [...prev.jobRoles, newRole.trim()]
      }))
      setNewRole('')
    }
  }

  const removeJobRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      jobRoles: prev.jobRoles.filter(r => r !== role)
    }))
  }

  const handleTriggerChange = (trigger: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      triggers: checked 
        ? [...prev.triggers, trigger]
        : prev.triggers.filter(t => t !== trigger)
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Campaign data:', formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up your LinkedIn outreach campaign with AI-powered personalization
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="e.g., Tech Startup Outreach"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product/Service Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you're offering..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Target Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Company Size</Label>
              <RadioGroup 
                value={formData.companySize} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup">Startup (1-50 employees)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sme" id="sme" />
                  <Label htmlFor="sme">SME (51-500 employees)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <Label htmlFor="enterprise">Enterprise (500+ employees)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Ideal Job Roles</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="e.g., CEO, CTO, Marketing Director"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addJobRole()}
                />
                <Button type="button" onClick={addJobRole} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.jobRoles.map((role) => (
                  <Badge key={role} variant="secondary" className="flex items-center gap-1">
                    {role}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeJobRole(role)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/Region</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, United States"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandVoice">Brand Voice</Label>
              <Select value={formData.brandVoice} onValueChange={(value) => setFormData(prev => ({ ...prev, brandVoice: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand voice" />
                </SelectTrigger>
                <SelectContent>
                  {brandVoices.map((voice) => (
                    <SelectItem key={voice} value={voice}>
                      {voice}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Outreach Goal</Label>
              <Textarea
                id="goal"
                placeholder="What do you want to achieve with this campaign?"
                rows={2}
                value={formData.goal}
                onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
              />
            </div>

            <div className="space-y-3">
              <Label>Optional Triggers</Label>
              <div className="space-y-2">
                {availableTriggers.map((trigger) => (
                  <div key={trigger} className="flex items-center space-x-2">
                    <Checkbox
                      id={trigger}
                      checked={formData.triggers.includes(trigger)}
                      onCheckedChange={(checked) => handleTriggerChange(trigger, checked as boolean)}
                    />
                    <Label htmlFor={trigger}>{trigger}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Preview</CardTitle>
                <CardDescription>
                  Here's how your campaign will look
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                    Campaign Name
                  </h4>
                  <p className="text-lg font-semibold">
                    {formData.name || 'Untitled Campaign'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                    Target Audience
                  </h4>
                  <p>
                    {formData.jobRoles.length > 0 ? formData.jobRoles.join(', ') : 'No roles specified'} 
                    {formData.industry && ` in ${formData.industry}`}
                    {formData.companySize && ` (${formData.companySize} companies)`}
                    {formData.location && ` located in ${formData.location}`}
                  </p>
                </div>

                {formData.description && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                      Offering
                    </h4>
                    <p className="text-sm">{formData.description}</p>
                  </div>
                )}

                {formData.goal && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                      Goal
                    </h4>
                    <p className="text-sm">{formData.goal}</p>
                  </div>
                )}

                {formData.brandVoice && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                      Brand Voice
                    </h4>
                    <Badge variant="outline">{formData.brandVoice}</Badge>
                  </div>
                )}

                {formData.triggers.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                      Triggers
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {formData.triggers.map((trigger) => (
                        <Badge key={trigger} variant="secondary" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">AI-Generated Sample Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
                  <p>
                    {'Hi [Name], I noticed you\'re leading [Company] in the '}
                    {formData.industry || '[Industry]'} 
                    {' space. '}
                    {formData.brandVoice === 'Enthusiastic' && 'I\'m really excited about what you\'re building! '}
                    {formData.brandVoice === 'Friendly' && 'Hope you\'re doing well! '}
                    {formData.description && `Our ${formData.description.toLowerCase()} might be a great fit for your team. `}
                    {'Would love to connect and share some insights that could help '}
                    {formData.goal?.toLowerCase() || 'your business grow'}
                    {'.'}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * This is a sample. Actual messages will be personalized for each prospect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"
            onClick={handleSubmit}
          >
            Launch Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
