
const param= require("./params");
import { parseAxisParam } from "@tensorflow/tfjs-core/dist/util";
const tf= require("@tensorflow/tfjs-node");
const util= require("./utils");

/** 
 * Compile & train neural network model
 *
 * @param {tf.Model} model tensorflow neural model
 * @param {object} trainData train data as object with xs and labels
 * @param {callback} onIteration callback to execute every 10 batches & epoc
 *
 */

async function train(model, trainData, onIteration) {

    let trainedBatchCount= 0;

    const optimizer = 'rmsprop';

    model.compile({
        optimizer,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    const totNumBatch= (params.no_of_data * (1 - params.validationPercent) 
                        / params.batchSize) * params.trainEpochs;

    await model.fit(trainData.xs, trainData.labels, {
        batchSize: params.batchSize,
        validationSplit: params.validationPercent,
        epochs: params.trainEpochs,
        callbacks: {
            onBatchEnd: async (batch, log) => {
                trainedBatchCount++;
                util.log(`training ${(trainedBatchCount/totNumBatch*100).toFixed(3)}% done...`);

                if (onIteration && batch % 10 === 0) {
                    onIteration('onBatchEnd', batch, log);
                }

                await tf.nextFrame();
            }
        }
    });

}

