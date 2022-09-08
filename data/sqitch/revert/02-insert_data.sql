-- Revert the-good-choice-market:02-insert_data from pg

BEGIN;

TRUNCATE 
    "user",
    "tva",
    "buy",
    "product",
    "company",
    "category",
    "brand",
    "sub_category"
CASCADE;

COMMIT;
