import brain from "npm:brain.js";

export const net = new brain.recurrent.LSTM({
    hiddenLayers: [5, 10, 5],
    activation: "leaky-relu"
});