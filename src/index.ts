import express from 'express';

import { Solver } from './solver/solver';
import { Generator } from './generator/generator';
import { GeneratorV2 } from './generator/generator_v2';
import { GeneratorV3 } from './generator/generator_v3';
import { GeneratorV4 } from './generator/generator_v4';

const app = express();
const port = 3001;

app.get('/generate', (req, res) => {

  const generator = new GeneratorV4();
  
  console.log("Generating...");
  let grid = generator.generate();
  let tries = 1;
  let valid = false;

  while (!valid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (generator.valid_path(grid, [i, j]) > 2) {
          valid = true;
          break;
        } else {
          console.log("Invalid grid, trying again...");
          tries++;
          grid = generator.generate();
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
