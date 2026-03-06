import express, { type Request, type Response } from "express";
import userRoutes from "./routes/user.router";
import { errorHandler } from "./middleware/error.middleware";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  // * Show users app user routes
  app.use("/api/users", userRoutes);

  //* Error handling middleware should be the last middleware
  app.use(errorHandler);
  app.get("/health", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "ok", timeStamp: new Date().toDateString() });
  });
  return app;
};
