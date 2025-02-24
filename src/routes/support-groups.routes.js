import { Router } from "express";

import SupportGroupsControllers from "../controllers/support-groups.controller.js";

const supportGroupRouter = Router();

const supportGroupController = new SupportGroupsControllers();

supportGroupRouter.post(
  "/",
  supportGroupController.createSupportGroupController
);
supportGroupRouter.get(
  "/",
  supportGroupController.readAllSupportGroupController
);
supportGroupRouter.get(
  "/:id",
  supportGroupController.readByIdSupportGroupController
);
supportGroupRouter.put(
  "/:id",
  supportGroupController.updateSupportGroupController
);
supportGroupRouter.delete(
  "/:id",
  supportGroupController.deleteSupportGroupController
);

export default supportGroupRouter;
