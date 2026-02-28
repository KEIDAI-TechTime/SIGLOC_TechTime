siglocOnlineSupportSystem/05_MyCheckList

updateMyCheckList

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

#### **2. フォルダとファイルの検索**

- **今回の MyChecklist 関連フォルダを検索**

  - **今回の Online フォルダを検索し、IDを取得。**

  - **今回の** SYSTEM**フォルダを検索し、IDを取得。**

  - **今回の** StudentWork_Template**フォルダを検索し、IDを取得。**

- **今回の MyChecklist ファイルを取得**

  - **今回の**
    MyChecklist**ファイルを検索し、IDを取得。**getFileId(thisTimeStudentWorkTemplateFolderId,
    "MyChecklist")

- **今回の Material フォルダを検索**

  - **今回の** TEACHERS**フォルダを検索し、IDを取得。**

  - **今回の** Material**フォルダを検索し、IDを取得。**

#### **3. ファイルのリンク設定**

- **replaceLinks(thisTimeMyCheckListFileId, thisTimeMaterialFolderId,
  "Checklist") を実行し、Material フォルダにリンクを設定**

#### **4. MyChecklist シートの非表示設定**

手動で手直しを行うことが見込まれるため非表示設定はしない

#### **5. フォルダIDの返却**

- thisTimeFolderId を返却し、次の処理へ渡す。

### **2. 連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートシステム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **util.gs** … 共通処理部品
