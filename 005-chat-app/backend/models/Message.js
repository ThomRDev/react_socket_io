const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    // agrega lo que es updatedAt y createdAt
    timestamps: true,
  }
);

MessageSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

MessageSchema.static("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Message", MessageSchema);
