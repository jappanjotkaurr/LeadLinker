import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = 'AIzaSyBVwPLWko6n5EPho5T3BczJgyR1dbps9MQ'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const DAILY_LIMIT = 5
const RESET_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours

function getRateLimitKey(ip: string): string {
  return `rate_limit_${ip}`
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  
  let userData = rateLimitStore.get(key)
  
  if (!userData || now > userData.resetTime) {
    userData = {
      count: 0,
      resetTime: now + RESET_INTERVAL
    }
  }
  
  const allowed = userData.count < DAILY_LIMIT
  const remaining = Math.max(0, DAILY_LIMIT - userData.count)
  
  if (allowed) {
    userData.count++
    rateLimitStore.set(key, userData)
  }
  
  return {
    allowed,
    remaining: remaining - (allowed ? 1 : 0),
    resetTime: userData.resetTime
  }
}

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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate response'
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'I apologize, but I\'m currently unable to process your request. Please try again later.'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    
    if (!rateLimit.allowed) {
      return NextResponse.json({
        success: false,
        error: 'Daily limit exceeded',
        rateLimitExceeded: true,
        remaining: rateLimit.remaining,
        resetTime: rateLimit.resetTime,
        upgradeMessage: 'Upgrade to Pro for unlimited AI message enhancements!'
      }, { status: 429 })
    }

    // Create LinkedIn-optimized prompt
    const linkedinPrompt = `
You are an expert LinkedIn outreach specialist. Help improve this LinkedIn message for better response rates.

Original message: "${message}"

Context: ${context || 'Professional LinkedIn outreach'}

Please enhance this message following LinkedIn best practices:
1. Keep it concise and professional
2. Personalize when possible
3. Include a clear value proposition
4. End with a soft call-to-action
5. Maintain a conversational tone
6. Avoid being overly salesy

Return only the improved message, nothing else.
`

    const enhancedMessage = await callGeminiAPI(linkedinPrompt)

    return NextResponse.json({
      success: true,
      enhancedMessage,
      remaining: rateLimit.remaining,
      resetTime: rateLimit.resetTime
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
