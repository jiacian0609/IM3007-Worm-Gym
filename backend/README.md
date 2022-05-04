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
#### Response Data: JSON
```
Case 1: Username does not exist.
{
    "message": "Username does not exist.",
    "username": "username"
}

Case 2: Wrong password.
{
    "message": "Wrong password.",
    "username": "userONE"
}

Case 3: Login successfully.
{
    "message": "Login successfully.",
    "username": "userONE",
    "login_id": "03c940bc-83b8-4142-88a8-da555661c346"
}
```
Note: `login_id` needs to be recorded at client side.

### 2. /logout
#### Method: POST
#### Request Data: JSON
```
{
    "login_id": "03c940bc-83b8-4142-88a8-da555661c346"
}
```
#### Request Data: JSON
```
Case 1: login_id is not in the online list.
{
    "message": "login_id error"
}

Case 2: Logout successfully.
{
    "message": "Logout successfully."
}
```
# Activate Server
Step 1: Run `npm install` if it's the first time to activate the server.  
Step 2: Run `npm start`.  
The server is currently built on `localhost:8000`.
