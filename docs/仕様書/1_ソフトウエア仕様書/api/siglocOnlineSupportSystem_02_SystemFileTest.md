siglocOnlineSupportSystem/02_SystemFileTest

testSystemFile

### **1. 処理の流れ**

#### **1. 初期設定**

- **ログの設定**

  - ログを記録するために **settingLog** を呼び出す。

- **チェックリストの設定**

  - テストを記録するために **settingTest** を呼び出す。

- **引数のチェック**

  - フォルダIDや開催回情報が正しく渡されているかを確認する。

  - **checkFolderId**で今回のフォルダIDを検証。

  - **checkString** で今回の開催回情報を検証。

  - **checkFolderId** で前回のフォルダIDを検証。

  - **checkString** で前回の開催回情報を検証。

<!-- -->

- **今回のフォルダを検索**

  - 今回の Online フォルダを検索し、IDを取得。

  - 今回の SYSTEMフォルダを検索し、IDを取得。

#### **2. 確認の実施**

- **「個人別データ一覧（SYSTEM用マスタデータ）」の確認**

  - 個人別データ一覧（SYSTEM用マスタデータ）ファイルがSYSTEMフォルダに存在することを確認

  - ファイル内の3行目以下がクリアされているか確認

- **「個人情報ブック」の確認**

  - 個人情報ブックファイルがSYSTEMフォルダに存在することを確認

  - ファイル内に「個人情報シート_雛形」シートが存在することを確認

  - ファイル内に「個人情報シート_雛形」シート以外が存在しないことを確認

- **「教員モニタリングブック」の確認**

  - 教員モニタリングブックファイルがSYSTEMフォルダに存在することを確認

  - ファイル内の3行目以下がクリアされているか確認

- **「タスク完了管理ブック」の確認**

  - タスク完了管理ブックファイルがSYSTEMフォルダに存在することを確認

  - ファイル内の3行目以下がクリアされているか確認

- **「立場決定ブック」の確認**

  - 立場決定ブックファイルがSYSTEMフォルダに存在することを確認

  - ファイル内の2行目以下がクリアされているか確認

- **「SIGLOC_ErrorLog」の確認**

  - SIGLOC_ErrorLogファイルがSYSTEMフォルダに存在することを確認

  - ファイル内の2行目以下がクリアされているか確認

- **「SIGLOCSYSTEM設定ファイル」の確認**

  - SIGLOCSYSTEM設定ファイルがSYSTEMフォルダに存在することを確認

  - ファイル内に前回会期のシートが存在しないことを確認('SIGLOC\_' +
    XX(前回会期) + 'th')

  - ファイル内に今回会期のシートが存在することを確認('SIGLOC\_' +
    XX(今回会期) + 'th')

#### **4. システム設定ファイルの確認**

- **システム設定ファイルの確認を行う**

