'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus, Eye, Share2, Trash2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

interface Slide {
  id: string
  type: 'intro' | 'benefits' | 'demo' | 'cta'
  title: string
  subtitle?: string
  content?: string
  points?: string[]
  mediaUrl?: string
  buttonText?: string
  buttonUrl?: string
  background: string
}

interface PitchboardCreatorProps {
  isOpen: boolean
  onClose: () => void
}

export function PitchboardCreator({ isOpen, onClose }: PitchboardCreatorProps) {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isCreating, setIsCreating] = useState(false)
  const [shareableLink, setShareableLink] = useState('')

  const slideTemplates = [
    { type: 'intro', name: 'Introduction', icon: '👋' },
    { type: 'benefits', name: 'Benefits', icon: '✨' },
    { type: 'demo', name: 'Demo/Media', icon: '🎥' },
    { type: 'cta', name: 'Call to Action', icon: '🎯' }
  ]

  const backgrounds = [
    { name: 'LinkedIn Blue', value: 'bg-[#0A66C2]', preview: '#0A66C2' },
    { name: 'Success Green', value: 'bg-green-500', preview: '#10B981' },
    { name: 'Clean White', value: 'bg-white', preview: '#FFFFFF' },
    { name: 'Dark Mode', value: 'bg-gray-900', preview: '#111827' },
    { name: 'Gradient Blue', value: 'bg-gradient-to-r from-blue-500 to-purple-600', preview: 'linear-gradient(to right, #3B82F6, #9333EA)' }
  ]

  const addSlide = (type: string) => {
    const newSlide: Slide = {
      id: `slide_${Date.now()}`,
      type: type as Slide['type'],
      title: '',
      background: 'bg-white'
    }
    setSlides([...slides, newSlide])
    setCurrentSlide(slides.length)
  }

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    const updatedSlides = slides.map((slide, i) => 
      i === index ? { ...slide, ...updates } : slide
    )
    setSlides(updatedSlides)
  }

  const removeSlide = (index: number) => {
    const updatedSlides = slides.filter((_, i) => i !== index)
    setSlides(updatedSlides)
    if (currentSlide >= updatedSlides.length) {
      setCurrentSlide(Math.max(0, updatedSlides.length - 1))
    }
  }

  const createPitchboard = async () => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/pitchboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides })
      })
      
      const data = await response.json()
      setShareableLink(data.shareableLink)
    } catch (error) {
      console.error('Failed to create pitchboard:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const renderSlideEditor = () => {
    if (slides.length === 0) return null
    
    const slide = slides[currentSlide]
    if (!slide) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Slide {currentSlide + 1}: {slideTemplates.find(t => t.type === slide.type)?.name}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeSlide(currentSlide)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Background</Label>
              <Select 
                value={slide.background} 
                onValueChange={(value) => updateSlide(currentSlide, { background: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {backgrounds.map((bg) => (
                    <SelectItem key={bg.value} value={bg.value}>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ background: bg.preview }}
                        />
                        <span>{bg.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={slide.title}
                onChange={(e) => updateSlide(currentSlide, { title: e.target.value })}
                placeholder="Enter slide title"
              />
            </div>

            {slide.type === 'intro' && (
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={slide.subtitle || ''}
                  onChange={(e) => updateSlide(currentSlide, { subtitle: e.target.value })}
                  placeholder="Enter subtitle"
                />
              </div>
            )}

            {slide.type === 'benefits' && (
              <div>
                <Label>Benefits (one per line)</Label>
                <Textarea
                  value={slide.points?.join('\n') || ''}
                  onChange={(e) => updateSlide(currentSlide, { 
                    points: e.target.value.split('\n').filter(p => p.trim()) 
                  })}
                  placeholder="• 40% Faster Growth&#10;• 60% Time Savings&#10;• 90% Higher ROI"
                  rows={4}
                />
              </div>
            )}

            {slide.type === 'demo' && (
              <>
                <div>
                  <Label>Media URL</Label>
                  <Input
                    value={slide.mediaUrl || ''}
                    onChange={(e) => updateSlide(currentSlide, { mediaUrl: e.target.value })}
                    placeholder="https://example.com/demo.gif"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={slide.content || ''}
                    onChange={(e) => updateSlide(currentSlide, { content: e.target.value })}
                    placeholder="Describe what the demo shows"
                    rows={3}
                  />
                </div>
              </>
            )}

            {slide.type === 'cta' && (
              <>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={slide.buttonText || ''}
                    onChange={(e) => updateSlide(currentSlide, { buttonText: e.target.value })}
                    placeholder="Book a Demo"
                  />
                </div>
                <div>
                  <Label>Button URL</Label>
                  <Input
                    value={slide.buttonUrl || ''}
                    onChange={(e) => updateSlide(currentSlide, { buttonUrl: e.target.value })}
                    placeholder="https://calendly.com/demo"
                  />
                </div>
              </>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="border rounded-lg overflow-hidden">
              <div className={`${slide.background} p-6 text-center min-h-[200px] flex flex-col justify-center`}>
                {slide.type === 'intro' && (
                  <>
                    <h2 className={`text-xl font-bold mb-2 ${slide.background.includes('white') ? 'text-gray-900' : 'text-white'}`}>
                      {slide.title || 'Your Title Here'}
                    </h2>
                    <p className={`text-sm ${slide.background.includes('white') ? 'text-gray-600' : 'text-white/80'}`}>
                      {slide.subtitle || 'Your subtitle here'}
                    </p>
                  </>
                )}

                {slide.type === 'benefits' && (
                  <>
                    <h2 className={`text-xl font-bold mb-4 ${slide.background.includes('white') ? 'text-gray-900' : 'text-white'}`}>
                      {slide.title || 'Key Benefits'}
                    </h2>
                    <div className="space-y-2">
                      {(slide.points || ['Benefit 1', 'Benefit 2', 'Benefit 3']).map((point, i) => (
                        <div key={i} className={`text-sm ${slide.background.includes('white') ? 'text-gray-700' : 'text-white/90'}`}>
                          ✓ {point}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {slide.type === 'demo' && (
                  <>
                    <h2 className={`text-xl font-bold mb-4 ${slide.background.includes('white') ? 'text-gray-900' : 'text-white'}`}>
                      {slide.title || 'Demo Title'}
                    </h2>
                    <div className="bg-gray-200 rounded-lg p-4 mb-2">
                      {slide.mediaUrl ? (
                        <img src={slide.mediaUrl || "/placeholder.svg"} alt="Demo" className="w-full h-20 object-cover rounded" />
                      ) : (
                        <div className="text-gray-500 text-sm">Media preview</div>
                      )}
                    </div>
                    <p className={`text-xs ${slide.background.includes('white') ? 'text-gray-600' : 'text-white/80'}`}>
                      {slide.content || 'Demo description'}
                    </p>
                  </>
                )}

                {slide.type === 'cta' && (
                  <>
                    <h2 className={`text-xl font-bold mb-4 ${slide.background.includes('white') ? 'text-gray-900' : 'text-white'}`}>
                      {slide.title || 'Ready to Get Started?'}
                    </h2>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      {slide.buttonText || 'Get Started'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-500">
            {currentSlide + 1} of {slides.length}
          </span>
          
          <Button
            variant="outline"
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-[#0A66C2]" />
            Create Visual Pitchboard
          </DialogTitle>
          <DialogDescription>
            Create engaging, carousel-style messages that stand out in LinkedIn
          </DialogDescription>
        </DialogHeader>

        {shareableLink ? (
          <div className="space-y-4">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎉 Pitchboard Created Successfully!
              </h3>
              <p className="text-green-600 mb-4">
                Your visual message is ready to share
              </p>
              <div className="space-y-2">
                <Input
                  value={shareableLink}
                  readOnly
                  className="text-center"
                />
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => navigator.clipboard.writeText(shareableLink)}
                    variant="outline"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    onClick={() => window.open(shareableLink, '_blank')}
                    variant="outline"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add Slide Templates */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Add Slides</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {slideTemplates.map((template) => (
                  <Button
                    key={template.type}
                    variant="outline"
                    onClick={() => addSlide(template.type)}
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl mb-1">{template.icon}</span>
                    <span className="text-xs">{template.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Slide Editor */}
            {slides.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Slides</CardTitle>
                  <CardDescription>
                    Customize your pitchboard slides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderSlideEditor()}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={createPitchboard}
                disabled={slides.length === 0 || isCreating}
                className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"
              >
                {isCreating ? 'Creating...' : 'Create Pitchboard'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
