const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    upVotes: {
      type: Number,
    },
    downVotes: {
      type: Number,
    },
    bill: { type: Schema.Types.ObjectId, ref: "Bill" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply"}]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
