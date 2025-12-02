// components/Header.jsx - Header Component
import React from 'react'
import { Calendar, Bell, Search, Settings } from 'lucide-react'

export default function Header({ context }) {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <header className="max-w-[1600px] mx-auto mb-6 fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="gradient-text">Eventos Prime</span>
          </h1>
          <p className="text-white/50 text-sm mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {currentDate}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Indicator */}
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-monday-green rounded-full pulse-live" />
            <span className="text-xs text-white/70">Ao vivo</span>
          </div>

          {/* Notifications */}
          <button className="glass rounded-xl p-2.5 relative hover:bg-white/10 transition">
            <Bell className="w-5 h-5 text-white/70" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-monday-red rounded-full text-[10px] flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </header>
  )
}
