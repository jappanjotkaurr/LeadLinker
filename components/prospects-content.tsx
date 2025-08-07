'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, Download, Send, MoreHorizontal, Eye, MessageSquare, FileText, Trash2, Upload, Clock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TimingAnalyzer } from '@/components/timing-analyzer'
import { PdfLeadBrief } from '@/components/pdf-lead-brief'

const prospects = [
  {
    id: 1,
    name: 'Sarah Johnson',
    jobTitle: 'VP of Engineering',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    engagementScore: 85,
    status: 'connected',
    industry: 'Technology',
    lastActivity: '2 days ago',
    avatar: '/placeholder.svg?height=40&width=40&text=SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    jobTitle: 'CTO',
    company: 'StartupXYZ',
    location: 'New York, NY',
    engagementScore: 72,
    status: 'pending',
    industry: 'SaaS',
    lastActivity: '1 day ago',
    avatar: '/placeholder.svg?height=40&width=40&text=MC'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    jobTitle: 'Head of Marketing',
    company: 'GrowthCo',
    location: 'Austin, TX',
    engagementScore: 91,
    status: 'responded',
    industry: 'Marketing',
    lastActivity: '3 hours ago',
    avatar: '/placeholder.svg?height=40&width=40&text=ER'
  },
  {
    id: 4,
    name: 'David Kim',
    jobTitle: 'Founder & CEO',
    company: 'InnovateLab',
    location: 'Seattle, WA',
    engagementScore: 68,
    status: 'not_contacted',
    industry: 'Technology',
    lastActivity: '1 week ago',
    avatar: '/placeholder.svg?height=40&width=40&text=DK'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    jobTitle: 'Director of Sales',
    company: 'SalesForce Pro',
    location: 'Chicago, IL',
    engagementScore: 79,
    status: 'connected',
    industry: 'Sales',
    lastActivity: '5 days ago',
    avatar: '/placeholder.svg?height=40&width=40&text=LT'
  },
]

export function ProspectsContent() {
  const [selectedProspects, setSelectedProspects] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [timingAnalyzerOpen, setTimingAnalyzerOpen] = useState(false)
  const [selectedProspectForTiming, setSelectedProspectForTiming] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'responded':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'not_contacted':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'pending':
        return 'Pending'
      case 'responded':
        return 'Responded'
      case 'not_contacted':
        return 'Not Contacted'
      default:
        return status
    }
  }

  const handleSelectAll = () => {
    if (selectedProspects.length === prospects.length) {
      setSelectedProspects([])
    } else {
      setSelectedProspects(prospects.map(p => p.id))
    }
  }

  const handleSelectProspect = (id: number) => {
    setSelectedProspects(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const handleTimingAnalysis = (prospect: any) => {
    setSelectedProspectForTiming(prospect)
    setTimingAnalyzerOpen(true)
  }

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = !industryFilter || industryFilter === 'all' || prospect.industry === industryFilter
    const matchesStatus = !statusFilter || statusFilter === 'all' || prospect.status === statusFilter
    
    return matchesSearch && matchesIndustry && matchesStatus
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prospects</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your LinkedIn prospects and connections</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90">
          <Upload className="mr-2 h-4 w-4" />
          Import Prospects
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search prospects by name or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="not_contacted">Not Contacted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedProspects.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedProspects.length} prospect{selectedProspects.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Send Messages
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prospects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Prospects ({filteredProspects.length})</CardTitle>
          <CardDescription>
            Your LinkedIn prospect database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProspects.length === prospects.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Prospect</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProspects.includes(prospect.id)}
                      onCheckedChange={() => handleSelectProspect(prospect.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={prospect.avatar || "/placeholder.svg"} alt={prospect.name} />
                        <AvatarFallback>
                          {prospect.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {prospect.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {prospect.jobTitle}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{prospect.company}</div>
                      <div className="text-sm text-gray-500">{prospect.industry}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {prospect.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={prospect.engagementScore} 
                        className="w-16 h-2"
                      />
                      <span className="text-sm font-medium">
                        {prospect.engagementScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(prospect.status)}>
                      {getStatusLabel(prospect.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {prospect.lastActivity}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTimingAnalysis(prospect)}>
                          <Clock className="mr-2 h-4 w-4" />
                          Timing Analysis
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div className="w-full">
                            <PdfLeadBrief prospect={prospect} />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Add Note
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Timing Analyzer Modal */}
      <TimingAnalyzer
        isOpen={timingAnalyzerOpen}
        onClose={() => setTimingAnalyzerOpen(false)}
        prospect={selectedProspectForTiming}
      />
    </div>
  )
}
