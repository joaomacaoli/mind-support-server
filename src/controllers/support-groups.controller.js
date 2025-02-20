import SupportGroupsServices from "../services/support-groups.service.js";

const supportGroupsServices = new SupportGroupsServices();

export default class SupportGroupsControllers {
  constructor() {}

  async createSupportGroupController(request, response) {
    try {
      const supportGroup = await supportGroupsServices.createSupportGroup(
        request.body
      );
      return response.status(200).json(supportGroup);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async readAllSupportGroupController(request, response) {
    try {
      const supportGroups = await supportGroupsServices.readAllSupportGroups();
      response.status(200).send(supportGroups);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async readByIdSupportGroupController(request, response) {
    try {
      const supportGroup = await supportGroupsServices.readByIdSupportGroup(
        request.params.id
      );
      return response.status(200).send(supportGroup);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async updateSupportGroupController(request, response) {
    try {
      const supportGroupUpdated =
        await supportGroupsServices.updateSupportGroup(
          request.params.id,
          request.body
        );
      response.status(200).send(supportGroupUpdated);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async deleteSupportGroupController(request, response) {
    try {
      const supportGroupDeleted =
        await supportGroupsServices.deleteSupportGroup(request.params.id);
      response.status(200).send(supportGroupDeleted);
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
