# Requirements

1. Need to have a PostgreSQL database:

   1. Needs a table: "Users"
   2. Columns: "Id" - autoincrement, primary key, "Username" - unique, "GoogleId" - unique, "Thumbnail"

2. .env file in the main directory with these environmental variables set:

   - GOOGLE_API_CLIENT_ID - google API client ID
   - GOOGLE_API_SECRET - google API secret key
   - PGDATABASE - database name
   - PGHOST - host address
   - PGPORT - database port
   - PGUSER - database user
   - PGPASSWORD - database user password
   - KEYS - key for encrypting cookies

3. Tech stack
   1. Node JS
   2. EJS
   3. Passport
