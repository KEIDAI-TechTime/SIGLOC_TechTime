const SystemFileSetting = {
  ERROR_LOG_BOOK_ID: 'B5',
  ERROR_LOG_SHEET_NAME: 'B6',
  MAIL_CONFIRM_FORM_BOOK_ID: 'B8',
  MAIL_CONFIRM_FORM_SHEET_NAME: 'B9',
  APPLICATION_FORM_BOOK_ID: 'B11',
  APPLICATION_FORM_SHEET_NAME: 'B12',
  ENROLLMENT_FORM_BOOK_ID: 'B14',
  ENROLLMENT_FORM_SHEET_NAME: 'B15',
  POST_QUESTIONNAIRE_FORM_BOOK_ID: 'B17',
  POST_QUESTIONNAIRE_FORM_SHEET_NAME: 'B18',
  MEMBER_LIST_BOOK_ID: 'B20',
  MEMBER_LIST_SHEET_NAME: 'B21',
  PERSONAL_INFO_BOOK_ID: 'B23',
  PERSONAL_INFO_SHEET_NAME_BASE: 'B24',
  PERSONAL_INFO_SHEET_NAME_PREFIX: 'B25',
  MONITORING_BOOK_ID: 'B27',
  MONITORING_SHEET_NAME_APPLY: 'B28',
  MONITORING_SHEET_NAME_ENTER: 'B29',
  MONITORING_SHEET_NAME_TOTAL: 'B30',
  MONITORING_SHEET_NAME_S1: 'B31',
  MONITORING_SHEET_NAME_S2: 'B32',
  MONITORING_SHEET_NAME_S3: 'B33',
  MONITORING_SHEET_NAME_S4: 'B34',
  MONITORING_SHEET_NAME_FINISH: 'B35',
  MONITORING_SHEET_NAME_ACTIVITY: 'B36',
  TASK_MANAGEMENT_BOOK_ID: 'B38',
  TASK_MANAGEMENT_SHEET_NAME: 'B39',
  STAND_POINT_BOOK_ID: 'B41',
  STAND_POINT_SHEET_NAME_S1TEMP: 'B42',
  STAND_POINT_SHEET_NAME_S1: 'B43',
  STAND_POINT_SHEET_NAME_S2TEMP: 'B44',
  STAND_POINT_SHEET_NAME_S2GROUP: 'B45',
  STAND_POINT_SHEET_NAME_S2COMMENTS: 'B46',
  STAND_POINT_SHEET_NAME_S3COMMENTS: 'B47',
  PROGRESS_BOOK_ID_BASE: 'B49',
  PROGRESS_SHEET_NAME_BASE: 'B50',

  S1A_TEMP_FILE_ID: 'B52',
  S1B_TEMP_FILE_ID: 'B53',
  S1REFLECTION_TEMP_FILE_ID: 'B54',
  S2_TEMP_FILE_ID: 'B55',
  REFLECTION_REPORT_TEMP_FILE_ID: 'B56',
  PERSONAL_FOLDER_ID_BASE: 'B58',
  PERSONAL_FOLDER_ID: 'B60',

  S1T1_TRANSLATE_FOLDER: 'B63',
  S1T2_TRANSLATE_FOLDER: 'B64',
  S1T3_TRANSLATE_FOLDER: 'B65',
  S1T4_TRANSLATE_FOLDER: 'B66',
  S1T5_TRANSLATE_FOLDER: 'B67',

  S2T1_TRANSLATE_FOLDER: 'B69',
  S2T2_TRANSLATE_FOLDER: 'B70',
  S2T3_1_TRANSLATE_FOLDER: 'B71',
  S2T3_2_TRANSLATE_FOLDER: 'B72',
  S2T4_TRANSLATE_FOLDER: 'B73',

  S3T1_TRANSLATE_FOLDER: 'B75',
  S3T2_TRANSLATE_FOLDER: 'B76',
  S3T3_1_TRANSLATE_FOLDER: 'B77',
  S3T3_2_TRANSLATE_FOLDER: 'B78',
  S3T4_TRANSLATE_FOLDER: 'B79',

  APPLY_DEADLINE: 'B82',
  REASON_STD_WORDS: 'B83',
  ESSAY_STD_WORDS: 'B84',

  S1T1_STD_DT: 'B86',
  S1T1_STD_CT: 'B87',
  S1T2_STD_DT: 'B88',
  S1T2_STD_CT: 'B89',
  S1T3_STD_DT: 'B90',
  S1T3_STD_WDCT: 'B91',
  S1T3_STD_CMCT: 'B92',
  S1T4_STD_DT: 'B93',
  S1T4_STD_WDCT: 'B94',
  S1T4_STD_CMCT: 'B95',
  S1T5_STD_DT: 'B96',
  S1T5_STD_CT: 'B97',

  S2T1_STD_DT: 'B99',
  S2T1_STD_CT: 'B100',
  S2T2_STD_DT: 'B101',
  S2T2_STD_CT: 'B102',
  S2T3_STD_DT: 'B103',
  S2T3_STD_WDCT: 'B104',
  S2T3_STD_CMCT: 'B105',
  S2T4_STD_DT: 'B106',
  S2T4_STD_CT: 'B107',

  S3T1_STD_DT: 'B109',
  S3T1_STD_CT: 'B110',
  S3T2_STD_DT: 'B111',
  S3T2_STD_CT: 'B112',
  S3T3_STD_DT: 'B113',
  S3T3_STD_WDCT: 'B114',
  S3T3_STD_CMCT: 'B115',
  S3T4_STD_DT: 'B116',
  S3T4_STD_CT: 'B117',

  CERTIFICATE_BOOK_ID: 'B119',
  CERTIFICATE_SHEET_NAME: 'B120',
  CERTIFICATE_BASE_FOLDER_ID: 'B121',
  CERTIFICATE_FOLDER_ID: 'B122',

  ID_PREFIX: 'B124',
  THRESH: 'B125',
  COURSE: 'B126',
};
/**
 * システムファイルの更新
 * @param {Object} logSheetArg - ログシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function updateSystemFile(logSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
  settingLog(logSheetArg, cmdNameArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');

  // 前回フォルダを検索
  outputLog(LogLevel.INFO, '前回のフォルダ情報を取得');
  var lastTimeOnlineFolderId = getFolderId(lastTimeFolderId, "Online");
  if (checkResponse(lastTimeOnlineFolderId, '前回のOnlineフォルダ', false, 'Online')) return;
  var lastTimeSystemFolderId = getFolderId(lastTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(lastTimeSystemFolderId, '前回のSYSTEMフォルダ', false, 'SYSTEM')) return;

  // 今回フォルダを検索
  outputLog(LogLevel.INFO, '今回のフォルダ情報を取得');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', false, 'Online')) return;
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', false, 'SYSTEM')) return;

  // 前回のSYSTEMフォルダ内の「個人別データ一覧（システム用マスタデータ）」ファイルを今回のSYSTEMフォルダにコピー
  outputLog(LogLevel.INFO, '個人別データ一覧（システム用マスタデータ）をコピーし内容をクリア');
  var thisTimeFilePersonalDataListId = copyNewTimeFileWithClear(lastTimeSystemFolderId, thisTimeSystemFolderId, "個人別データ一覧（システム用マスタデータ）", 3);
  // 今回のSYSTEMフォルダに「個人情報ブック」ファイルをコピー
  outputLog(LogLevel.INFO, '個人情報ブックをコピーし不要なシートを削除');
  var thisTimeFilePersonalInfoId = copyNewTimeFileWithSheetClear(lastTimeSystemFolderId, thisTimeSystemFolderId, "個人情報ブック", '個人情報シート_雛形');
  // 今回のSYSTEMフォルダに「教員モニタリングブック」ファイルをコピー
  outputLog(LogLevel.INFO, '教員モニタリングブックをコピーし内容をクリア');
  var thisTimeFileTeacherMonitoringId = copyNewTimeFileWithClear(lastTimeSystemFolderId, thisTimeSystemFolderId, "教員用モニタリングブック", 3);
  // 今回のSYSTEMフォルダに「タスク完了管理ブック」ファイルをコピー
  outputLog(LogLevel.INFO, 'タスク完了管理ブックをコピーし内容をクリア');
  var thisTimeFileTaskCompletionId = copyNewTimeFileWithClear(lastTimeSystemFolderId, thisTimeSystemFolderId, "タスク完了管理ブック", 3);
  // 今回のSYSTEMフォルダに「立場決定ブック」ファイルをコピー
  outputLog(LogLevel.INFO, '立場決定ブックをコピーし内容をクリア');
  var thisTimeFilePositionDecisionId = copyNewTimeFileWithClear(lastTimeSystemFolderId, thisTimeSystemFolderId, "立場決定ブック", 2);
  // 今回のSYSTEMフォルダに「SIGLOC_ErrorLog」ファイルをコピー
  outputLog(LogLevel.INFO, 'SIGLOC_ErrorLogをコピーし内容をクリア');
  var thisTimeFileErrorLogId = copyNewTimeFileWithClear(lastTimeSystemFolderId, thisTimeSystemFolderId, "SIGLOC_ErrorLog", 2);

  // 今回のSYSTEMフォルダに「SIGLOCシステム設定ファイル」ファイルをコピー
  outputLog(LogLevel.INFO, 'システム設定ファイルをコピー');
  var thisTimeFileSystemSettingId = copyFileByFolderId(lastTimeSystemFolderId, thisTimeSystemFolderId, "SIGLOCシステム設定ファイル");
  if (checkResponse(thisTimeFileSystemSettingId, '今回のシステム設定ファイル', false, 'SIGLOCシステム設定ファイル')) return;
  // シート名を変更
  outputLog(LogLevel.INFO, 'システム設定ファイルのシート名を前回から今回に変更');
  var systemFileSheet = changeSheetName(thisTimeFileSystemSettingId, 'SIGLOC_' + lastTime, 'SIGLOC_' + thisTime);
  // シートが見つからない場合は中止
  if (!systemFileSheet) {
    outputLog(LogLevel.WARN, 'システム設定ファイルに前回のシートが見つからないため今回のシートを検索');
    systemFileSheet = SpreadsheetApp.openById(thisTimeFileSystemSettingId).getSheetByName('SIGLOC_' + thisTime);
    if (checkResponse(systemFileSheet, 'システム設定のシート', false, 'SIGLOC_' + thisTime + ' or SIGLOC_' + lastTime)) return;
  }

  // SIGLOCシステム設定ファイルの設定に追加
  outputLog(LogLevel.INFO, 'システム設定ファイルの設定を更新');
  systemFileSheet.getRange(SystemFileSetting.ERROR_LOG_BOOK_ID).setValue(thisTimeFileErrorLogId);
  systemFileSheet.getRange(SystemFileSetting.MEMBER_LIST_BOOK_ID).setValue(thisTimeFilePersonalDataListId);
  systemFileSheet.getRange(SystemFileSetting.PERSONAL_INFO_BOOK_ID).setValue(thisTimeFilePersonalInfoId);
  systemFileSheet.getRange(SystemFileSetting.MONITORING_BOOK_ID).setValue(thisTimeFileTeacherMonitoringId);
  systemFileSheet.getRange(SystemFileSetting.TASK_MANAGEMENT_BOOK_ID).setValue(thisTimeFileTaskCompletionId);
  systemFileSheet.getRange(SystemFileSetting.STAND_POINT_BOOK_ID).setValue(thisTimeFilePositionDecisionId);

  // システム設定ファイルに生徒フォルダ（Personal）IDを記録
  outputLog(LogLevel.INFO, '今回のPersonalフォルダ情報を取得');
  var XXthStudentWorkspaceFolderId = getFolderId(thisTimeOnlineFolderId, thisTime + "_Student_WORKSPACE");
  if (!checkResponse(XXthStudentWorkspaceFolderId, 'Student_WORKSPACEフォルダ', true, thisTime + "_Student_WORKSPACE")) {
    var PersonalFolderId = getFolderId(XXthStudentWorkspaceFolderId, "Personal");
    if (!checkResponse(PersonalFolderId, 'Personalフォルダ', true, "Personal")) {
      outputLog(LogLevel.INFO, 'システム設定ファイルにPersonalフォルダを設定');
      systemFileSheet.getRange(SystemFileSetting.PERSONAL_FOLDER_ID).setValue(PersonalFolderId);
    }
  }

  // システム設定ファイルにトランスレイトフォルダIDを記録
  outputLog(LogLevel.INFO, '今回のTranslateフォルダ情報を取得');
  var thisTImeTranslateFolderId = getFolderId(thisTimeSystemFolderId, "translate");
  if (!checkResponse(thisTImeTranslateFolderId, 'translateフォルダ', true, "translate")) {
    systemFileSheet.getRange(SystemFileSetting.S1T1_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S1T2_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S1T3_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S1T4_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S1T5_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S2T1_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S2T2_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S2T3_1_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S2T3_2_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S2T4_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S3T1_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S3T2_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S3T3_1_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S3T3_2_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
    systemFileSheet.getRange(SystemFileSetting.S3T4_TRANSLATE_FOLDER).setValue(thisTImeTranslateFolderId);
  }

  return thisTimeFolderId;
}

/**
 * 指定ファイル名のファイルをコピーし指定行目以降をクリアする
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} fileName - コピーするファイル名
 * @param {number} startRow - 削除開始行
 * @returns {string} - 新しいファイルのID
 */
