import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class ProfessionalsServices {
  async createProfessional(
    userId,
    specialty,
    location,
    ageRangeService,
    freeServices
  ) {
    return await prisma.professional.create({
      data: {
        specialty,
        location,
        ageRangeService,
        freeServices,
        userId, // Relacionando com o ID do usuário criado
      },
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
