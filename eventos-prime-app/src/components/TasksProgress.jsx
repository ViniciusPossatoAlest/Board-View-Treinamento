// components/TasksProgress.jsx - Tasks Progress Component
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react'

export default function TasksProgress({ tarefas }) {
  const data = [
    { name: 'Feitas', value: tarefas.feitas, color: '#00c875' },
    { name: 'Em Andamento', value: tarefas.emAndamento, color: '#0073ea' },
    { name: 'A Fazer', value: tarefas.aFazer, color: '#676879' },
  ]

  const progressPercent = Math.round((tarefas.feitas / tarefas.total) * 100)

  const stats = [
    { label: 'Feitas', value: tarefas.feitas, icon: CheckCircle2, color: 'text-monday-green' },
    { label: 'Em Andamento', value: tarefas.emAndamento, icon: Clock, color: 'text-monday-blue' },
    { label: 'A Fazer', value: tarefas.aFazer, icon: AlertCircle, color: 'text-monday-gray' },
  ]

  return (
    <div className="glass rounded-2xl p-5 fade-in">
      <div className="flex items-center gap-2 mb-4">
        <ListTodo className="w-5 h-5 text-monday-blue" />
        <h2 className="text-lg font-semibold text-white">Progresso de Tarefas</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Chart */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={3} dataKey="value">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{progressPercent}%</span>
            <span className="text-[10px] text-white/50">Completo</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-2">
          {stats.map(stat => (
            <div key={stat.label} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              <div className="flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-white/70 text-sm">{stat.label}</span>
              </div>
              <span className="text-white font-semibold">{stat.value}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-white/10 flex justify-between text-sm">
            <span className="text-white/50">Total</span>
            <span className="text-white font-bold">{tarefas.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
