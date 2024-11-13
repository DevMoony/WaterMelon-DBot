const brain = require("brain.js");

const net = new brain.recurrent.LSTM({
    hiddenLayers: [10, 30, 10],
    activation: "leaky-relu",
});

module.exports = net;