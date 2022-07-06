const express = require('express');
const {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
} = require('../controllers/consoles.controller');
const { protectSession } = require('../middlewares/auth.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter.post('/', createConsole);

consolesRouter
  .route('/:id')
  .patch(consoleExists, updateConsole)
  .delete(consoleExists, deleteConsole);

module.exports = { consolesRouter };
