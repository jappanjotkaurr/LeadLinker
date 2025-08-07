'use client'

import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { DashboardContent } from '@/components/dashboard-content'
import { CampaignsContent } from '@/components/campaigns-content'
import { ProspectsContent } from '@/components/prospects-content'
import { MessagesContent } from '@/components/messages-content'
import { AnalyticsContent } from '@/components/analytics-content'
import { ReferralsContent } from '@/components/referrals-content'
import { SettingsContent } from '@/components/settings-content'
import { ProjectFlowchart } from '@/components/project-flowchart'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
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
      case 'architecture':
        return <ProjectFlowchart />
      case 'settings':
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
