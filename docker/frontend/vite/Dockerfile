# 1. Nginx の公式イメージをベースにする
FROM nginx:alpine

# 2. ビルド済みファイルを Nginx の標準配信ディレクトリにコピー
COPY dist/ /usr/share/nginx/html

# 3. 80番ポートを公開
EXPOSE 80

# 4. Nginx をフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
