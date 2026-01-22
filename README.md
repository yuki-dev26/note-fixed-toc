# note Fixed ToC

note記事の目次を画面右下に固定表示するChrome拡張機能です。

## 機能

- noteの記事画面で目次を右下に固定表示
- 最小化/展開の切り替えが可能
- 見出しへのジャンプ移動
- 見出しレベル（h2, h3, h4）に応じたインデント表示
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

1. note の記事ページ（`https://note.com/*/n/*`）を開く

2. 目次がある記事の場合、画面右下に自動的に固定目次が表示されます

3. 目次の項目をクリックすると、該当の見出しまでジャンプします

4. ヘッダー部分をクリックすると、最小化/展開を切り替えられます

5. 最小化状態では小さなアイコンとして表示され、クリックで再度展開できます

## ファイル構成

```text
note-agenda/
├── manifest.json      # 拡張機能の設定ファイル
├── main.js            # 固定目次の生成と動作処理
├── style.css          # 固定目次のスタイル
├── icon.png           # 拡張機能のアイコン
└── README.md          # このファイル
```

## 注意事項

- **note記事ページでのみ動作**: noteの記事ページ（`/*/n/*`）で自動的に動作します
- **動作環境**: PCのChromeブラウザでのみ挙動確認済み
- **目次がある記事のみ**: noteの標準目次機能を使用している記事でのみ機能します
- **非公式**: 非公式の拡張機能です。自己責任でお使いください

## Supporters

[![note メンバーシップ](https://img.shields.io/badge/note-Membership-41C9B4?style=for-the-badge&logo=note&logoColor=white)](https://note.com/yuki_tech/membership/members)

## License

Copyright (c) 2025 [yuki-P](https://x.com/yuki_p02)
Licensed under the [MIT License](LICENSE).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
