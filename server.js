require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');
const { logSystemInfo, logger } = require('./src/middleware/logger');
const environment = require('./src/config/environment');

const PORT = environment.port;

/**
 * Função para inicializar o servidor
 */
async function startServer() {
  try {
    // Log de informações do sistema
    logSystemInfo();

    // Testar conexão com o banco de dados (comentado para demonstração)
    try {
      await sequelize.authenticate();
      logger.info('✅ Conexão com o banco de dados estabelecida com sucesso.');

      // Sincronizar modelos com o banco de dados (apenas em desenvolvimento)
      if (environment.nodeEnv === 'development') {
        await sequelize.sync({ alter: true });
        logger.info('✅ Modelos sincronizados com o banco de dados.');
      }
    } catch (dbError) {
      logger.warn('⚠️ Banco de dados não disponível. Servidor iniciará sem conexão com BD.');
      logger.warn('💡 Para funcionalidade completa, configure PostgreSQL conforme manual de instalação.');
    }

    // Iniciar servidor HTTP
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`📱 Ambiente: ${environment.nodeEnv}`);
      logger.info(`🌐 URL: http://localhost:${PORT}`);
      logger.info(`📊 Health Check: http://localhost:${PORT}/health`);
      logger.info(`🔗 API Info: http://localhost:${PORT}/api`);
    });

    // Configurar timeout do servidor
    server.timeout = 30000; // 30 segundos

    // Tratamento gracioso de encerramento
    const gracefulShutdown = async (signal) => {
      logger.info(`🔄 Recebido ${signal}. Encerrando servidor graciosamente...`);
      
      server.close(async () => {
        logger.info('🔒 Servidor HTTP fechado.');
        
        try {
          await sequelize.close();
          logger.info('🔒 Conexão com banco de dados fechada.');
          process.exit(0);
        } catch (error) {
          logger.error('❌ Erro ao fechar conexão com banco de dados:', error);
          process.exit(1);
        }
      });

      // Forçar encerramento após 10 segundos
      setTimeout(() => {
        logger.error('⚠️ Forçando encerramento do servidor...');
        process.exit(1);
      }, 10000);
    };

    // Listeners para sinais de encerramento
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Tratamento de erros não capturados
    process.on('uncaughtException', (error) => {
      logger.error('❌ Erro não capturado:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('❌ Promise rejeitada não tratada:', { reason, promise });
      process.exit(1);
    });

  } catch (error) {
    logger.error('❌ Erro ao inicializar o servidor:', error);
    process.exit(1);
  }
}

// Verificar variáveis de ambiente obrigatórias
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  logger.error(`❌ Variáveis de ambiente obrigatórias não definidas: ${missingEnvVars.join(', ')}`);
  logger.error('💡 Copie o arquivo .env.example para .env e configure as variáveis necessárias.');
  process.exit(1);
}

// Inicializar servidor
startServer();
