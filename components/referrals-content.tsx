'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, Gift, Crown, Trophy, Award, Copy, Share2, Mail, Linkedin, Twitter, Star, Flame, Target, Send } from 'lucide-react'

const mentors = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'LinkedIn Growth Expert',
    company: 'SocialScale',
    avatar: '/professional-woman-marketing.png',
    expertise: ['LinkedIn Strategy', 'B2B Sales', 'Lead Generation'],
    followers: '125K',
    bonus: 500,
    featured: true,
    bio: 'Helped 500+ professionals grow their LinkedIn presence and generate quality leads.',
    linkedin: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchen'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Sales Automation Specialist',
    company: 'AutoSales Pro',
    avatar: '/professional-man.png',
    expertise: ['Sales Automation', 'CRM Integration', 'Outreach'],
    followers: '89K',
    bonus: 400,
    featured: true,
    bio: 'Built sales automation systems that generated $50M+ in pipeline.',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    twitter: 'https://twitter.com/marcusjohnson'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'B2B Networking Coach',
    company: 'NetworkPro',
    avatar: '/professional-woman-diverse.png',
    expertise: ['Networking', 'Relationship Building', 'Personal Branding'],
    followers: '67K',
    bonus: 350,
    featured: true,
    bio: 'Coached 1000+ professionals to build meaningful business relationships.',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    twitter: 'https://twitter.com/emilyrodriguez'
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'LinkedIn Content Creator',
    company: 'ContentKing',
    avatar: '/professional-ceo.png',
    expertise: ['Content Strategy', 'Thought Leadership', 'Engagement'],
    followers: '156K',
    bonus: 600,
    featured: true,
    bio: 'Created viral LinkedIn content with 10M+ views and helped brands build authority.',
    linkedin: 'https://linkedin.com/in/davidkim',
    twitter: 'https://twitter.com/davidkim'
  }
]

const referralData = {
  totalReferrals: 7,
  totalCredits: 750,
  proMonthsEarned: 1,
  currentRank: 3,
  nextMilestone: 10,
  hotStreak: 3
}

const leaderboard = [
  { rank: 1, name: 'Alex Thompson', referrals: 23, credits: 2300, badge: 'Crown' },
  { rank: 2, name: 'Maria Garcia', referrals: 18, credits: 1800, badge: 'Trophy' },
  { rank: 3, name: 'You', referrals: 7, credits: 750, badge: 'Award', isUser: true },
  { rank: 4, name: 'John Smith', referrals: 6, credits: 600, badge: null },
  { rank: 5, name: 'Lisa Wang', referrals: 5, credits: 500, badge: null }
]

const referredUsers = [
  { name: 'Michael Brown', email: 'm.brown@techcorp.com', status: 'Active', joinDate: '2024-01-15', credits: 100 },
  { name: 'Jennifer Lee', email: 'j.lee@startup.io', status: 'Active', joinDate: '2024-01-12', credits: 100 },
  { name: 'Robert Wilson', email: 'r.wilson@company.com', status: 'Pending', joinDate: '2024-01-10', credits: 0 },
  { name: 'Amanda Davis', email: 'a.davis@business.com', status: 'Active', joinDate: '2024-01-08', credits: 100 },
  { name: 'Chris Martinez', email: 'c.martinez@firm.com', status: 'Active', joinDate: '2024-01-05', credits: 100 }
]

export function ReferralsContent() {
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [referralMessage, setReferralMessage] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')

  const referralLink = 'https://leadlinker.com/ref/your-unique-code'
  const progressToNext = (referralData.totalReferrals / referralData.nextMilestone) * 100

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    // You could add a toast notification here
  }

  const handleSendReferral = (mentor: any) => {
    setSelectedMentor(mentor)
    setReferralMessage(`Hi there!

I wanted to introduce you to ${mentor.name}, a ${mentor.title} at ${mentor.company}. 

${mentor.bio}

${mentor.name} specializes in: ${mentor.expertise.join(', ')}

I thought you might find their expertise valuable for your LinkedIn growth and sales automation needs.

You can connect with them here:
LinkedIn: ${mentor.linkedin}

Also, I'd love to invite you to try LeadLinker - it's been a game-changer for my LinkedIn outreach and automation. You can sign up using my referral link: ${referralLink}

Best regards!`)
    setEmailDialogOpen(true)
  }

  const getRankIcon = (badge: string | null) => {
    switch (badge) {
      case 'Crown':
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 'Trophy':
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 'Award':
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Referrals</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn credits and rewards by referring others to LeadLinker
          </p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90">
          <Share2 className="mr-2 h-4 w-4" />
          Share Referral Link
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Total Referrals
                </p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {referralData.totalReferrals}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-200 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Flame className="h-4 w-4 text-orange-500 mr-1" />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {referralData.hotStreak} day streak!
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  Credits Earned
                </p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {referralData.totalCredits}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-200 dark:bg-green-800 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-700 dark:text-green-300">
                100 credits per referral
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Pro Months
                </p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {referralData.proMonthsEarned}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-200 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-purple-700 dark:text-purple-300">
                1 month per 5 referrals
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  Leaderboard Rank
                </p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                  #{referralData.currentRank}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-200 dark:bg-orange-800 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600 dark:text-orange-300" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-orange-700 dark:text-orange-300">
                Top 10 this month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Milestone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progress to Next Milestone
          </CardTitle>
          <CardDescription>
            {referralData.nextMilestone - referralData.totalReferrals} more referrals to unlock 2 Pro months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{referralData.totalReferrals} referrals</span>
              <span>{referralData.nextMilestone} referrals</span>
            </div>
            <Progress value={progressToNext} className="h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Next reward: 2 Pro months + 500 bonus credits
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>
            Share this link to earn 100 credits for each successful referral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="flex-1" />
            <Button onClick={handleCopyLink} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Mentors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Featured LinkedIn Mentors
          </CardTitle>
          <CardDescription>
            Refer prospects to these LinkedIn experts and earn bonus credits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="relative">
                {mentor.featured && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {mentor.title} at {mentor.company}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {mentor.followers} LinkedIn followers
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {mentor.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {mentor.bio}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={mentor.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-600">
                        +{mentor.bonus} credits
                      </Badge>
                      <Button 
                        size="sm" 
                        onClick={() => handleSendReferral(mentor)}
                        className="bg-[#2563EB] hover:bg-[#2563EB]/90"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send Referral
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Referral Leaderboard
            </CardTitle>
            <CardDescription>Top referrers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.isUser ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700">
                      {getRankIcon(user.badge) || (
                        <span className="text-sm font-bold">#{user.rank}</span>
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${user.isUser ? 'text-blue-900 dark:text-blue-100' : ''}`}>
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.referrals} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{user.credits}</p>
                    <p className="text-sm text-gray-500">credits</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referred Users */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>People you've successfully referred</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      +{user.credits}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Email Referral Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Referral Email</DialogTitle>
            <DialogDescription>
              Send a personalized referral email introducing {selectedMentor?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Recipient Email</label>
              <Input
                placeholder="Enter recipient's email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                rows={12}
                value={referralMessage}
                onChange={(e) => setReferralMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-[#2563EB] hover:bg-[#2563EB]/90"
                onClick={() => {
                  window.location.href = `mailto:${recipientEmail}?subject=Introduction to ${selectedMentor?.name} - LinkedIn Expert&body=${encodeURIComponent(referralMessage)}`
                  setEmailDialogOpen(false)
                }}
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
