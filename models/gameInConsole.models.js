const { db, DataTypes } = require('../utils/database.util');
const { Console } = require('./console.model');
const { Game } = require('./game.model');

const GameInConsole = db.define('gameInConsole', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Game,
      key: 'id',
    },
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Console,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { GameInConsole };
