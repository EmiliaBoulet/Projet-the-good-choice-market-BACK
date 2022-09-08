/* eslint-disable camelcase */
import Joi from "joi";

export const userSchema = Joi.object({
    // On decrit chaque champs du formulaire et on applique Joi
    firstname: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- éàè]{1,20}$"))
        .min(1)
        .max(15)
        .required(),

    lastname: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- éàè]{1,20}$"))
        .min(1)
        .max(15)
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp("^(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$"))
        .min(8)
        .max(15)
        .required(),

    phone_number: Joi
        .string()
        .pattern(new RegExp("^[\\+][33]{2}[\\d]{9}$"))
        .min(10)
        .max(15),

    email: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-.]+@[\\w]+.[a-z]{2,3}$"))
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr", "be", "it", "io", "biz", "es", "bzh", "coop", "info", "org", "pro" ] } })
        .required(),

    postal_code: Joi
        .string()
        .pattern(new RegExp("^(([1-2]B)|([1-2]A)|(\\d){2})(\\d{3})$"))
        .min(5)
        .max(10),

    city: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- 'éàè]{1,20}$"))
        .min(3)
        .max(30),

    country: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- 'éàè]{1,20}$"))
        .min(2)
        .max(30),
}).required(); // On indique que le formulaire est obligatoire

export const productSchema = Joi.object({
    // On decrit chaque champs du formulaire et on applique Joi
    name: Joi
        .string()
        .min(2)
        .max(15)
        .required(),

    description: Joi
        .string()
        .min(3)
        .max(600)
        .required(),

    image: Joi
        .string()
        .pattern(new RegExp("^(https:\\/\\/|http:\\/\\/)[\\w\\.\\/%:?#\\[\\]@!$&''(\\)*+\\-\\^\\{\\}§ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ,;=]+$"))
        .min(2)
        .max(100)
        .required(),

    barcode: Joi
        .string()
        .pattern(new RegExp("^[\\d+]{8,13}$"))
        .min(8)
        .max(13),

    expiration_date: Joi
        .string()
        .pattern(new RegExp("^([0][1-9]|[1-2][0-9]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/[2][0][2][2-9]$"))
        .min(10)
        .max(15),

    height: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-\\,&èàé°% ]{0,15}$"))
        .min(1)
        .max(4),
    width: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-\\,&èàé°% ]{0,15}$"))
        .min(1)
        .max(4),
    depth: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-\\,&èàé°% ]{0,15}$"))
        .min(1)
        .max(4),
    weight: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-\\,&èàé°% ]{0,15}$"))
        .min(1)
        .max(4),
    size: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-\\,&èàé°% ]{0,15}$"))
        .min(1)
        .max(7),

    price_ht: Joi
        .number()
        .positive()
        .min(0)
        .max(9999)
        .required(),

    price_promo: Joi
        .number()
        .positive()
        .min(0)
        .max(9999),

    price_kg: Joi
        .number()
        .positive()
        .min(0)
        .max(9999),

    tva_id: Joi
        .number()
        .positive()
        .required(),

    brand_id: Joi
        .number()
        .positive()
        .required(),

    sub_category_id: Joi
        .number()
        .positive()
        .required(),
}).required();

export const loginSchema = Joi.object({
    email: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-.]+@[\\w]+.[a-z]{2,3}$"))
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr", "be", "it", "io", "biz", "es", "bzh", "coop", "info", "org", "pro" ] } })
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp("^(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$"))
        .min(8)
        .max(15)
        .required(),
}).required();

export const patchUserSchema = Joi.object({
    // On decrit chaque champs du formulaire et on applique Joi
    firstname: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- éàè]{1,20}$"))
        .min(1)
        .max(15)
        .allow(null, ""),

    lastname: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- éàè]{1,20}$"))
        .min(1)
        .max(15)
        .allow(null, ""),

    email: Joi
        .string()
        .pattern(new RegExp("^[\\w\\-.]+@[\\w]+.[a-z]{2,3}$"))
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr", "be", "it", "io", "biz", "es", "bzh", "coop", "info", "org", "pro" ] } })
        .allow(null, ""),

    password: Joi
        .string()
        .pattern(new RegExp("^(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$"))
        .min(8)
        .max(15)
        .allow(null, ""),

    phone_number: Joi
        .string()
        .pattern(new RegExp("^[\\+][33]{2}[\\d]{9}$"))
        .min(10)
        .max(15)
        .allow(null, ""),

    address: Joi
        .string()
        .allow(null, ""),

    birthday: Joi
        .string()
        .allow(null, ""),

    postal_code: Joi
        .string()
        .pattern(new RegExp("^(([1-2]B)|([1-2]A)|(\\d){2})(\\d{3})$"))
        .min(5)
        .max(10)
        .allow(null, ""),

    city: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- 'éàè]{1,20}$"))
        .min(3)
        .max(30)
        .allow(null, ""),

    country: Joi
        .string()
        .pattern(new RegExp("^[a-zA-z- 'éàè]{1,20}$"))
        .min(2)
        .max(30)
        .allow(null, ""),
}).required(); // On indique que le formulaire est obligatoire
