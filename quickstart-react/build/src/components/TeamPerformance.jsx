import React from 'react'
import { motion } from 'framer-motion'
import { Users, Star, TrendingUp, Award } from 'lucide-react'

function TeamPerformance() {
  const team = [
    { 
      name: 'Ana Silva', 
      role: 'Produtora Senior',
      avatar: 'AS',
      tasks: 8,
      completed: 6,
      rating: 4.9,
      color: 'bg-monday-purple'
    },
    { 
      name: 'Carlos Oliveira', 
      role: 'Produtor',
      avatar: 'CO',
      tasks: 6,
      completed: 4,
      rating: 4.7,
      color: 'bg-monday-blue'
    },
    { 
      name: 'Mariana Santos', 
      role: 'Assistente',
      avatar: 'MS',
      tasks: 5,
      completed: 3,
      rating: 4.5,
      color: 'bg-monday-green'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-monday-purple" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Performance do Time</h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Este mês</span>
      </div>

      <div className="space-y-4">
        {team.map((member, index) => {
          const progress = Math.round((member.completed / member.tasks) * 100)
          
          return (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="rounded-xl border border-slate-100 dark:border-slate-800 p-4 hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer bg-white dark:bg-slate-900/50"
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{member.avatar}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">{member.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-monday-yellow fill-monday-yellow" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{member.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{member.role}</p>
                  
                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Tarefas</span>
                      <span className="text-slate-600 dark:text-slate-300">{member.completed}/{member.tasks}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${
                          progress >= 80 ? 'bg-monday-green' :
                          progress >= 50 ? 'bg-monday-yellow' :
                          'bg-monday-red'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Top Performer Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 dark:from-amber-500/10 to-amber-50/50 dark:to-amber-500/5 border border-amber-200 dark:border-amber-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Top Performer</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ana Silva - 75% de conclusão</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TeamPerformance
