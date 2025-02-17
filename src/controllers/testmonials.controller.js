import TestmonialsServices from "../services/testmonials.service.js";

const testmonialsServices = new TestmonialsServices();

export default class TestmonialsControllers {
  constructor() {}

  async createTestmonialController(request, response) {
    const { description } = request.body;

    if (!description)
      return response.status(400).json({ error: "Missing fields!" });

    try {
      const testmonial = await testmonialsServices.createTestmonial({
        description,
      });
      return response.status(200).json(testmonial);
    } catch (error) {
      console.error("Error creating user:", error);
      response.status(400).send({ error: error.message });
    }
  }

  async readAllTestmonialController(request, response) {
    try {
      const testmonials = await testmonialsServices.readAllTestmonials();
      response.status(200).send(testmonials);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async readByIdTestmonialController(request, response) {
    const testmonial = await testmonialsServices.readByIdTestmonial(
      request.params.id
    );

    if (!testmonial)
      return response.status(404).json({ error: "Testmonial not found" });

    return response.status(200).send(testmonial);
  }

  async updateTestmonialController(request, response) {
    try {
      const testmonialUpdated = await testmonialsServices.updateTestmonial(
        request.params.id,
        request.body
      );
      response.status(200).send(testmonialUpdated);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async deleteTestmonialController(request, response) {
    try {
      const testmonialDeleted = await testmonialsServices.deleteTestmonial(
        request.params.id
      );
      response.status(200).send(testmonialDeleted);
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
