import { Router } from "express";

import ProfessionalController from "../controllers/professional.controller.js";

const professionalRouter = Router();

const professionalController = new ProfessionalController();

professionalRouter.get("/", professionalController.readProfessionalController);
professionalRouter.get(
  "/:id",
  professionalController.readProfessionalByIdController
);
professionalRouter.post(
  "/",
  professionalController.createProfessionalController
);
professionalRouter.put(
  "/:id",
  professionalController.updateProfessionalController
);
professionalRouter.delete(
  "/:id",
  professionalController.deleteProfessionalController
);

export default professionalRouter;
