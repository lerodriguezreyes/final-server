const { model, Schema } = require("mongoose");

const billSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    congress: {
      type: Number,
      required: true,
    },
    billType: {
      type: String,
      required: true,
    },
    billNumber: {
      type: String,
      required: true,
    },
    sponsors: {
      type: [String],
    },
    cosponsors: {
      type: Number,
    },
    originChamber: {
      type: String,
    },
    introducedDate: {
      type: Date,
    },
    latestActionDate: {
      type: Date,
    },
    latestActionText: {
      type: String,
    },
    summary: {
      type: Object,
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

module.exports = model("Bill", billSchema);
