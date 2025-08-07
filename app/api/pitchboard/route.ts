import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const pitchboardData = await request.json()
    
    // Simulate saving pitchboard
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const pitchboardId = `pb_${Date.now()}`
    const shareableLink = `https://pitchboard.linkedinai.pro/${pitchboardId}`
    
    return NextResponse.json({
      id: pitchboardId,
      shareableLink,
      previewLink: shareableLink + '/preview',
      status: 'created',
      slides: pitchboardData.slides?.length || 0
    })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pitchboard' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Pitchboard ID required' }, { status: 400 })
  }
  
  // Simulate fetching pitchboard
  const mockPitchboard = {
    id,
    title: 'SaaS Platform Demo',
    slides: [
      {
        type: 'intro',
        title: 'Transform Your Business',
        subtitle: 'With AI-Powered Automation',
        background: 'gradient-blue'
      },
      {
        type: 'benefits',
        title: 'Key Benefits',
        points: ['40% Faster Growth', '60% Time Savings', '90% Higher ROI'],
        background: 'white'
      },
      {
        type: 'demo',
        title: 'See It In Action',
        mediaUrl: '/demo-gif.gif',
        description: 'Watch how our platform automates your workflow'
      },
      {
        type: 'cta',
        title: 'Ready to Get Started?',
        buttonText: 'Book a Demo',
        buttonUrl: 'https://calendly.com/demo'
      }
    ],
    createdAt: new Date().toISOString(),
    views: Math.floor(Math.random() * 100)
  }
  
  return NextResponse.json(mockPitchboard)
}
