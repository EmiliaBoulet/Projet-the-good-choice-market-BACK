-- Verify the-good-choice-market:02-insert_data on pg

BEGIN;

SELECT "id" FROM "company" LIMIT 1;
SELECT "id" FROM "brand" LIMIT 1;
SELECT "id" FROM "tva" LIMIT 1;
SELECT "id" FROM "product" LIMIT 1;
SELECT "id" FROM "category" LIMIT 1;
SELECT "id" FROM "buy" LIMIT 1;
SELECT "id" FROM "sub_category" LIMIT 1;

ROLLBACK;
