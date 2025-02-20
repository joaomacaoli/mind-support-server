import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "dotenv/config.js";

const app = express();

const frontendPort = process.env.FRONT_PORT || 5173;
app.use(cors({ origin: `http://localhost:${frontendPort}` }));

const backendPort = process.env.SERVER_PORT || 3000;
const message = console.log(
  `Servidor rodando em http://localhost:${backendPort}`
);

app.use(express.json());
app.use(routes);

app.listen(backendPort, () => {
  message;
});
