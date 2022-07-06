const express = require('express');
const {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
  createReview,
  assignConsoleToGame,
} = require('../controllers/games.controller');

const { protectSession } = require('../middlewares/auth.middleware');
const { gameExists } = require('../middlewares/games.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post('/assign-console',assignConsoleToGame)

gamesRouter.post('/', createGame);

gamesRouter
  .route('/:id')
  .patch(gameExists, updateGame)
  .delete(gameExists, deleteGame);

gamesRouter.post('/reviews/:gameId',gameExists,createReview);

module.exports = { gamesRouter };
