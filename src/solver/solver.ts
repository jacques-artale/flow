import * as tf from '@tensorflow/tfjs-node';

export class Solver {

  private model: tf.Sequential;

  constructor() {
    // Create a simple sequential model
    this.model = tf.sequential();

    // Add layers to the model
    this.model.add(tf.layers.dense({units: 10, activation: 'relu', inputShape: [32]}));
    this.model.add(tf.layers.dense({units: 1}));

    // Compile the model
    this.model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  }

  async train(epochs: number) {
    // Generate some random data for the input features
    const xs = tf.randomNormal([100, 32]);

    // Generate a constant tensor for the target values
    const ys = tf.fill([100, 1], 0.5);

    // Train the model
    await this.model.fit(xs, ys, {
        epochs: epochs,
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
  }

  async predict() {
    // Use the model to make a prediction
    for (let i = 0; i < 10; i++) {
      const newData = tf.randomNormal([1, 32]);
      const prediction = this.model.predict(newData);

      if(prediction instanceof tf.Tensor){
        const predictionArray = await prediction.array();
        console.log(predictionArray);
      }
    }
  }
  
}
