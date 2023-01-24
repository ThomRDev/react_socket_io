const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
});

UserSchema.static("toJSON", function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
});

module.exports = model("User", UserSchema);
