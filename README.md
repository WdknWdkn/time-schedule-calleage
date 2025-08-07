# TimeTable AI Lite - 大学時間割自動生成システム

AIを使用して最適な大学の時間割を自動生成するWebアプリケーションです。

## 機能

- 🤖 制約条件に基づく自動時間割生成
- 📊 複数パターンの生成（最大3パターン）
- 🎯 4つの生成モード（バランス重視、空きコマ最小、午前集中、午後集中）
- 🚫 NG時間帯の設定
- 💾 時間割の保存・読み込み（LocalStorage）
- 📤 JSON/CSV形式でのエクスポート
- 🎨 ドラッグ&ドロップによる手動調整

## 技術スタック

- **Framework**: Next.js 14 (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Storage**: LocalStorage

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 静的サイトのエクスポート
npm run build
```

## 使い方

1. **制約条件の設定**
   - 必要単位数を設定
   - 1日の最大コマ数を設定
   - NG時間帯を選択
   - 生成モードを選択

2. **時間割の生成**
   - 「時間割を生成」ボタンをクリック
   - 3つのパターンから選択

3. **手動調整**
   - 右側の授業リストから授業をドラッグ
   - 時間割グリッドにドロップ

4. **保存・エクスポート**
   - 時間割を保存（LocalStorage）
   - JSON/CSV形式でエクスポート

## デプロイ

### Vercel
```bash
vercel --prod
```

### GitHub Pages
GitHubのActionsで自動デプロイが設定されています。

## ライセンス

MIT