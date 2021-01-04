const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

adminSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

adminSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;
