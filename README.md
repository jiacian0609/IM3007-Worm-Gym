# IM3007-System Analysis and Design
# Worm-Gym 健身記錄系統

## Database
1. Open pgAdmin and login as user `postgres`.  
2. Create a database named `wormGym`.  
3. Right click on the database, select `Restore`.  
4. Select `wormGym_custom.sql` as the restoring file.  
5. Create another database named `wormGym_test` and restore with the same file.  

## Backend
### 下載所需套件
先確認電腦已安裝 `Node.js` 並且將上述資料匯入資料庫，打開終端機移動到本專案資料夾位置。
所需套件與版本已定義在 `package.json` 裡，執行下列指令以完成下載。
```shell=
npm install
cd backend
npm install
```

### 設定環境變數
Go to `/backend/db.js` & change the password into your Postgres password.
### 啟動後端伺服器
```shell=
npm start
```
或是
```shell=
node ./bin/www
```

## Frontend
### 下載所需套件
所需套件與版本已定義在 `package.json` 裡，執行下列指令已完成下載。
```shell=
cd frontend
npm install
```
### 開啟瀏覽器
執行下列指令
`npm start`
若無自動開啟瀏覽器，請手動開啟 http://localhost:3000/ ，看到登入畫面即代表成功開啟前端且前後端連接成功。