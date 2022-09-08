-- Deploy the-good-choice-market:06-create_trigger to pg

BEGIN;

-----------------------------------------------------------------------------------

CREATE FUNCTION "func_update_user"()
RETURNS TRIGGER AS $$
BEGIN
    --? NEW : On prend la ROW qui vient d'etre mis a jour
    NEW."updated_at" = NOW();
    RETURN NEW; --? Retourne la nouvelle ROW avec les modification
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trig_update_user"
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE "func_update_user"();

-----------------------------------------------------------------------------------

CREATE FUNCTION "func_delete_user"()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "buy"
    WHERE "buy"."user_id" = OLD."id";
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- trigger logic
CREATE TRIGGER "trigger_delete_user"
BEFORE DELETE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE "func_delete_user"();

-----------------------------------------------------------------------------------

COMMIT;
