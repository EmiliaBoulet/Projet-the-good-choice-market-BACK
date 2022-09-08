-- Verify the-good-choice-market:03-functions on pg

BEGIN;

SELECT * FROM "func_basket_final_price"('pasparla@wanadoo.fr');

SELECT * FROM "func_product_price_ttc"(1);

SELECT * FROM "func_price_ttc_for_one"(1);

ROLLBACK;
