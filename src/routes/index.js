import { Router } from "express";

import professionalRouter from "./professional.routes.js";
import userRouter from "./user.routes.js";

const routes = Router();

routes.use("/professionals", professionalRouter);
routes.use("/users", userRouter);

export default routes;
