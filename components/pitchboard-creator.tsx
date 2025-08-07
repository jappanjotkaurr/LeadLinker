'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Presentation, Plus, Trash2, Eye, Share2, Sparkles, ChevronLeft, ChevronRight, Copy, ExternalLink, RefreshCw, ArrowLeft, ArrowRight, Upload, Video, Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface Slide {
  id: string
  type: 'intro' | 'benefits' | 'demo' | 'cta' | 'video'
  title: string
  content: string
  background: string
  textColor: string
  videoUrl?: string
  videoFile?: File
}

interface PitchboardCreatorProps {
  isOpen: boolean
  onClose: () => void
}

const slideTypes = [
  { value: 'intro', label: 'Introduction', description: 'Personal intro with value proposition', emoji: '👋' },
  { value: 'benefits', label: 'Benefits', description: 'Key benefits and value points', emoji: '✨' },
  { value: 'demo', label: 'Demo/Case Study', description: 'Success story or use case', emoji: '🎥' },
  { value: 'video', label: 'Video', description: 'Upload your own video content', emoji: '📹' },
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentSlide = slides[currentSlideIndex]

  // Cleanup video URLs when component unmounts
  useEffect(() => {
    return () => {
      slides.forEach(slide => {
        if (slide.videoUrl && slide.videoUrl.startsWith('blob:')) {
          URL.revokeObjectURL(slide.videoUrl)
        }
      })
    }
  }, [])

  const addSlide = (type: string) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      type: type as Slide['type'],
      title: type === 'video' ? 'Video Slide' : 'New Slide Title',
      content: type === 'video' ? 'Upload your video content' : 'Add your content here...',
      background: type === 'video' ? 'solid-dark' : 'gradient-blue',
      textColor: 'text-white'
    }
    setSlides([...slides, newSlide])
    setCurrentSlideIndex(slides.length)
  }

  const deleteSlide = (index: number) => {
    if (slides.length > 1) {
      const slideToDelete = slides[index]
      if (slideToDelete.videoUrl && slideToDelete.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(slideToDelete.videoUrl)
      }
      
      const newSlides = slides.filter((_, i) => i !== index)
      setSlides(newSlides)
      if (currentSlideIndex >= newSlides.length) {
        setCurrentSlideIndex(newSlides.length - 1)
      }
    }
  }

  const updateSlide = (field: keyof Slide, value: string | File) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex ? { ...slide, [field]: value } : slide
    )
    setSlides(updatedSlides)
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      // Revoke previous URL if exists
      if (currentSlide.videoUrl && currentSlide.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentSlide.videoUrl)
      }
      
      // Create new URL for the video file
      const videoUrl = URL.createObjectURL(file)
      updateSlide('videoFile', file)
      updateSlide('videoUrl', videoUrl)
      updateSlide('title', file.name.replace(/\.[^/.]+$/, '')) // Remove file extension
      
      console.log('Video uploaded successfully:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        videoUrl: videoUrl
      })
    } else {
      console.error('Invalid file type. Please select a video file.')
    }
  }

  const toggleVideoPlayback = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      if (isVideoPlaying) {
        videoElement.pause()
      } else {
        videoElement.play().catch(console.error)
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleVideoMute = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      videoElement.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  const generateSlideContent = async () => {
    if (currentSlide.type === 'video') return
    
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const sampleContent = {
        intro: {
          title: 'Hi, I\'m Sarah Thompson',
          content: 'I help B2B companies increase their sales pipeline by 300% through strategic LinkedIn automation and personalized outreach.'
        },
        benefits: {
          title: 'Why Choose Our Solution?',
          content: '✅ 40% higher response rates\n✅ 60% time savings\n✅ 300% more qualified leads\n✅ Proven ROI within 30 days'
        },
        demo: {
          title: 'Real Results',
          content: 'TechCorp increased their qualified leads from 50 to 200 per month using our system.\n\n"Best investment we\'ve made this year!" - CEO, TechCorp'
        },
        cta: {
          title: 'Ready to Get Started?',
          content: 'Book a free 15-minute strategy call to see how we can help your business grow.\n\nClick the link in my bio or DM me "GROWTH"'
        }
      }
      
      const content = sampleContent[currentSlide.type as keyof typeof sampleContent]
      if (content) {
        updateSlide('title', content.title)
        updateSlide('content', content.content)
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockLink = `https://pitchboard.app/view/${Date.now()}`
      setShareableLink(mockLink)
      console.log('Pitchboard saved successfully')
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

  const renderSlideContent = (slide: Slide, isPreviewMode = false, containerClass = '') => {
    if (slide.type === 'video') {
      if (!slide.videoUrl) {
        return (
          <div className={`w-full h-full bg-gray-900 flex flex-col items-center justify-center text-center p-6 ${containerClass}`}>
            <Video className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No Video Uploaded</h3>
            <p className="text-gray-300 text-sm">Upload a video to see it here</p>
          </div>
        )
      }

      return (
        <div className={`relative w-full h-full bg-black flex items-center justify-center overflow-hidden ${containerClass}`}>
          <video
            ref={isPreviewMode ? previewVideoRef : videoRef}
            src={slide.videoUrl}
            className="w-full h-full object-cover"
            muted={isVideoMuted}
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => console.log('Video loaded successfully')}
            onError={(e) => console.error('Video error:', e)}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
          />
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => toggleVideoPlayback(isPreviewMode ? previewVideoRef.current : videoRef.current)}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => toggleVideoMute(isPreviewMode ? previewVideoRef.current : videoRef.current)}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {/* Title Overlay */}
          {slide.title && slide.title !== 'Video Slide' && slide.title !== slide.videoFile?.name?.replace(/\.[^/.]+$/, '') && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <h3 className="text-white font-semibold text-sm text-center">{slide.title}</h3>
              </div>
            </div>
          )}
        </div>
      )
    }

    // Regular text slides
    return (
      <div className={`w-full h-full ${getBackgroundClass(slide.background)} flex flex-col justify-center items-center text-center p-6 ${containerClass}`}>
        <h1 className={`text-lg font-bold mb-4 ${getTextColor(slide.background)} leading-tight`}>
          {slide.title}
        </h1>
        <div className={`text-sm leading-relaxed whitespace-pre-line ${getTextColor(slide.background)} opacity-90`}>
          {slide.content}
        </div>
      </div>
    )
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
                  <div className="w-full h-[calc(100%-24px)] overflow-hidden">
                    {renderSlideContent(currentSlide, true)}
                  </div>
                  
                  {/* Navigation Dots */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                          index === currentSlideIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentSlideIndex(index)}
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
            Create Instagram Story-style slides with text, images, and videos for your LinkedIn outreach
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
                        <div className={`w-8 h-12 rounded ${slide.type === 'video' ? 'bg-black' : getBackgroundClass(slide.background)} flex-shrink-0 flex items-center justify-center`}>
                          {slide.type === 'video' && (
                            <Video className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">
                            {slideTypes.find(t => t.value === slide.type)?.emoji} {slide.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {slideTypes.find(t => t.value === slide.type)?.label}
                            {slide.type === 'video' && slide.videoUrl && (
                              <span className="text-green-600 ml-1">• Video ready</span>
                            )}
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
              {currentSlide.type !== 'video' && (
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
              )}
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

                {currentSlide.type === 'video' ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Upload Video</Label>
                      <div className="mt-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/mp4,video/mov,video/avi,video/webm"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className={`w-full h-32 border-2 border-dashed transition-colors ${
                            currentSlide.videoUrl 
                              ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            {currentSlide.videoUrl ? (
                              <>
                                <Video className="h-8 w-8 text-green-600" />
                                <div className="text-sm text-green-700 font-medium">
                                  ✓ {currentSlide.videoFile?.name || 'Video uploaded'}
                                </div>
                                <div className="text-xs text-green-600">
                                  Click to change video
                                </div>
                              </>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-gray-400" />
                                <div className="text-sm text-gray-600">
                                  Click to upload video
                                </div>
                                <div className="text-xs text-gray-500">
                                  MP4, MOV, AVI, WebM up to 50MB
                                </div>
                              </>
                            )}
                          </div>
                        </Button>
                      </div>
                    </div>

                    {currentSlide.videoUrl && (
                      <div>
                        <Label className="text-sm font-medium">Video Preview</Label>
                        <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
                          <video
                            src={currentSlide.videoUrl}
                            className="w-full h-full object-cover"
                            controls
                            muted
                            preload="metadata"
                            onLoadedData={() => console.log('Editor video loaded successfully')}
                            onError={(e) => console.error('Editor video error:', e)}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label className="text-sm font-medium">Video Title (Optional)</Label>
                      <Input
                        value={currentSlide.title}
                        onChange={(e) => updateSlide('title', e.target.value)}
                        placeholder="Enter video title or leave blank"
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-64 h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-gray-200">
              {renderSlideContent(currentSlide, false, 'rounded-2xl')}
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
