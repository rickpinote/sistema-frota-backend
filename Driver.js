const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Driver = sequelize.define('Driver', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_motorista'
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_usuario',
    references: {
      model: 'usuarios',
      key: 'id_usuario'
    }
  },
  cnh: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'A CNH não pode estar vazia'
      },
      len: {
        args: [8, 20],
        msg: 'A CNH deve ter entre 8 e 20 caracteres'
      }
    }
  },
  categoriaCnh: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: 'categoria_cnh',
    validate: {
      isIn: {
        args: [['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE']],
        msg: 'Categoria de CNH inválida'
      }
    }
  },
  validadeCnh: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'validade_cnh',
    validate: {
      isDate: {
        msg: 'Data de validade da CNH deve ser uma data válida'
      },
      isAfter: {
        args: new Date().toISOString().split('T')[0],
        msg: 'A CNH deve estar válida'
      }
    }
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'O CPF não pode estar vazio'
      },
      len: {
        args: [11, 14],
        msg: 'CPF deve ter formato válido'
      }
    }
  },
  rg: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      len: {
        args: [0, 20],
        msg: 'RG deve ter no máximo 20 caracteres'
      }
    }
  },
  endereco: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cep: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      len: {
        args: [0, 10],
        msg: 'CEP deve ter no máximo 10 caracteres'
      }
    }
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [0, 100],
        msg: 'Cidade deve ter no máximo 100 caracteres'
      }
    }
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: true,
    validate: {
      len: {
        args: [0, 2],
        msg: 'Estado deve ter 2 caracteres'
      }
    }
  },
  dataAdmissao: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'data_admissao',
    validate: {
      isDate: {
        msg: 'Data de admissão deve ser uma data válida'
      }
    }
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      isDecimal: {
        msg: 'Salário deve ser um número decimal'
      },
      min: {
        args: [0],
        msg: 'Salário não pode ser negativo'
      }
    }
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'motoristas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['cnh']
    },
    {
      unique: true,
      fields: ['cpf']
    },
    {
      fields: ['id_usuario']
    },
    {
      fields: ['ativo']
    }
  ]
});

// Métodos de instância
Driver.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  
  // Formatação de dados para o frontend
  if (values.salario) {
    values.salario = parseFloat(values.salario);
  }
  
  return values;
};

Driver.prototype.isCnhValida = function() {
  return this.validadeCnh > new Date();
};

Driver.prototype.diasParaVencimentoCnh = function() {
  const hoje = new Date();
  const vencimento = new Date(this.validadeCnh);
  const diffTime = vencimento - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

Driver.prototype.cnhVenceEm30Dias = function() {
  return this.diasParaVencimentoCnh() <= 30;
};

// Métodos estáticos
Driver.getCategoriasCnh = function() {
  return ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'];
};

Driver.getCategoriasCnhDescricao = function() {
  return {
    'A': 'Motocicleta',
    'B': 'Automóvel',
    'C': 'Caminhão',
    'D': 'Ônibus',
    'E': 'Carreta',
    'AB': 'Motocicleta e Automóvel',
    'AC': 'Motocicleta e Caminhão',
    'AD': 'Motocicleta e Ônibus',
    'AE': 'Motocicleta e Carreta'
  };
};

module.exports = Driver;
