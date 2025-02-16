import ProfessionalsServices from "../services/professional.service.js";

const professionalsServices = new ProfessionalsServices();

export default class ProfessionalController {
  constructor() {}

  async createProfessionalController(request, response) {
    const { specialty, location, ageRangeService, freeServices } = request.body;

    if (!specialty || !location || !ageRangeService || !freeServices) {
      return response.status(400).json({ error: "Missing fields!" });
    }

    try {
      const professional = await professionalsServices.createProfessional(
        specialty,
        location,
        ageRangeService,
        freeServices
      );
      return response.status(200).json(professional);
    } catch (error) {
      console.error("Error creating user:", error);
      response.status(400).send({ error: error.message });
    }
  }

  async readProfessionalController(request, response) {
    try {
      const professionals = await professionalsServices.readProfessional();
      response.status(200).send(professionals);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async readProfessionalByIdController(request, response) {
    const professional = await professionalsServices.readProfessionalById(
      request.params.id
    );

    if (!professional)
      return response.status(404).json({ error: "Professional not found" });

    return response.status(200).send(professional);
  }

  async updateProfessionalController(request, response) {
    try {
      const updatedUser = await professionalsServices.updateProfessional(
        request.params.id,
        request.body
      );
      response.status(200).send(updatedUser);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async deleteProfessionalController(request, response) {
    try {
      const professionalDeleted =
        await professionalsServices.deleteProfessional(request.params.id);
      response.status(200).send(professionalDeleted);
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
