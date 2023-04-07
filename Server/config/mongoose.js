// Import Mongoose
const mongoose = require("mongoose");
const debug = require("debug")("digidoro:server");

// Create a connection string for the database with fallback to localhost
const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "digidoro";

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;

const connectDB = async () => {
  try {
    await mongoose.connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    debug("Connected to MongoDB database!");
  } catch (err) {
    debug(`Error connecting to MongoDB: ${err}`);
  }
};

module.exports = { connectDB };