<table style="width:92%;">
<colgroup>
<col style="width: 39%" />
<col style="width: 51%" />
</colgroup>
<thead>
<tr>
<th style="text-align: left;"><strong>システム設定キー</strong></th>
<th style="text-align: left;"><strong>確認する内容</strong></th>
</tr>
<tr>
<th colspan="2">SIGLOC_ErrorLog</th>
</tr>
<tr>
<th>ERROR_LOG_BOOK_ID</th>
<th>・SYSTEMフォルダ内のファイルと一致するか</th>
</tr>
<tr>
<th>ERROR_LOG_SHEET_NAME</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th colspan="2">メールアドレス登録フォーム（回答）</th>
</tr>
<tr>
<th>MAIL_CONFIRM_FORM_BOOK_ID</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th>MAIL_CONFIRM_FORM_SHEET_NAME</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th colspan="2">メールアドレス登録フォーム（回答）</th>
</tr>
<tr>
<th>APPLICATION_FORM_BOOK_ID</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th>APPLICATION_FORM_SHEET_NAME</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th colspan="2">応募フォーム（回答）</th>
</tr>
<tr>
<th>ENROLLMENT_FORM_BOOK_ID</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th>ENROLLMENT_FORM_SHEET_NAME</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th colspan="2">入学フォーム（回答）事後報告フォーム（回答）</th>
</tr>
<tr>
<th>POST_QUESTIONNAIRE_FORM_BOOK_ID</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th>POST_QUESTIONNAIRE_FORM_SHEET_NAME</th>
<th>－ ※3 GoogleFormのテストにて確認</th>
</tr>
<tr>
<th colspan="2">個人別データ一覧（システムマスタ）</th>
</tr>
<tr>
<th>MEMBER_LIST_BOOK_ID</th>
<th>・SYSTEMフォルダ内のファイルと一致するか</th>
</tr>
<tr>
<th>MEMBER_LIST_SHEET_NAME</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th colspan="2">個人情報ブック</th>
</tr>
<tr>
<th>PERSONAL_INFO_BOOK_ID</th>
<th>・SYSTEMフォルダ内のファイルと一致するか</th>
</tr>
<tr>
<th>PERSONAL_INFO_SHEET_NAME_BASE</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>PERSONAL_INFO_SHEET_NAME_PREFIX</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th colspan="2">教員用モニタリングブック</th>
</tr>
<tr>
<th>MONITORING_BOOK_ID</th>
<th>・SYSTEMフォルダ内のファイルと一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_APPLY</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_ENTER</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_TOTAL</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_S1</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_S2</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_S3</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_S4</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_FINISH</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>MONITORING_SHEET_NAME_ACTIVITY</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th colspan="2">タスク完了管理ブック</th>
</tr>
<tr>
<th>TASK_MANAGEMENT_BOOK_ID</th>
<th>・SYSTEMフォルダ内のファイルと一致するか</th>
</tr>
<tr>
<th>TASK_MANAGEMENT_SHEET_NAME</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th colspan="2">立場決定ブック</th>
</tr>
<tr>
<th>STAND_POINT_BOOK_ID</th>
<th>・SYSTEMフォルダ内のファイルと一致するか</th>
</tr>
<tr>
<th>STAND_POINT_SHEET_NAME_S1TEMP</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>STAND_POINT_SHEET_NAME_S1</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>STAND_POINT_SHEET_NAME_S2TEMP</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>STAND_POINT_SHEET_NAME_S2GROUP</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>STAND_POINT_SHEET_NAME_S2COMMENTS</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th>STAND_POINT_SHEET_NAME_S3COMMENTS</th>
<th>・シート名が一致するか</th>
</tr>
<tr>
<th colspan="2">個人進捗シート（テンプレート）</th>
</tr>
<tr>
<th>PROGRESS_BOOK_ID_BASE</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th>PROGRESS_SHEET_NAME_BASE</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th colspan="2">セッション用ファイル（テンプレート）</th>
</tr>
<tr>
<th>S1A_TEMP_FILE_ID</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th>S1B_TEMP_FILE_ID</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th>S1REFLECTION_TEMP_FILE_ID</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th>S2_TEMP_FILE_ID</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th>REFLECTION_REPORT_TEMP_FILE_ID</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th colspan="2">StudentWork_Templete（テンプレート）</th>
</tr>
<tr>
<th>PERSONAL_FOLDER_ID_BASE</th>
<th>－ ※4 StudentWork_TemplateFileのテストにて確認</th>
</tr>
<tr>
<th colspan="2">生徒フォルダ（Personal）</th>
</tr>
<tr>
<th>PERSONAL_FOLDER_ID</th>
<th>・Student_WORKSPACEフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th colspan="2">翻訳ファイル用フォルダ</th>
</tr>
<tr>
<th colspan="2">Sesion1</th>
</tr>
<tr>
<th>S1T1_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S1T2_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S1T3_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S1T4_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S1T5_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th colspan="2">Sesion2</th>
</tr>
<tr>
<th>S2T1_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S2T2_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S2T3_1_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S2T3_2_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S2T4_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th colspan="2">Sesion3</th>
</tr>
<tr>
<th>S3T1_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S3T2_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S3T3_1_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S3T3_2_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th>S3T4_TRANSLATE_FOLDER</th>
<th>・SYSTEMフォルダ内のフォルダと一致するか</th>
</tr>
<tr>
<th colspan="2">各種締め切り/評価基準</th>
</tr>
<tr>
<th colspan="2">応募</th>
</tr>
<tr>
<th>APPLY_DEADLINE</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>REASON_STD_WORDS</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>ESSAY_STD_WORDS</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th colspan="2">Sesion1</th>
</tr>
<tr>
<th>S1T1_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T1_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T2_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T2_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T3_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T3_STD_WDCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T3_STD_CMCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T4_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T4_STD_WDCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T4_STD_CMCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T5_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S1T5_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th colspan="2">Sesion2</th>
</tr>
<tr>
<th>S2T1_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T1_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T2_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T2_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T3_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T3_STD_WDCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T3_STD_CMCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T4_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S2T4_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th colspan="2">Sesion3</th>
</tr>
<tr>
<th>S3T1_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T1_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T2_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T2_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T3_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T3_STD_WDCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T3_STD_CMCT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T4_STD_DT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>S3T4_STD_CT</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th colspan="2">修了証</th>
</tr>
<tr>
<th>CERTIFICATE_BOOK_ID</th>
<th>－ ※6 修了証のテストにて確認</th>
</tr>
<tr>
<th>CERTIFICATE_SHEET_NAME</th>
<th>－ ※6 修了証のテストにて確認</th>
</tr>
<tr>
<th>CERTIFICATE_BASE_FOLDER_ID</th>
<th>－ ※6 修了証のテストにて確認</th>
</tr>
<tr>
<th>CERTIFICATE_FOLDER_ID</th>
<th>－ ※6 修了証のテストにて確認</th>
</tr>
<tr>
<th colspan="2">その他</th>
</tr>
<tr>
<th>ID_PREFIX</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>THRESH</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
<tr>
<th>COURSE</th>
<th>・設定ファイルに設定値が入力されているか</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

