import UsersServices from "../services/user.service.js";

const usersServices = new UsersServices();

export default class UserController {
  async createUserController(request, response) {
    try {
      const user = await usersServices.createUser(request.body);
      response.status(200).send(user);
    } catch (error) {
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

  async readByIdUserController(request, response) {
    try {
      const user = await usersServices.readByIdUser(request.params.id);
      response.status(200).send(user);
    } catch (error) {
      response.status(404).json({ error: error.message });
    }
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
      const userDeleted = await usersServices.deleteUser(request.params.id);
      response.status(200).send(userDeleted);
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
