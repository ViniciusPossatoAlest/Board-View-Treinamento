import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Bell, Settings, Search, Moon, Sun } from 'lucide-react'

function Header({ theme = 'light', onToggleTheme }) {
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
          <p className="text-[10px] font-medium tracking-[0.15em] text-neutral-400 uppercase">Painel executivo</p>
          <h1 className="text-[22px] font-semibold mt-0.5">
            <span className="gradient-text">Eventos Prime</span>
          </h1>
          <p className="text-neutral-500 mt-1 flex items-center gap-2 text-[12px]">
            <Calendar className="w-3.5 h-3.5" />
            {currentDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className={`rounded-md pl-9 pr-3 py-1.5 w-44 text-[12px] focus:outline-none transition-colors ${
                theme === 'dark' 
                  ? 'bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-600' 
                  : 'bg-neutral-100 border border-transparent text-neutral-900 placeholder:text-neutral-400 focus:bg-neutral-50 focus:border-neutral-200'
              }`}
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {theme === 'dark' ? 'Claro' : 'Escuro'}
          </button>

          {/* Live Indicator */}
          <div className={`rounded-md px-2.5 py-1.5 flex items-center gap-1.5 ${
            theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
          }`}>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-live" />
            <span className="text-[10px] text-neutral-500">Ao vivo</span>
          </div>

          {/* Notifications */}
          <button className={`rounded-md p-2 relative transition-colors ${
            theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
          }`}>
            <Bell className="w-4 h-4 text-neutral-500" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-medium">
              3
            </span>
          </button>

          {/* Settings */}
          <button className={`rounded-md p-2 transition-colors ${
            theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
          }`}>
            <Settings className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
