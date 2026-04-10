import { Outlet } from 'react-router-dom'
import Navbar from './Navbar_FinTech'
import Sidebar from './Sidebar_FinTech'

export default function MainLayout() {
  return (
    <div className="h-screen bg-[#0D0F12] flex flex-col overflow-hidden">
      {/* Navbar - Full Width */}
      <Navbar />

      {/* Content Area - Flex Layout */}
      <div className="flex-1 flex min-w-0 overflow-hidden gap-0">
        {/* Sidebar - Fixed Width */}
        <div className="flex-shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Main Content - Flexible */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0D0F12]">
          <div className="w-full min-h-full px-6 sm:px-8 md:px-10 pt-8 md:pt-12 pb-8">
            <div className="w-full max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
