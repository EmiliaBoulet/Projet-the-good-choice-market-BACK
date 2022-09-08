import Router from "express";
const errorRouter = Router();

import { errorController } from "../controllers/errorController.js";

errorRouter
    .route("*")
    .get(errorController.notFound)
;

export default errorRouter;
