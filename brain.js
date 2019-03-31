
import * as params from ("./params");
import { parseAxisParam } from "@tensorflow/tfjs-core/dist/util";

/** 
 * Compile & train neural network model
 *
 * @param {tf.Model} model tensorflow neural model
 * @param {callback} onIteration callback to execute every 10 batches & epoc
 *
 */

async function train(model, onIteration) {

    const optimizer = 'rmsprop';

    model.compile({
        optimizer,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    const totNumBatch= (params.no_of_data * (1 - params.validationPercent) 
                        / params.batchSize) * params.trainEpochs;

    await model.fit()

}

