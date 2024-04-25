import { Router } from "express";

import {
  createContent,
  deleteContent,
  getContent,
  updateContent,
} from "../controllers/content.js";

const contentRouter = Router();

contentRouter.post("/", createContent);
contentRouter.get("/", getContent);
contentRouter.delete("/:contentId", deleteContent);
contentRouter.patch("/updateContent/:contentId", updateContent);

export default contentRouter;
