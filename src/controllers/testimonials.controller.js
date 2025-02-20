import TestimonialsServices from "../services/testimonials.service.js";

const testimonialsServices = new TestimonialsServices();

export default class TestimonialsControllers {
  constructor() {}

  async createTestimonialController(request, response) {
    try {
      const testimonial = await testimonialsServices.createTestimonial(
        request.body
      );
      return response.status(200).json(testimonial);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async readAllTestimonialController(request, response) {
    try {
      const testimonials = await testimonialsServices.readAllTestimonials();
      response.status(200).send(testimonials);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async readByIdTestimonialController(request, response) {
    const testimonial = await testimonialsServices.readByIdTestimonial(
      request.params.id
    );

    if (!testimonial)
      return response.status(404).json({ error: "Testimonial not found" });

    return response.status(200).send(testimonial);
  }

  async updateTestimonialController(request, response) {
    try {
      const testimonialUpdated = await testimonialsServices.updateTestimonial(
        request.params.id,
        request.body
      );
      response.status(200).send(testimonialUpdated);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async deleteTestimonialController(request, response) {
    try {
      const testimonialDeleted = await testimonialsServices.deleteTestimonial(
        request.params.id
      );
      response.status(200).send(testimonialDeleted);
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
