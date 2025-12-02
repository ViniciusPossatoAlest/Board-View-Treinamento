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
  'Negociação': { color: '#fdab3d', bgColor: 'bg-monday-yellow/20', borderColor: 'border-monday-yellow/30' },
  'Planejamento': { color: '#0073ea', bgColor: 'bg-monday-blue/20', borderColor: 'border-monday-blue/30' },
  'Execução': { color: '#00c875', bgColor: 'bg-monday-green/20', borderColor: 'border-monday-green/30' },
  'Pós-Evento': { color: '#a25ddc', bgColor: 'bg-monday-purple/20', borderColor: 'border-monday-purple/30' },
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
      className={`glass rounded-xl p-4 cursor-pointer transition-all hover:bg-white/10 border ${config.borderColor}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-white text-sm leading-tight flex-1 mr-2">
          {evento.nome}
        </h4>
        <span 
          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{ backgroundColor: `${config.color}30`, color: config.color }}
        >
          {evento.fase}
        </span>
      </div>

      <div className="space-y-2 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(evento.data)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          {evento.local}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-monday-green" />
          <span className="text-monday-green font-medium">{formatCurrency(evento.valor)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <span className="text-xs text-white/40">{evento.cliente}</span>
        <ChevronRight className="w-4 h-4 text-white/30" />
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
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-monday-yellow" />
            Pipeline de Eventos
          </h2>
          <p className="text-white/50 text-sm mt-1">Arraste para mover entre fases</p>
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
                className={`rounded-xl p-4 ${config.bgColor} border ${config.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="font-medium text-white">{phase}</span>
                  </div>
                  <span 
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: config.color, color: '#fff' }}
                  >
                    {phaseEvents.length}
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-2">
                  Total: {formatCurrency(total)}
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-3 min-h-[200px]">
                {phaseEvents.map((evento, index) => (
                  <EventCard key={evento.id} evento={evento} index={index} />
                ))}
                {phaseEvents.length === 0 && (
                  <div className="glass rounded-xl p-8 text-center">
                    <p className="text-white/30 text-sm">Nenhum evento</p>
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
