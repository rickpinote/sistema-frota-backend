const Joi = require('joi');

// Schema de validação para criação de veículo
const createVehicleSchema = Joi.object({
  placa: Joi.string()
    .min(7)
    .max(10)
    .required()
    .messages({
      'string.empty': 'A placa é obrigatória',
      'string.min': 'A placa deve ter pelo menos 7 caracteres',
      'string.max': 'A placa deve ter no máximo 10 caracteres',
      'any.required': 'A placa é obrigatória'
    }),
  
  marca: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'A marca é obrigatória',
      'string.min': 'A marca deve ter pelo menos 2 caracteres',
      'string.max': 'A marca deve ter no máximo 100 caracteres',
      'any.required': 'A marca é obrigatória'
    }),
  
  modelo: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'O modelo é obrigatório',
      'string.min': 'O modelo deve ter pelo menos 2 caracteres',
      'string.max': 'O modelo deve ter no máximo 100 caracteres',
      'any.required': 'O modelo é obrigatório'
    }),
  
  anoFabricacao: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      'number.base': 'O ano de fabricação deve ser um número',
      'number.integer': 'O ano de fabricação deve ser um número inteiro',
      'number.min': 'O ano de fabricação deve ser maior que 1900',
      'number.max': 'O ano de fabricação não pode ser maior que o próximo ano',
      'any.required': 'O ano de fabricação é obrigatório'
    }),
  
  cor: Joi.string()
    .max(50)
    .allow('')
    .optional()
    .messages({
      'string.max': 'A cor deve ter no máximo 50 caracteres'
    }),
  
  tipoCombustivel: Joi.string()
    .valid('Gasolina', 'Etanol', 'Diesel', 'Flex', 'GNV', 'Elétrico', 'Híbrido')
    .required()
    .messages({
      'any.only': 'Tipo de combustível inválido',
      'any.required': 'O tipo de combustível é obrigatório'
    }),
  
  quilometragemAtual: Joi.number()
    .min(0)
    .optional()
    .default(0)
    .messages({
      'number.base': 'A quilometragem deve ser um número',
      'number.min': 'A quilometragem não pode ser negativa'
    }),
  
  status: Joi.string()
    .valid('Disponível', 'Em Uso', 'Manutenção', 'Inativo', 'Vendido')
    .optional()
    .default('Disponível')
    .messages({
      'any.only': 'Status inválido'
    }),
  
  dataAquisicao: Joi.date()
    .optional()
    .messages({
      'date.base': 'Data de aquisição deve ser uma data válida'
    }),
  
  capacidadeTanque: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'A capacidade do tanque deve ser um número',
      'number.min': 'A capacidade do tanque não pode ser negativa'
    })
});

// Schema de validação para atualização de veículo
const updateVehicleSchema = Joi.object({
  placa: Joi.string()
    .min(7)
    .max(10)
    .optional()
    .messages({
      'string.empty': 'A placa não pode estar vazia',
      'string.min': 'A placa deve ter pelo menos 7 caracteres',
      'string.max': 'A placa deve ter no máximo 10 caracteres'
    }),
  
  marca: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.empty': 'A marca não pode estar vazia',
      'string.min': 'A marca deve ter pelo menos 2 caracteres',
      'string.max': 'A marca deve ter no máximo 100 caracteres'
    }),
  
  modelo: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.empty': 'O modelo não pode estar vazio',
      'string.min': 'O modelo deve ter pelo menos 2 caracteres',
      'string.max': 'O modelo deve ter no máximo 100 caracteres'
    }),
  
  anoFabricacao: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .optional()
    .messages({
      'number.base': 'O ano de fabricação deve ser um número',
      'number.integer': 'O ano de fabricação deve ser um número inteiro',
      'number.min': 'O ano de fabricação deve ser maior que 1900',
      'number.max': 'O ano de fabricação não pode ser maior que o próximo ano'
    }),
  
  cor: Joi.string()
    .max(50)
    .allow('')
    .optional()
    .messages({
      'string.max': 'A cor deve ter no máximo 50 caracteres'
    }),
  
  tipoCombustivel: Joi.string()
    .valid('Gasolina', 'Etanol', 'Diesel', 'Flex', 'GNV', 'Elétrico', 'Híbrido')
    .optional()
    .messages({
      'any.only': 'Tipo de combustível inválido'
    }),
  
  quilometragemAtual: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'A quilometragem deve ser um número',
      'number.min': 'A quilometragem não pode ser negativa'
    }),
  
  status: Joi.string()
    .valid('Disponível', 'Em Uso', 'Manutenção', 'Inativo', 'Vendido')
    .optional()
    .messages({
      'any.only': 'Status inválido'
    }),
  
  dataAquisicao: Joi.date()
    .optional()
    .messages({
      'date.base': 'Data de aquisição deve ser uma data válida'
    }),
  
  capacidadeTanque: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'A capacidade do tanque deve ser um número',
      'number.min': 'A capacidade do tanque não pode ser negativa'
    })
});

// Schema para validação de parâmetros de consulta
const queryParamsSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .optional()
    .default(1)
    .messages({
      'number.base': 'A página deve ser um número',
      'number.integer': 'A página deve ser um número inteiro',
      'number.min': 'A página deve ser maior que 0'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .default(10)
    .messages({
      'number.base': 'O limite deve ser um número',
      'number.integer': 'O limite deve ser um número inteiro',
      'number.min': 'O limite deve ser maior que 0',
      'number.max': 'O limite deve ser menor ou igual a 100'
    }),
  
  status: Joi.string()
    .valid('all', 'Disponível', 'Em Uso', 'Manutenção', 'Inativo', 'Vendido')
    .optional()
    .default('all')
    .messages({
      'any.only': 'Status de filtro inválido'
    }),
  
  search: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'O termo de busca deve ter no máximo 100 caracteres'
    }),
  
  sortBy: Joi.string()
    .valid('id', 'placa', 'marca', 'modelo', 'anoFabricacao', 'status', 'created_at')
    .optional()
    .default('created_at')
    .messages({
      'any.only': 'Campo de ordenação inválido'
    }),
  
  sortOrder: Joi.string()
    .valid('ASC', 'DESC', 'asc', 'desc')
    .optional()
    .default('DESC')
    .messages({
      'any.only': 'Ordem de classificação inválida (ASC ou DESC)'
    })
});

// Middleware de validação
const validateVehicleCreation = (req, res, next) => {
  const { error, value } = createVehicleSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors
    });
  }

  req.body = value;
  next();
};

const validateVehicleUpdate = (req, res, next) => {
  const { error, value } = updateVehicleSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors
    });
  }

  req.body = value;
  next();
};

const validateQueryParams = (req, res, next) => {
  const { error, value } = queryParamsSchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Parâmetros de consulta inválidos',
      errors
    });
  }

  req.query = value;
  next();
};

const validateVehicleId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'ID do veículo inválido'
    });
  }

  req.params.id = parseInt(id);
  next();
};

module.exports = {
  validateVehicleCreation,
  validateVehicleUpdate,
  validateQueryParams,
  validateVehicleId,
  createVehicleSchema,
  updateVehicleSchema,
  queryParamsSchema
};
