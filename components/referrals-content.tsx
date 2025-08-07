'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Gift, Copy, Share2, Trophy, Star, Users, MessageSquare, Crown, Target, Zap, Award, TrendingUp, ExternalLink, Mail, Linkedin, Twitter, CheckCircle, Clock, FlameIcon as Fire } from 'lucide-react'

// Dummy data for referrals
const referralData = {
  referralCode: 'LEAD2024',
  totalReferrals: 7,
  messageCredits: 750,
  proMonthsEarned: 1,
  referredUsers: [
    { name: 'John Smith', joinedDate: '2024-01-15', status: 'active' },
    { name: 'Emma Wilson', joinedDate: '2024-01-20', status: 'active' },
    { name: 'Mike Johnson', joinedDate: '2024-01-25', status: 'pending' },
    { name: 'Sarah Davis', joinedDate: '2024-02-01', status: 'active' },
    { name: 'Alex Chen', joinedDate: '2024-02-05', status: 'active' },
    { name: 'Lisa Brown', joinedDate: '2024-02-10', status: 'active' },
    { name: 'David Miller', joinedDate: '2024-02-12', status: 'pending' }
  ],
  rank: 3
}

const leaderboard = [
  { name: 'Sarah Johnson', referrals: 23, credits: 2300, rank: 1, avatar: '/professional-woman-diverse.png' },
  { name: 'Mike Chen', referrals: 18, credits: 1800, rank: 2, avatar: '/professional-man.png' },
  { name: 'You', referrals: referralData.totalReferrals, credits: referralData.messageCredits, rank: 3, avatar: '/professional-headshot.png' },
  { name: 'Emily Rodriguez', referrals: 12, credits: 1200, rank: 4, avatar: '/professional-woman-marketing.png' },
  { name: 'David Kim', referrals: 9, credits: 900, rank: 5, avatar: '/professional-ceo.png' }
]

const mentors = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    title: 'LinkedIn Growth Expert',
    company: 'SalesForce',
    expertise: ['LinkedIn Strategy', 'B2B Sales', 'Lead Generation'],
    followers: '50K+',
    responseRate: '95%',
    avatar: '/professional-man.png',
    bio: 'Helped 500+ professionals grow their LinkedIn presence and generate quality leads.',
    linkedinUrl: 'https://linkedin.com/in/alexrodriguez',
    twitterUrl: 'https://twitter.com/alexrodriguez',
    email: 'alex@salesforce.com',
    referralBonus: '200 credits',
    featured: true
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    title: 'Sales Automation Specialist',
    company: 'HubSpot',
    expertise: ['Sales Automation', 'CRM Strategy', 'Pipeline Management'],
    followers: '35K+',
    responseRate: '92%',
    avatar: '/professional-woman-diverse.png',
    bio: 'Sales automation expert with 8+ years of experience in scaling B2B operations.',
    linkedinUrl: 'https://linkedin.com/in/sarahmitchell',
    twitterUrl: 'https://twitter.com/sarahmitchell',
    email: 'sarah@hubspot.com',
    referralBonus: '150 credits',
    featured: true
  },
  {
    id: 3,
    name: 'Marcus Thompson',
    title: 'B2B Marketing Director',
    company: 'Salesforce',
    expertise: ['Content Marketing', 'Lead Nurturing', 'Marketing Automation'],
    followers: '28K+',
    responseRate: '88%',
    avatar: '/professional-ceo.png',
    bio: 'B2B marketing strategist specializing in lead generation and conversion optimization.',
    linkedinUrl: 'https://linkedin.com/in/marcusthompson',
    twitterUrl: 'https://twitter.com/marcusthompson',
    email: 'marcus@salesforce.com',
    referralBonus: '175 credits',
    featured: false
  },
  {
    id: 4,
    name: 'Jennifer Lee',
    title: 'LinkedIn Trainer & Coach',
    company: 'LinkedIn Learning',
    expertise: ['LinkedIn Training', 'Personal Branding', 'Network Building'],
    followers: '42K+',
    responseRate: '94%',
    avatar: '/professional-woman-marketing.png',
    bio: 'Official LinkedIn trainer helping professionals maximize their platform presence.',
    linkedinUrl: 'https://linkedin.com/in/jenniferlee',
    twitterUrl: 'https://twitter.com/jenniferlee',
    email: 'jennifer@linkedin.com',
    referralBonus: '250 credits',
    featured: true
  }
]

