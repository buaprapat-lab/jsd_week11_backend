import { Router } from "express";
import { router as userRoutes } from "./users.routes";

export const router = Router();

router.use("/users", userRoutes);
