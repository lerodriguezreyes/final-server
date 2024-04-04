const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    upVotes: [{
      type: Schema.Types.ObjectId, ref: "user",
    }],
    downVotes:[ {
      type: Number,
    }],
    bill: { type: Schema.Types.ObjectId, ref: "Bill" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
