const tf= require("@tensorflow/tfjs-node");
import * as params from ("./params")

/**
 * make model function 
 *
 * @returns {tf.Model} returns a tf.model
 */

function makeModel() {

    let model= tf.sequential();

    model.add(tf.layers.conv2d({
        inputShape: [params.imageHeight, params.imageWidth, params.imageDepth],
        kernelSize: 3,
        filters: 16,
        activation: "relu",
    }));

    model.add(tf.layers.maxPooling2d({
        poolSize: 2,
        strides: 2,
    }));

    model.add(tf.layers.conv2d({
        kernelSize: 3,
        filters: 32,
        activation: "relu",
    }));

    model.add(tf.layers.maxPooling2d({
        poolSize: 2,
        strides: 2,
    }));

    model.add(tf.layers.conv2d({
        kernelSize: 3,
        filters: 32,
        activation: "relu",
    }));

    model.add(tf.layers.flatten({}));

    model.add(tf.layers.dense({
        units: 64,
        activation: 'relu',
    }));

    model.add(tf.layers.dense({
        units: params.possible_outcome.length,
        activation: "softmax",
    }));

    return model;
}


module.exports= {
    make: makeModel,
};