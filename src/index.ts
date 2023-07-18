import express from 'express';

import { Solver } from './solver/solver';

const app = express();
const port = 3001;

app.get('/predict', (req, res) => {
  res.json({
    msg: 'Hello World!'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);

  const solver = new Solver();
  solver.train(100).then(() => {
    solver.predict();
  })

});
