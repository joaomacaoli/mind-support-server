import { verifyToken } from "../config/jwt.js";

export const authenticateJWT = (request, response, next) => {
  const token = request.headers.authorization?.split(" ")[1]; // Remove "Bearer "

  if (!token) return response.sendStatus(401);

  try {
    request.user = verifyToken(token);
    next();
  } catch (error) {
    response.sendStatus(403);
  }
};
