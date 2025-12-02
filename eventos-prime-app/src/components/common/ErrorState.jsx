// components/common/ErrorState.jsx - Error State (Seção 24.1)
import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function ErrorState({ message = 'Algo deu errado', onRetry }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="text-center fade-in">
        <AlertTriangle className="w-12 h-12 text-monday-red mx-auto mb-4" />
        <p className="text-white/80 mb-4">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-monday-blue text-white rounded-lg mx-auto hover:bg-opacity-80 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  )
}
