/* eslint-disable camelcase */
import cloudinary from "cloudinary";
const cloud = cloudinary.v2;

cloud.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
    secure: true
});

export default cloud;
