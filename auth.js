require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'fallback_secret_key_for_development',
  expiresIn: '7d',
  issuer: 'sistema-frota-backend',
  audience: 'sistema-frota-frontend'
};
