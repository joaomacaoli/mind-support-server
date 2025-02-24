import LoginServices from "../services/auth.service.js";

const loginServices = new LoginServices();

export default class LoginController {
  async LoginController(request, response) {
    try {
      const token = await loginServices.login(request.body);
      response.status(200).send({ token });
    } catch (error) {
      response.status(401).send({ error: error.message });
    }
  }
}
