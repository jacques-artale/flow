import express from 'express';

import { Solver } from './solver/solver';
import { Generator } from './generator/generator';
import { GeneratorV2 } from './generator/generator_v2';

const app = express();
const port = 3001;

app.get('/generate', (req, res) => {

  console.log("generating");

  const generator = new GeneratorV2();
  const grid = generator.generate();

  res.json({
    grid: grid
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);

  //const solver = new Solver();
  //solver.train(100).then(() => {
  //  solver.predict();
  //})
});
