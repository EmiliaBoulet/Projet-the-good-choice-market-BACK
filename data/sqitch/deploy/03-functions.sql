-- Deploy the-good-choice-market:03-functions to pg

BEGIN;

CREATE FUNCTION "func_basket_final_price"("user_email" text) RETURNS TABLE(
	"firstname" "dom_first_last_name",
	"lastname" "dom_first_last_name",
	"email" "dom_email",
	"total_delivery" NUMERIC,
	"total_ttc" NUMERIC,
	"final_price" NUMERIC,
	"product" json
) AS $$
DECLARE
    "total_ttc" NUMERIC;
    "total_delivery" NUMERIC;
BEGIN
    SELECT
            SUM((("product"."price_ht" / 100 * "tva"."rate") + "product"."price_ht"))
        INTO "total_ttc"
        FROM "user"
        INNER JOIN "buy" ON "user"."id" = "buy"."user_id"
        INNER JOIN "product" ON "buy"."product_id" = "product"."id"
        INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
        WHERE "user"."email" = $1;
    SELECT
            SUM("brand"."delivery_cost")
        INTO "total_delivery"
        FROM "user"
        INNER JOIN "buy" ON "user"."id" = "buy"."user_id"
        INNER JOIN "product" ON "buy"."product_id" = "product"."id"
        INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
        WHERE "user"."email" = $1;
    RETURN QUERY SELECT
            "user"."firstname",
            "user"."lastname",
            "user"."email",
            ROUND("total_delivery", 2),
            ROUND("total_ttc", 2),
            ROUND(("total_ttc" + "total_delivery"), 2) AS "final_price",
            json_agg(to_jsonb("product".*) - 'id') AS "product"
        FROM "user"
        INNER JOIN "buy" ON "user"."id" = "buy"."user_id"
        INNER JOIN "product" ON "buy"."product_id" = "product"."id"
        INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
        INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
        WHERE "user"."email" = $1
        GROUP BY "user"."firstname", "user"."lastname", "user"."email";
END;
$$ LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------------


CREATE FUNCTION "func_product_price_ttc"("productId" INT)
RETURNS TABLE(
    "product_id" INT,
    "product_name" "dom_name",
    "brand_name" TEXT,
    "sub_category_name" TEXT,
    "category_name" TEXT,
    "description" "dom_description",
    "image" "dom_image",
    "location" TEXT,
    "barcode" "dom_barcode",
    "expiration_date" "dom_expiration_date",
    "height" "dom_volume",
    "width" "dom_volume",
    "depth" "dom_volume",
    "weight" "dom_volume",
    "size" "dom_volume",
    "price_ttc" NUMERIC,
    "price_promo" "dom_price",
    "price_kg" "dom_price"
) AS $$
DECLARE
    "test" NUMERIC;
BEGIN
    SELECT
        (("product"."price_ht" / 100 * "tva"."rate") + "product"."price_ht") AS "price_ttc"
    INTO "test"
    FROM "product"
    INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
    WHERE "product"."id" = $1;

    RETURN QUERY SELECT
            "product"."id" AS "product_id",
            "product"."name" AS "product_name",
            "brand"."brand_name",
            "sub_category"."name" AS "sub_category_name",
            "category"."name" AS "category_name",
            "product"."description",
            "product"."image",
            "product"."location",
            "product"."barcode",
            "product"."expiration_date",
            "product"."height",
            "product"."width",
            "product"."depth",
            "product"."weight",
            "product"."size",
            ROUND("test", 2) AS "price_ttc",
            "product"."price_promo",
            "product"."price_kg"
        FROM "product"
        INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
        INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
        INNER JOIN "sub_category" ON "sub_category"."id" = "product"."sub_category_id"
        INNER JOIN "category" ON "sub_category"."category_id" = "category"."id"
        WHERE "product"."id" = $1;
END;
$$  LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------------

CREATE FUNCTION "func_price_ttc_for_one"("productId" INT)
RETURNS NUMERIC AS $$
DECLARE
    "test" NUMERIC;
BEGIN
    SELECT
            (("product"."price_ht" / 100 * "tva"."rate") + "product"."price_ht") AS "price_ttc"
        INTO "test"
        FROM "product"
        INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
        WHERE "product"."id" = $1;

    RETURN ROUND("test", 2);
END;
$$  LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------------

CREATE FUNCTION "func_favorites_random"()
RETURNS TABLE(
    "product_id" INT,
    "product_name" "dom_name",
    "brand_name" TEXT,
    "sub_category_name" TEXT,
    "category_name" TEXT,
    "description" "dom_description",
    "image" "dom_image",
    "location" TEXT,
    "barcode" "dom_barcode",
    "expiration_date" "dom_expiration_date",
    "height" "dom_volume",
    "width" "dom_volume",
    "depth" "dom_volume",
    "weight" "dom_volume",
    "size" "dom_volume",
    "price_ttc" NUMERIC,
    "price_promo" "dom_price",
    "price_kg" "dom_price"
) AS $$
DECLARE
    "test" NUMERIC;
BEGIN
    SELECT
        (("product"."price_ht" / 100 * "tva"."rate") + "product"."price_ht") AS "price_ttc"
    INTO "test"
    FROM "product"
    INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
    WHERE "product"."id" = 9 OR "product"."id" = 11 OR "product"."id" = 1 OR "product"."id" = 8 OR "product"."id" = 6;

    RETURN QUERY SELECT
            "product"."id" AS "product_id",
            "product"."name" AS "product_name",
            "brand"."brand_name",
            "sub_category"."name" AS "sub_category_name",
            "category"."name" AS "category_name",
            "product"."description",
            "product"."image",
            "product"."location",
            "product"."barcode",
            "product"."expiration_date",
            "product"."height",
            "product"."width",
            "product"."depth",
            "product"."weight",
            "product"."size",
            ROUND("test", 2) AS "price_ttc",
            "product"."price_promo",
            "product"."price_kg"
        FROM "product"
        INNER JOIN "tva" ON "tva"."id" = "product"."tva_id"
        INNER JOIN "brand" ON "brand"."id" = "product"."brand_id"
        INNER JOIN "sub_category" ON "sub_category"."id" = "product"."sub_category_id"
        INNER JOIN "category" ON "sub_category"."category_id" = "category"."id"
        WHERE "product"."id" = 9 OR "product"."id" = 11 OR "product"."id" = 1 OR "product"."id" = 8 OR "product"."id" = 6;
END;
$$  LANGUAGE plpgsql;

COMMIT;
