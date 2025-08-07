import { NextRequest, NextResponse } from 'next/server'

// Mock database for referrals (in production, use a real database)
const referralData = {
  users: new Map(),
  leaderboard: []
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'user_123'
    
    // Get user referral data
    const userData = referralData.users.get(userId) || {
      referralCode: `LEAD${userId.slice(-4).toUpperCase()}`,
      totalReferrals: 0,
      messageCredits: 0,
      proMonthsEarned: 0,
      referredUsers: [],
      rank: 0
    }
    
    // Generate mock leaderboard
    const leaderboard = [
      { name: 'Sarah Johnson', referrals: 12, credits: 1200, rank: 1 },
      { name: 'Mike Chen', referrals: 8, credits: 800, rank: 2 },
      { name: 'Emily Rodriguez', referrals: 6, credits: 600, rank: 3 },
      { name: 'David Kim', referrals: 4, credits: 400, rank: 4 },
      { name: 'You', referrals: userData.totalReferrals, credits: userData.messageCredits, rank: 5 }
    ]
    
    return NextResponse.json({
      success: true,
      userData,
      leaderboard,
      milestones: [
        { referrals: 1, reward: '100 Message Credits', achieved: userData.totalReferrals >= 1 },
        { referrals: 3, reward: '300 Message Credits', achieved: userData.totalReferrals >= 3 },
        { referrals: 5, reward: '1 Month Pro Plan', achieved: userData.totalReferrals >= 5 },
        { referrals: 10, reward: '3 Months Pro Plan', achieved: userData.totalReferrals >= 10 },
        { referrals: 25, reward: '1 Year Pro Plan', achieved: userData.totalReferrals >= 25 }
      ]
    })
  } catch (error) {
    console.error('Referrals API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch referral data'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, userId, referralCode } = await request.json()
    
    if (action === 'track-referral') {
      // Mock tracking a new referral
      const userData = referralData.users.get(userId) || {
        referralCode: `LEAD${userId.slice(-4).toUpperCase()}`,
        totalReferrals: 0,
        messageCredits: 0,
        proMonthsEarned: 0,
        referredUsers: [],
        rank: 0
      }
      
      userData.totalReferrals += 1
      userData.messageCredits += 100 // 1 referral = 100 credits
      
      if (userData.totalReferrals === 5) {
        userData.proMonthsEarned += 1 // 5 referrals = 1 month Pro
      }
      
      referralData.users.set(userId, userData)
      
      return NextResponse.json({
        success: true,
        message: 'Referral tracked successfully!',
        userData
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 })
    
  } catch (error) {
    console.error('Referrals POST Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process referral'
    }, { status: 500 })
  }
}
