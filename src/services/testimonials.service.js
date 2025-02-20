import prisma from "../config/prisma.js";

export default class TestimonialsServices {
  async createTestimonial(data) {
    const { description } = data;

    if (!description)
      return response.status(400).json({ error: "Missing fields!" });

    return await prisma.testimonials.create({ data });
  }

  async readAllTestimonials() {
    return await prisma.testimonials.findMany();
  }

  async readByIdTestimonial(id) {
    return await prisma.testimonials.findUnique({ where: { id } });
  }

  async updateTestimonial(id, data) {
    return await prisma.testimonials.update({
      where: { id },
      data,
    });
  }

  async deleteTestimonial(id) {
    const testimonial = await this.readByIdTestimonial(id);

    if (!testimonial)
      return res.status(404).json({ error: "Testimonials not found" });

    await prisma.testimonials.delete({ where: { id } });

    return testimonial;
  }
}
