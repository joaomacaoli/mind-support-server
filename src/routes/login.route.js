import { Router } from "express";

import LoginController from "../controllers/login.controller.js";

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post("/", loginController.LoginController);

export default loginRouter;
