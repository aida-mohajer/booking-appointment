import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middlewares/errorHandler";
import { patientRouter } from "./user/patient/patient.routes";
import { drRouter } from "./user/doctor/doctor.routes";
import { specializationRouter } from "./specialization/specialization.routes";
import { feedbackRouter } from "./feedback/feedback.routes";
import { uploadImageRouter } from "./dr-image/image.routes";
import { tokenRouter } from "./refreshToken/token.routes";
import { adminRouter } from "./user/admin/admin.routes";
import { cityRouter } from "./city/city.routes";
import { availabilityRouter } from "./availability/availibility.routes";
import { appointmentRouter } from "./appointment/appointment.routes";
// import swaggerDocument from "./swagger-output.json";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "../src/images")));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/patients", patientRouter);
app.use("/api/doctors", drRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/images", uploadImageRouter);
app.use("/api/cities", cityRouter);
app.use("/api/availabilities", availabilityRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/access-token", tokenRouter);
app.use("/api/admin", adminRouter);
app.use("/api/specializations", specializationRouter);

app.use(errorHandler);

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
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
  apis: [path.join(__dirname, "./swagger/*.ts")],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
      console.log("http://localhost:3000/api-docs/");
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
