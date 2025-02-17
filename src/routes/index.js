import { Router } from "express";

import professionalRouter from "./professional.routes.js";
import testmonialRouter from "./testmonials.routes.js";
import userRouter from "./user.routes.js";

const routes = Router();

routes.use("/professionals", professionalRouter);
routes.use("/testmonials", testmonialRouter);
routes.use("/users", userRouter);

export default routes;
