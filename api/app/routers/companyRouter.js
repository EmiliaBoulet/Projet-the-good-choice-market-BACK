//* Import du Router d'express
import Router from "express";
const companyRouter = Router();

//* Import du controller des company
import { companyController } from "../controllers/companyController.js";

companyRouter
    .route("/company")
    /**
    * @swagger
    * /api/company:
    *  get:
    *    tags: [Company]
    *    summary: Get all company in database
    *    responses:
    *      200:
    *        description: List of all company on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Company'
    *      404:
    *         description: Error not found
    */
    .get(companyController.getAll)
;

export default companyRouter;
