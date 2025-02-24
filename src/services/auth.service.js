import bcrypt from "bcryptjs";

import UsersServices from "./user.service.js";
import { generateToken } from "../config/jwt.js";

export default class LoginServices {
  constructor() {
    this.usersServices = new UsersServices();
  }

  async login(data) {
    const { email, password } = data;

    const user = await this.usersServices.readByEmailUser(email);

    if (!bcrypt.compareSync(password, user.password))
      throw new Error("Invalid credentials!");

    const token = generateToken({ id: user.id, email: user.email });

    return token;
  }
}
