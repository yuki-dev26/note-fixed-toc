# note Fixed ToC

note記事の目次を画面右下に固定表示するChrome拡張機能です。

<img width="1280" height="670" alt="image" src="https://github.com/user-attachments/assets/9530ae5b-2fec-4248-8554-8ea503bab45c" />

## 機能

- noteの記事画面で目次を右下に固定表示
- 記事の見出しから目次を自動生成
- 最小化/展開の切り替えが可能
- ライト/ダークモードの切り替え（設定は端末内に保存）
- 見出しへのジャンプ
- 現在読んでいるセクションをハイライト表示

## インストール

Chrome ウェブストアからインストールできます。公開後、ここにストアページのリンクを掲載します。

## 使い方

1. noteの記事ページを開くと、画面右下に目次が表示されます
2. 目次の項目をクリックで該当の見出しへジャンプ
3. 「目次」横のアイコンでライト/ダークモードを切り替え
4. ヘッダー部分をクリックで最小化/展開を切り替え

## ファイル構成

```text
note-fixed-toc/
├── manifest.json       # 拡張機能の設定ファイル
├── icons/              # 拡張機能アイコン
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── LICENSE
├── README.md
└── src/
    ├── main.js         # エントリポイント
    ├── style.css       # スタイル
    └── modules/        # 各モジュール
```

## プライバシー

本拡張機能はユーザーデータを外部へ送信しません。詳細は [プライバシーポリシー](https://note.com/yuki_tech/n/ncf5c9d131418) を参照してください。

## 注意事項

- **note記事ページでのみ動作**: noteの記事ページ（`/*/n/*`）で自動的に動作します
- **動作環境**: PCのChromeブラウザにて挙動確認済み
- **見出しが必要**: 見出しが1つ以上ある記事で機能します
- **非公式**: 非公式の拡張機能です。note株式会社とは関係ありません。自己責任でお使いください

## License

Copyright (c) 2026 [yuki-P](https://x.com/yuki_p02)
Licensed under the [MIT License](LICENSE).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
