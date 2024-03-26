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
    },
    downVotes: {
        type: Number,
    },
    bill: {
      type: Schema.Types.ObjectId, ref: "Bill"
    },
    owner: {type: Schema.Types.ObjectId, ref: "User"}
  },
  { 
    timestamps: true
 }
);

module.exports = model("Comment", commentSchema);
