import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react'

function TasksProgress({ tarefas }) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <ListTodo className="w-5 h-5 text-monday-blue" />
        <h2 className="text-lg font-semibold text-white">Progresso de Tarefas</h2>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{progressPercent}%</span>
            <span className="text-xs text-white/50">Completo</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-white/70 text-sm">{stat.label}</span>
            </div>
            <span className="text-white font-semibold">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">Total de tarefas</span>
          <span className="text-white font-bold">{tarefas.total}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TasksProgress
