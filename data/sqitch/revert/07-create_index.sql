-- Revert the-good-choice-market:07-create_index from pg

BEGIN;

DROP INDEX "idx_product_name";

COMMIT;
