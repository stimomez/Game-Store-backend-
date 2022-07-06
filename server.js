const { app } = require('./app');
const { Console } = require('./models/console.model');
const { Game } = require('./models/game.model');
const { Review } = require('./models/review.model');
const { User } = require('./models/user.model');

const { db } = require('./utils/database.util');

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('Db synced'))
  .catch(err => console.log(err));

User.hasMany(Review);
Review.belongsTo(User);

Game.hasMany(Review);
Review.belongsTo(Game);

Game.belongsToMany(Console, { through: 'gameInConsole' });
Console.belongsToMany(Game, { through: 'gameInConsole' });

app.listen(3520, () => console.log('Express app running!!!'));
