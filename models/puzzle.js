const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});


class Puzzle extends Model {
  constructor(id, board) {
    super();
    this.id = id;
    this.board = board;
  }
}

Puzzle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    board: {
      type: new DataTypes.JSON(),
      allowNull: false,
    },
  },
  {
    tableName: 'puzzles',
    sequelize: sequelize, // this bit is important
  }
);

Puzzle.sync().then(() => {
  console.log('table created');
}).catch((err) => {
  console.log(err);
});
