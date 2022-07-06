const { Game } = require('../models/game.model');

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const gameExists = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  if (!id) {
    const { gameId } = req.params;
    id = gameId;
    req.gameId = id;
  }

  const game = await Game.findOne({ where: { id } });

  if (!game) {
    return next(new AppError('Game not found', 404));
  }

  req.game = game;
  next();
});

module.exports = { gameExists };
