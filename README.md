# suportei
Sistema de Chamados

# Config
  auth.js
  export default {
    secret: 'ecd5b239477cdddabf6e0dfff422acc0',
    expiresIn: '7d',
  };
  
  database.js
  module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'suportei',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };
  
