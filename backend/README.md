# Database Setting
Step 1: Open pgAdmin app & login as user `postgres`.  
Step 2: Create a database named `wormGym`.
Step 3: Right click on the database, select `Restore...`.  
Step 4: Select `wormGym_custom.sql` as the restoring file.  
Step 5: Create another database named `wormGym_test` and restore with the same file.  
Step 6: Go to `/backend/db.js` & change the password into your Postgres password.

# Activate Server
Step 1: Run `npm install` if it's the first time to activate the server.  
Step 2: Run `npm start`.  
The server is currently built on `localhost:8000`.
