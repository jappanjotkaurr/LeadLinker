'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, MessageSquare, Target, Settings, Home, X, Gift, GitBranch } from 'lucide-react'
import Image from 'next/image'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navigation = [
  { name: 'Dashboard', id: 'dashboard', icon: Home },
  { name: 'Campaigns', id: 'campaigns', icon: Target },
  { name: 'Prospects', id: 'prospects', icon: Users },
  { name: 'Messages', id: 'messages', icon: MessageSquare },
  { name: 'Analytics', id: 'analytics', icon: BarChart3 },
  { name: 'Referrals', id: 'referrals', icon: Gift },
  { name: 'Architecture', id: 'architecture', icon: GitBranch },
  { name: 'Settings', id: 'settings', icon: Settings },
]

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Image
              src="/leadlinker-logo.png"
              alt="LeadLinker"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              LeadLinker
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeTab === item.id 
                        ? "bg-[#2563EB] text-white hover:bg-[#2563EB]/90" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsOpen(false)
                    }}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
