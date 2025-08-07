#!/bin/bash

# 静的エクスポート設定を使用
cp next.config.static.js next.config.js

# ビルドとエクスポート
npm run build
npx next export

# Vercelにデプロイ
vercel --prod

# 設定を元に戻す
git checkout next.config.js