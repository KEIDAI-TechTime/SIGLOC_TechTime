siglocOnlineSupportSystem/02_SystemFile

updateSystemFile

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

  - 前回の SYSTEMフォルダを検索し、IDを取得。

- **今回のフォルダを検索\**

  - 今回の Online フォルダを検索し、IDを取得。

  - 今回の SYSTEMフォルダを検索し、IDを取得。

#### **3. ファイルのコピーと更新**

- **「個人別データ一覧（システム用マスタデータ）」のコピー\**

  - 個人別データ一覧（システム用マスタデータ）をコピーし,
    3行目以下をクリア

- **「個人情報ブック」のコピー\**

  - 個人情報ブックをコピーし, 個人情報シート_雛形以外のシートをクリア

- **「教員モニタリングブック」のコピー\**

  - 教員用モニタリングブックをコピーし, 3行目以下をクリア

- **「タスク完了管理ブック」のコピー\**

  - タスク完了管理ブックをコピーし, 3行目以下をクリア

- **「立場決定ブック」のコピー\**

  - 立場決定ブックをコピーし, 2行目以下をクリア

- **「SIGLOC_ErrorLog」のコピー\**

  - SIGLOC_ErrorLogをコピーし, 2行目以下をクリア

- **「SIGLOCシステム設定ファイル」のコピーと更新\**

  - SIGLOCシステム設定ファイルをコピー

  - シート名を **前回名から今回名に変更('SIGLOC\_' + XX + 'th')**
    で更新。

#### **4. システム設定ファイルの更新**

- **コピーしたファイルのIDをシステム設定ファイルに更新**

| **システム設定キー**    | **更新する値**                  |
|-------------------------|---------------------------------|
| ERROR_LOG_BOOK_ID       | thisTimeFileErrorLogId          |
| MEMBER_LIST_BOOK_ID     | thisTimeFilePersonalDataListId  |
| PERSONAL_INFO_BOOK_ID   | thisTimeFilePersonalInfoId      |
| MONITORING_BOOK_ID      | thisTimeFileTeacherMonitoringId |
| TASK_MANAGEMENT_BOOK_ID | thisTimeFileTaskCompletionId    |
| STAND_POINT_BOOK_ID     | thisTimeFilePositionDecisionId  |

- **Personal** フォルダの情報を設定\*\*

  - XXthStudentWorkspaceFolderId を検索し Personal フォルダID
    を取得。システム設定ファイルに登録。

| **システム設定キー** | **更新する値**   |
|----------------------|------------------|
| PERSONAL_FOLDER_ID   | PersonalFolderId |

- **Translate**フォルダの情報を設定\*\*

  - thisTimeSystemFolderIdを検索し TranslateフォルダID
    を取得。システム設定ファイルに登録。

| **システム設定キー**    | **更新する値**            |
|-------------------------|---------------------------|
| S1T1_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S1T2_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S1T3_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S1T4_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S1T5_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S2T1_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S2T2_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S2T3_1_TRANSLATE_FOLDER | thisTImeTranslateFolderId |
| S2T3_2_TRANSLATE_FOLDER | thisTImeTranslateFolderId |
| S2T4_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S3T1_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S3T2_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |
| S3T3_1_TRANSLATE_FOLDER | thisTImeTranslateFolderId |
| S3T3_2_TRANSLATE_FOLDER | thisTImeTranslateFolderId |
| S3T4_TRANSLATE_FOLDER   | thisTImeTranslateFolderId |

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

### **3. SystemFileSetting の定義**

#### **定数**

