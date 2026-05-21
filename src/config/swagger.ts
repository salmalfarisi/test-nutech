import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export default function swagger(app: Express) {
  const specs = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },

    apis: ["src/modules/**/*.ts"],
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs), swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }));
}