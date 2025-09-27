const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const {
  validateVehicleCreation,
  validateVehicleUpdate,
  validateQueryParams,
  validateVehicleId
} = require('../middleware/validation');

// Rotas para opções/configurações (devem vir antes das rotas com parâmetros)
router.get('/options/status', vehicleController.getStatusOptions);
router.get('/options/fuel-types', vehicleController.getFuelTypeOptions);

// Rota para estatísticas
router.get('/stats', vehicleController.getVehicleStats);

// Rota para veículos disponíveis
router.get('/available', vehicleController.getAvailableVehicles);

// Rotas principais CRUD
router.get('/', validateQueryParams, vehicleController.getAllVehicles);
router.get('/:id', validateVehicleId, vehicleController.getVehicleById);
router.post('/', validateVehicleCreation, vehicleController.createVehicle);
router.put('/:id', validateVehicleId, validateVehicleUpdate, vehicleController.updateVehicle);
router.delete('/:id', validateVehicleId, vehicleController.deleteVehicle);

// Rotas específicas por placa
router.get('/placa/:placa', vehicleController.getVehicleByPlaca);

// Rotas por status
router.get('/status/:status', vehicleController.getVehiclesByStatus);

// Rotas para atualizações específicas
router.patch('/:id/quilometragem', validateVehicleId, vehicleController.updateKilometragem);
router.patch('/:id/status', validateVehicleId, vehicleController.updateStatus);

module.exports = router;
