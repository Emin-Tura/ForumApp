import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: { type: String },
    email: { type: String, unique: true },
    authority: { type: String, default: "Author" },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
