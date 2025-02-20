import { Router } from "express";

import TestimonialsController from "../controllers/testimonials.controller.js";

const testimonialRouter = Router();

const testimonialsController = new TestimonialsController();

testimonialRouter.post("/", testimonialsController.createTestimonialController);
testimonialRouter.get("/", testimonialsController.readAllTestimonialController);
testimonialRouter.get(
  "/:id",
  testimonialsController.readByIdTestimonialController
);
testimonialRouter.put(
  "/:id",
  testimonialsController.updateTestimonialController
);
testimonialRouter.delete(
  "/:id",
  testimonialsController.deleteTestimonialController
);

export default testimonialRouter;
