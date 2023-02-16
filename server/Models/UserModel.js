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
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bycrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Invalid credentials password");
  }
  throw Error("Invalid credentials email");
};

module.exports = mongoose.model("Users", UserSchema);