#### **5. フォルダIDの返却**

- thisTimeFileId を返却して次の処理へ渡す。

### **2. 連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートSYSTEM**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **testUtil.gs** … テスト共通処理部品

  - **util.gs** … 共通処理部品

### **3. CheckListSetting の定義\**
※実際はtestUtilに定義

#### **定数**

> CheckListSetting

TARGET_TIME: 'G4',

ONLINE_FOLDER_ID: 'G5',

SYSTEM_FOLDER_ID: 'G6',

WORKSPACE_FOLDER_ID: 'G7',

PERSONAL_FOLDER_ID: 'G8',

MATERIALS_FOLDER_ID: 'G9',

SHARED_FOLDER_ID: 'G10',

TEMPLATE_FOLDER_ID: 'G11',

TRANSLATE_FOLDER_ID: 'G12',

CERTIFICATE_FOLDER_ID: 'G13',

CERTIFICATE_ORIGINAL_FOLDER_ID: 'G14',

CERTIFICATE_OF_COMPLETION_FOLDER_ID: 'G15',

TEACHERS_FOLDER_ID: 'G16',

GOOGLE_FORM_FOLDER_ID: 'G17',

MEMBER_LIST_BOOK_ID: 'G20',

PERSONAL_INFO_BOOK_ID: 'G21',

MONITORING_BOOK_ID: 'G22',

TASK_MANAGEMENT_BOOK_ID: 'G23',

STAND_POINT_BOOK_ID: 'G24',

ERROR_LOG_BOOK_ID: 'G25',

SIGLOC_SYSTEM_SETTING_FILE_ID: 'G26',

MAIL_CONFIRM_FORM_BOOK: 'G29',

MAIL_CONFIRM_FORM_BOOK_ID: 'G30',

