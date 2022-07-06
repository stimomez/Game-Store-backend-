const dotenv = require('dotenv');

const { catchAsync } = require('../utils/catchAsync.util');
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { Console } = require('../models/console.model');
const { GameInConsole } = require('../models/gameInConsole.models');

dotenv.config({ path: './config.env' });

const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    where: { status: 'active' },
    include: [
      { model: Review },
      { model: Console, include: { model: Game, include: { model: Review } } },
    ],
  });

  res.status(200).json({
    status: 'success',
    games,
  });
});

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;

  const newGames = await Game.create({
    title,
    genre,
  });

  res.status(201).json({
    status: 'success',
    newGames,
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title } = req.body;

  await game.update({ title });

  res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: 'disable' });

  res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment } = req.body;
  const { sessionUser, gameId } = req;
  const { id } = sessionUser;

  const newReview = await Review.create({
    comment,
    userId: id,
    gameId,
  });

  res.status(201).json({
    status: 'success',
    newReview,
  });
});

const assignConsoleToGame = catchAsync(async (req, res, next) => {
  const { gameId, consoleId } = req.body;

  const gameInConsole = await GameInConsole.create({ gameId, consoleId });

  res.status(201).json({
    status: 'success',
    gameInConsole,
  });
});

module.exports = {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  createReview,
  assignConsoleToGame,
};
