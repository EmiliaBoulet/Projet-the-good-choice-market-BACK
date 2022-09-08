-- Deploy the-good-choice-market:05-create-views to pg

BEGIN;

CREATE VIEW "view_category_sub_category" AS
SELECT
    "category"."name" AS "category",
    ARRAY_AGG("sub_category"."name") AS "sub_category"
FROM "category"
INNER JOIN "sub_category" ON "category"."id" = "sub_category"."category_id"
GROUP BY "category"."name";

COMMIT;
