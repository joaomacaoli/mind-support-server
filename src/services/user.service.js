import bcrypt from "bcryptjs";

import prisma from "../config/prisma.js";
import ProfessionalsServices from "./professional.service.js";

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

    const passwordHashed = bcrypt.hashSync(password, Number(process.env.SALT));

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        omit: {
          password: true,
        },
        data: { name, email, password: passwordHashed, type },
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
      omit: {
        password: true,
      },
      include: { Professional: true },
    });
  }

  async readByEmailUser(email) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Invalid credentials!");

    return user;
  }

  async readByIdUser(id) {
    const user = await prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: { id },
      include: { Professional: true },
    });

    if (!user) throw new Error("User not found!");

    return user;
  }

  async updateUser(id, data) {
    await this.readByIdUser(id);

    return await prisma.user.update({
      omit: {
        password: true,
      },
      where: { id },
      data,
      include: { Professional: true },
    });
  }

  async deleteUser(id) {
    const user = await this.readByIdUser(id);

    if (user.type === "professional" && user.Professional)
      await this.professionalsServices.deleteProfessional(user.Professional.id);

    return await prisma.user.delete({
      omit: {
        password: true,
      },
      where: { id },
    });
  }
}
