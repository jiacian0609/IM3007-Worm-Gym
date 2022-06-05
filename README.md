# IM3007-System Analysis and Design
# Worm-Gym 健身記錄系統

## Database
1. Open pgAdmin and login as user `postgres`.  
2. Create a database named `wormGym`.  
3. Right click on the database, select `Restore...`.  
4. Select `wormGym_custom.sql` as the restoring file.  
5. Create another database named `wormGym_test` and restore with the same file.  

## Backend

### 設定環境變數
Go to `/backend/db.js` & change the password into your Postgres password.

## Frontend