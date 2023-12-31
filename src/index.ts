import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

import { Solver } from './solver/solver';
import Validate from './validator/validator';
import { Generator } from './generator/generator';
import { GeneratorV2 } from './generator/generator_v2';
import { GeneratorV3 } from './generator/generator_v3';
import { GeneratorV4 } from './generator/generator_v4';
import { GeneratorV5 } from './generator/generator_v5';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

app.get('/generate', (req, res) => {
  
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
  });

  // DO NOT GENERATE BOARD WITH SIZE > 200x200 as it can take too long
  const width = Math.min(Number(req.query.width), 200);
  const height = Math.min(Number(req.query.height), 200);

  const generator = new GeneratorV4();
  
  console.log("Generating - width: " + width + ", height: " + height);

  let tries = 0;
  let grid;
  let valid;
  
  do {
    tries++;
    grid = generator.generate(width, height);
    valid = Validate(grid);
  } while (!valid);

  console.log("Generated: " + tries + " tries");

  res.json({
    grid: grid
  });
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);

  //const solver = new Solver();
  //solver.train(100).then(() => {
  //  solver.predict();
  //})
});
