
module.exports= {
    
    // data parameters
    imageHeight: 250,
    imageWidth: 250,
    imageDepth: 3,

    possible_outcome: ["normal", "Sarcoma", "Carcinoma",
                         "Leukemia", "Lymphoma"],

    no_of_data: 10000,



    // training parametters
    batchSize: 250,
    validationPercent: 0.15,
    trainEpochs: 5,


}