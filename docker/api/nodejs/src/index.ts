import express from "express";
import mysql from "mysql2/promise";

// Express.js: 使用するための魔法
const app = express();

// API側のポート番号を書いておく
const port = 3000;

// DB 接続関数
async function getConnection() {
  return await mysql.createConnection({
    host: "db-mysql",
    user: "root",
    password: "mysql",
    database: "sampledb",
  });
}

// Express.js: GETリクエストで /users → DB のデータを返す
app.get("/users", async (_req, res) => {
  const conn = await getConnection();
  const [rows] = await conn.execute("SELECT * FROM users");
  res.json(rows);
});

// Express.js: 3000番ポートでサーバー起動
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
