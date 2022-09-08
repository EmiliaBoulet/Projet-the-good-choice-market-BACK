-- Revert the-good-choice-market:01-create_tables from pg

BEGIN;

DROP TABLE
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
