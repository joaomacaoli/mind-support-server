import prisma from "../config/prisma.js";
import ProfessionalsServices from "./professional.service.js";
import { validate as isUuid } from "uuid";

export default class UsersServices {
  constructor() {
    this.professionalsServices = new ProfessionalsServices();
  }

  async createUser(data) {
    const { name, email, password, type, ...typeData } = data;

    if (!name || !email || !password || !type)
      throw new Error("Missing user fields!");

    if (type !== "professional" && type !== "patient")
      throw new Error("Non-existent user type!");

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password, type },
      });

      if (type === "professional") {
        await this.professionalsServices.createProfessionalWithTransaction(tx, {
          userId: user.id,
          ...typeData,
        });
      }

      return user;
    });
  }

  async readUser() {
    return await prisma.user.findMany({
      include: { Professional: true },
    });
  }

  async readByIdUser(id) {
    if (!id || !isUuid(id)) throw new Error("Valid UUID is required!");

    const user = await prisma.user.findUnique({
      where: { id },
      include: { Professional: true },
    });

    if (!user) throw new Error("User not found!");

    return user;
  }

  async updateUser(id, data) {
    await this.readByIdUser(id);

    return await prisma.user.update({
      where: { id },
      data,
      include: { Professional: true },
    });
  }

  async deleteUser(id) {
    const user = await this.readByIdUser(id);

    if (user.type === "professional" && user.Professional)
      await this.professionalsServices.deleteProfessional(user.Professional.id);

    return await prisma.user.delete({ where: { id } });
  }
}
