const { model, Schema } = require("mongoose");

const replySchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    upVotes: {
      type: Number,
    },
    downVotes: {
      type: Number,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: Schema.Types.ObjectId, ref: "Comment"}
  },
  {
    timestamps: true,
  }
);

module.exports = model("Reply", replySchema);
