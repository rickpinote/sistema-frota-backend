# Estrutura MVC do Backend - Node.js/Express.js

Este documento detalha a estrutura do backend seguindo o padrão MVC (Model-View-Controller) para o sistema de controle de frota.

## Estrutura de Diretórios

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Configuração do banco de dados
│   │   ├── auth.js              # Configuração de autenticação JWT
│   │   └── environment.js       # Variáveis de ambiente
│   ├── controllers/
│   │   ├── authController.js    # Autenticação e autorização
│   │   ├── vehicleController.js # Controle de veículos
│   │   ├── driverController.js  # Controle de motoristas
│   │   ├── fuelController.js    # Controle de combustível
│   │   ├── maintenanceController.js # Controle de manutenções
│   │   ├── trackingController.js # Controle de rastreamento GPS
│   │   ├── documentController.js # Controle de documentos
│   │   ├── fineController.js    # Controle de multas
│   │   ├── serviceOrderController.js # Controle de ordens de serviço
│   │   └── reportController.js  # Controle de relatórios
│   ├── models/
│   │   ├── User.js              # Modelo de usuários
│   │   ├── Driver.js            # Modelo de motoristas
│   │   ├── Vehicle.js           # Modelo de veículos
│   │   ├── Fuel.js              # Modelo de abastecimentos
│   │   ├── Usage.js             # Modelo de utilizações
│   │   ├── Maintenance.js       # Modelo de manutenções
│   │   ├── Document.js          # Modelo de documentos
│   │   ├── Fine.js              # Modelo de multas
│   │   ├── ServiceOrder.js      # Modelo de ordens de serviço
│   │   └── Tracking.js          # Modelo de rastreamento GPS
│   ├── services/
│   │   ├── authService.js       # Serviços de autenticação
│   │   ├── vehicleService.js    # Serviços de veículos
│   │   ├── fuelService.js       # Serviços de combustível
│   │   ├── trackingService.js   # Serviços de rastreamento
│   │   ├── notificationService.js # Serviços de notificação
│   │   └── reportService.js     # Serviços de relatórios
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticação
│   │   ├── validation.js        # Middleware de validação
│   │   ├── errorHandler.js      # Middleware de tratamento de erros
│   │   └── logger.js            # Middleware de logging
│   ├── routes/
│   │   ├── auth.js              # Rotas de autenticação
│   │   ├── vehicles.js          # Rotas de veículos
│   │   ├── drivers.js           # Rotas de motoristas
│   │   ├── fuel.js              # Rotas de combustível
│   │   ├── maintenance.js       # Rotas de manutenções
│   │   ├── tracking.js          # Rotas de rastreamento
│   │   ├── documents.js         # Rotas de documentos
│   │   ├── fines.js             # Rotas de multas
│   │   ├── serviceOrders.js     # Rotas de ordens de serviço
│   │   └── reports.js           # Rotas de relatórios
│   ├── utils/
│   │   ├── validators.js        # Funções de validação
│   │   ├── helpers.js           # Funções auxiliares
│   │   ├── constants.js         # Constantes da aplicação
│   │   └── dateUtils.js         # Utilitários de data
│   └── app.js                   # Configuração principal da aplicação
├── migrations/                  # Migrações do banco de dados
├── seeds/                       # Seeds para popular o banco
├── tests/                       # Testes automatizados
├── docs/                        # Documentação da API
├── .env.example                 # Exemplo de variáveis de ambiente
├── package.json                 # Dependências e scripts
└── server.js                    # Ponto de entrada da aplicação
```

## Dependências Principais

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.0",
    "sequelize": "^6.32.1",
    "jsonwebtoken": "^9.0.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.8.1",
    "joi": "^17.9.2",
    "nodemailer": "^6.9.3",
    "multer": "^1.4.5-lts.1",
    "winston": "^3.10.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.1",
    "supertest": "^6.3.3",
    "eslint": "^8.44.0"
  }
}
```

## Configuração do Banco de Dados (Sequelize)

```javascript
// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
```

## Exemplo de Model (Vehicle.js)

```javascript
// src/models/Vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  marca: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  anoFabricacao: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cor: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  tipoCombustivel: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  quilometragemAtual: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'Disponível'
  },
  dataAquisicao: {
    type: DataTypes.DATE,
    allowNull: true
  },
  capacidadeTanque: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  }
}, {
  tableName: 'veiculos',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Vehicle;
```

## Exemplo de Controller (vehicleController.js)