function copyNewTimeFileWithClear(lastTimeFolderId, thisTimeFolderId, fileName, startRow) {
  var thisTimeFileId = copyFileByFolderId(lastTimeFolderId, thisTimeFolderId, fileName);
  // 前回ファイルが取得できない場合は中止
  if (checkResponse(thisTimeFileId, '前回のファイル', true, fileName)) return;

  // util「deleteRows」を使用して指定行目以降をクリアする
  var thisTimeFile = SpreadsheetApp.openById(thisTimeFileId);
  deleteRows(thisTimeFile, startRow);
  return thisTimeFileId;
}

/**
 * 指定ファイル名のファイルをコピーし指定シート以外をクリアする
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} fileName - コピーするファイル名
 * @param {string} sheetName - 削除しないシート名
 * @returns {string} - 新しいファイルのID
 */
function copyNewTimeFileWithSheetClear(lastTimeFolderId, thisTimeFolderId, fileName, sheetName) {
  var thisTimeFileId = copyFileByFolderId(lastTimeFolderId, thisTimeFolderId, fileName);
  // util「deleteSheets」を使用して指定のシート以外を削除する
  var thisTimeFile = SpreadsheetApp.openById(thisTimeFileId);
  deleteSheets(thisTimeFile, sheetName);
  return thisTimeFileId;
}

