import { Router } from "express";

import {
  createContentMail,
  createDeleteRequesMail,
} from "../controllers/mail.js";

const mailRouter = Router();

mailRouter.post("/", createDeleteRequesMail);
mailRouter.post("/contact", createContentMail);

export default mailRouter;
