const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placementSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    company_name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    No_students: {
      type: String,
      required: true,
    },
    No_rounds: {
      type: String,
      required: true,
    },
    intern_or_fte: {
      type: String,
      required: true,
    },
    round_exp: {
      type: String,
      required: true,
    },
    uploader:{
      type:String,
      required:true
    },
    date: {
      type: Date,
      required: true,
    }
  }
);

const Placement = mongoose.model("placement", placementSchema);
// Placement.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 120 });

module.exports = Placement;