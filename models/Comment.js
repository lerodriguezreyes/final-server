const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    upVotes: {
        type: Number,
        required: true
    },
    downVotes: {
        type: Number,
        required: true
    }
  },
  { 
    timestamps: true
 }
);

module.exports = model("Comment", commentSchema);
