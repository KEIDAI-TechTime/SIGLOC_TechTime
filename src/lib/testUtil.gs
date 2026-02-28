// テストの処理タイプ
var testType;
//　チェックリストシート
var testSheet;
// 結果
var TestResult = {
  SUCCESS: '✅',
  ERROR: '❌',
  WARN: '⚠️',
  NONE: '➖',
};
const CheckListSetting = {
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

  // MyCheckList
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

  // Certificate of Completion
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

};

const FreeSetting = {

  // MyCheckList
  MCL_0_1: 'F47',
  MCL_0_2: 'F48',
  MCL_0_3: 'F49',
  MCL_0_4: 'F50',
  MCL_0_5: 'F51',
  MCL_0_6: 'F52',

  MCL_1_1: 'F54',
  MCL_1_2: 'F55',
  MCL_1_3: 'F56',
  MCL_1_4: 'F57',
  MCL_1_5: 'F58',

  MCL_2_1: 'F60',
  MCL_2_2: 'F61',
  MCL_2_3: 'F62',
  MCL_2_4: 'F63',
  MCL_2_5: 'F64',
  MCL_2_6: 'F65',

  MCL_3_1: 'F67',
  MCL_3_2: 'F68',
  MCL_3_3: 'F69',
  MCL_3_4: 'F70',
  MCL_3_5: 'F71',

  MCL_4_1: 'F73',
  MCL_4_2: 'F74',
  MCL_4_3: 'F75',
  MCL_4_4: 'F76',
  MCL_4_5: 'F77',

  MCL_5_1: 'F79',
  MCL_5_2: 'F80',
  MCL_5_3: 'F81',

  MCL_DUE: 'F83',
  MCL_CLOSE: 'F84',
}

const TestType = {
  TEST_VARIOUS_FOLDER: 1,
  TEST_SYSTEM_FILE: 2,
  TEST_GOOGLE_FORM: 3,
  TEST_STUDENT_WORK_TEMPLATE_FILE: 4,
  TEST_MY_CHECK_LIST: 5,
  TEST_COMPLETION_CERTIFICATE: 6
}

/**
 * テストの設定
 */
function settingTest(testTypeArg, testSheetArg) {
  testType = testTypeArg;
  testSheet = testSheetArg;
};

/**
 * テスト結果の出力
 */
function updateResult(checkListSetting, testResultArg, target, message) {
  testSheet.getRange(checkListSetting).setValue(testResultArg);
  var loglevel;
  switch (testResultArg) {
    case TestResult.SUCCESS:
      message = "";
      loglevel = LogLevel.INFO;
      break;
    case TestResult.ERROR:
      loglevel = LogLevel.ERROR;

      break;
    case TestResult.WARN:
      loglevel = LogLevel.WARN;
      break;
    case TestResult.NONE:
      message = "";
      loglevel = LogLevel.INFO;
      break;
  }
  //　隣のセルにエラーメッセージを出力
  testSheet.getRange(checkListSetting).offset(0, 1).setValue(message)
  logSheet.appendRow([new Date(), cmdName, loglevel, testResultArg + target, message]);
};

