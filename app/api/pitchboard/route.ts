import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = 'AIzaSyBVwPLWko6n5EPho5T3BczJgyR1dbps9MQ'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate content'
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'Unable to generate content at the moment.'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.action === 'generate-content') {
      const { slideType, targetAudience, industry, valueProposition } = body.generateContent
      
      const contentPrompt = `
Create compelling content for a LinkedIn pitchboard slide:

Slide Type: ${slideType}
Target Audience: ${targetAudience}
Industry: ${industry}
Value Proposition: ${valueProposition}

Generate content in this JSON format:
{
  "title": "Compelling slide title (max 50 characters)",
  "content": "Engaging slide content (max 150 characters)"
}

Guidelines:
- ${slideType === 'intro' ? 'Personal introduction with hook' : ''}
- ${slideType === 'benefits' ? 'List 3 key benefits with numbers/percentages' : ''}
- ${slideType === 'demo' ? 'Describe a success story or use case' : ''}
- ${slideType === 'cta' ? 'Clear call-to-action with next steps' : ''}
- Keep it concise and impactful
- Use professional LinkedIn tone
- Include specific value propositions

Return only valid JSON.
`

      const generatedContent = await callGeminiAPI(contentPrompt)
      
      let contentData
      try {
        contentData = JSON.parse(generatedContent)
      } catch (parseError) {
        // Fallback content
        contentData = {
          title: slideType === 'intro' ? 'Hi, I\'m [Your Name]' : 
                 slideType === 'benefits' ? 'Key Benefits' :
                 slideType === 'demo' ? 'Success Story' : 'Let\'s Connect',
          content: slideType === 'intro' ? 'I help businesses grow through strategic automation.' :
                   slideType === 'benefits' ? '• 40% Faster Growth\n• 60% Time Savings\n• 90% Higher ROI' :
                   slideType === 'demo' ? 'Helped TechCorp increase leads by 300% in 3 months.' :
                   'Ready to transform your business? Let\'s schedule a quick call.'
        }
      }

      return NextResponse.json({
        success: true,
        generatedContent: contentData
      })
    }
    
    if (body.action === 'save') {
      const { pitchboardData } = body
      
      // Generate a unique shareable link
      const pitchboardId = `pb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const shareableLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://leadlinker.com'}/pitchboard/${pitchboardId}`
      
      // In a real app, save to database here
      console.log('Saving pitchboard:', pitchboardId, pitchboardData)
      
      return NextResponse.json({
        success: true,
        pitchboardId,
        shareableLink
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 })

  } catch (error) {
    console.error('Pitchboard API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
