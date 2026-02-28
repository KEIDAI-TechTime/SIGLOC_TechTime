reportCreateSystem/01_Report

CreateReport

### **1. 流れ**

#### **1. 初期設定**

- **dataFileId**、**baseFileId**、**folderId**、**lang**
  を引数として受け取る。

- 現在の日時を取得し、**yyyyMMdd_HHmmss** の形式でフォーマットする。

- **言語設定 (**lang**)** に応じて、新しいファイル名 (**newFileName**)
  を決定。

  - **LangType.JP** → **FeedbackResult_JP_yyyyMMdd_HHmmss**

  - **LangType.EN** → **FeedbackResult_EN_yyyyMMdd_HHmmss**

#### **2. ベースファイルをコピーして新しいレポートファイルを作成**

- **copyFile(baseFileId, folderId, newFileName)**
  を呼び出し、新しいレポートファイルを作成。

#### **3. データの取得・加工**

- **DataColumn**
  に定義されている各データ項目について、ループ処理を実行。

- **getOutputType(DataColumn\[key\])** を呼び出し、データの出力タイプ
  (**OutputType**) を取得。

- **出力タイプごとに処理を分岐**：

  - **OutputType.GRAPH**

    - **aggregate(dataFileId, DataColumn\[key\], null, true)**
      を呼び出し、データを集計。

    - **JSON.stringify** でJSON 形式に変換し格納。

  - **OutputType.GRAPH_MIX**

    - **aggregate(dataFileId, DataColumn\[key\], ",", false)**
      を呼び出し、データを集計。

    - **JSON.stringify** でJSON 形式に変換し、格納。

  - **OutputType.GRAPH_COMMA**

    - **aggregate(dataFileId, DataColumn\[key\], ",", true)**
      を呼び出し、データを集計。

    - **JSON.stringify** でJSON 形式に変換し、**values** 配列に格納。

  - **OutputType.TEXT**

    - **shuffle(dataFileId, DataColumn\[key\], lang)**
      を呼び出し、データを取得し格納。

#### **4. データをドキュメントに出力**

- **updateDocFile(newFileId, values, lang)**
  を呼び出し、作成したレポートファイル (**newFileId**) にデータを反映。

- テキスト以外は項目のクリア処理のみ。

- テキストは言語設定 (**lang**) が **LangType.JP**
  の場合、**translate(text)** を呼び出し翻訳する。

### **2. 連携モジュール**

#### **呼び出し元**

- **事後レポート作成システム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **util.gs** … 共通処理部品
