import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react'

function UpcomingEvents({ eventos }) {
  // Filtra eventos futuros e ordena por data
  const today = new Date()
  const upcomingEvents = eventos
    .filter(e => new Date(e.data) >= today && e.fase !== 'Pós-Evento')
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 4)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
      weekday: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
    }
  }

  const getDaysUntil = (dateStr) => {
    const eventDate = new Date(dateStr)
    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Hoje!'
    if (diffDays === 1) return 'Amanhã'
    return `${diffDays} dias`
  }

  const getUrgencyColor = (dateStr) => {
    const eventDate = new Date(dateStr)
    const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
    if (diffDays <= 0) return 'bg-emerald-100 text-emerald-700'
    if (diffDays <= 3) return 'bg-rose-100 text-rose-700'
    if (diffDays <= 7) return 'bg-amber-100 text-amber-700'
    return 'bg-sky-100 text-sky-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Próximos Eventos</h2>
        </div>
        <button className="text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1">
          Ver todos <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {upcomingEvents.map((evento, index) => {
          const date = formatDate(evento.data)
          const urgencyColor = getUrgencyColor(evento.data)
          
          return (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900/50 transition-all cursor-pointer group"
            >
              {/* Date badge */}
              <div className="flex-shrink-0">
                <div className={`w-14 h-14 rounded-xl ${urgencyColor} flex flex-col items-center justify-center`}> 
                  <span className="text-xl font-bold">{date.day}</span>
                  <span className="text-[10px] uppercase">{date.month}</span>
                </div>
              </div>

              {/* Event info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {evento.nome}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {evento.local}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400 dark:text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{getDaysUntil(evento.data)}</span>
                </div>
              </div>
            </motion.div>
          )
        })}

        {upcomingEvents.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400">Nenhum evento próximo</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UpcomingEvents
