//* Import du Router d'express
import Router from "express";
const categoryRouter = Router();

//* Import du controller des category
import { categoryController } from "../controllers/categoryController.js";

categoryRouter
    .route("/category")
    /**
    * @swagger
    * /api/category:
    *  get:
    *    tags: [Category]
    *    summary: Get all category in database
    *    responses:
    *      200:
    *        description: List of all category on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Category'
    *      404:
    *         description: Error not found
    */
    .get(categoryController.getAll)
;

categoryRouter
    .route("/category/sub_category")
    /**
    * @swagger
    * /api/category/sub_category:
    *  get:
    *    tags: [Category]
    *    summary: Get subCategory by category
    *    responses:
    *      200:
    *        description: List category with subCategory
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/CategoryWithSubcategory'
    *      404:
    *         description: Error not found
    */
    .get(categoryController.subCategoryByCategory)
;

export default categoryRouter;
