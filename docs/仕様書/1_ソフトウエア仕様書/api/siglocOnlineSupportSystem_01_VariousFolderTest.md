siglocOnlineSupportSystem/01_VariousFolderTest

testVariousFolder

###  **処理の流れ**

1.  **初期設定**

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

2.  **各フォルダの作成確認**

### **Onlineフォルダの確認**

- 今回のOnlineフォルダの存在を確認。

- 存在しない場合、チェックを終了。

### **SYSTEMフォルダの確認**

- Onlineフォルダ内のSYSTEMフォルダの存在を確認。

- 存在しない場合、関連フォルダのチェックをスキップ。

### **XXth_Student_WORKSPACEフォルダの確認**

- Onlineフォルダ内のStudent_WORKSPACEフォルダの存在を確認。

- 存在しない場合、関連フォルダのチェックをスキップ。

### **Personal, Materials, Shared フォルダの確認**

- XXth_Student_WORKSPACEフォルダ内のPersonalフォルダの存在を確認。

- XXth_Student_WORKSPACEフォルダ内の Materialsフォルダの存在を確認。

- XXth_Student_WORKSPACEフォルダ内のSharedフォルダの存在を確認。

### **StudentWork_Template, translate, 修了証フォルダの確認**

- SYSTEMフォルダ内の StudentWork_Templateフォルダの存在を確認。

- SYSTEMフォルダ内の translateフォルダの存在を確認。

- SYSTEMフォルダ内の 修了証フォルダの存在を確認。

### **修了証原本, Certificate of Completion フォルダの確認**

- 修了証フォルダ内の 修了証原本フォルダの存在を確認。

- 修了証フォルダ内のCertificate of Completionフォルダの存在を確認。

- 存在しない場合、関連フォルダのチェックをスキップ。

### **TEACHERSフォルダの確認**

- Onlineフォルダ内の TEACHERSフォルダの存在を確認。

- TEACHERSフォルダ内の
  Materialフォルダの存在を確認し、中にファイルまたはフォルダがあるか確認。

### **GoogleFormフォルダの確認**

- Onlineフォルダ内のGoogleFormフォルダの存在を確認。

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
