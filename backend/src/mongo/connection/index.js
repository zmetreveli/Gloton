const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongodb = null;

exports.connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    let dbUrl = process.env.MONGO_URL;

    if (process.env.NODE_ENV === "test") {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 
  } catch (e) {
  }
};

exports.disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
  } catch (err) {
  }
};
