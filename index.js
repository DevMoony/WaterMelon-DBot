require("dotenv").config();
const WaterMelonClient = require("./Lib/Core/Client");

const client = new WaterMelonClient();

client.start();