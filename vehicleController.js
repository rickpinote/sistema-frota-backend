const vehicleService = require('../services/vehicleService');
const { asyncHandler } = require('../middleware/errorHandler');

class VehicleController {
  /**
   * Listar todos os veículos com paginação e filtros
   * GET /api/vehicles
   */
  getAllVehicles = asyncHandler(async (req, res) => {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      status: req.query.status,
      search: req.query.search,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder
    };

    const result = await vehicleService.getAllVehicles(options);

    res.status(200).json({
      success: true,
      message: 'Veículos recuperados com sucesso',
      data: result.vehicles,
      pagination: result.pagination
    });
  });

  /**
   * Obter veículo por ID
   * GET /api/vehicles/:id
   */
  getVehicleById = asyncHandler(async (req, res) => {
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
      message: 'Veículo recuperado com sucesso',
      data: vehicle
    });
  });

  /**
   * Obter veículo por placa
   * GET /api/vehicles/placa/:placa
   */
  getVehicleByPlaca = asyncHandler(async (req, res) => {
    const { placa } = req.params;
    const vehicle = await vehicleService.getVehicleByPlaca(placa);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Veículo não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Veículo recuperado com sucesso',
      data: vehicle
    });
  });

  /**
   * Criar novo veículo
   * POST /api/vehicles
   */
  createVehicle = asyncHandler(async (req, res) => {
    const vehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: 'Veículo criado com sucesso',
      data: vehicle
    });
  });

  /**
   * Atualizar veículo
   * PUT /api/vehicles/:id
   */
  updateVehicle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vehicle = await vehicleService.updateVehicle(id, req.body);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Veículo não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Veículo atualizado com sucesso',
      data: vehicle
    });
  });

  /**
   * Excluir veículo
   * DELETE /api/vehicles/:id
   */
  deleteVehicle = asyncHandler(async (req, res) => {
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
  });

  /**
   * Obter veículos por status
   * GET /api/vehicles/status/:status
   */
  getVehiclesByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    const vehicles = await vehicleService.getVehiclesByStatus(status);

    res.status(200).json({
      success: true,
      message: `Veículos com status '${status}' recuperados com sucesso`,
      data: vehicles,
      count: vehicles.length
    });
  });

  /**
   * Obter veículos disponíveis
   * GET /api/vehicles/available
   */
  getAvailableVehicles = asyncHandler(async (req, res) => {
    const vehicles = await vehicleService.getAvailableVehicles();

    res.status(200).json({
      success: true,
      message: 'Veículos disponíveis recuperados com sucesso',
      data: vehicles,
      count: vehicles.length
    });
  });

  /**
   * Atualizar quilometragem do veículo
   * PATCH /api/vehicles/:id/quilometragem
   */
  updateKilometragem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quilometragem } = req.body;

    if (!quilometragem || isNaN(parseFloat(quilometragem))) {
      return res.status(400).json({
        success: false,
        message: 'Quilometragem inválida'
      });
    }

    const vehicle = await vehicleService.updateKilometragem(id, parseFloat(quilometragem));

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Veículo não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quilometragem atualizada com sucesso',
      data: vehicle
    });
  });

  /**
   * Atualizar status do veículo
   * PATCH /api/vehicles/:id/status
   */
  updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status é obrigatório'
      });
    }

    const vehicle = await vehicleService.updateStatus(id, status);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Veículo não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status atualizado com sucesso',
      data: vehicle
    });
  });

  /**
   * Obter estatísticas dos veículos
   * GET /api/vehicles/stats
   */
  getVehicleStats = asyncHandler(async (req, res) => {
    const stats = await vehicleService.getVehicleStats();

    res.status(200).json({
      success: true,
      message: 'Estatísticas recuperadas com sucesso',
      data: stats
    });
  });

  /**
   * Obter opções de status válidos
   * GET /api/vehicles/options/status
   */
  getStatusOptions = asyncHandler(async (req, res) => {
    const { Vehicle } = require('../models');
    const options = Vehicle.getStatusOptions();

    res.status(200).json({
      success: true,
      message: 'Opções de status recuperadas com sucesso',
      data: options
    });
  });

  /**
   * Obter opções de tipos de combustível válidos
   * GET /api/vehicles/options/fuel-types
   */
  getFuelTypeOptions = asyncHandler(async (req, res) => {
    const { Vehicle } = require('../models');
    const options = Vehicle.getTipoCombustivelOptions();

    res.status(200).json({
      success: true,
      message: 'Opções de tipos de combustível recuperadas com sucesso',
      data: options
    });
  });
}

module.exports = new VehicleController();
