// const mongoose = require("mongoose");
// require("dotenv").config();
// const mongoURL = process.env.MONGO_URL;
// const { MongoMemoryServer } = require("mongodb-memory-server");
// let mongodb = null;

// exports.connectDB = async () => {
//   mongoose.set("strictQuery", false);

//   try {
//     let dbUrl = process.env.MONGO_URL;

//     if (process.env.NODE_ENV === "test") {
//       mongodb = await MongoMemoryServer.create();
//       dbUrl = mongodb.getUri();
//     }

//     await mongoose.connect(dbUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   } catch (e) {}
// };

// exports.disconnectDB = async () => {
//   try {
//     await mongoose.connection.close();
//     if (mongodb) {
//       await mongodb.stop();
//     }
//   } catch (err) {}
// };

// mongo/connection.js
const mongoose = require("mongoose");
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongodb = null;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    let dbUrl = process.env.MONGO_URL;

    if (!dbUrl && process.env.NODE_ENV !== "test") {
      console.error("❌ MONGO_URL no está definido en .env");
      throw new Error("MONGO_URL missing");
    }

    if (process.env.NODE_ENV === "test") {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
      console.log("🧪 Usando MongoDB en memoria para tests");
    }

    console.log("🔌 Conectando a MongoDB en:", dbUrl);

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB connected!");
  } catch (e) {
    console.error("❌ Error connecting to MongoDB:", e.message);
    throw e; // muy importante: NO seguir si no conecta
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
    console.log("🔌 MongoDB disconnected");
  } catch (err) {
    console.error("❌ Error disconnecting MongoDB:", err.message);
  }
};

module.exports = { connectDB, disconnectDB, mongoose };
