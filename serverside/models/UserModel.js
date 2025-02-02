const mongoose = require("mongoose");

const UserPostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    profilepic: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
// Add index for faster lookups and unique constraints
UserPostSchema.index({ email: 1 }, { unique: true });
UserPostSchema.index({ username: 1 }, { unique: true });
const Users = mongoose.models.Users || mongoose.model("Users", UserPostSchema);

module.exports = Users;
