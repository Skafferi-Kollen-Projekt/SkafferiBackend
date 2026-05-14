import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import pantryRoutes from "./routes/pantry.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { AppError } from "./utils/app.error.js";

export const createApp = () => {
  const app = express();

  const allowedOrigins = new Set([
    "http://localhost:5173", // Vite dev
  ]);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Tillåt requests utan origin (Postman, curl, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.has(origin)) {
          return callback(null, true);
        }

        return callback(new AppError("Not allowed by CORS", 403));
      },
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // Preflight för alla routes (viktigt för PATCH/DELETE i browsern)
  app.options(/.*/, cors());

  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "success✅",
      timeStamp: new Date().toISOString(),
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/pantry", pantryRoutes);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(errorHandler);

  return app;
};
