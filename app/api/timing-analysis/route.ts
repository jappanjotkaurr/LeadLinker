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
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 512,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to analyze timing'
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'Unable to analyze optimal timing at the moment.'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prospectData } = await request.json()
    
    const analysisPrompt = `
Analyze the optimal outreach timing for this LinkedIn prospect:

Name: ${prospectData.name}
Job Title: ${prospectData.jobTitle}
Company: ${prospectData.company}
Industry: ${prospectData.industry}
Location: ${prospectData.location}
Last Activity: ${prospectData.lastActivity}

Based on this information, provide timing recommendations in this exact JSON format:
{
  "bestDays": ["Monday", "Tuesday"],
  "bestTimes": ["9:00-10:00 AM", "2:00-3:00 PM"],
  "timezone": "EST",
  "confidence": 85,
  "reasoning": "Brief explanation of why these times work best",
  "insights": ["Insight 1", "Insight 2"]
}

Consider:
- Industry standards for their role
- Geographic location and timezone
- Professional activity patterns
- Best practices for LinkedIn outreach

Return only valid JSON, no additional text.
`

    const analysisResult = await callGeminiAPI(analysisPrompt)
    
    // Try to parse the JSON response
    let timingData
    try {
      timingData = JSON.parse(analysisResult)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      timingData = {
        bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
        bestTimes: ['9:00-10:00 AM', '2:00-3:00 PM'],
        timezone: 'EST',
        confidence: 75,
        reasoning: 'Based on general professional activity patterns',
        insights: [
          'Mid-week days typically have higher response rates',
          'Morning and early afternoon are optimal for professional outreach'
        ]
      }
    }

    return NextResponse.json({
      success: true,
      timingAnalysis: timingData
    })

  } catch (error) {
    console.error('Timing Analysis Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze timing'
    }, { status: 500 })
  }
}
