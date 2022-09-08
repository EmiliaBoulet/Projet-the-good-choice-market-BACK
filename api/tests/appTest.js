import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import indexRouter from "../app/routers/index.js";

const app = express();
const upload = multer();
const allowlist = [ "http://localhost:8080" ];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.none());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(cors({
    origin: allowlist,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
}));
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
app.get("/", (req, res) => {
    res.render("homepage");
});
app.use(indexRouter);

export default app;
