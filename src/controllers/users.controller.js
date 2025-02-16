import PatientsServices from "../services/patient.service.js";
import ProfessionalsServices from "../services/professional.service.js";
import UsersServices from "../services/user.service.js";

const patientsServices = new PatientsServices();
const professionalsServices = new ProfessionalsServices();
const usersServices = new UsersServices();

export default class UserController {
  constructor() {}

  async createUserController(request, response) {
    const {
      name,
      email,
      password,
      type,
      specialty,
      location,
      ageRangeService,
      freeServices,
    } = request.body;

    if (
      !name ||
      !email ||
      !password ||
      !type ||
      !specialty ||
      !location ||
      !ageRangeService ||
      !freeServices
    ) {
      return response.status(400).json({ error: "Missing fields!" });
    }

    try {
      const user = await usersServices.createUser({
        name,
        email,
        password,
        type,
      });

      if (type === "professional") {
        const professional = await professionalsServices.createProfessional(
          user.id,
          specialty,
          location,
          ageRangeService,
          freeServices
        );
        return response
          .status(200)
          .json({ user: user, professional: professional });
      }

      response.status(200).send(user);
    } catch (error) {
      console.error("Error creating user:", error);
      response.status(400).send({ error: error.message });
    }
  }

  async readUserController(request, response) {
    try {
      const users = await usersServices.readUser();
      response.status(200).send(users);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async readUserByIdController(request, response) {
    const user = await usersServices.readUserById(request.params.id);

    if (!user) return response.status(404).json({ error: "User not found" });

    response.status(200).send(user);
  }

  async updateUserController(request, response) {
    try {
      const updatedUser = await usersServices.updateUser(
        request.params.id,
        request.body
      );
      response.status(200).send(updatedUser);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  async deleteUserController(request, response) {
    try {
      const userId = request.params.id;

      const user = await usersServices.readUserById(userId);

      if (!user) return res.status(404).json({ error: "User not found" });

      if (user.type === "professional") {
        const professionalId =
          await professionalsServices.readProfessionalById();
      }

      await professionalsServices.deleteProfessional(professionalId);

      const userDeleted = await usersServices.deleteUser(userId);
      response.status(200).send(userDeleted);
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
