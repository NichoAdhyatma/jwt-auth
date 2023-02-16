const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt();
  this.password = await bycrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Users", UserSchema);
