-- Revert the-good-choice-market:04-domain from pg

BEGIN;

--------------------------------------------------------------------------
----------------------------USER------------------------------------------
--------------------------------------------------------------------------

ALTER TABLE "user"
    ALTER COLUMN "firstname" TYPE TEXT,
    ALTER COLUMN "lastname" TYPE TEXT,
    ALTER COLUMN "email" TYPE TEXT,
    ALTER COLUMN "phone_number" TYPE TEXT,
    ALTER COLUMN "postal_code" TYPE TEXT,
    ALTER COLUMN "city" TYPE TEXT,
    ALTER COLUMN "country" TYPE TEXT;

DROP DOMAIN "dom_first_last_name";
DROP DOMAIN "dom_email";
DROP DOMAIN "dom_phone_number";
DROP DOMAIN "dom_postal_code";
DROP DOMAIN "dom_city_country";

--------------------------------------------------------------------------
-------------------------PRODUIT------------------------------------------
--------------------------------------------------------------------------

ALTER TABLE "product" 
    ALTER COLUMN "description" TYPE TEXT,
    ALTER COLUMN "image" TYPE TEXT,
    ALTER COLUMN "barcode" TYPE TEXT,
    ALTER COLUMN "expiration_date" TYPE TEXT,
    ALTER COLUMN "height" TYPE TEXT,
    ALTER COLUMN "width" TYPE TEXT,
    ALTER COLUMN "depth" TYPE TEXT,
    ALTER COLUMN "weight" TYPE TEXT,
    ALTER COLUMN "size" TYPE TEXT,
    ALTER COLUMN "price_ht" TYPE NUMERIC,
    ALTER COLUMN "price_promo" TYPE NUMERIC,
    ALTER COLUMN "price_kg" TYPE NUMERIC,
    ALTER COLUMN "name" TYPE TEXT;

DROP DOMAIN "dom_description";
DROP DOMAIN "dom_image";
DROP DOMAIN "dom_barcode";
DROP DOMAIN "dom_expiration_date";
DROP DOMAIN "dom_volume";
DROP DOMAIN "dom_name";
DROP DOMAIN "dom_price";

COMMIT;
