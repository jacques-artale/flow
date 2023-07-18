import express from 'express';
import * as tf from '@tensorflow/tfjs-node';

const app = express();
const port = 3001;

async function run() {
  // Create a simple sequential model
  const model = tf.sequential();

  // Add layers to the model
  model.add(tf.layers.dense({units: 10, activation: 'relu', inputShape: [32]}));
  model.add(tf.layers.dense({units: 1}));

  // Compile the model
  model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

  // Generate some random data for the input features
  const xs = tf.randomNormal([100, 32]);

  // Generate a constant tensor for the target values
  const ys = tf.fill([100, 1], 0.5);

  // Train the model
  await model.fit(xs, ys, {
      epochs: 1000,
      callbacks: {
          onEpochEnd: async (epoch, log) => {
            if (log) {
              console.log(`Epoch ${epoch}: loss = ${log.loss}`);
            } else {
              console.log("idk something went wrong");
            }
          }
      }
  });

  // Use the model to make a prediction
  for (let i = 0; i < 10; i++) {
    const newData = tf.randomNormal([1, 32]);
    const prediction = model.predict(newData);

    if(prediction instanceof tf.Tensor){
      const predictionArray = await prediction.array();
      console.log(predictionArray);
    }
  }
  
}

app.get('/train', (req, res) => {

  run();

  res.json({
    msg: 'Hello World!'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

