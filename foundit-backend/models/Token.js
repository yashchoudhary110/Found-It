const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 1 }
    }
  }
);

const Token = mongoose.model("token", tokenSchema);
// Token.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 120 });

module.exports = Token;