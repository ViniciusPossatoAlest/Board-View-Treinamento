import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Bell, Settings, Search } from 'lucide-react'

function Header() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto mb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Eventos Prime</span>
          </h1>
          <p className="text-white/50 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {currentDate}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="glass rounded-xl pl-10 pr-4 py-2.5 w-64 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-monday-green/50"
            />
          </div>

          {/* Live Indicator */}
          <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="w-2 h-2 bg-monday-green rounded-full pulse-live" />
            <span className="text-sm text-white/70">Ao vivo</span>
          </div>

          {/* Notifications */}
          <button className="glass glass-hover rounded-xl p-2.5 relative transition-all">
            <Bell className="w-5 h-5 text-white/70" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-monday-red rounded-full text-[10px] flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="glass glass-hover rounded-xl p-2.5 transition-all">
            <Settings className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
