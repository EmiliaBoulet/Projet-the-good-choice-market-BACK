import Router from "express";
const imageRouter = Router();

//* Import du controller
import { imageController } from "../controllers/imageController.js";

//* Import du schema de Joi
import { productValidator } from "../middlewares/Joi.js";

imageRouter
    .route("/image/upload")
    /**
    * @swagger
    * /api/image/upload:
    *  post:
    *    tags: [Image]
    *    summary: Post one image on cloudinary with url
    *    responses:
    *      200:
    *        description: Add one image on cloudinary and return the public_id of image
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Image'
    *      404:
    *         description: Error not found
    */
    .post(imageController.upload)
;

imageRouter
    .route("/image/find")
    /**
    * @swagger
    * /api/image/find:
    *  post:
    *    tags: [Image]
    *    summary: Find one image url in cloudinary
    *    responses:
    *      200:
    *        description: Get one image url with public_id
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Image'
    *      404:
    *         description: Error not found
    */
    .post(imageController.fetchByPublicId)
;

imageRouter
    .route("/image/upload/product")
    /**
    * @swagger
    * /api/image/upload/product:
    *  post:
    *    tags: [Image]
    *    summary: Post one image on cloudinary and add one product in BDD
    *    responses:
    *      200:
    *        description: Add one image in cloudinary with url and add one product in DB with the url of image
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Product'
    *      404:
    *         description: Error not found
    */
    .post(productValidator, imageController.uploadOneProductWithImage)
;

export default imageRouter;
