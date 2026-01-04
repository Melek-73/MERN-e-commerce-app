const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: { type: String, default: "" }, // <-- avatar path or url
});

module.exports = mongoose.model("User", UserSchema);
