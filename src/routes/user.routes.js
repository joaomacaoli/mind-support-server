import { Router } from "express";

import UserController from "../controllers/users.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", userController.createUserController);
userRouter.get("/", authenticateJWT, userController.readUserController);
userRouter.get("/:id", authenticateJWT, userController.readByIdUserController);
userRouter.put("/:id", authenticateJWT, userController.updateUserController);
userRouter.delete("/:id", authenticateJWT, userController.deleteUserController);

export default userRouter;
