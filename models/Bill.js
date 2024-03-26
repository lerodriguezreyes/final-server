const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    congress: {
      type: Number,
      required: true,
    },
    billNumber: {
      type: String,
      required: true,
    },
    billType: {
      type: String,
      required: true,
    },
    billTitle: {
      type: String,
      required: true,
    },
    billSponsors: {
      type: [String],
    },
    billCosponsors: {
      type: Number,
    },
    originChamber: {
      type: String,
    },
    billIntroducedDate: {
      type: Date,
    },
    latestActionDate: {
      type: Date,
    },
    latestActionText: {
      type: String,
    },
    summary: {
      type: String,
    },
    initialTextDate: {
      type: Date,
    },
    initialTextPdfLink: {
      type: String,
    },
    latestTextDate: {
      type: Date,
    },
    latestTextPdfLink: {
      type: String,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
