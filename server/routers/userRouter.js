import { Router } from "express";
import { createUser, getUsers, login } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/", getUsers);
userRouter.post("/createuser", createUser);

export default userRouter;
