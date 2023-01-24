const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_CONNECT);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - vea los logs");
  }
};

module.exports = {
  dbConnection,
};
