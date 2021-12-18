require('dotenv').config()

const mongoose = require('mongoose')

const {DB_CONNECT} = process.env

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  const connectDB = async () => {
    await mongoose.connect(DB_CONNECT, dbOptions, () => {
      console.log('Database connected');
    });
  };
  
  module.exports = connectDB;