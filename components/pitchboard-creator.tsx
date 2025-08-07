'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Presentation, Plus, Trash2, Eye, Share2, Sparkles, ChevronLeft, ChevronRight, Copy, ExternalLink, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react'

interface Slide {
  id: string
  type: 'intro' | 'benefits' | 'demo' | 'cta'
  title: string
  content: string
  background: string
  textColor: string
}

interface PitchboardCreatorProps {
  isOpen: boolean
  onClose: () => void
}

const slideTypes = [
  { value: 'intro', label: 'Introduction', description: 'Personal intro with value proposition', emoji: '👋' },
  { value: 'benefits', label: 'Benefits', description: 'Key benefits and value points', emoji: '✨' },
  { value: 'demo', label: 'Demo/Case Study', description: 'Success story or use case', emoji: '🎥' },
  { value: 'cta', label: 'Call to Action', description: 'Clear next steps', emoji: '🎯' }
]

const backgroundThemes = [
  { value: 'gradient-blue', label: 'Professional Blue', class: 'bg-gradient-to-br from-blue-600 to-blue-800', preview: 'linear-gradient(135deg, #2563eb, #1e40af)' },
  { value: 'gradient-purple', label: 'Creative Purple', class: 'bg-gradient-to-br from-purple-600 to-pink-600', preview: 'linear-gradient(135deg, #9333ea, #ec4899)' },
  { value: 'gradient-green', label: 'Growth Green', class: 'bg-gradient-to-br from-green-600 to-teal-600', preview: 'linear-gradient(135deg, #059669, #0d9488)' },
  { value: 'gradient-orange', label: 'Energy Orange', class: 'bg-gradient-to-br from-orange-500 to-red-600', preview: 'linear-gradient(135deg, #f97316, #dc2626)' },
  { value: 'solid-dark', label: 'Professional Dark', class: 'bg-gray-900', preview: '#111827' },
  { value: 'solid-white', label: 'Clean White', class: 'bg-white border-2 border-gray-200', preview: '#ffffff' }
]

