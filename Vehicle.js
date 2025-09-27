const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_veiculo'
  },
  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'A placa não pode estar vazia'
      },
      len: {
        args: [7, 10],
        msg: 'A placa deve ter entre 7 e 10 caracteres'
      }
    }
  },
  marca: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A marca não pode estar vazia'
      },
      len: {
        args: [2, 100],
        msg: 'A marca deve ter entre 2 e 100 caracteres'
      }
    }
  },
  modelo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O modelo não pode estar vazio'
      },
      len: {
        args: [2, 100],
        msg: 'O modelo deve ter entre 2 e 100 caracteres'
      }
    }
  },
  anoFabricacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ano_fabricacao',
    validate: {
      isInt: {
        msg: 'O ano de fabricação deve ser um número inteiro'
      },
      min: {
        args: [1900],
        msg: 'O ano de fabricação deve ser maior que 1900'
      },
      max: {
        args: [new Date().getFullYear() + 1],
        msg: 'O ano de fabricação não pode ser maior que o próximo ano'
      }
    }
  },
  cor: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      len: {
        args: [0, 50],
        msg: 'A cor deve ter no máximo 50 caracteres'
      }
    }
  },
  tipoCombustivel: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tipo_combustivel',
    validate: {
      notEmpty: {
        msg: 'O tipo de combustível não pode estar vazio'
      },
      isIn: {
        args: [['Gasolina', 'Etanol', 'Diesel', 'Flex', 'GNV', 'Elétrico', 'Híbrido']],
        msg: 'Tipo de combustível inválido'
      }
    }
  },
  quilometragemAtual: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    field: 'quilometragem_atual',
    validate: {
      isDecimal: {
        msg: 'A quilometragem deve ser um número decimal'
      },
      min: {
        args: [0],
        msg: 'A quilometragem não pode ser negativa'
      }
    }
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'Disponível',
    validate: {
      isIn: {
        args: [['Disponível', 'Em Uso', 'Manutenção', 'Inativo', 'Vendido']],
        msg: 'Status inválido'
      }
    }
  },
  dataAquisicao: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'data_aquisicao',
    validate: {
      isDate: {
        msg: 'Data de aquisição deve ser uma data válida'
      }
    }
  },
  capacidadeTanque: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'capacidade_tanque',
    validate: {
      isDecimal: {
        msg: 'A capacidade do tanque deve ser um número decimal'
      },
      min: {
        args: [0],
        msg: 'A capacidade do tanque não pode ser negativa'
      }
    }
  }
}, {
  tableName: 'veiculos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['placa']
    },
    {
      fields: ['status']
    },
    {
      fields: ['marca', 'modelo']
    }
  ]
});

// Métodos de instância
Vehicle.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  
  // Formatação de dados para o frontend
  if (values.quilometragemAtual) {
    values.quilometragemAtual = parseFloat(values.quilometragemAtual);
  }
  if (values.capacidadeTanque) {
    values.capacidadeTanque = parseFloat(values.capacidadeTanque);
  }
  
  return values;
};

// Métodos estáticos
Vehicle.getStatusOptions = function() {
  return ['Disponível', 'Em Uso', 'Manutenção', 'Inativo', 'Vendido'];
};

Vehicle.getTipoCombustivelOptions = function() {
  return ['Gasolina', 'Etanol', 'Diesel', 'Flex', 'GNV', 'Elétrico', 'Híbrido'];
};

module.exports = Vehicle;
