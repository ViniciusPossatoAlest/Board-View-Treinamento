// utils/errorHandler.js - Error Handling (Seção 19)
import React from 'react';

// Error Boundary Component (Seção 19.1)
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log estruturado (Seção 32.3)
    console.error(JSON.stringify({
      level: 'error',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    }));
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary p-6 text-center">
          <div className="text-monday-red text-xl mb-2">⚠️ Algo deu errado</div>
          <p className="text-gray-400">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-monday-blue text-white rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error Logger
export const logger = {
  error: (message, context = {}) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      context,
      timestamp: new Date().toISOString()
    }));
  },
  warn: (message, context = {}) => {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      context,
      timestamp: new Date().toISOString()
    }));
  },
  info: (message, context = {}) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      context,
      timestamp: new Date().toISOString()
    }));
  }
};
