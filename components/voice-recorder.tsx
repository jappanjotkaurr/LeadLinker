'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, Square, Play, Pause, Trash2, Send, AudioWaveformIcon as Waveform, Volume2 } from 'lucide-react'

interface VoiceRecorderProps {
  isOpen: boolean
  onClose: () => void
  onVoiceMessage: (audioBlob: Blob) => void
}

export function VoiceRecorder({ isOpen, onClose, onVoiceMessage }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [transcription, setTranscription] = useState('')
  const [isTranscribing, setIsTranscribing] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        
        // Simulate transcription
        setIsTranscribing(true)
        setTimeout(() => {
          setTranscription("Hi Sarah, I hope this voice message finds you well. I wanted to reach out personally to discuss how our AI automation solutions could help TechCorp streamline your development processes. I'd love to schedule a brief call to share some specific insights that could benefit your team.")
          setIsTranscribing(false)
        }, 3000)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const deleteRecording = () => {
    setAudioBlob(null)
    setAudioUrl('')
    setTranscription('')
    setRecordingTime(0)
  }

  const sendVoiceMessage = () => {
    if (audioBlob) {
      onVoiceMessage(audioBlob)
      onClose()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mic className="mr-2 h-5 w-5 text-green-500" />
            Voice Message Recorder
          </DialogTitle>
          <DialogDescription>
            Record a personal voice message to make your outreach more engaging
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recording Interface */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Recording Visualization */}
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-100 border-4 border-red-500 animate-pulse' 
                    : 'bg-gray-100 border-4 border-gray-300'
                }`}>
                  <Mic className={`h-12 w-12 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
                </div>

                {/* Timer */}
                <div className="text-2xl font-mono font-bold">
                  {formatTime(recordingTime)}
                </div>

                {/* Recording Status */}
                {isRecording && (
                  <Badge variant="destructive" className="animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2" />
                    Recording...
                  </Badge>
                )}

                {/* Control Buttons */}
                <div className="flex space-x-3">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Square className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Playback */}
          {audioUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Volume2 className="mr-2 h-4 w-4" />
                  Recorded Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full"
                  controls
                />

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={isPlaying ? pauseAudio : playAudio}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={deleteRecording}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Transcription */}
          {(transcription || isTranscribing) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">AI Transcription</CardTitle>
                <CardDescription>
                  Automatically generated text from your voice message
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isTranscribing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="text-sm text-gray-500">Transcribing audio...</span>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    {transcription}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={sendVoiceMessage}
              disabled={!audioBlob}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Use Voice Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
