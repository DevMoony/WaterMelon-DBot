const brain = require("brain.js");

const net = new brain.recurrent.LSTM({
    hiddenLayers: [5, 10, 5],
    activation: "leaky-relu",
});

module.exports = net;