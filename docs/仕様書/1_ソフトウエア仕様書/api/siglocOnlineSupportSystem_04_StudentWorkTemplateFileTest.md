siglocOnlineSupportSystem/04_StudentWorkTemplateFileTest

testStudentWork TemplateFile

###  **処理の流れ**

- **初期設定**

### **ログの設定**

- ログを記録するために **settingLog** を呼び出す。

### **チェックリストの設定**

- テストを記録するために **settingTest** を呼び出す。

<!-- -->

- **引数のチェック**

  - フォルダIDや開催回情報が正しく渡されているかを確認する。

    - **checkFolderId**で今回のフォルダIDを検証。

    - **checkString** で今回の開催回情報を検証。

    - **checkFolderId** で前回のフォルダIDを検証。

    - **checkString** で前回の開催回情報を検証。

    - 

<!-- -->

- **今回の StudentWork_Template 関連フォルダを検索**

  - **今回の Online フォルダを検索し、IDを取得。**

  - **今回の SYSTEMフォルダを検索し、IDを取得。**

  - **今回の StudentWork_Template フォルダを検索し、IDを取得。**

  <!-- -->

  - **確認の実施**

- **システム設定ファイルの取得**

  - 今回システム設定ファイルを取得。

  - 今回のシステム設定シートを取得。

- **MyChecklistファイルの確認**

  - **MyChecklist**ファイルを取得

  - システム設定ファイルの**MyChecklist**ファイル ID を検証

- **MyChecklistファイルのシート名確認**

  - 取得した**MyChecklist**ファイルを開き、シート名をシステム設定と照合

- **Post_Reflection_Reportファイルの確認**

  - **Post_Reflection_Report**のフォルダ ID を取得し、システム設定と照合

- **S1_Worksheet_Aファイルの確認**

  - **S1_Worksheet_A**のフォルダ ID を取得し、システム設定と照合

- **S1_Worksheet_Bファイルの確認**

  - **S1_Worksheet_B**のフォルダ ID を取得し、システム設定と照合

- **S1_Worksheet_Reflectionファイルの確認**

  - **S1_Worksheet_Reflection**のフォルダ ID
    を取得し、システム設定と照合

- **S2_PictureBookファイルの確認**

  - **S2_PictureBook**のフォルダ ID を取得し、システム設定と照合

- **StudentWork_Templateフォルダの確認**

  - **StudentWork_Template**のフォルダ ID を取得し、システム設定と照合

####  **フォルダIDの返却**

- 作成した thisTimeFolderId を返すことで、処理の結果を次の工程に渡す。

### **連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートシステム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **testUtil.gs** … テスト共通処理部品

  - **util.gs** … 共通処理部品

### 
