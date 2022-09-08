//* Import de Router de express
import Router from "express";
const indexRouter = Router();

import userRouter from "./userRouter.js";
indexRouter.use("/api", userRouter);

import tvaRouter from "./tvaRouter.js";
indexRouter.use("/api", tvaRouter);

import productRouter from "./productRouter.js";
indexRouter.use("/api", productRouter);

import companyRouter from "./companyRouter.js";
indexRouter.use("/api", companyRouter);

import categoryRouter from "./categoryRouter.js";
indexRouter.use("/api", categoryRouter);

import brandRouter from "./brandRouter.js";
indexRouter.use("/api", brandRouter);

import imageRouter from "./imageRouter.js";
indexRouter.use("/api", imageRouter);

import errorRouter from "./errorRouter.js";
indexRouter.use("*", errorRouter);

export default indexRouter;
