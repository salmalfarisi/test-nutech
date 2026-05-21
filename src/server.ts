import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/database";
import swagger from "./config/swagger";
import routes from "./routes";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

app.use(express.json());
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
});

swagger(app);
app.use(routes);
app.get("/", (_, res) => {
  res.redirect("/docs");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });