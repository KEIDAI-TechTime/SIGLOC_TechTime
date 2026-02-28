siglocOnlineSupportSystem/04_StudentWorkTemplateFile

updateStudentWorkTemplateFile

### **1. 処理の流れ**

#### **1. 初期設定**

- **ログの設定**

  - ログを記録するために **settingLog** を呼び出す。

- **引数のチェック**

  - フォルダIDや開催回情報が正しく渡されているかを確認する。

  - **checkFolderId**で今回のフォルダIDを検証。

  - **checkString** で今回の開催回情報を検証。

  - **checkFolderId** で前回のフォルダIDを検証。

  - **checkString** で前回の開催回情報を検証。

#### **2. フォルダの検索**

- **前回の StudentWork_Template フォルダを検索**

  - 前回の Online フォルダを検索し、IDを取得。

  - 前回の SYSTEMフォルダを検索し、IDを取得。

  - 前回の StudentWork_Templateフォルダを検索し、IDを取得。

- **今回の StudentWork_Template フォルダを検索**

  - 今回の Online フォルダを検索し、IDを取得。

  - 今回の SYSTEMフォルダを検索し、IDを取得。

  - 今回の StudentWork_Templateフォルダを検索し、IDを取得。

#### **3. テンプレートファイルのコピー**

- **各テンプレートファイルのコピーとシステム設定ファイルの更新**

| コピー元ファイル名      | 設定ファイル更新対象           |
|-------------------------|--------------------------------|
| MyChecklist             | PROGRESS_BOOK_ID_BASE          |
| Post_Reflection_Report  | REFLECTION_REPORT_TEMP_FILE_ID |
| S1_Worksheet_A          | S1A_TEMP_FILE_ID               |
| S1_Worksheet_B          | S1B_TEMP_FILE_ID               |
| S1_Worksheet_Reflection | S1REFLECTION_TEMP_FILE_ID      |
| S2_PictureBook          | S2_TEMP_FILE_ID                |

#### **4. フォルダIDの返却**

- thisTimeFolderId を返却し、次の処理へ渡す。

<!-- -->

- 

### **2. 連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートシステム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **util.gs** … 共通処理部品
