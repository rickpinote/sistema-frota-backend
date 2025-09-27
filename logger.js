const winston = require('winston');
const path = require('path');

// Criar diretório de logs se não existir
const fs = require('fs');
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'sistema-frota-backend' },
  transports: [
    // Log de erros
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Log combinado
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// Em desenvolvimento, também log no console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

/**
 * Middleware de logging para requisições HTTP
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log da requisição
  logger.info({
    type: 'request',
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Interceptar a resposta para log
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - start;
    
    // Log da resposta
    logger.info({
      type: 'response',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      timestamp: new Date().toISOString()
    });

    originalSend.call(this, data);
  };

  next();
};

/**
 * Log de informações do sistema
 */
const logSystemInfo = () => {
  logger.info({
    type: 'system',
    message: 'Sistema iniciado',
    nodeVersion: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
};

/**
 * Log de operações de banco de dados
 */
const logDatabaseOperation = (operation, table, data = null) => {
  logger.info({
    type: 'database',
    operation,
    table,
    data: data ? JSON.stringify(data) : null,
    timestamp: new Date().toISOString()
  });
};

/**
 * Log de autenticação
 */
const logAuth = (action, userId = null, details = null) => {
  logger.info({
    type: 'auth',
    action,
    userId,
    details,
    timestamp: new Date().toISOString()
  });
};

/**
 * Log de segurança
 */
const logSecurity = (event, ip, details = null) => {
  logger.warn({
    type: 'security',
    event,
    ip,
    details,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  logger,
  requestLogger,
  logSystemInfo,
  logDatabaseOperation,
  logAuth,
  logSecurity
};
