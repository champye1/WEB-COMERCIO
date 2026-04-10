import { useState } from 'react'

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('dashboard')

  return (
    <nav className="bg-gradient-to-r from-[#0D0F12] via-[#111418] to-[#0D0F12] border-b border-[#1C1F24] sticky top-0 z-40 backdrop-blur-md bg-opacity-95 h-16">
      <div className="h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Logo - Solo en desktop */}
        <div className="hidden sm:flex items-center gap-3 group cursor-pointer flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center font-bold text-[#0D0F12] text-lg group-hover:shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300">
            💰
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#F5F6F7] group-hover:text-emerald-400 transition-colors">
              FinFlow
            </h1>
            <p className="text-xs text-[#A8B0BB]">Control Financiero</p>
          </div>
        </div>

        {/* Center - Spacer */}
        <div className="flex-1 min-w-4" />

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 ml-4">
          {/* Notifications Bell */}
          <button className="relative p-2 rounded-lg text-[#A8B0BB] hover:text-emerald-400 hover:bg-[#1C1F24] transition-all duration-300">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-[#1C1F24]">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-sm font-semibold text-[#F5F6F7]">Gabriela</p>
              <p className="text-xs text-[#A8B0BB]">Premium</p>
            </div>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-[#F5F6F7] font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-sm">
              GV
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
