# SIGLOC-online 運営支援システム

大阪公立大学 COIL事業部門が運営する国際オンライン教育プログラム「**SIGLOC-online**」の運営を支援するシステムです。

## システム概要

このリポジトリには、SIGLOC-online運営を効率化する2つのシステムのソースコードとドキュメントが含まれています。

### 1. SIGLOC-online 新期開始時サポートシステム

新しいSIGLOC-onlineを開催する準備作業を自動化します。

- 各種フォルダの自動作成
- システムファイルのコピー・更新
- Googleフォームの更新
- Student Work Templateの更新
- MyCheckListの更新
- 修了証テンプレートの作成
- 作成結果の自動テスト

### 2. 事後レポート作成システム

プログラム終了後のフィードバックアンケート結果を自動でレポート化します。

- アンケート回答の自動集計
- グラフの自動生成
- 日本語版・英語版レポートの自動作成
- 英語回答の日本語自動翻訳

## 技術スタック

| 項目 | 技術 |
|------|------|
| 開発言語 | Google Apps Script (JavaScript) |
| UI基盤 | Google Spreadsheet |
| ドキュメント操作 | Google Docs API |
| フォーム操作 | Google Forms API |
| ストレージ | Google Drive |

## ディレクトリ構成

```
SIGLOC_TechTime/
├── src/                              # ソースコード
│   ├── api/
│   │   ├── siglocOnlineSupportSystem/  # 新期開始時サポートシステム
│   │   │   ├── 01_VariousFolder.gs
│   │   │   ├── 02_SystemFile.gs
│   │   │   ├── 03_GoogleForm.gs
│   │   │   ├── 04_StudentWorkTemplateFile.gs
│   │   │   ├── 05_MyCheckList.gs
│   │   │   ├── 06_CompletionCertificate.gs
│   │   │   └── *Test.gs              # テストコード
│   │   └── reportCreateSystem/        # 事後レポート作成システム
│   │       └── 01_Report.gs
│   └── lib/                           # 共通ライブラリ
│       ├── util.gs
│       ├── check.gs
│       └── testUtil.gs
│
└── docs/                              # ドキュメント
    ├── 00_目次.md
    ├── 01_このシステムとは.md
    ├── 02_SIGLOC-onlineプログラムについて.md
    ├── 03_システムでできること.md
    ├── 04_操作の流れ.md
    ├── 05_よくある質問.md
    ├── 99_技術仕様.md
    ├── システム概要説明書.xlsx
    └── 仕様書/                        # 詳細仕様書
```

## セットアップ

### 前提条件

- Googleアカウント
- Node.js (claspを使用する場合)

### clasp を使用したデプロイ

```bash
# claspのインストール
npm install -g @google/clasp

# Googleアカウントでログイン
clasp login

# 新しいGASプロジェクトを作成
clasp create --type sheets --title "SIGLOC-online Support System"

# ソースコードをプッシュ
clasp push
```

### 手動セットアップ

1. Google Driveで新しいSpreadsheetを作成
2. 「拡張機能」→「Apps Script」を開く
3. `src/`フォルダ内の各.gsファイルの内容をコピー
4. ファイルを保存して実行

## ドキュメント

詳細なドキュメントは`docs/`フォルダを参照してください。

| ドキュメント | 説明 |
|-------------|------|
| [01_このシステムとは](docs/01_このシステムとは.md) | システムの目的と全体像 |
| [02_SIGLOCプログラムについて](docs/02_SIGLOC-onlineプログラムについて.md) | プログラムの説明 |
| [03_システムでできること](docs/03_システムでできること.md) | 機能一覧 |
| [04_操作の流れ](docs/04_操作の流れ.md) | 操作手順 |
| [05_よくある質問](docs/05_よくある質問.md) | FAQ |
| [99_技術仕様](docs/99_技術仕様.md) | 開発者向け技術情報 |

## SIGLOC-onlineについて

**SIGLOC** (Social Innovation for Global LOCal sustainability) は、大阪公立大学が実施するオンライン国際交流プログラムです。

- 世界各国・地域からの学生が参加
- SDGsをテーマにした約3週間のオンラインプログラム
- 非同期ディベート、地域課題調査、最終プレゼンテーションなどを実施

## ライセンス

This project is licensed under the MIT License.

## 関連リンク

- 大阪公立大学 COIL事業部門
