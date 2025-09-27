const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_usuario'
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome não pode estar vazio'
      },
      len: {
        args: [2, 255],
        msg: 'O nome deve ter entre 2 e 255 caracteres'
      }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'O email não pode estar vazio'
      },
      isEmail: {
        msg: 'Email deve ter um formato válido'
      }
    }
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A senha não pode estar vazia'
      },
      len: {
        args: [6, 255],
        msg: 'A senha deve ter pelo menos 6 caracteres'
      }
    }
  },
  tipoUsuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tipo_usuario',
    defaultValue: 'motorista',
    validate: {
      isIn: {
        args: [['admin_master', 'administrador', 'gestor', 'motorista']],
        msg: 'Tipo de usuário inválido'
      }
    }
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ultimoLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'ultimo_login'
  },
  tentativasLogin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'tentativas_login'
  },
  bloqueadoAte: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'bloqueado_ate'
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (user) => {
      if (user.senha) {
        const salt = await bcrypt.genSalt(12);
        user.senha = await bcrypt.hash(user.senha, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('senha')) {
        const salt = await bcrypt.genSalt(12);
        user.senha = await bcrypt.hash(user.senha, salt);
      }
    }
  }
});

User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.senha;
  delete values.tentativasLogin;
  delete values.bloqueadoAte;
  return values;
};

User.prototype.validarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

User.prototype.isAdminMaster = function() {
  return this.tipoUsuario === 'admin_master';
};

User.prototype.isAdmin = function() {
  return this.tipoUsuario === 'administrador' || this.isAdminMaster();
};

User.prototype.canManageUsers = function() {
  return this.isAdminMaster();
};

User.prototype.canManageSystem = function() {
  return this.isAdminMaster();
};

User.getTiposUsuario = function() {
  return ['admin_master', 'administrador', 'gestor', 'motorista'];
};

User.findByEmail = async function(email) {
  return await User.findOne({
    where: { email: email.toLowerCase() }
  });
};

module.exports = User;
