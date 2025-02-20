import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class SupportGroupsServices {
  async createSupportGroup(data) {
    const { name, description, location } = data;

    if (!name || !description || !location)
      throw new Error("Missing service groups fields!");

    return await prisma.supportGroups.create({ data });
  }

  async readAllSupportGroups() {
    return await prisma.supportGroups.findMany({});
  }

  async readByIdSupportGroup(id) {
    const supportGroup = await prisma.supportGroups.findUnique({
      where: { id },
    });

    if (!supportGroup) throw new Error("Support group not found!");

    return supportGroup;
  }

  async updateSupportGroup(id, data) {
    await this.readByIdSupportGroup(id);

    return await prisma.supportGroups.update({ where: { id }, data });
  }

  async deleteSupportGroup(id) {
    await this.readByIdSupportGroup(id);

    return await prisma.supportGroups.delete({ where: { id } });
  }
}
