# IM3007-System Analysis and Design
# Worm-Gym 健身記錄系統

## Database
1. 打開 pgAdmin 並以使用者 `postgres` 身分登入。
2. 建一個資料庫叫做 `wormGym` 。
3. 右鍵點選建立的資料庫，並且選擇 `Restore` 。
4. 選擇 `wormGym_custom.sql` 作為 `Restore` 的檔案。
5. 建立另一個資料庫叫做 `wormGym_test` ，並且同  `wormGym` 資料庫 restore `wormGym_custom.sql` 檔案。

## Backend
### 下載所需套件
先確認電腦已安裝 `Node.js` 並且將上述資料匯入資料庫，打開終端機移動到本專案資料夾位置。
所需套件與版本已定義在 `package.json` 裡，執行下列指令以完成下載。
```shell=
npm install
cd backend
npm install
```
### 設定資料庫密碼
打開 `db.js` 並將 `password` 改成 `postgres` 對應的密碼。
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