import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
// !import userRoutes from "./routes/user.routes.js" finns inte än
import { errorHandler } from "./middleware/error.middleware.js";
import { AppError } from "./utils/app.error.js";
import { timeStamp } from "node:console";

export const createApp = () => {
  const app = express();

  // ! MIDDLEWARES
  app.use(cors());
  app.use(express.json());

  // ! HEALTH CHECK
  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "success✅", timeStamp: new Date().toDateString() });
  });

  // ! ROUTES
  app.use("/api/auth", authRoutes);
  // !app.use("/api/users", userRoutes); finns inte än

  // ! CATCH_ALL (Om ingen route matchar, eller om det sker ett error i någon route)
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // ! GLOBAL ERROR HANDLER Alltid sist i app.ts
  app.use(errorHandler);

  return app;
};
