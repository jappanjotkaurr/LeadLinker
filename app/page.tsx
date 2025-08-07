'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { RealtimeDashboard } from '@/components/realtime-dashboard'
import { CampaignsContent } from '@/components/campaigns-content'
import { ProspectsContent } from '@/components/prospects-content'
import { MessagesContent } from '@/components/messages-content'
import { AnalyticsContent } from '@/components/analytics-content'
import { ReferralsContent } from '@/components/referrals-content'
import { SettingsContent } from '@/components/settings-content'
import { ThemeProvider } from '@/components/theme-provider'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <RealtimeDashboard />
      case 'campaigns':
        return <CampaignsContent />
      case 'prospects':
        return <ProspectsContent />
      case 'messages':
        return <MessagesContent />
      case 'analytics':
        return <AnalyticsContent />
      case 'referrals':
        return <ReferralsContent />
      case 'settings':
        return <SettingsContent />
      default:
        return <RealtimeDashboard />
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="leadlinker-theme">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