export function PitchboardCreator({ isOpen, onClose }: PitchboardCreatorProps) {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      type: 'intro',
      title: 'Hi, I\'m [Your Name]',
      content: 'I help businesses achieve 40% faster growth through strategic automation.',
      background: 'gradient-blue',
      textColor: 'text-white'
    }
  ])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPreview, setIsPreview] = useState(false)
  const [shareableLink, setShareableLink] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const currentSlide = slides[currentSlideIndex]

  const addSlide = (type: string) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      type: type as Slide['type'],
      title: 'New Slide Title',
      content: 'Add your content here...',
      background: 'gradient-blue',
      textColor: 'text-white'
    }
    setSlides([...slides, newSlide])
    setCurrentSlideIndex(slides.length)
  }

  const deleteSlide = (index: number) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, i) => i !== index)
      setSlides(newSlides)
      if (currentSlideIndex >= newSlides.length) {
        setCurrentSlideIndex(newSlides.length - 1)
      }
    }
  }

  const updateSlide = (field: keyof Slide, value: string) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex ? { ...slide, [field]: value } : slide
    )
    setSlides(updatedSlides)
  }

  const generateSlideContent = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/pitchboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-content',
          generateContent: {
            slideType: currentSlide.type,
            targetAudience: 'Business professionals',
            industry: 'Technology',
            valueProposition: 'Helping businesses grow through automation'
          }
        })
      })
      
      const data = await response.json()
      
      if (data.success && data.generatedContent) {
        updateSlide('title', data.generatedContent.title)
        updateSlide('content', data.generatedContent.content)
      }
    } catch (error) {
      console.error('Failed to generate content:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const savePitchboard = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/pitchboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          pitchboardData: {
            slides,
            title: 'My LinkedIn Pitchboard',
            createdBy: 'User'
          }
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setShareableLink(data.shareableLink)
      }
    } catch (error) {
      console.error('Failed to save pitchboard:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const copyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink)
  }

  const getBackgroundClass = (background: string) => {
    return backgroundThemes.find(theme => theme.value === background)?.class || 'bg-gradient-to-br from-blue-600 to-blue-800'
  }

  const getTextColor = (background: string) => {
    return background === 'solid-white' ? 'text-gray-900' : 'text-white'
  }

  if (isPreview) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Pitchboard Preview
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => setIsPreview(false)}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" onClick={savePitchboard} disabled={isSaving} className="bg-[#2563EB] hover:bg-[#2563EB]/90">
                  {isSaving ? <RefreshCw className="h-4 w-4 animate-spin mr-1" /> : <Share2 className="h-4 w-4 mr-1" />}
                  {isSaving ? 'Saving...' : 'Save & Share'}
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-black flex items-center justify-center">
                    <div className="w-20 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Slide Content */}
                  <div className={`w-full h-[calc(100%-24px)] ${getBackgroundClass(currentSlide.background)} flex flex-col justify-center items-center text-center p-8`}>
                    <h1 className={`text-2xl font-bold mb-6 ${getTextColor(currentSlide.background)} leading-tight`}>
                      {currentSlide.title}
                    </h1>
                    <div className={`text-base leading-relaxed whitespace-pre-line ${getTextColor(currentSlide.background)} opacity-90`}>
                      {currentSlide.content}
                    </div>
                  </div>
                  
                  {/* Navigation Dots */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentSlideIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  <div className="absolute bottom-16 left-4 right-4 flex justify-between">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                      disabled={currentSlideIndex === 0}
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                      disabled={currentSlideIndex === slides.length - 1}
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Slide Counter */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <Badge variant="outline" className="bg-white">
                  {currentSlideIndex + 1} of {slides.length}
                </Badge>
              </div>
            </div>
          </div>

          {shareableLink && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2 flex items-center">
                🎉 Pitchboard Created Successfully!
              </h4>
              <p className="text-sm text-green-700 mb-3">
                Your visual message is ready to share on LinkedIn
              </p>
              <div className="flex items-center space-x-2">
                <Input value={shareableLink} readOnly className="flex-1 text-sm" />
                <Button size="sm" onClick={copyShareableLink} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={() => window.open(shareableLink, '_blank')} variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-green-600 mt-2">
                💡 Share this in your LinkedIn messages: "Check out my visual pitch: [link]"
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Presentation className="mr-2 h-5 w-5 text-[#2563EB]" />
            Create Visual Pitchboard
          </DialogTitle>
          <DialogDescription>
            Create Instagram Story-style slides for your LinkedIn outreach that stand out from plain text messages
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Slide Templates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Add Slides</h3>
              <Button size="sm" onClick={() => setIsPreview(true)} className="bg-[#2563EB] hover:bg-[#2563EB]/90">
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {slideTypes.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  onClick={() => addSlide(type.value)}
                  className="h-20 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-300"
                >
                  <span className="text-2xl mb-1">{type.emoji}</span>
                  <span className="text-xs font-medium">{type.label}</span>
                </Button>
              ))}
            </div>

            {/* Slide Navigation */}
            <div className="space-y-2">
              <h4 className="font-medium">Slides ({slides.length})</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === currentSlideIndex 
                        ? 'border-blue-500 bg-blue-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentSlideIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-12 rounded ${getBackgroundClass(slide.background)} flex-shrink-0`} />
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">
                            {slideTypes.find(t => t.value === slide.type)?.emoji} {slide.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {slideTypes.find(t => t.value === slide.type)?.label}
                          </div>
                        </div>
                      </div>
                      {slides.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSlide(index)
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                Edit Slide {currentSlideIndex + 1}
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={generateSlideContent}
                disabled={isGenerating}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-1" />
                )}
                AI Generate
              </Button>
            </div>

            <Card>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <Label className="text-sm font-medium">Slide Type</Label>
                  <Select value={currentSlide.type} onValueChange={(value) => updateSlide('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {slideTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <span>{type.emoji}</span>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-gray-500">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Background Theme</Label>
                  <Select value={currentSlide.background} onValueChange={(value) => updateSlide('background', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundThemes.map(theme => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded border"
                              style={{ background: theme.preview }}
                            />
                            <span>{theme.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <Input
                    value={currentSlide.title}
                    onChange={(e) => updateSlide('title', e.target.value)}
                    placeholder="Enter slide title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Content</Label>
                  <Textarea
                    value={currentSlide.content}
                    onChange={(e) => updateSlide('content', e.target.value)}
                    placeholder="Enter slide content"
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-64 h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-gray-200">
              <div className={`w-full h-full ${getBackgroundClass(currentSlide.background)} flex flex-col justify-center items-center text-center p-6`}>
                <h1 className={`text-lg font-bold mb-4 ${getTextColor(currentSlide.background)} leading-tight`}>
                  {currentSlide.title}
                </h1>
                <div className={`text-sm leading-relaxed whitespace-pre-line ${getTextColor(currentSlide.background)} opacity-90`}>
                  {currentSlide.content}
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <Badge variant="outline" className="bg-white">
                Slide {currentSlideIndex + 1} of {slides.length}
              </Badge>
              <p className="text-xs text-gray-500">
                📱 Instagram Story format (9:16 ratio)
              </p>
              
              {/* Navigation */}
              <div className="flex items-center justify-center space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
