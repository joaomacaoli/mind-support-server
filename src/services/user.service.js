import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UsersServices {
  async createUser(data) {
    return await prisma.user.create({ data });
  }

  async readUser() {
    return await prisma.user.findMany({
      include: {
        Professional: true,
      },
    });
  }

  async readUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        Professional: true,
      },
    });
  }

  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id) {
    const user = await this.readById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    await prisma.user.delete({ where: { id } });

    return user;
  }
}
