import React from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Calendar, 
  MapPin, 
  DollarSign,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const phaseConfig = {
  'Negociação': { color: '#94a3b8', bgColor: 'bg-slate-50 dark:bg-slate-800/50', borderColor: 'border-slate-200 dark:border-slate-700' },
  'Planejamento': { color: '#94a3b8', bgColor: 'bg-slate-50 dark:bg-slate-800/50', borderColor: 'border-slate-200 dark:border-slate-700' },
  'Execução': { color: '#94a3b8', bgColor: 'bg-slate-50 dark:bg-slate-800/50', borderColor: 'border-slate-200 dark:border-slate-700' },
  'Pós-Evento': { color: '#94a3b8', bgColor: 'bg-slate-50 dark:bg-slate-800/50', borderColor: 'border-slate-200 dark:border-slate-700' },
}

function EventCard({ evento, index }) {
  const config = phaseConfig[evento.fase]
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`rounded-xl border ${config.borderColor} bg-white dark:bg-slate-900 p-4 cursor-pointer transition-shadow hover:shadow-md dark:hover:shadow-none`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm leading-tight flex-1 mr-2">
          {evento.nome}
        </h4>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          {evento.fase}
        </span>
      </div>

      <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(evento.data)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          {evento.local}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{formatCurrency(evento.valor)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500">{evento.cliente}</span>
        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
      </div>
    </motion.div>
  )
}

function EventsKanban({ eventos }) {
  const phases = ['Negociação', 'Planejamento', 'Execução', 'Pós-Evento']

  const getEventsByPhase = (phase) => eventos.filter(e => e.fase === phase)

  const getTotalByPhase = (phase) => {
    return getEventsByPhase(phase).reduce((sum, e) => sum + e.valor, 0)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Pipeline de Eventos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Arraste para mover entre fases</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map((phase) => {
          const config = phaseConfig[phase]
          const phaseEvents = getEventsByPhase(phase)
          const total = getTotalByPhase(phase)

          return (
            <div key={phase} className="space-y-4">
              {/* Column Header */}
              <div 
                className={`rounded-xl p-3.5 ${config.bgColor} border ${config.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">{phase}</span>
                  </div>
                  <span 
                    className="px-2 py-0.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {phaseEvents.length}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
                  Total: {formatCurrency(total)}
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-2.5 min-h-[200px]">
                {phaseEvents.map((evento, index) => (
                  <EventCard key={evento.id} evento={evento} index={index} />
                ))}
                {phaseEvents.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-8 text-center bg-white dark:bg-slate-900/50">
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Nenhum evento</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default EventsKanban
