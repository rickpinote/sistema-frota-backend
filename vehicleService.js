const { Vehicle } = require('../models');
const { Op } = require('sequelize');

class VehicleService {
  /**
   * Buscar todos os veículos com paginação e filtros
   * @param {Object} options - Opções de busca
   * @param {number} options.page - Página atual
   * @param {number} options.limit - Limite de itens por página
   * @param {string} options.status - Filtro por status
   * @param {string} options.search - Termo de busca
   * @param {string} options.sortBy - Campo para ordenação
   * @param {string} options.sortOrder - Ordem da ordenação (ASC/DESC)
   * @returns {Promise<Object>} Resultado da busca com paginação
   */
  async getAllVehicles(options = {}) {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = options;

    const offset = (page - 1) * limit;
    const where = {};

    // Filtro por status
    if (status && status !== 'all') {
      where.status = status;
    }

    // Filtro por busca (placa, marca, modelo)
    if (search) {
      where[Op.or] = [
        { placa: { [Op.iLike]: `%${search}%` } },
        { marca: { [Op.iLike]: `%${search}%` } },
        { modelo: { [Op.iLike]: `%${search}%` } }
      ];
    }

    try {
      const { count, rows } = await Vehicle.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder.toUpperCase()]],
        attributes: {
          exclude: ['created_at', 'updated_at']
        }
      });

      return {
        vehicles: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
          itemsPerPage: parseInt(limit),
          hasNextPage: page < Math.ceil(count / limit),
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar veículos: ${error.message}`);
    }
  }

  /**
   * Buscar veículo por ID
   * @param {number} id - ID do veículo
   * @returns {Promise<Object|null>} Veículo encontrado ou null
   */
  async getVehicleById(id) {
    try {
      const vehicle = await Vehicle.findByPk(id, {
        attributes: {
          exclude: ['created_at', 'updated_at']
        }
      });

      return vehicle;
    } catch (error) {
      throw new Error(`Erro ao buscar veículo: ${error.message}`);
    }
  }

  /**
   * Buscar veículo por placa
   * @param {string} placa - Placa do veículo
   * @returns {Promise<Object|null>} Veículo encontrado ou null
   */
  async getVehicleByPlaca(placa) {
    try {
      const vehicle = await Vehicle.findOne({
        where: { placa: placa.toUpperCase() },
        attributes: {
          exclude: ['created_at', 'updated_at']
        }
      });

      return vehicle;
    } catch (error) {
      throw new Error(`Erro ao buscar veículo por placa: ${error.message}`);
    }
  }

  /**
   * Criar novo veículo
   * @param {Object} vehicleData - Dados do veículo
   * @returns {Promise<Object>} Veículo criado
   */
  async createVehicle(vehicleData) {
    try {
      // Normalizar dados
      const normalizedData = {
        ...vehicleData,
        placa: vehicleData.placa?.toUpperCase(),
        marca: vehicleData.marca?.trim(),
        modelo: vehicleData.modelo?.trim(),
        cor: vehicleData.cor?.trim(),
        quilometragemAtual: parseFloat(vehicleData.quilometragemAtual || 0),
        capacidadeTanque: vehicleData.capacidadeTanque ? parseFloat(vehicleData.capacidadeTanque) : null
      };

      // Verificar se a placa já existe
      const existingVehicle = await this.getVehicleByPlaca(normalizedData.placa);
      if (existingVehicle) {
        throw new Error('Já existe um veículo cadastrado com esta placa');
      }

      const vehicle = await Vehicle.create(normalizedData);
      return vehicle;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        throw new Error(`Dados inválidos: ${validationErrors.join(', ')}`);
      }
      throw new Error(`Erro ao criar veículo: ${error.message}`);
    }
  }

  /**
   * Atualizar veículo
   * @param {number} id - ID do veículo
   * @param {Object} vehicleData - Dados para atualização
   * @returns {Promise<Object|null>} Veículo atualizado ou null
   */
  async updateVehicle(id, vehicleData) {
    try {
      // Verificar se o veículo existe
      const existingVehicle = await this.getVehicleById(id);
      if (!existingVehicle) {
        return null;
      }

      // Normalizar dados
      const normalizedData = {
        ...vehicleData,
        placa: vehicleData.placa?.toUpperCase(),
        marca: vehicleData.marca?.trim(),
        modelo: vehicleData.modelo?.trim(),
        cor: vehicleData.cor?.trim(),
        quilometragemAtual: vehicleData.quilometragemAtual ? parseFloat(vehicleData.quilometragemAtual) : existingVehicle.quilometragemAtual,
        capacidadeTanque: vehicleData.capacidadeTanque ? parseFloat(vehicleData.capacidadeTanque) : existingVehicle.capacidadeTanque
      };

      // Verificar se a nova placa já existe em outro veículo
      if (normalizedData.placa && normalizedData.placa !== existingVehicle.placa) {
        const vehicleWithSamePlaca = await this.getVehicleByPlaca(normalizedData.placa);
        if (vehicleWithSamePlaca && vehicleWithSamePlaca.id !== id) {
          throw new Error('Já existe outro veículo cadastrado com esta placa');
        }
      }

      await Vehicle.update(normalizedData, {
        where: { id }
      });

      return await this.getVehicleById(id);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        throw new Error(`Dados inválidos: ${validationErrors.join(', ')}`);
      }
      throw new Error(`Erro ao atualizar veículo: ${error.message}`);
    }
  }

  /**
   * Excluir veículo
   * @param {number} id - ID do veículo
   * @returns {Promise<boolean>} True se excluído com sucesso
   */
  async deleteVehicle(id) {
    try {
      const deletedRowsCount = await Vehicle.destroy({
        where: { id }
      });

      return deletedRowsCount > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir veículo: ${error.message}`);
    }
  }

  /**
   * Buscar veículos por status
   * @param {string} status - Status dos veículos
   * @returns {Promise<Array>} Lista de veículos
   */
  async getVehiclesByStatus(status) {
    try {
      const vehicles = await Vehicle.findAll({
        where: { status },
        attributes: {
          exclude: ['created_at', 'updated_at']
        },
        order: [['placa', 'ASC']]
      });

      return vehicles;
    } catch (error) {
      throw new Error(`Erro ao buscar veículos por status: ${error.message}`);
    }
  }

  /**
   * Buscar veículos disponíveis
   * @returns {Promise<Array>} Lista de veículos disponíveis
   */
  async getAvailableVehicles() {
    return await this.getVehiclesByStatus('Disponível');
  }

  /**
   * Atualizar quilometragem do veículo
   * @param {number} id - ID do veículo
   * @param {number} novaQuilometragem - Nova quilometragem
   * @returns {Promise<Object|null>} Veículo atualizado ou null
   */
  async updateKilometragem(id, novaQuilometragem) {
    try {
      const vehicle = await this.getVehicleById(id);
      if (!vehicle) {
        return null;
      }

      if (novaQuilometragem < vehicle.quilometragemAtual) {
        throw new Error('A nova quilometragem não pode ser menor que a atual');
      }

      await Vehicle.update(
        { quilometragemAtual: parseFloat(novaQuilometragem) },
        { where: { id } }
      );

      return await this.getVehicleById(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar quilometragem: ${error.message}`);
    }
  }

  /**
   * Atualizar status do veículo
   * @param {number} id - ID do veículo
   * @param {string} novoStatus - Novo status
   * @returns {Promise<Object|null>} Veículo atualizado ou null
   */
  async updateStatus(id, novoStatus) {
    try {
      const vehicle = await this.getVehicleById(id);
      if (!vehicle) {
        return null;
      }

      const statusValidos = Vehicle.getStatusOptions();
      if (!statusValidos.includes(novoStatus)) {
        throw new Error(`Status inválido. Opções válidas: ${statusValidos.join(', ')}`);
      }

      await Vehicle.update(
        { status: novoStatus },
        { where: { id } }
      );

      return await this.getVehicleById(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar status: ${error.message}`);
    }
  }

  /**
   * Obter estatísticas dos veículos
   * @returns {Promise<Object>} Estatísticas dos veículos
   */
  async getVehicleStats() {
    try {
      const totalVehicles = await Vehicle.count();
      
      const statusCounts = await Vehicle.findAll({
        attributes: [
          'status',
          [Vehicle.sequelize.fn('COUNT', Vehicle.sequelize.col('status')), 'count']
        ],
        group: ['status'],
        raw: true
      });

      const fuelTypeCounts = await Vehicle.findAll({
        attributes: [
          'tipoCombustivel',
          [Vehicle.sequelize.fn('COUNT', Vehicle.sequelize.col('tipo_combustivel')), 'count']
        ],
        group: ['tipoCombustivel'],
        raw: true
      });

      const stats = {
        total: totalVehicles,
        porStatus: statusCounts.reduce((acc, item) => {
          acc[item.status] = parseInt(item.count);
          return acc;
        }, {}),
        porTipoCombustivel: fuelTypeCounts.reduce((acc, item) => {
          acc[item.tipoCombustivel] = parseInt(item.count);
          return acc;
        }, {})
      };

      return stats;
    } catch (error) {
      throw new Error(`Erro ao obter estatísticas: ${error.message}`);
    }
  }
}

module.exports = new VehicleService();
