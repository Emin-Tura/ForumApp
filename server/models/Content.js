import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    head: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    content: { type: String, required: true },
    authorLink: { type: String },
    email: { type: String },
    updatedUser: { type: String },
    articleContent: { type: String },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Content = mongoose.model("content", contentSchema);
export default Content;
