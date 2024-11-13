require("dotenv").config();
const WaterMelonClient = require("./Lib/Core/Client");

const instance = new WaterMelonClient();
instance.start();