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
    if (diffDays <= 0) return 'bg-monday-green'
    if (diffDays <= 3) return 'bg-monday-red'
    if (diffDays <= 7) return 'bg-monday-yellow'
    return 'bg-monday-blue'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="glass rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-monday-yellow" />
          <h2 className="text-lg font-semibold text-white">Próximos Eventos</h2>
        </div>
        <button className="text-monday-blue text-sm hover:underline flex items-center gap-1">
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
              className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
            >
              {/* Date badge */}
              <div className="flex-shrink-0">
                <div className={`w-14 h-14 rounded-xl ${urgencyColor} flex flex-col items-center justify-center`}>
                  <span className="text-xl font-bold text-white">{date.day}</span>
                  <span className="text-[10px] text-white/80 uppercase">{date.month}</span>
                </div>
              </div>

              {/* Event info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate group-hover:text-monday-blue transition-colors">
                  {evento.nome}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {evento.local}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-3 h-3 text-white/40" />
                  <span className="text-xs text-white/60">{getDaysUntil(evento.data)}</span>
                </div>
              </div>
            </motion.div>
          )
        })}

        {upcomingEvents.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">Nenhum evento próximo</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UpcomingEvents
