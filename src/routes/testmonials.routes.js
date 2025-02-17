import { Router } from "express";

import TestmonialsController from "../controllers/testmonials.controller.js";

const testmonialRouter = Router();

const testmonialsController = new TestmonialsController();

testmonialRouter.post("/", testmonialsController.createTestmonialController);
testmonialRouter.get("/", testmonialsController.readAllTestmonialController);
testmonialRouter.get(
  "/:id",
  testmonialsController.readByIdTestmonialController
);
testmonialRouter.put("/:id", testmonialsController.updateTestmonialController);
testmonialRouter.delete(
  "/:id",
  testmonialsController.deleteTestmonialController
);

export default testmonialRouter;
