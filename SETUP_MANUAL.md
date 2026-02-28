# 手動セットアップ手順（ターミナル不要）

ブラウザだけでシステムを再現する方法です。

---

## 1. ソースコードをダウンロード

1. https://github.com/KEIDAI-TechTime/SIGLOC_TechTime にアクセス
2. 緑色の「Code」ボタンをクリック
3. 「Download ZIP」をクリック
4. ZIPを解凍

---

## 2. Google Spreadsheetを作成

### 新期開始時サポートシステム用

1. [Google Drive](https://drive.google.com/) を開く
2. 「新規」→「Google スプレッドシート」→「空白のスプレッドシート」
3. ファイル名を「SIGLOC-online新期開始時サポートシステム」に変更

### 事後レポート作成システム用

1. 同様にもう1つスプレッドシートを作成
2. ファイル名を「事後レポート作成システム」に変更

---

## 3. Apps Scriptを開く

1. スプレッドシートで「拡張機能」→「Apps Script」をクリック
2. Apps Scriptエディタが開きます

---

## 4. ソースコードをコピー

### 共通ライブラリ（両方のシステムで必要）

以下のファイルを順番にコピー＆ペースト：

| ファイル | 場所 |
|---------|------|
| util.gs | src/lib/util.gs |
| check.gs | src/lib/check.gs |
| testUtil.gs | src/lib/testUtil.gs |

**コピー方法：**
1. Apps Scriptエディタで「+」ボタン→「スクリプト」
2. ファイル名を入力（例：util）
3. ダウンロードしたファイルの内容をコピー＆ペースト

### 新期開始時サポートシステム

以下のファイルを追加：

| ファイル | 場所 |
|---------|------|
| 01_VariousFolder | src/api/siglocOnlineSupportSystem/01_VariousFolder.gs |
| 01_VariousFolderTest | src/api/siglocOnlineSupportSystem/01_VariousFolderTest.gs |
| 02_SystemFile | src/api/siglocOnlineSupportSystem/02_SystemFile.gs |
| 02_SystemFileTest | src/api/siglocOnlineSupportSystem/02_SystemFileTest.gs |
| 03_GoogleForm | src/api/siglocOnlineSupportSystem/03_GoogleForm.gs |
| 03_GoogleFormTest | src/api/siglocOnlineSupportSystem/03_GoogleFormTest.gs |
| 04_StudentWorkTemplateFile | src/api/siglocOnlineSupportSystem/04_StudentWorkTemplateFile.gs |
| 04_StudentWorkTemplateFileTest | src/api/siglocOnlineSupportSystem/04_StudentWorkTemplateFileTest.gs |
| 05_MyCheckList | src/api/siglocOnlineSupportSystem/05_MyCheckList.gs |
| 05_MyCheckListTest | src/api/siglocOnlineSupportSystem/05_MyCheckListTest.gs |
| 06_CompletionCertificate | src/api/siglocOnlineSupportSystem/06_CompletionCertificate.gs |
| 06_CompletionCertificateTest | src/api/siglocOnlineSupportSystem/06_CompletionCertificateTest.gs |

### 事後レポート作成システム

以下のファイルを追加：

| ファイル | 場所 |
|---------|------|
| 01_Report | src/api/reportCreateSystem/01_Report.gs |

---

## 5. 保存して実行

1. 「Ctrl + S」または「保存」ボタンでプロジェクトを保存
2. 関数を選択して「実行」ボタンをクリック
3. 初回実行時は権限の承認が必要です

---

## 6. シートの設定

スプレッドシートに以下のシートを作成：

### 新期開始時サポートシステム

| シート名 | 用途 |
|---------|------|
| 手順 | 各処理の実行ボタン |
| 設定 | フォルダID等の設定 |
| チェックリスト | テスト結果表示 |
| log | 実行ログ |

### 事後レポート作成システム

| シート名 | 用途 |
|---------|------|
| 設定 | ファイルID等の設定 |
| log | 実行ログ |

---

## 7. ボタンの配置（任意）

1. スプレッドシートで「挿入」→「図形描画」
2. ボタンを作成
3. ボタンを右クリック→「スクリプトを割り当て」
4. 関数名を入力（例：callCreateVariousFolder）

---

## 完了

これでシステムの再現が完了です。
