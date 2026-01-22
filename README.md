# note Fixed ToC

note記事の目次を画面右下に固定表示するChrome拡張機能です。

## 機能

- noteの記事画面で目次を右下に固定表示
- 見出し（h2, h3）から目次を自動生成
- 最小化/展開の切り替えが可能
- 見出しへのスムーズスクロール
- 現在読んでいるセクションをハイライト表示

## インストール方法

### 1. デベロッパーモードの有効化

1. Chrome ブラウザを開く
2. アドレスバーに `chrome://extensions/` と入力してアクセス
3. 画面右上にある **「デベロッパーモード」** のトグルスイッチをクリックして **ON** にする

### 2. 拡張機能の読み込み

1. このリポジトリをクローン

   ```bash
   git clone https://github.com/yuki-dev26/note-fixed-toc.git
   ```

2. Chrome の拡張機能ページ（`chrome://extensions/`）で「**パッケージ化されていない拡張機能を読み込む**」をクリック

3. ダウンロードしたフォルダ（`note-fixed-toc`）を選択

4. 拡張機能が有効化されます

## 使い方

1. noteの記事ページを開くと、画面右下に目次が表示されます
2. 目次の項目をクリックで該当の見出しへジャンプ
3. ヘッダー部分をクリックで最小化/展開を切り替え

## ファイル構成

```text
note-fixed-toc/
├── manifest.json       # 拡張機能の設定ファイル
├── icon.png            # 拡張機能のアイコン
├── LICENSE
├── README.md
└── src/
    ├── main.js         # エントリポイント
    ├── style.css       # スタイル
    └── modules/        # 各モジュール
```

## 注意事項

- **note記事ページでのみ動作**: noteの記事ページ（`/*/n/*`）で自動的に動作します
- **動作環境**: PCのChromeブラウザでのみ挙動確認済み
- **見出しが必要**: 見出し（h2, h3）が1つ以上ある記事で機能します
- **非公式**: 非公式の拡張機能です。自己責任でお使いください

## Supporters

[![note メンバーシップ](https://img.shields.io/badge/note-Membership-41C9B4?style=for-the-badge&logo=note&logoColor=white)](https://note.com/yuki_tech/membership/members)

## License

Copyright (c) 2026 [yuki-P](https://x.com/yuki_p02)
Licensed under the [MIT License](LICENSE).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
