import { Router } from "express";

import loginRouter from "./login.route.js";
import professionalRouter from "./professional.routes.js";
import supportGroupRouter from "./support-groups.routes.js";
import testimonialRouter from "./testimonials.routes.js";
import userRouter from "./user.routes.js";

import { authenticateJWT } from "../middlewares/auth.middleware.js";

const routes = Router();

routes.use("/login", loginRouter);
routes.use("/professionals", authenticateJWT, professionalRouter);
routes.use("/support-groups", supportGroupRouter);
routes.use("/testimonials", testimonialRouter);
routes.use("/users", userRouter);

export default routes;
