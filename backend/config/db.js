const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected with DB succesfully");
    })
    .catch((error) => {
      console.log("error with connecting with DB", error);
    });
};

module.exports = connectDB;
