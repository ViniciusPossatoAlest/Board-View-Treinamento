// components/common/LoadingState.jsx - Loading State (Seção 24.1)
import React from 'react'

export default function LoadingState({ message = 'Carregando...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center fade-in">
        <div className="w-12 h-12 border-4 border-monday-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60">{message}</p>
      </div>
    </div>
  )
}