APPLICATION_FORM_BOOK: 'G31',

APPLICATION_FORM_BOOK_ID: 'G32',

ENROLLMENT_FORM_BOOK: 'G33',

ENROLLMENT_FORM_BOOK_ID: 'G34',

POST_QUESTIONNAIRE_FORM_BOOK: 'G35',

POST_QUESTIONNAIRE_FORM_BOOK_ID: 'G36',

MY_CHECK_LIST_BOOK: 'G39',

POST_REFLECTION_REPORT_BOOK: 'G40',

S1_WORKSHEET_A_BOOK: 'G41',

S1_WORKSHEET_B_BOOK: 'G42',

S1_WORKSHEET_REFLECTION_BOOK: 'G43',

S2_PICTURE_BOOK_BOOK: 'G44',

MCL_0_1: 'G47',

MCL_0_2: 'G48',

MCL_0_3: 'G49',

MCL_0_4: 'G50',

MCL_0_5: 'G51',

MCL_0_6: 'G52',

MCL_1_1: 'G54',

MCL_1_2: 'G55',

MCL_1_3: 'G56',

MCL_1_4: 'G57',

MCL_1_5: 'G58',

MCL_2_1: 'G60',

MCL_2_2: 'G61',

MCL_2_3: 'G62',

MCL_2_4: 'G63',

MCL_2_5: 'G64',

MCL_2_6: 'G65',

MCL_3_1: 'G67',

MCL_3_2: 'G68',

MCL_3_3: 'G69',

MCL_3_4: 'G70',

MCL_3_5: 'G71',

MCL_4_1: 'G73',

MCL_4_2: 'G74',

MCL_4_3: 'G75',

MCL_4_4: 'G76',

MCL_4_5: 'G77',

MCL_5_1: 'G79',

MCL_5_2: 'G80',

MCL_5_3: 'G81',

MCL_DUE: 'G83',

MCL_CLOSE: 'G84',

CERTIFCARTE_OF_COMPLETION: 'G87',

CERTIFICATE_OF_COMPLETION_BASE_FOLDER: 'G88',

CERTIFICATE_OF_COMPLETION_FOLDER: 'G89',

