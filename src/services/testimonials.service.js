import prisma from "../config/prisma.js";
import { validate as isUuid } from "uuid";

export default class TestimonialsServices {
  async createTestimonial(data) {
    const { description } = data;

    if (!description) throw new Error("Missing fields!");

    return await prisma.testimonials.create({ data });
  }

  async readAllTestimonials() {
    return await prisma.testimonials.findMany();
  }

  async readByIdTestimonial(id) {
    if (!id || !isUuid(id)) throw new Error("Valid UUID is required!");

    const testimonial = await prisma.testimonials.findUnique({
      where: { id },
    });

    if (!testimonial) throw new Error("Testimonial not found!");

    return testimonial;
  }

  async updateTestimonial(id, data) {
    await this.readByIdTestimonial(id);

    return await prisma.testimonials.update({
      where: { id },
      data,
    });
  }

  async deleteTestimonial(id) {
    const testimonial = await this.readByIdTestimonial(id);

    await prisma.testimonials.delete({ where: { id } });

    return testimonial;
  }
}
