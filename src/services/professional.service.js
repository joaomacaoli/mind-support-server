import prisma from "../config/prisma.js";

export default class ProfessionalsServices {
  async createProfessional(data) {
    return await prisma.professional.create({ data });
  }

  async createProfessionalWithTransaction(tx, data) {
    const { userId, specialty, location, ageRangeService, freeServices } = data;

    if (!specialty || !location || !ageRangeService || !freeServices)
      throw new Error("Missing professional fields!");

    return await tx.professional.create({
      data: { userId, specialty, location, ageRangeService, freeServices },
    });
  }

  async readProfessional() {
    return await prisma.professional.findMany({
      include: {
        user: true,
      },
    });
  }

  async readProfessionalById(id) {
    return await prisma.professional.findUnique({ where: { id } });
  }

  async updateProfessional(id, data) {
    return console.log("em construção");
  }

  async deleteProfessional(id) {
    return await prisma.professional.delete({ where: { id } });
  }
}