SYSTEM_SETTING: {

ERROR_LOG_BOOK_ID: 'G98',

ERROR_LOG_SHEET_NAME: 'G99',

MAIL_CONFIRM_FORM_BOOK_ID: 'G101',

MAIL_CONFIRM_FORM_SHEET_NAME: 'G102',

APPLICATION_FORM_BOOK_ID: 'G104',

APPLICATION_FORM_SHEET_NAME: 'G105',

ENROLLMENT_FORM_BOOK_ID: 'G107',

ENROLLMENT_FORM_SHEET_NAME: 'G108',

POST_QUESTIONNAIRE_FORM_BOOK_ID: 'G110',

POST_QUESTIONNAIRE_FORM_SHEET_NAME: 'G111',

MEMBER_LIST_BOOK_ID: 'G113',

MEMBER_LIST_SHEET_NAME: 'G114',

PERSONAL_INFO_BOOK_ID: 'G116',

PERSONAL_INFO_SHEET_NAME_BASE: 'G117',

PERSONAL_INFO_SHEET_NAME_PREFIX: 'G118',

MONITORING_BOOK_ID: 'G120',

MONITORING_SHEET_NAME_APPLY: 'G121',

MONITORING_SHEET_NAME_ENTER: 'G122',

MONITORING_SHEET_NAME_TOTAL: 'G123',

MONITORING_SHEET_NAME_S1: 'G124',

MONITORING_SHEET_NAME_S2: 'G125',

MONITORING_SHEET_NAME_S3: 'G126',

MONITORING_SHEET_NAME_S4: 'G127',

MONITORING_SHEET_NAME_FINISH: 'G128',

MONITORING_SHEET_NAME_ACTIVITY: 'G129',

TASK_MANAGEMENT_BOOK_ID: 'G131',

TASK_MANAGEMENT_SHEET_NAME: 'G132',

STAND_POINT_BOOK_ID: 'G134',

STAND_POINT_SHEET_NAME_S1TEMP: 'G135',

STAND_POINT_SHEET_NAME_S1: 'G136',

STAND_POINT_SHEET_NAME_S2TEMP: 'G137',

STAND_POINT_SHEET_NAME_S2GROUP: 'G138',

STAND_POINT_SHEET_NAME_S2COMMENTS: 'G139',

STAND_POINT_SHEET_NAME_S3COMMENTS: 'G140',

PROGRESS_BOOK_ID_BASE: 'G142',

PROGRESS_SHEET_NAME_BASE: 'G143',

S1A_TEMP_FILE_ID: 'G145',

S1B_TEMP_FILE_ID: 'G146',

S1REFLECTION_TEMP_FILE_ID: 'G147',

S2_TEMP_FILE_ID: 'G148',

REFLECTION_REPORT_TEMP_FILE_ID: 'G149',

PERSONAL_FOLDER_ID_BASE: 'G151',

PERSONAL_FOLDER_ID: 'G153',

S1T1_TRANSLATE_FOLDER: 'G156',

S1T2_TRANSLATE_FOLDER: 'G157',

S1T3_TRANSLATE_FOLDER: 'G158',

S1T4_TRANSLATE_FOLDER: 'G159',

S1T5_TRANSLATE_FOLDER: 'G160',

S2T1_TRANSLATE_FOLDER: 'G162',

S2T2_TRANSLATE_FOLDER: 'G163',

S2T3_1_TRANSLATE_FOLDER: 'G164',

S2T3_2_TRANSLATE_FOLDER: 'G165',

S2T4_TRANSLATE_FOLDER: 'G166',

S3T1_TRANSLATE_FOLDER: 'G168',

S3T2_TRANSLATE_FOLDER: 'G169',

S3T3_1_TRANSLATE_FOLDER: 'G170',

S3T3_2_TRANSLATE_FOLDER: 'G171',

S3T4_TRANSLATE_FOLDER: 'G172',

APPLY_DEADLINE: 'G175',

REASON_STD_WORDS: 'G176',

ESSAY_STD_WORDS: 'G177',

S1T1_STD_DT: 'G179',

S1T1_STD_CT: 'G180',

S1T2_STD_DT: 'G181',

S1T2_STD_CT: 'G182',

S1T3_STD_DT: 'G183',

S1T3_STD_WDCT: 'G184',

S1T3_STD_CMCT: 'G185',

S1T4_STD_DT: 'G186',

S1T4_STD_WDCT: 'G187',

S1T4_STD_CMCT: 'G188',

S1T5_STD_DT: 'G189',

S1T5_STD_CT: 'G190',

S2T1_STD_DT: 'G192',

S2T1_STD_CT: 'G193',

S2T2_STD_DT: 'G194',

S2T2_STD_CT: 'G195',

S2T3_STD_DT: 'G196',

S2T3_STD_WDCT: 'G197',

S2T3_STD_CMCT: 'G198',

S2T4_STD_DT: 'G199',

S2T4_STD_CT: 'G200',

S3T1_STD_DT: 'G202',

S3T1_STD_CT: 'G203',

S3T2_STD_DT: 'G204',

S3T2_STD_CT: 'G205',

S3T3_STD_DT: 'G206',

S3T3_STD_WDCT: 'G207',

S3T3_STD_CMCT: 'G208',

S3T4_STD_DT: 'G209',

S3T4_STD_CT: 'G210',

CERTIFICATE_BOOK_ID: 'G212',

CERTIFICATE_SHEET_NAME: 'G213',

CERTIFICATE_BASE_FOLDER_ID: 'G214',

CERTIFICATE_FOLDER_ID: 'G215',

ID_PREFIX: 'G217',

THRESH: 'G218',

COURSE: 'G219',

},
