//* Import des variables d'environements
import "dotenv/config";

//* Import de debug
import Debug from "debug";
const debugServer = Debug("server");

//* Import d'express
import express from "express";
const app = express();

//* Import des fichier static
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + "/public"));

app.set("views", "./api/app/views");
app.set("view engine", "ejs");

//! ------------------------------
//! ----------MIDDLEWARE----------
//! ------------------------------

//? *********MULTER*********/
import multer from "multer";
const upload = multer();
app.use(upload.none());

//? **********CORS**********/
import cors from "cors";
const allowlist = ["http://localhost:8080"];
app.use(cors({
    origin: allowlist,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
}));

//? *******MIDDLEWARE*******/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

//? *****COOKIE-PARSER******/
import cookieParser from "cookie-parser";
app.use(cookieParser());

//? ****EXPRESS-SESSION*****/
import session from "express-session";
if (!process.env.NODE_ENV) {
    app.use(session({
        resave: false,
        secret: process.env.SECRET_SESSION,
        saveUninitialized: true,
        domain: "localhost",
        proxy: true,
        cookie: {
            sameSite: "none",
            secure: false,
            maxAge: 9999999999999,
            httpOnly: true,
        }
    }));
} else {
    app.use(session({
        resave: false,
        secret: process.env.SECRET_SESSION,
        saveUninitialized: true,
        domain: "localhost",
        proxy: true,
        cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 9999999999999,
            httpOnly: true,
        }
    }));
}

//? ********SWAGGER*********/
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./app/services/swagger/swaggerConfig.js";
import { cssOptions } from "./app/services/swagger/swaggerCSS.js";
const swaggerSpecs = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs, cssOptions));

//! ------------------------------
//! ------------ROUTER------------
//! ------------------------------

//? HomePage
app.get("/", (req, res) => {
    res.render("homepage");
});

//? Import des router
import indexRouter from "./app/routers/index.js";
app.use(indexRouter);

//* Start de l'api
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    debugServer(`Server start on http://localhost:${PORT}`);
});
