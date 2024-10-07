import bjs from "npm:brain.js";

const net = new bjs.recurrent.LSTM({
  hiddenLayers: [5, 6, 5]
});

net.