// 開催回が変わった場合、チェック状況をクリア
function clearCheckResult(thisTimeArg) {
  // ここでチェック結果をクリアする
  var thisTime = testSheet.getRange(CheckListSetting.TARGET_TIME).getValue();
  thisTimeArg = thisTimeArg;
  if (thisTime != thisTimeArg) {
    for (var key in CheckListSetting) {
      var element = CheckListSetting[key];
      // targetTimeのセルの場合
      if (element == CheckListSetting.TARGET_TIME) {
        testSheet.getRange(element).setValue(thisTimeArg);
        continue;
      }
      // 子要素がある場合
      if (element == CheckListSetting.SYSTEM_SETTING) {
        for (var key2 in CheckListSetting.SYSTEM_SETTING) {
          var element2 = CheckListSetting.SYSTEM_SETTING[key2];
          testSheet.getRange(element2).clearContent();
          testSheet.getRange(element2).offset(0, 1).clearContent();
        }
        continue;
      }

      // 対象セルの値をクリア
      testSheet.getRange(element).clearContent();
      //隣のセルもクリア
      testSheet.getRange(element).offset(0, 1).clearContent();
    }
  } else {
    switch (testType) {

      case TestType.TEST_VARIOUS_FOLDER:
        //　１の処理
        clearContents(CheckListSetting.ONLINE_FOLDER_ID);
        clearContents(CheckListSetting.SYSTEM_FOLDER_ID);
        clearContents(CheckListSetting.WORKSPACE_FOLDER_ID);
        clearContents(CheckListSetting.PERSONAL_FOLDER_ID);
        clearContents(CheckListSetting.MATERIALS_FOLDER_ID);
        clearContents(CheckListSetting.SHARED_FOLDER_ID);
        clearContents(CheckListSetting.TEMPLATE_FOLDER_ID);
        clearContents(CheckListSetting.TRANSLATE_FOLDER_ID);
        clearContents(CheckListSetting.CERTIFICATE_FOLDER_ID);
        clearContents(CheckListSetting.CERTIFICATE_ORIGINAL_FOLDER_ID);
        clearContents(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER_ID);
        clearContents(CheckListSetting.TEACHERS_FOLDER_ID);
        clearContents(CheckListSetting.GOOGLE_FORM_FOLDER_ID);

        break;

      case TestType.TEST_SYSTEM_FILE:
        // ２の処理
        clearContents(CheckListSetting.MEMBER_LIST_BOOK_ID);
        clearContents(CheckListSetting.PERSONAL_INFO_BOOK_ID);
        clearContents(CheckListSetting.MONITORING_BOOK_ID);
        clearContents(CheckListSetting.TASK_MANAGEMENT_BOOK_ID);
        clearContents(CheckListSetting.STAND_POINT_BOOK_ID);
        clearContents(CheckListSetting.ERROR_LOG_BOOK_ID);
        clearContents(CheckListSetting.SIGLOC_SYSTEM_SETTING_FILE_ID);

        // システム設定部分
        // SIGLOC_ErrorLog
        clearContents(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_SHEET_NAME);
        // 個人別データ一覧（システムマスタ）
        clearContents(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_SHEET_NAME);
        // 個人情報ブック
        clearContents(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_BASE);
        clearContents(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_PREFIX);
        // 教員用モニタリングブック
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_APPLY);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ENTER);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_TOTAL);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S1);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S2);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S3);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S4);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_FINISH);
        clearContents(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ACTIVITY);
        // タスク完了管理ブック
        clearContents(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_SHEET_NAME);
        // 立場決定ブック
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1TEMP);
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1);
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2TEMP);
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2GROUP);
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2COMMENTS);
        clearContents(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S3COMMENTS);
        // 生徒フォルダ（Personal）
        clearContents(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID);
        // Sesion1
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T1_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T2_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T3_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T4_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T5_TRANSLATE_FOLDER);
        // Sesion2
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T1_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T2_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T3_1_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T3_2_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T4_TRANSLATE_FOLDER);
        // Sesion3
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T1_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T2_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T3_1_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T3_2_TRANSLATE_FOLDER);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T4_TRANSLATE_FOLDER);
        // 応募
        clearContents(CheckListSetting.SYSTEM_SETTING.APPLY_DEADLINE);
        clearContents(CheckListSetting.SYSTEM_SETTING.REASON_STD_WORDS);
        clearContents(CheckListSetting.SYSTEM_SETTING.ESSAY_STD_WORDS);
        // Sesion1
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T1_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T1_STD_CT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T2_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T2_STD_CT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T3_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T3_STD_WDCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T3_STD_CMCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T4_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T4_STD_WDCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T4_STD_CMCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T5_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1T5_STD_CT);
        // Sesion2
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T1_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T1_STD_CT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T2_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T2_STD_CT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T3_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T3_STD_WDCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T3_STD_CMCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T4_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2T4_STD_CT);
        // Sesion3
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T1_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T1_STD_CT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T2_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T2_STD_CT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T3_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T3_STD_WDCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T3_STD_CMCT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T4_STD_DT);
        clearContents(CheckListSetting.SYSTEM_SETTING.S3T4_STD_CT);
        // その他 
        clearContents(CheckListSetting.SYSTEM_SETTING.ID_PREFIX);
        clearContents(CheckListSetting.SYSTEM_SETTING.THRESH);
        clearContents(CheckListSetting.SYSTEM_SETTING.COURSE);

        break;

      case TestType.TEST_GOOGLE_FORM:
        // ３の処理
        clearContents(CheckListSetting.MAIL_CONFIRM_FORM_BOOK);
        clearContents(CheckListSetting.MAIL_CONFIRM_FORM_BOOK_ID);
        clearContents(CheckListSetting.APPLICATION_FORM_BOOK);
        clearContents(CheckListSetting.APPLICATION_FORM_BOOK_ID);
        clearContents(CheckListSetting.ENROLLMENT_FORM_BOOK);
        clearContents(CheckListSetting.ENROLLMENT_FORM_BOOK_ID);
        clearContents(CheckListSetting.POST_QUESTIONNAIRE_FORM_BOOK);
        clearContents(CheckListSetting.POST_QUESTIONNAIRE_FORM_BOOK_ID);

        // システム設定部分
        clearContents(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_SHEET_NAME);
        clearContents(CheckListSetting.SYSTEM_SETTING.APPLICATION_FORM_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.APPLICATION_FORM_SHEET_NAME);
        clearContents(CheckListSetting.SYSTEM_SETTING.ENROLLMENT_FORM_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.ENROLLMENT_FORM_SHEET_NAME);
        clearContents(CheckListSetting.SYSTEM_SETTING.POST_QUESTIONNAIRE_FORM_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.POST_QUESTIONNAIRE_FORM_SHEET_NAME);

        break;

      case TestType.TEST_STUDENT_WORK_TEMPLATE_FILE:
        //　４の処理
        clearContents(CheckListSetting.MY_CHECK_LIST_BOOK);
        clearContents(CheckListSetting.POST_REFLECTION_REPORT_BOOK);
        clearContents(CheckListSetting.S1_WORKSHEET_A_BOOK);
        clearContents(CheckListSetting.S1_WORKSHEET_B_BOOK);
        clearContents(CheckListSetting.S1_WORKSHEET_REFLECTION_BOOK);
        clearContents(CheckListSetting.S2_PICTURE_BOOK_BOOK);

        // システム設定部分
        clearContents(CheckListSetting.SYSTEM_SETTING.PROGRESS_BOOK_ID_BASE);
        clearContents(CheckListSetting.SYSTEM_SETTING.PROGRESS_SHEET_NAME_BASE);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1A_TEMP_FILE_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1B_TEMP_FILE_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.S1REFLECTION_TEMP_FILE_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.S2_TEMP_FILE_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.REFLECTION_REPORT_TEMP_FILE_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID_BASE);

        break;

      case TestType.TEST_MY_CHECK_LIST:
        //　５の処理
        clearContents(CheckListSetting.MCL_0_1);
        clearContents(CheckListSetting.MCL_0_2);
        clearContents(CheckListSetting.MCL_0_3);
        clearContents(CheckListSetting.MCL_0_4);
        clearContents(CheckListSetting.MCL_0_5);
        clearContents(CheckListSetting.MCL_0_6);

        clearContents(CheckListSetting.MCL_1_1);
        clearContents(CheckListSetting.MCL_1_2);
        clearContents(CheckListSetting.MCL_1_3);
        clearContents(CheckListSetting.MCL_1_4);
        clearContents(CheckListSetting.MCL_1_5);

        clearContents(CheckListSetting.MCL_2_1);
        clearContents(CheckListSetting.MCL_2_2);
        clearContents(CheckListSetting.MCL_2_3);
        clearContents(CheckListSetting.MCL_2_4);
        clearContents(CheckListSetting.MCL_2_5);
        clearContents(CheckListSetting.MCL_2_6);

        clearContents(CheckListSetting.MCL_3_1);
        clearContents(CheckListSetting.MCL_3_2);
        clearContents(CheckListSetting.MCL_3_3);
        clearContents(CheckListSetting.MCL_3_4);
        clearContents(CheckListSetting.MCL_3_5);

        clearContents(CheckListSetting.MCL_4_1);
        clearContents(CheckListSetting.MCL_4_2);
        clearContents(CheckListSetting.MCL_4_3);
        clearContents(CheckListSetting.MCL_4_4);
        clearContents(CheckListSetting.MCL_4_5);

        clearContents(CheckListSetting.MCL_5_1);
        clearContents(CheckListSetting.MCL_5_2);
        clearContents(CheckListSetting.MCL_5_3);

        clearContents(CheckListSetting.MCL_DUE);
        clearContents(CheckListSetting.MCL_CLOSE);

        break;

      case TestType.TEST_COMPLETION_CERTIFICATE:
        //　６の処理
        clearContents(CheckListSetting.CERTIFCARTE_OF_COMPLETION);
        clearContents(CheckListSetting.CERTIFICATE_OF_COMPLETION_BASE_FOLDER);
        clearContents(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER);

        // システム設定部分
        clearContents(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BOOK_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_SHEET_NAME);
        clearContents(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BASE_FOLDER_ID);
        clearContents(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_FOLDER_ID);

        break;
    }
  }
};

