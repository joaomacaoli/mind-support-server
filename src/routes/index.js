import { Router } from "express";

import professionalRouter from "./professional.routes.js";
import testimonialRouter from "./testimonials.routes.js";
import userRouter from "./user.routes.js";

const routes = Router();

routes.use("/professionals", professionalRouter);
routes.use("/testimonials", testimonialRouter);
routes.use("/users", userRouter);

export default routes;
