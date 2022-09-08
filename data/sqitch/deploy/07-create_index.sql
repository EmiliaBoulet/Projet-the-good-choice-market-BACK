-- Deploy the-good-choice-market:07-create_index to pg

BEGIN;

CREATE INDEX "idx_product_name" ON "product" USING brin ("name");

COMMIT;
