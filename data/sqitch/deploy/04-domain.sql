-- Deploy the-good-choice-market:04-domain to pg

BEGIN;

SET "client_encoding" TO "UTF8"; -- Fix les accent et les caractères speciaux

--------------------------------------------------------------------------
----------------------------USER------------------------------------------
--------------------------------------------------------------------------

CREATE DOMAIN "dom_first_last_name" AS TEXT
    CHECK(
        VALUE ~ '^[a-zA-Z\-ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿé\D]+$'
);

CREATE DOMAIN "dom_email" AS TEXT
    CHECK(
        VALUE ~ '^[\w\-.]+@[\w]+.[a-z]{2,3}$'
);

CREATE DOMAIN "dom_phone_number" AS TEXT
    CHECK(
        VALUE ~ '^[\+][33]{2}[\d]{9}$'
        OR VALUE ~ '^[0][\d]{9}$'
);

CREATE DOMAIN "dom_postal_code" AS TEXT
    CHECK(
        VALUE ~ '^(([1-2]B)|([1-2]A)|(\d){2})(\d{3})$'
);

CREATE DOMAIN "dom_city_country" AS TEXT
    CHECK(
        VALUE ~ '^[a-zA-Z\-''ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿé\D]+$'
);

ALTER TABLE "user"
    ALTER COLUMN "firstname" TYPE "dom_first_last_name",
    ALTER COLUMN "lastname" TYPE "dom_first_last_name",
    ALTER COLUMN "email" TYPE "dom_email",
    ALTER COLUMN "phone_number" TYPE "dom_phone_number",
    ALTER COLUMN "city" TYPE "dom_city_country",
    ALTER COLUMN "country" TYPE "dom_city_country",
    ALTER COLUMN "postal_code" TYPE "dom_postal_code";

--------------------------------------------------------------------------
-------------------------PRODUIT------------------------------------------
--------------------------------------------------------------------------

CREATE DOMAIN "dom_description" AS TEXT
    CHECK(
        VALUE ~ '^([\w ._\-+*\/!''’,%:ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿé]+)$'
);

CREATE DOMAIN "dom_image" AS TEXT
    CHECK(
        VALUE ~ '^(https:\/\/|http:\/\/)[\w\\.\/%:?#\[\]@!$&''"\(\)*+\-\^\{\}§ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ,;=]+$'
);

CREATE DOMAIN "dom_barcode" AS TEXT
    CHECK(
        VALUE ~ '^[\d+]{8,13}$'
);

CREATE DOMAIN "dom_expiration_date" AS TEXT
    CHECK(
        VALUE ~ '^[0-3][0-9]\/[0-1][0-9]\/[2][0][2][2-9]$'
);

CREATE DOMAIN "dom_volume" AS TEXT
    CHECK(
        VALUE ~ '^[a-zA-Z\-\,&ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿé\d ]{0,10}$'
);

CREATE DOMAIN "dom_name" AS TEXT
    CHECK(
        VALUE ~ '^[a-zA-Z\-''\@!$\&ÀÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓ ÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿé\d]{0,50}$'
);

CREATE DOMAIN "dom_price" AS NUMERIC 
CHECK(
    VALUE <= 9999
    OR VALUE > 0
);

ALTER TABLE "product"
    ALTER COLUMN "description" TYPE "dom_description",
    ALTER COLUMN "image" TYPE "dom_image",
    ALTER COLUMN "barcode" TYPE "dom_barcode",
    ALTER COLUMN "expiration_date" TYPE "dom_expiration_date",
    ALTER COLUMN "height" TYPE "dom_volume",
    ALTER COLUMN "width" TYPE "dom_volume",
    ALTER COLUMN "depth" TYPE "dom_volume",
    ALTER COLUMN "weight" TYPE "dom_volume",
    ALTER COLUMN "size" TYPE "dom_volume",
    ALTER COLUMN "name" TYPE "dom_name",
    ALTER COLUMN "price_ht" TYPE "dom_price",
    ALTER COLUMN "price_promo" TYPE "dom_price",
    ALTER COLUMN "price_kg" TYPE "dom_price";

COMMIT;
