import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { AppDataSource } from "./database/data-source";
import cors from "cors";
import routes from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source conectado a porta: ${process.env.DB_PORT}`);

    const app = express();

    app.use(express.json({ limit: "50mb" }));
    app.use(
      cors({
        origin: "http://localhost:8080",
        credentials: true,
      })
    );

    app.use(routes);

    app.listen(process.env.PORT, () =>
      console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("Falha ao inicializar servidor", err);
  });
