export PGUSER=postgres
export PGPASSWORD=js4life

createuser tgcm_admin

createdb tgcm

psql -U postgres -c "ALTER USER \"tgcm_admin\" WITH PASSWORD 'tgcm';"

psql -U postgres -c "ALTER DATABASE \"tgcm\" OWNER TO \"tgcm_admin\";"

##############################################

# VERSION COMMANDE DANS POSTGRESQL

# psql -U postgres

# CREATE USER "tgcm_admin" WITH PASSWORD 'tgcm';

# CREATE DATABASE "tgcm" OWNER "tgcm_admin";

##############################################

# VERSION COMMAND LINE


# psql -U postgres -d tgcm

# sudo -i -u  postgres psql