/**
 * チェックセルとエラー理由セルをクリアする
 * @param {string} checkListSetting -- セル位置
 */
function clearContents(checkListSetting) {
  testSheet.getRange(checkListSetting).clearContent();
  testSheet.getRange(checkListSetting).offset(0, 1).clearContent();
}

/**
 * startRow以降のセルが入力されているか確認
 * @param {object} spreadsheet -- スプレッドシート
 * @param {integer} startRow -- 開始行
 * @returns 
 */
function checkRows(spreadsheet, startRow) {
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var rows = sheet.getLastRow();

    if (rows >= startRow) {
      // startRow以降のセルがされているか確認し、クリアされていない場合Falseを返す
      for (var j = startRow; j <= rows; j++) {
        var range = sheet.getRange(j, 1);
        if (range.getValue() != "") {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * フォルダ内のファイルIDに指定のファイルIDが存在するか
 * @param {string[]} fileIds -- ファイルIDのリスト
 * @param {string} targetFileId -- 検索対象のファイルID
 * @returns {boolean} -- ファイルIDがリスト内に存在するか
 */
function existFileIdInFileIds(fileIds, targetFileId) {

  var isExist = false;
  for (var i = 0; i < fileIds.length; i++) {
    if (fileIds[i] == targetFileId) {
      isExist = true;
      break;
    }
  }
  return isExist;
}