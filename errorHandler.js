const winston = require('winston');

// Configuração do logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

/**
 * Middleware de tratamento de erros
 * @param {Error} err - Erro capturado
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Próximo middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log do erro
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Resposta padrão de erro
  let statusCode = 500;
  let message = 'Erro interno do servidor';
  let errors = null;

  // Tratamento específico para diferentes tipos de erro
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = 'Dados inválidos';
    errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'Conflito: dados já existem';
    errors = err.errors.map(error => ({
      field: error.path,
      message: `${error.path} já está em uso`
    }));
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    message = 'Erro de referência: dados relacionados não encontrados';
  } else if (err.name === 'SequelizeDatabaseError') {
    statusCode = 500;
    message = 'Erro no banco de dados';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  } else if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Arquivo muito grande';
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'Muitos arquivos';
    } else {
      message = 'Erro no upload do arquivo';
    }
  } else if (err.statusCode || err.status) {
    statusCode = err.statusCode || err.status;
    message = err.message;
  }

  // Em ambiente de desenvolvimento, incluir stack trace
  const response = {
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(response);
};

/**
 * Middleware para capturar erros assíncronos
 * @param {Function} fn - Função assíncrona
 * @returns {Function} Middleware que captura erros
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Middleware para tratar rotas não encontradas
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Próximo middleware
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Rota não encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFoundHandler
};
