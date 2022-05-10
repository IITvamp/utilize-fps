const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

