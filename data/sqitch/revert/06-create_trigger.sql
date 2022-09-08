-- Revert the-good-choice-market:06-create_trigger from pg

BEGIN;

DROP TRIGGER "trig_update_user" ON "user";
DROP FUNCTION "func_update_user"();

DROP TRIGGER "trigger_delete_user" ON "user";
DROP FUNCTION "func_delete_user"();

COMMIT;
