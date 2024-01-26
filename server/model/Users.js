/* eslint-disable no-undef */

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  addresses: { type: [Schema.Types.Mixed] },
  // TODO:  We can make a separate Schema for this
  name: { type: String },
  orders: { type: [Schema.Types.Mixed] },
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("User", userSchema);
// {
//     "quantity": 5,
//     "product": 65b1ca7cf22a5df3e0c051c0,
//     "user": ,

//    }
