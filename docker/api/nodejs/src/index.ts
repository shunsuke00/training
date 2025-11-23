import express from "express";
import mysql from "mysql2/promise";

const app = express();
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

// /users → DB のデータを返す
app.get("/users", async (_req, res) => {
  const conn = await getConnection();
  const [rows] = await conn.execute("SELECT * FROM users");
  res.json(rows);
});

// サーバー起動
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
