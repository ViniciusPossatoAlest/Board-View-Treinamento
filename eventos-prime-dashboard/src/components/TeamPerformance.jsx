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
      className="glass rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-monday-purple" />
          <h2 className="text-lg font-semibold text-white">Performance do Time</h2>
        </div>
        <span className="text-xs text-white/50">Este mês</span>
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
              className="glass rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{member.avatar}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white truncate">{member.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-monday-yellow fill-monday-yellow" />
                      <span className="text-xs text-white/70">{member.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{member.role}</p>
                  
                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-white/50">Tarefas</span>
                      <span className="text-white/70">{member.completed}/{member.tasks}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
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
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-monday-yellow/20 to-monday-yellow/5 border border-monday-yellow/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-monday-yellow/30 flex items-center justify-center">
            <Award className="w-5 h-5 text-monday-yellow" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Top Performer</p>
            <p className="text-xs text-white/60">Ana Silva - 75% de conclusão</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TeamPerformance
