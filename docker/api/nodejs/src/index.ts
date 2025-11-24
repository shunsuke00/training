import express from "express";
import mysql from "mysql2/promise";

// Express.js: 使用するための魔法
const app = express();

// application/json で送られた JSON を req.body に入れる魔法
app.use(express.json());

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

// nameからemailを生成する関数
function generateEmail(fullName: string): string | null {
  // 正規表現で先頭から最初のスペースまでを取得（= ファーストネーム）
  const match = fullName.match(/^[^\s]+/);
  
  if (!match) return null;
  
  const firstName = match[0].toLowerCase();
  return `${firstName}@example.com`;
}

// Express.js: POSTリクエストで /users → DB にデータを追加
app.post("/users", async (req, res) => {
  // リクエストからnameとemailを取り出す
  const { name } = req.body;
  const email = generateEmail(name);

  // バリデーションチェック
  if (!name || !email) {
    return res.status(400).json({ message: "不正なnameです。" });
  }

  try {
    // クエリ
    const conn = await getConnection();
    const [result] = await conn.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({
      message: "ユーザーを作成しました",
      id: (result as any).insertId
    });
  } catch (err) {
    // エラー処理
    res.status(500).json({ error: "サーバーエラー", detail: err });
  }
});


// Express.js: PUTリクエストで /users → DB にデータを更新
app.put("/users/:id", async (req, res) => {
  // リクエストからidとnameとemailを取り出す
  const { id } = req.params;
  const { name } = req.body;
  const email = generateEmail(name);

  // バリデーションチェック
  if (!name || !email) {
    return res.status(400).json({ message: "不正なnameです" });
  }

  try {
    // クエリ
    const conn = await getConnection();
    const [result] = await conn.execute(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    // エラー処理
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "指定されたユーザーは存在しません" });
    }

    res.status(200).json({ message: "ユーザー情報を更新しました" });
  } catch (err) {
    // エラー処理
    res.status(500).json({ error: "サーバーエラー", detail: err });
  }
});

// Express.js: DELETEリクエストで /users → DB にデータを削除
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const [result] = await conn.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "指定されたユーザーは存在しません" });
    }

    res.status(200).json({ message: "ユーザーを削除しました" });
  } catch (err) {
    res.status(500).json({ error: "サーバーエラー", detail: err });
  }
});

// Express.js: 3000番ポートでサーバー起動
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