> SystemFileSetting
>
> ERROR_LOG_BOOK_ID: 'B5',
>
> ERROR_LOG_SHEET_NAME: 'B6',
>
> MAIL_CONFIRM_FORM_BOOK_ID: 'B8',
>
> MAIL_CONFIRM_FORM_SHEET_NAME: 'B9',
>
> APPLICATION_FORM_BOOK_ID: 'B11',
>
> APPLICATION_FORM_SHEET_NAME: 'B12',
>
> ENROLLMENT_FORM_BOOK_ID: 'B14',
>
> ENROLLMENT_FORM_SHEET_NAME: 'B15',
>
> POST_QUESTIONNAIRE_FORM_BOOK_ID: 'B17',
>
> POST_QUESTIONNAIRE_FORM_SHEET_NAME: 'B18',
>
> MEMBER_LIST_BOOK_ID: 'B20',
>
> MEMBER_LIST_SHEET_NAME: 'B21',
>
> PERSONAL_INFO_BOOK_ID: 'B23',
>
> PERSONAL_INFO_SHEET_NAME_BASE: 'B24',
>
> PERSONAL_INFO_SHEET_NAME_PREFIX: 'B25',
>
> MONITORING_BOOK_ID: 'B27',
>
> MONITORING_SHEET_NAME_APPLY: 'B28',
>
> MONITORING_SHEET_NAME_ENTER: 'B29',
>
> MONITORING_SHEET_NAME_TOTAL: 'B30',
>
> MONITORING_SHEET_NAME_S1: 'B31',
>
> MONITORING_SHEET_NAME_S2: 'B32',
>
> MONITORING_SHEET_NAME_S3: 'B33',
>
> MONITORING_SHEET_NAME_S4: 'B34',
>
> MONITORING_SHEET_NAME_FINISH: 'B35',
>
> MONITORING_SHEET_NAME_ACTIVITY: 'B36',
>
> TASK_MANAGEMENT_BOOK_ID: 'B38',
>
> TASK_MANAGEMENT_SHEET_NAME: 'B39',
>
> STAND_POINT_BOOK_ID: 'B41',
>
> STAND_POINT_SHEET_NAME_S1TEMP: 'B42',
>
> STAND_POINT_SHEET_NAME_S1: 'B43',
>
> STAND_POINT_SHEET_NAME_S2TEMP: 'B44',
>
> STAND_POINT_SHEET_NAME_S2GROUP: 'B45',
>
> STAND_POINT_SHEET_NAME_S2COMMENTS: 'B46',
>
> STAND_POINT_SHEET_NAME_S3COMMENTS: 'B47',
>
> PROGRESS_BOOK_ID_BASE: 'B49',
>
> PROGRESS_SHEET_NAME_BASE: 'B50',
>
> S1A_TEMP_FILE_ID: 'B52',
>
> S1B_TEMP_FILE_ID: 'B53',
>
> S1REFLECTION_TEMP_FILE_ID: 'B54',
>
> S2_TEMP_FILE_ID: 'B55',
>
> REFLECTION_REPORT_TEMP_FILE_ID: 'B56',
>
> PERSONAL_FOLDER_ID_BASE: 'B58',
>
> PERSONAL_FOLDER_ID: 'B60',
>
> S1T1_TRANSLATE_FOLDER: 'B63',
>
> S1T2_TRANSLATE_FOLDER: 'B64',
>
> S1T3_TRANSLATE_FOLDER: 'B65',
>
> S1T4_TRANSLATE_FOLDER: 'B66',
>
> S1T5_TRANSLATE_FOLDER: 'B67',
>
> S2T1_TRANSLATE_FOLDER: 'B69',
>
> S2T2_TRANSLATE_FOLDER: 'B70',
>
> S2T3_1_TRANSLATE_FOLDER: 'B71',
>
> S2T3_2_TRANSLATE_FOLDER: 'B72',
>
> S2T4_TRANSLATE_FOLDER: 'B73',
>
> S3T1_TRANSLATE_FOLDER: 'B75',
>
> S3T2_TRANSLATE_FOLDER: 'B76',
>
> S3T3_1_TRANSLATE_FOLDER: 'B77',
>
> S3T3_2_TRANSLATE_FOLDER: 'B78',
>
> S3T4_TRANSLATE_FOLDER: 'B79',
>
> APPLY_DEADLINE: 'B82',
>
> REASON_STD_WORDS: 'B83',
>
> ESSAY_STD_WORDS: 'B84',
>
> S1T1_STD_DT: 'B86',
>
> S1T1_STD_CT: 'B87',
>
> S1T2_STD_DT: 'B88',
>
> S1T2_STD_CT: 'B89',
>
> S1T3_STD_DT: 'B90',
>
> S1T3_STD_WDCT: 'B91',
>
> S1T3_STD_CMCT: 'B92',
>
> S1T4_STD_DT: 'B93',
>
> S1T4_STD_WDCT: 'B94',
>
> S1T4_STD_CMCT: 'B95',
>
> S1T5_STD_DT: 'B96',
>
> S1T5_STD_CT: 'B97',
>
> S2T1_STD_DT: 'B99',
>
> S2T1_STD_CT: 'B100',
>
> S2T2_STD_DT: 'B101',
>
> S2T2_STD_CT: 'B102',
>
> S2T3_STD_DT: 'B103',
>
> S2T3_STD_WDCT: 'B104',
>
> S2T3_STD_CMCT: 'B105',
>
> S2T4_STD_DT: 'B106',
>
> S2T4_STD_CT: 'B107',
>
> S3T1_STD_DT: 'B109',
>
> S3T1_STD_CT: 'B110',
>
> S3T2_STD_DT: 'B111',
>
> S3T2_STD_CT: 'B112',
>
> S3T3_STD_DT: 'B113',
>
> S3T3_STD_WDCT: 'B114',
>
> S3T3_STD_CMCT: 'B115',
>
> S3T4_STD_DT: 'B116',
>
> S3T4_STD_CT: 'B117'
>
> CERTIFICATE_BOOK_ID: 'B119',
>
> CERTIFICATE_SHEET_NAME: 'B120',
>
> CERTIFICATE_BASE_FOLDER_ID: 'B121',
>
> CERTIFICATE_FOLDER_ID: 'B122',
>
> ID_PREFIX: 'B124',
>
> THRESH: 'B125',
>
> COURSE: 'B126',
