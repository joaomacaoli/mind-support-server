import { Router } from "express";

import UserController from "../controllers/users.controller.js";

const userRouter = Router();

const userController = new UserController();

userRouter.get("/", userController.readUserController);
userRouter.get("/:id", userController.readByIdUserController);
userRouter.post("/", userController.createUserController);
userRouter.put("/:id", userController.updateUserController);
userRouter.delete("/:id", userController.deleteUserController);

export default userRouter;
