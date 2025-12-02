import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './utils/errorHandler'
import { initMonday } from './services/mondayService'
import './index.css'

// Inicializa Monday SDK (Seção 1.2)
initMonday()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
