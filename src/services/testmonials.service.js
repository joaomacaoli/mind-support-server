import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class TestmonialsServices {
  async createTestmonial(data) {
    return await prisma.testmonials.create({ data });
  }

  async readAllTestmonials() {
    return await prisma.testmonials.findMany();
  }

  async readByIdTestmonial(id) {
    return await prisma.testmonials.findUnique({ where: { id } });
  }

  async updateTestmonial(id, data) {
    return await prisma.testmonials.update({
      where: { id },
      data,
    });
  }

  async deleteTestmonial(id) {
    const testmonial = await this.readByIdTestmonial(id);

    if (!testmonial)
      return res.status(404).json({ error: "Testmonials not found" });

    await prisma.testmonials.delete({ where: { id } });

    return testmonial;
  }
}