```javascript
// src/controllers/vehicleController.js
const vehicleService = require('../services/vehicleService');
const { validationResult } = require('express-validator');

class VehicleController {
  async getAllVehicles(req, res) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const vehicles = await vehicleService.getAllVehicles({ page, limit, status });
      
      res.status(200).json({
        success: true,
        data: vehicles,
        message: 'Veículos recuperados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async getVehicleById(req, res) {
    try {
      const { id } = req.params;
      const vehicle = await vehicleService.getVehicleById(id);
      
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Veículo não encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: vehicle,
        message: 'Veículo recuperado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async createVehicle(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: errors.array()
        });
      }

      const vehicle = await vehicleService.createVehicle(req.body);
      
      res.status(201).json({
        success: true,
        data: vehicle,
        message: 'Veículo criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async updateVehicle(req, res) {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: errors.array()
        });
      }

      const vehicle = await vehicleService.updateVehicle(id, req.body);
      
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Veículo não encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: vehicle,
        message: 'Veículo atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async deleteVehicle(req, res) {
    try {
      const { id } = req.params;
      const deleted = await vehicleService.deleteVehicle(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Veículo não encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Veículo excluído com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

module.exports = new VehicleController();
```

## Exemplo de Service (vehicleService.js)

```javascript
// src/services/vehicleService.js
const Vehicle = require('../models/Vehicle');
const { Op } = require('sequelize');

class VehicleService {
  async getAllVehicles({ page, limit, status }) {
    const offset = (page - 1) * limit;
    const where = {};
    
    if (status) {
      where.status = status;
    }

    const { count, rows } = await Vehicle.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    return {
      vehicles: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    };
  }

  async getVehicleById(id) {
    return await Vehicle.findByPk(id);
  }

  async createVehicle(vehicleData) {
    return await Vehicle.create(vehicleData);
  }

  async updateVehicle(id, vehicleData) {
    const [updatedRowsCount] = await Vehicle.update(vehicleData, {
      where: { id }
    });
    
    if (updatedRowsCount === 0) {
      return null;
    }
    
    return await Vehicle.findByPk(id);
  }

  async deleteVehicle(id) {
    const deletedRowsCount = await Vehicle.destroy({
      where: { id }
    });
    
    return deletedRowsCount > 0;
  }

  async getVehiclesByStatus(status) {
    return await Vehicle.findAll({
      where: { status }
    });
  }

  async searchVehicles(searchTerm) {
    return await Vehicle.findAll({
      where: {
        [Op.or]: [
          { placa: { [Op.iLike]: `%${searchTerm}%` } },
          { marca: { [Op.iLike]: `%${searchTerm}%` } },
          { modelo: { [Op.iLike]: `%${searchTerm}%` } }
        ]
      }
    });
  }
}

module.exports = new VehicleService();
```

## Exemplo de Rota (vehicles.js)

```javascript
// src/routes/vehicles.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/auth');
const { vehicleValidation } = require('../middleware/validation');

// Aplicar middleware de autenticação a todas as rotas
router.use(authMiddleware);

// GET /api/vehicles - Listar todos os veículos
router.get('/', vehicleController.getAllVehicles);

// GET /api/vehicles/:id - Obter veículo por ID
router.get('/:id', vehicleController.getVehicleById);

// POST /api/vehicles - Criar novo veículo
router.post('/', vehicleValidation, vehicleController.createVehicle);

// PUT /api/vehicles/:id - Atualizar veículo
router.put('/:id', vehicleValidation, vehicleController.updateVehicle);

// DELETE /api/vehicles/:id - Excluir veículo
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
```

## Configuração Principal (app.js)

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Importar rotas
const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
const driverRoutes = require('./routes/drivers');
const fuelRoutes = require('./routes/fuel');
const maintenanceRoutes = require('./routes/maintenance');
const trackingRoutes = require('./routes/tracking');
const documentRoutes = require('./routes/documents');
const fineRoutes = require('./routes/fines');
const serviceOrderRoutes = require('./routes/serviceOrders');
const reportRoutes = require('./routes/reports');

const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP por janela de tempo
});
app.use(limiter);

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(logger);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/fines', fineRoutes);
app.use('/api/service-orders', serviceOrderRoutes);
app.use('/api/reports', reportRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

module.exports = app;
```

## Ponto de Entrada (server.js)

```javascript
// server.js
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Função para inicializar o servidor
async function startServer() {
  try {
    // Testar conexão com o banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Modelos sincronizados com o banco de dados.');
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📱 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o servidor:', error);
    process.exit(1);
  }
}

// Tratamento de sinais de encerramento
process.on('SIGTERM', async () => {
  console.log('🔄 Recebido SIGTERM. Encerrando servidor graciosamente...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 Recebido SIGINT. Encerrando servidor graciosamente...');
  await sequelize.close();
  process.exit(0);
});

// Inicializar servidor
startServer();
```

## Scripts do Package.json

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "migrate": "npx sequelize-cli db:migrate",
    "migrate:undo": "npx sequelize-cli db:migrate:undo",
    "seed": "npx sequelize-cli db:seed:all",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

Esta estrutura MVC fornece uma base sólida e escalável para o backend do sistema de controle de frota, seguindo as melhores práticas de desenvolvimento Node.js/Express.js.
