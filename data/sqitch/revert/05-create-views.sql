-- Revert the-good-choice-market:05-create-views from pg

BEGIN;

DROP VIEW "view_category_sub_category";

COMMIT;
