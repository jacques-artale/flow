import express from 'express';

import { Solver } from './solver/solver';
import { Generator } from './generator/generator';
import { GeneratorV2 } from './generator/generator_v2';
import { GeneratorV3 } from './generator/generator_v3';
import { GeneratorV4 } from './generator/generator_v4';
import { GeneratorV5 } from './generator/generator_v5';

const app = express();
const port = 3001;

app.get('/generate', (req, res) => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const generator = new GeneratorV4();
  
  console.log("Generating - width: " + width + ", height: " + height);

  let grid = generator.generate(width, height);
  let tries = 1;
  let valid = false;

  while (!valid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (generator.valid_path(grid, [i, j]) > 2) {
          valid = true;
          break;
        } else {
          tries++;
          grid = generator.generate(width, height);
          break;
        }
      }
      if (valid) break;
    }
  }


  console.log("Generated: " + tries + " tries");

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
