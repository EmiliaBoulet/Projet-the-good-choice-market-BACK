//* Import du Router d'express
import Router from "express";
const productRouter = Router();

//* Import du controller des product
import { productController } from "../controllers/productController.js";

//* Import du middleware des products
import { userCkeck } from "../middlewares/userConnect.js";

const regex = "([A-Za-z0-9À-ÖØ-öø-ÿ&:;.,?$%£€ ]+)";

productRouter
    .route("/product")
    /**
    * @swagger
    * /api/product:
    *  get:
    *    tags: [Product]
    *    summary: Get all products in database
    *    responses:
    *      200:
    *        description: List of all products on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Product'
    *      404:
    *         description: Error not found
    */
    .get(productController.getAll)
;

productRouter
    .route("/product/:id")
    /**
    * @swagger
    * /api/product/{id}:
    *  get:
    *    tags: [Product]
    *    summary: Get all infos of one product
    *    parameters:
    *          - name: id
    *            in: path
    *            required: true
    *            description: id of product
    *            schema:
    *                type: string
    *    responses:
    *      200:
    *        description: Object of one product on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Product'
    *      404:
    *         description: Error not found
    */
    .get(productController.getOne)
;

productRouter
    .route("/product/:id/user")
    /**
    * @swagger
    * /api/product/{id}/user:
    *   post:
    *     tags: [Product]
    *     summary: Create a new product.
    *     parameters:
    *          - name: id
    *            in: path
    *            required: true
    *            description: id of the product
    *            schema:
    *                type: string
    *     requestBody:
    *       id:
    *          type: integer
    *       Description:
    *          type: string
    *       image:
    *          type: string
    *       location:
    *          type: string
    *       barcode:
    *          type: integer
    *       expiration_date:
    *          type: string
    *       height:
    *          type: integer
    *       width:
    *          type: integer
    *       depth:
    *          type: integer
    *       weight:
    *          type: string
    *       size:
    *          type: string
    *       price_ht:
    *          type: integer
    *       price_promo:
    *          type: integer
    *       price_kg:
    *          type: integer
    *       tva_id:
    *          type: integer
    *       brand_id:
    *          type: integer
    *       required:
    *         id
    *         name
    *         description
    *         image
    *         price_ht
    *         tva_id
    *         brand_id
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Product'
    *     responses:
    *       200:
    *         description: Created
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 data:
    *                   type: object
    *                   properties:
    *                     name:
    *                       type: text
    *                       description: The product name.
    *                       example: "Masque pour cheveux"
    */
    .post(userCkeck.userConnect, productController.addProductInBasket)
;

productRouter
    .route(`/product/sub_category/:name${regex}`)
    /**
    * @swagger
    * /api/product/sub_category/{name}:
    *  get:
    *    tags: [Product]
    *    summary: Get all products from sub_category
    *    parameters:
    *          - name: name
    *            in: path
    *            required: true
    *            description: sub_category name
    *            schema:
    *                type: string
    *    responses:
    *      200:
    *        description: products from sub_category on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Product'
    *      404:
    *         description: Error not found
    */
    .get(productController.productsBySubCategory)
;

productRouter
    .route("/product/favorites/random")
    /**
    * @swagger
    * /api/product:
    *  get:
    *    tags: [Product]
    *    summary: Get favorites in database
    *    responses:
    *      200:
    *        description: List favorites on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/Product'
    *      404:
    *         description: Error not found
    */
    .get(productController.getFavorites)
;

export default productRouter;
