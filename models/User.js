const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    profilePicURL: { 
      type: String, 
      default: "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    }
  },
  { 
    timestamps: true
 }
);

module.exports = model("User", userSchema);
