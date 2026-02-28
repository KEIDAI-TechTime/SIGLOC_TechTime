siglocOnlineSupportSystem/01_VariousFolder

createVariousFolder

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

#### **2. 各フォルダの作成**

- **オンライン作業用フォルダの作成**

  - ルートフォルダ内に Online フォルダを作成。

  - Online フォルダの中に SYSTEM フォルダを作成。

  - Online フォルダの中に **「XXth_Student_WORKSPACE」**
    フォルダを作成。

  - **「XXth_Student_WORKSPACE」** 内に Personal、Materials、Shared
    フォルダを作成。

  - SYSTEM フォルダの中に StudentWork_Template、translate、修了証
    フォルダを作成。

  - 修了証 フォルダの中に 修了証原本、Certificate of Completion
    フォルダを作成。

  - Online フォルダの中に TEACHERS フォルダを作成。

  - Online フォルダの中に Google_Form フォルダを作成。

#### **3. 前回のフォルダのコピー処理**

- **前回の Materials フォルダを TEACHERS フォルダにコピー**

  - 前回の Online フォルダを検索し、IDを取得。

  - 前回の Student_WORKSPACE フォルダを検索し、IDを取得。

  - 前回の Materials フォルダを検索し、IDを取得。

  - **copyFolder** を使用して Materials フォルダを TEACHERS
    フォルダにコピー。

  - コピー後のフォルダ内のリンク情報を更新。

#### **4. フォルダIDの返却**

- 作成した thisTimeFolderId を返すことで、処理の結果を次の工程に渡す。

### **2. 連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートシステム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **util.gs** … 共通処理部品
