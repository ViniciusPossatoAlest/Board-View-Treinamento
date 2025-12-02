// components/EventsKanban.jsx - Events Kanban Component
import React from 'react'
import { Calendar, MapPin, DollarSign, ChevronRight, Sparkles } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/chartDataTransform'

const phaseConfig = {
  'Negociação': { color: '#fdab3d', bg: 'bg-monday-yellow/20', border: 'border-monday-yellow/30' },
  'Planejamento': { color: '#0073ea', bg: 'bg-monday-blue/20', border: 'border-monday-blue/30' },
  'Execução': { color: '#00c875', bg: 'bg-monday-green/20', border: 'border-monday-green/30' },
  'Pós-Evento': { color: '#a25ddc', bg: 'bg-monday-purple/20', border: 'border-monday-purple/30' },
}

function EventCard({ evento }) {
  const config = phaseConfig[evento.fase]
  
  return (
    <div className={`glass rounded-xl p-3 hover:bg-white/10 transition cursor-pointer border ${config.border}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-white text-sm leading-tight flex-1 mr-2">{evento.nome}</h4>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: `${config.color}30`, color: config.color }}>
          {evento.fase}
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          {new Date(evento.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          {evento.local}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-3 h-3 text-monday-green" />
          <span className="text-monday-green font-medium">{formatCurrency(evento.valor)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
        <span className="text-xs text-white/40">{evento.cliente}</span>
        <ChevronRight className="w-4 h-4 text-white/30" />
      </div>
    </div>
  )
}

export default function EventsKanban({ eventos }) {
  const phases = ['Negociação', 'Planejamento', 'Execução', 'Pós-Evento']

  return (
    <div className="glass rounded-2xl p-5 fade-in">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-monday-yellow" />
        <h2 className="text-lg font-semibold text-white">Pipeline de Eventos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map(phase => {
          const config = phaseConfig[phase]
          const phaseEvents = eventos.filter(e => e.fase === phase)
          const total = phaseEvents.reduce((sum, e) => sum + e.valor, 0)

          return (
            <div key={phase} className="space-y-3">
              <div className={`rounded-xl p-3 ${config.bg} border ${config.border}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                    <span className="font-medium text-white text-sm">{phase}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: config.color }}>
                    {phaseEvents.length}
                  </span>
                </div>
                <p className="text-white/50 text-xs mt-1">Total: {formatCurrency(total)}</p>
              </div>

              <div className="space-y-2 min-h-[150px]">
                {phaseEvents.map(evento => <EventCard key={evento.id} evento={evento} />)}
                {phaseEvents.length === 0 && (
                  <div className="glass rounded-xl p-6 text-center">
                    <p className="text-white/30 text-xs">Nenhum evento</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
