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
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 h-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <ListTodo className="w-4 h-4 text-monday-blue" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Progresso de Tarefas</h2>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-36 h-36">
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
            <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{progressPercent}%</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Completo</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-white/5 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-slate-600 dark:text-slate-300 text-sm">{stat.label}</span>
            </div>
            <span className="text-slate-900 dark:text-slate-100 font-semibold text-sm">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Total de tarefas</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">{tarefas.total}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TasksProgress
