# Database & APIs Usage
## Database Setting
Step 1: Open pgAdmin app & login as user `postgres`.  
Step 2: Create a database named `wormGym`.  
Step 3: Right click on the database, select `Restore...`.  
Step 4: Select `wormGym_custom.sql` as the restoring file.  
Step 5: Go to `/backend/db.js` & change the password into your Postgres password.
## APIs
### 1. /login
#### Method: POST
#### Request Data: JSON
```
{
    "username": "userONE",
    "password": "11111111"
}
```
#### Response Data: Text
```
Case 1: Username does not exist.
Case 2: Wrong password.
Case 3: Login successfully.
```

# Activate Server
Step 1: Run `npm install` if it's the first time to activate the server.  
Step 2: Run `npm start`.  
The server is currently built on `localhost:8000`.
