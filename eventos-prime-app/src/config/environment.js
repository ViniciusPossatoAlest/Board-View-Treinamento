// config/environment.js - Configuração por Ambiente (Seção 1.1)
const config = {
  development: {
    apiUrl: 'https://api.monday.com/v2',
    debug: true,
    logLevel: 'debug'
  },
  production: {
    apiUrl: 'https://api.monday.com/v2',
    debug: false,
    logLevel: 'error'
  }
};

export default config[import.meta.env.MODE || 'development'];
