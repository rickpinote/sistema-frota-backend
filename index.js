const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');
const User = require('./User');
const Driver = require('./Driver');

// Definir associações entre modelos
User.hasOne(Driver, { foreignKey: 'id_usuario', as: 'motorista' });
Driver.belongsTo(User, { foreignKey: 'id_usuario', as: 'usuario' });

// Associações futuras para outros módulos
// Vehicle.hasMany(Fuel, { foreignKey: 'id_veiculo', as: 'abastecimentos' });
// Fuel.belongsTo(Vehicle, { foreignKey: 'id_veiculo', as: 'veiculo' });

const models = {
  Vehicle,
  User,
  Driver,
  sequelize
};

module.exports = models;
