FROM node:20

# コンテナ内作業ディレクトリ
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係インストール
RUN npm install

# ソースコードをコピー
# 上でコピーしているjsonファイルは上書きされるだけ
COPY . .

# コンテナ起動時に実行するコマンド
CMD ["npx", "ts-node-dev", "src/index.ts"]
