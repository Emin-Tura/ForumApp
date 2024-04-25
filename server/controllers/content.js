import tryCatch from "./utils/tryCatch.js";
import Content from "../models/Content.js";

export const createContent = tryCatch(async (req, res) => {
  const newContent = new Content({ ...req.body });
  await newContent.save();
  res.status(201).json({ success: true, result: newContent });
});

export const getContent = tryCatch(async (req, res) => {
  const content = await Content.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: content });
});

export const deleteContent = tryCatch(async (req, res) => {
  const { _id } = await Content.findByIdAndDelete(req.params.contentId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateContent = tryCatch(async (req, res) => {
  const updatedContent = await Content.findByIdAndUpdate(
    req.params.contentId,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: true, result: updatedContent });
});
