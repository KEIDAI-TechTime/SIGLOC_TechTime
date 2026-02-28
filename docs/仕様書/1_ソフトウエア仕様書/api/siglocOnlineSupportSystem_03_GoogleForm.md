siglocOnlineSupportSystem/03_GoogleForm

updateGoogleForm

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

- **前回のフォルダを検索**

  - 前回の Online フォルダを検索し、IDを取得。

  - 前回の Google_Formフォルダを検索し、IDを取得。

- **今回のフォルダを検索**

  - 今回の Online フォルダを検索し、IDを取得。

  - 今回の Google_Formフォルダを検索し、IDを取得。

#### **3. フォームのコピーと更新**

- **応募フォームのコピー**

  - 前回の応募フォームを取得し、今回のフォルダにコピー。

  - フォームの回答を作成し、システム設定ファイルを更新。

- **入学フォームのコピー**

  - 前回の入学フォームを取得し、今回のフォルダにコピー。

  - フォームの回答を作成し、システム設定ファイルを更新。

- **フィードバックフォームのコピー**

  - 前回のフィードバックフォームを取得し、今回のフォルダにコピー。

  - フォームの回答を作成し、システム設定ファイルを更新。

#### **4. システム設定ファイルの更新**

- **コピーしたファイルのIDをシステム設定ファイルに更新**

| **システム設定キー**            | **更新する値**                   |
|---------------------------------|----------------------------------|
| APPLICATION_FORM_BOOK_ID        | thisTimeApplicationDestinationId |
| ENROLLMENT_FORM_BOOK_ID         | thisTimeAdmissionDestinationId   |
| POST_QUESTIONNAIRE_FORM_BOOK_ID | thisTimeFeedbackDestinationId    |

#### **5. フォルダIDの返却**

- thisTimeFolderId を返却して次の処理へ渡す。

### **2. 連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートシステム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **util.gs** … 共通処理部品
