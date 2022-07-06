const dotenv = require('dotenv');

const { catchAsync } = require('../utils/catchAsync.util');
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');

dotenv.config({ path: './config.env' });

const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    where: { status: 'active' },
    include: [{ model: Game }],
  });

  res.status(200).json({
    status: 'success',
    consoles,
  });
});

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({
    name,
    company,
  });

  res.status(201).json({
    status: 'success',
    newConsole,
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;

  await console.update({ name });

  res.status(204).json({ status: 'success' });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: 'disable' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
};
