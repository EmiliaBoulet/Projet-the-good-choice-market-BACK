-- Revert the-good-choice-market:03-functions from pg

BEGIN;

DROP FUNCTION 
    "func_basket_final_price"("user_email" text),
    "func_product_price_ttc"(INT),
    "func_price_ttc_for_one"(INT),
    "func_favorites_random"()
;

COMMIT;