const milestones = [
  { referrals: 1, reward: '100 Message Credits', achieved: referralData.totalReferrals >= 1 },
  { referrals: 3, reward: '300 Message Credits', achieved: referralData.totalReferrals >= 3 },
  { referrals: 5, reward: '1 Month Pro Plan', achieved: referralData.totalReferrals >= 5 },
  { referrals: 10, reward: '3 Months Pro Plan', achieved: referralData.totalReferrals >= 10 },
  { referrals: 25, reward: '1 Year Pro Plan', achieved: referralData.totalReferrals >= 25 }
]

export function ReferralsContent() {
  const [copied, setCopied] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [referralMessage, setReferralMessage] = useState('')
  const [showReferralDialog, setShowReferralDialog] = useState(false)

  const copyReferralLink = () => {
    const referralLink = `https://leadlinker.com/signup?ref=${referralData.referralCode}`
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferralLink = () => {
    const referralLink = `https://leadlinker.com/signup?ref=${referralData.referralCode}`
    const shareText = `🚀 Join me on LeadLinker - the AI-powered LinkedIn automation tool that's transforming how we generate leads! Use my referral code ${referralData.referralCode} and we both get bonus credits! ${referralLink}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Join LeadLinker',
        text: shareText,
        url: referralLink
      })
    } else {
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-gray-300" />
    }
  }

  const getProgressToNextMilestone = () => {
    const nextMilestone = milestones.find(m => !m.achieved)
    if (!nextMilestone) return { progress: 100, nextMilestone: null }
    
    const progress = (referralData.totalReferrals / nextMilestone.referrals) * 100
    return { progress, nextMilestone }
  }

  const { progress, nextMilestone } = getProgressToNextMilestone()

  const sendReferralToMentor = (mentor: any) => {
    setSelectedMentor(mentor)
    setReferralMessage(`Hi ${mentor.name},

I've been using LeadLinker for LinkedIn automation and it's been incredible for my lead generation. I thought you might find it valuable given your expertise in ${mentor.expertise[0]}.

Would you be interested in checking it out? You can use my referral code ${referralData.referralCode} to get started with bonus credits.

Here's the link: https://leadlinker.com/signup?ref=${referralData.referralCode}

Best regards!`)
    setShowReferralDialog(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Gift className="mr-3 h-8 w-8 text-[#2563EB]" />
            Referral Program
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn rewards by inviting friends and mentors to LeadLinker
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            🎉 Limited Time: Double Rewards!
          </Badge>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <Fire className="h-3 w-3 mr-1" />
            Hot Streak: {referralData.totalReferrals} referrals!
          </Badge>
        </div>
      </div>

      {/* Referral Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Referrals</p>
                <p className="text-3xl font-bold text-blue-900">{referralData.totalReferrals}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Message Credits</p>
                <p className="text-3xl font-bold text-green-900">{referralData.messageCredits}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Pro Months Earned</p>
                <p className="text-3xl font-bold text-purple-900">{referralData.proMonthsEarned}</p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Leaderboard Rank</p>
                <p className="text-3xl font-bold text-orange-900">#{referralData.rank}</p>
              </div>
              <Trophy className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="mr-2 h-5 w-5" />
            Your Referral Link
          </CardTitle>
          <CardDescription>
            Share this link with friends and earn rewards when they sign up
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={`https://leadlinker.com/signup?ref=${referralData.referralCode}`}
              readOnly
              className="flex-1"
            />
            <Button onClick={copyReferralLink} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button onClick={shareReferralLink} className="bg-[#2563EB] hover:bg-[#2563EB]/90">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">Your Referral Code</p>
            <p className="text-2xl font-mono font-bold text-[#2563EB]">{referralData.referralCode}</p>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Milestone */}
      {nextMilestone && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Next Milestone
            </CardTitle>
            <CardDescription>
              {nextMilestone.referrals - referralData.totalReferrals} more referrals to unlock: {nextMilestone.reward}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{referralData.totalReferrals} referrals</span>
                <span>{nextMilestone.referrals} referrals</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-center text-sm text-gray-600">
                {Math.round(progress)}% complete
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Mentors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Featured Mentors & Experts
          </CardTitle>
          <CardDescription>
            Refer these LinkedIn experts and earn bonus credits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.filter(mentor => mentor.featured).map((mentor) => (
              <div key={mentor.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      {mentor.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                    <p className="text-sm text-gray-500">{mentor.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{mentor.followers} followers</span>
                      <span>{mentor.responseRate} response rate</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mt-3">{mentor.bio}</p>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => window.open(mentor.linkedinUrl, '_blank')}>
                      <Linkedin className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(mentor.twitterUrl, '_blank')}>
                      <Twitter className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(`mailto:${mentor.email}`, '_blank')}>
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Bonus: {mentor.referralBonus}</p>
                    <Button size="sm" onClick={() => sendReferralToMentor(mentor)} className="bg-[#2563EB] hover:bg-[#2563EB]/90">
                      Send Referral
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Mentors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            All LinkedIn Experts
          </CardTitle>
          <CardDescription>
            Browse our complete list of LinkedIn professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{mentor.name}</h4>
                      {mentor.featured && <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{mentor.title} at {mentor.company}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                      <span>{mentor.followers} followers</span>
                      <span>{mentor.responseRate} response rate</span>
                      <span>Bonus: {mentor.referralBonus}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" onClick={() => sendReferralToMentor(mentor)} variant="outline">
                  Send Referral
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Reward Milestones
            </CardTitle>
            <CardDescription>
              Unlock amazing rewards as you refer more friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    milestone.achieved
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {milestone.achieved ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-xs font-bold text-white">{milestone.referrals}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {milestone.referrals} Referral{milestone.referrals !== 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-600">{milestone.reward}</p>
                    </div>
                  </div>
                  {milestone.achieved && (
                    <Badge className="bg-green-500 text-white">
                      Unlocked!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Leaderboard
            </CardTitle>
            <CardDescription>
              Top referrers this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(user.rank)}
                      <span className="font-bold text-lg">#{user.rank}</span>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={`font-medium ${user.name === 'You' ? 'text-blue-900' : ''}`}>
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.referrals} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{user.credits}</p>
                    <p className="text-xs text-gray-500">credits</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals ({referralData.referredUsers.length})</CardTitle>
          <CardDescription>
            People who joined using your referral code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralData.referredUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {user.status === 'active' ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Referrals Work</CardTitle>
          <CardDescription>
            Simple steps to start earning rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Share Your Link</h3>
              <p className="text-sm text-gray-600">
                Share your unique referral link with friends, colleagues, or LinkedIn experts
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Friends Sign Up</h3>
              <p className="text-sm text-gray-600">
                When someone signs up using your link, they become your referral
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Earn Rewards</h3>
              <p className="text-sm text-gray-600">
                Get instant credits and unlock milestone rewards as you refer more people
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Message Dialog */}
      <Dialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Referral to {selectedMentor?.name}</DialogTitle>
            <DialogDescription>
              Customize your referral message before sending
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={referralMessage}
              onChange={(e) => setReferralMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowReferralDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  window.open(`mailto:${selectedMentor?.email}?subject=LeadLinker Referral&body=${encodeURIComponent(referralMessage)}`, '_blank')
                  setShowReferralDialog(false)
                }}
                className="bg-[#2563EB] hover:bg-[#2563EB]/90"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
