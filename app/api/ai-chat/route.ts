import { NextRequest, NextResponse } from 'next/server'

// Simulate AI chat with rate limiting
const chatSessions = new Map<string, { count: number, lastReset: number }>()

export async function POST(request: NextRequest) {
  try {
    const { message, userId = 'demo-user' } = await request.json()
    
    // Rate limiting logic
    const now = Date.now()
    const session = chatSessions.get(userId) || { count: 0, lastReset: now }
    
    // Reset count every 24 hours
    if (now - session.lastReset > 24 * 60 * 60 * 1000) {
      session.count = 0
      session.lastReset = now
    }
    
    // Check daily limit (5 for demo)
    if (session.count >= 5) {
      return NextResponse.json({
        error: 'Daily AI chat limit reached. Upgrade to Pro for unlimited chats.',
        limitReached: true
      }, { status: 429 })
    }
    
    // Increment count
    session.count++
    chatSessions.set(userId, session)
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const responses = [
      "Here's an enhanced version of your message with better personalization and engagement hooks.",
      "I've improved your message tone and added compelling value propositions.",
      "Your message has been optimized for higher response rates with industry-specific insights.",
      "I've enhanced your message with social proof and a stronger call-to-action."
    ]
    
    const enhancedMessage = `Hi [Name], I noticed your recent post about ${message.includes('AI') ? 'AI implementation' : 'industry trends'} and found your insights really valuable. As someone working with similar companies in your space, I've helped teams like yours achieve 40% faster growth through strategic automation. Would you be open to a brief 15-minute call to share some specific strategies that might benefit your team at [Company]?`
    
    return NextResponse.json({
      originalMessage: message,
      enhancedMessage,
      improvements: [
        "Added personalized opening based on recent activity",
        "Included specific value proposition with metrics",
        "Created clear, low-commitment call-to-action",
        "Optimized length for higher response rates"
      ],
      remainingChats: 5 - session.count,
      response: responses[Math.floor(Math.random() * responses.length)]
    })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to enhance message' }, { status: 500 })
  }
}
