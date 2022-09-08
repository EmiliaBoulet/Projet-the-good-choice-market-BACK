//* Import du Router d'express
import Router from "express";
const userRouter = Router();

//* Import du controller des users
import { userController } from "../controllers/userController.js";

//* Import du middleware des users
import { userCkeck } from "../middlewares/userConnect.js";

//* Import des schemas de Joi
import { userValidator, loginValidator, patchUserValidator } from "../middlewares/Joi.js";

const regex = "([A-Za-z0-9-.]+@[a-z]+.[a-z]{2,3})";

userRouter
    .route("/user")
    /**
    * @swagger
    * /api/user:
    *  get:
    *    tags: [User]
    *    summary: Get all user in database
    *    responses:
    *      200:
    *        description: List of all user on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .get(userController.getAllUser)
;

userRouter
    .route(`/user/:email${regex}`)
    /**
    * @swagger
    * /api/user/{email}:
    *  get:
    *    tags: [User]
    *    summary: Get all information of one user
    *    parameters:
    *          - name: email
    *            in: path
    *            required: true
    *            description: Name of user
    *            schema:
    *                type: string
    *    responses:
    *      200:
    *        description: Object of one user on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .get(userCkeck.userConnect, userController.getOneUser)
;

userRouter
    .route(`/user/:email${regex}/product`)
    /**
    * @swagger
    * /api/user/{email}/product:
    *  get:
    *    tags: [User]
    *    summary: Check user connection and his basket
    *    parameters:
    *          - name: email
    *            in: path
    *            required: true
    *            description: Check user connection and his basket
    *            schema:
    *                type: string
    *    responses:
    *      200:
    *        description: Check user connection and his basket
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/UserwithProduct'
    *      404:
    *         description: Error not found
    */
    .get(userCkeck.userConnect, userController.getBasketByUserMail)
;

userRouter
    .route("/user")
    /**
    * @swagger
    * /api/user:
    *  post:
    *    tags: [User]
    *    summary: Post all information from the new user
    *    requestBody:
    *      required: true
    *      content:
    *        application/x-www-form-urlencoded:
    *          schema:
    *            type: object
    *            properties:
    *              firstname:
    *                type: string
    *              lastname:
    *                type: string
    *              birthday:
    *                type: string
    *              email:
    *                type: string
    *              password:
    *                type: string
    *              phone_number:
    *                type: string
    *              address:
    *                type: string
    *              postal_code:
    *                type: string
    *              city:
    *                type: string
    *              country:
    *                type: string
    *            required:
    *              - firstname
    *              - lastname
    *              - birthday
    *              - email
    *              - password
    *              - phone_number
    *              - address
    *              - postal_code
    *              - city
    *              - country
    *    responses:
    *      200:
    *        description: Post one user
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .post(userValidator, userController.create)
;

userRouter
    .route(`/user/:email${regex}`)
    /**
    * @swagger
    * /api/user/{email}:
    *  patch:
    *    tags: [User]
    *    summary: Post new data from database
    *    parameters:
    *          - name: email
    *            in: path
    *            required: true
    *            description: new user data
    *            schema:
    *                type: string
    *    requestBody:
    *      required: true
    *      content:
    *        application/x-www-form-urlencoded:
    *          schema:
    *            type: object
    *            properties:
    *              firstname:
    *                type: string
    *              lastname:
    *                type: string
    *              birthday:
    *                type: string
    *              email:
    *                type: string
    *              password:
    *                type: string
    *              phone_number:
    *                type: string
    *              address:
    *                type: string
    *              postal_code:
    *                type: string
    *              city:
    *                type: string
    *              country:
    *                type: string
    *    responses:
    *      200:
    *        description: New data from one user on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .patch(patchUserValidator, userCkeck.userConnect, userController.update)
;

userRouter
    .route(`/user/:email${regex}`)
    /**
    * @swagger
    * /api/user/{email}:
    *  delete:
    *    tags: [User]
    *    summary: post all user information that delete from database
    *    parameters:
    *          - name: email
    *            in: path
    *            required: true
    *            description: Name of user
    *            schema:
    *                type: string
    *    responses:
    *      200:
    *        description: Object of one brand on json format
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .delete(userCkeck.userConnect, userController.delete)
;

userRouter
    .route("/user/login")
    /**
    * @swagger
    * /api/user/login:
    *  post:
    *    tags: [User]
    *    summary: post loggin user
    *    requestBody:
    *     required: true
    *     content:
    *      application/x-www-form-urlencoded:
    *        schema:
    *          type: object
    *          properties:
    *              email:
    *                type: string
    *              password:
    *                type: string
    *          required:
    *            - email
    *            - password
    *    responses:
    *      200:
    *        description: loggin user
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .post(loginValidator, userController.login)
;

userRouter
    .route("/user/logout")
    /**
    * @swagger
    * /api/user/logout:
    *  post:
    *    tags: [User]
    *    summary: post logout user
    *    requestBody:
    *     required: true
    *     content:
    *      application/x-www-form-urlencoded:
    *        schema:
    *          type: object
    *          properties:
    *              firstname:
    *                type: string
    *              lastname:
    *                type: string
    *              birthday:
    *                type: string
    *              email:
    *                type: string
    *              password:
    *                type: string
    *              phone_number:
    *                type: string
    *              address:
    *                type: string
    *              postal_code:
    *                type: string
    *              city:
    *                type: string
    *              country:
    *                type: string
    *    responses:
    *      200:
    *        description: Post one user
    *        content:
    *          application/json:
    *            schema:
    *              type: array
    *              items:
    *                $ref: '#/components/schemas/User'
    *      404:
    *         description: Error not found
    */
    .post(userController.logout)
;

export default userRouter;
