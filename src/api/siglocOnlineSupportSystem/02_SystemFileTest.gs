/**
 * システムファイルの更新
 * @param {Object} logSheetArg - ログシート
 * @param {string} testSheetArg - テストシート名
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function testSystemFile(logSheetArg, testSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
  settingLog(logSheetArg, cmdNameArg);
  settingTest(TestType.TEST_SYSTEM_FILE, testSheetArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');

  // 今回フォルダを検索
  outputLog(LogLevel.INFO, '今回のフォルダ情報を取得');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', false, 'Online')) return;
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', false, 'SYSTEM')) return;


  // ここからチェックスタート
  //チェック対象の値クリア
  clearCheckResult(thisTime);


  // 個人別データ一覧（システム用マスタデータ）が存在するか確認する。
  outputLog(LogLevel.INFO, '個人別データ一覧（システム用マスタデータ）を確認');
  var memberListBookId = getFileId(thisTimeSystemFolderId, "個人別データ一覧（システム用マスタデータ）");
  if (checkResponse(memberListBookId, '個人別データ一覧（システム用マスタデータ）', true, '個人別データ一覧（システム用マスタデータ）')) {
    updateResult(CheckListSetting.MEMBER_LIST_BOOK_ID, TestResult.ERROR, '個人別データ一覧（システム用マスタデータ）', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_BOOK_ID, TestResult.ERROR, '個人別データ一覧（システム用マスタデータ）', 'ファイルが見つかりませんでした。');
  } else {
    // 3行目以下のデータがクリアされているか確認する。
    outputLog(LogLevel.INFO, 'ファイルの内容を確認');
    var memberListBook = SpreadsheetApp.openById(memberListBookId);
    if (checkRows(memberListBook, 3)) {
      updateResult(CheckListSetting.MEMBER_LIST_BOOK_ID, TestResult.SUCCESS, '個人別データ一覧（システム用マスタデータ）', '');
    } else {
      updateResult(CheckListSetting.MEMBER_LIST_BOOK_ID, TestResult.ERROR, '個人別データ一覧（システム用マスタデータ）', '3行目以下のデータがクリアされていません。');
    }
  }

  // 個人情報ブックが存在するか確認する。
  outputLog(LogLevel.INFO, '個人情報ブックを確認');
  var personalInfoBookId = getFileId(thisTimeSystemFolderId, "個人情報ブック");
  if (checkResponse(personalInfoBookId, '個人情報ブック', true, '個人情報ブック')) {
    updateResult(CheckListSetting.PERSONAL_INFO_BOOK_ID, TestResult.ERROR, '個人情報ブック', 'ファイルが見つかりませんでした。');
  } else {
    outputLog(LogLevel.INFO, '個人情報ブックの内容を確認');
    // 「個人情報シート_雛形」シートが存在することを確認する。
    var personalInfoBook = SpreadsheetApp.openById(personalInfoBookId);
    var sheet = personalInfoBook.getSheetByName('個人情報シート_雛形');
    if (sheet) {
      // 「個人情報シート_雛形」シート以外が存在しないことを確認する。
      var sheets = personalInfoBook.getSheets();
      if (sheets.length == 1) {
        updateResult(CheckListSetting.PERSONAL_INFO_BOOK_ID, TestResult.SUCCESS, '個人情報ブック', '');
      } else {
        updateResult(CheckListSetting.PERSONAL_INFO_BOOK_ID, TestResult.ERROR, '個人情報ブック', '「個人情報シート_雛形」シート以外が存在します。');
      }
    } else {
      updateResult(CheckListSetting.PERSONAL_INFO_BOOK_ID, TestResult.ERROR, '個人情報ブック', '「個人情報シート_雛形」シートが存在しません。');
    }
  }

  // 教員用モニタリングブックが存在するか確認する。
  outputLog(LogLevel.INFO, '教員用モニタリングブックを確認');
  var monitoringBookId = getFileId(thisTimeSystemFolderId, "教員用モニタリングブック");
  if (checkResponse(monitoringBookId, '教員用モニタリングブック', true, '教員用モニタリングブック')) {
    updateResult(CheckListSetting.MONITORING_BOOK_ID, TestResult.ERROR, '教員用モニタリングブック', 'ファイルが見つかりませんでした。');
  } else {

    // 3行目以下のデータがクリアされているか確認する。
    outputLog(LogLevel.INFO, 'ファイルの内容を確認');
    var monitoringBook = SpreadsheetApp.openById(monitoringBookId);
    if (checkRows(monitoringBook, 3)) {
      updateResult(CheckListSetting.MONITORING_BOOK_ID, TestResult.SUCCESS, '教員用モニタリングブック', '');
    } else {
      updateResult(CheckListSetting.MONITORING_BOOK_ID, TestResult.ERROR, '教員用モニタリングブック', '3行目以下のデータがクリアされていません。');
    }
  }

  // タスク完了管理ブックが存在するか確認する。
  outputLog(LogLevel.INFO, 'タスク完了管理ブックを確認');
  var taskManagementBookId = getFileId(thisTimeSystemFolderId, "タスク完了管理ブック");
  if (checkResponse(taskManagementBookId, 'タスク完了管理ブック', true, 'タスク完了管理ブック')) {
    updateResult(CheckListSetting.TASK_MANAGEMENT_BOOK_ID, TestResult.ERROR, 'タスク完了管理ブック', 'ファイルが見つかりませんでした。');
  } else {
    // 3行目以下のデータがクリアされているか確認する。
    outputLog(LogLevel.INFO, 'ファイルの内容を確認');
    var taskManagementBook = SpreadsheetApp.openById(taskManagementBookId);
    if (checkRows(taskManagementBook, 3)) {
      updateResult(CheckListSetting.TASK_MANAGEMENT_BOOK_ID, TestResult.SUCCESS, 'タスク完了管理ブック', '');
    } else {
      updateResult(CheckListSetting.TASK_MANAGEMENT_BOOK_ID, TestResult.ERROR, 'タスク完了管理ブック', '3行目以下のデータがクリアされていません。');
    }
  }

  // 立場決定ブックが存在するか確認する。
  outputLog(LogLevel.INFO, '立場決定ブックを確認');
  var standPointBookId = getFileId(thisTimeSystemFolderId, "立場決定ブック");
  if (checkResponse(standPointBookId, '立場決定ブック', true, '立場決定ブック')) {
    updateResult(CheckListSetting.STAND_POINT_BOOK_ID, TestResult.ERROR, '立場決定ブック', 'ファイルが見つかりませんでした。');
  } else {
    // 2行目以下のデータがクリアされているか確認する。
    outputLog(LogLevel.INFO, 'ファイルの内容を確認');
    var standPointBook = SpreadsheetApp.openById(standPointBookId);
    if (checkRows(standPointBook, 2)) {
      updateResult(CheckListSetting.STAND_POINT_BOOK_ID, TestResult.SUCCESS, '立場決定ブック', '');
    } else {
      updateResult(CheckListSetting.STAND_POINT_BOOK_ID, TestResult.ERROR, '立場決定ブック', '2行目以下のデータがクリアされていません。');
    }
  }

  // SIGLOC_ErrorLogが存在するか確認する。
  outputLog(LogLevel.INFO, 'SIGLOC_ErrorLogを確認');
  var errorLogBookId = getFileId(thisTimeSystemFolderId, "SIGLOC_ErrorLog");
  if (checkResponse(errorLogBookId, 'SIGLOC_ErrorLog', true, 'SIGLOC_ErrorLog')) {
    updateResult(CheckListSetting.ERROR_LOG_BOOK_ID, TestResult.ERROR, 'SIGLOC_ErrorLog', 'ファイルが見つかりませんでした。');
  } else {
    // 2行目以下のデータがクリアされているか確認する。
    outputLog(LogLevel.INFO, 'ファイルの内容を確認');
    var errorLogBook = SpreadsheetApp.openById(errorLogBookId);
    if (checkRows(errorLogBook, 2)) {
      updateResult(CheckListSetting.ERROR_LOG_BOOK_ID, TestResult.SUCCESS, 'SIGLOC_ErrorLog', '');
    } else {
      updateResult(CheckListSetting.ERROR_LOG_BOOK_ID, TestResult.ERROR, 'SIGLOC_ErrorLog', '2行目以下のデータがクリアされていません。');
    }
  }

  // SIGLOCシステム設定ファイルが存在するか確認する。
  var isSIGLOCSysFileError = true;
  outputLog(LogLevel.INFO, 'SIGLOCシステム設定ファイルを確認');
  var systemFileId = getFileId(thisTimeSystemFolderId, "SIGLOCシステム設定ファイル");
  if (checkResponse(systemFileId, 'SIGLOCシステム設定ファイル', true, 'SIGLOCシステム設定ファイル')) {
    updateResult(CheckListSetting.SIGLOC_SYSTEM_SETTING_FILE_ID, TestResult.ERROR, 'SIGLOCシステム設定ファイル', 'ファイルが見つかりませんでした。');
  } else {
    outputLog(LogLevel.INFO, '前回会期のシート名を確認');
    var systemFile = SpreadsheetApp.openById(systemFileId);
    if (checkSheetName(systemFile, 'SIGLOC_' + lastTime)) {
      updateResult(CheckListSetting.SIGLOC_SYSTEM_SETTING_FILE_ID, TestResult.ERROR, 'SIGLOCシステム設定ファイル', '前回会期のシートが存在します。');
    } else {
      outputLog(LogLevel.INFO, '今回会期のシート名を確認');
      if (checkSheetName(systemFile, 'SIGLOC_' + thisTime)) {
        updateResult(CheckListSetting.SIGLOC_SYSTEM_SETTING_FILE_ID, TestResult.SUCCESS, 'SIGLOCシステム設定ファイル', '');
        isSIGLOCSysFileError = false
      } else {
        updateResult(CheckListSetting.SIGLOC_SYSTEM_SETTING_FILE_ID, TestResult.ERROR, 'SIGLOCシステム設定ファイル', '今回会期のシートが存在しません。');
      }
    }
  }

  if (isSIGLOCSysFileError) {
    //SIGLOCシステム設定ファイルがない場合、システム設定のチェックは全て警告扱いとする。
    updateResult(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_BOOK_ID, TestResult.WARN, 'SIGLOC_ErrorLog', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_SHEET_NAME, TestResult.WARN, 'SIGLOC_ErrorLogのシート名', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_BOOK_ID, TestResult.WARN, '個人別データ一覧（システム用マスタデータ）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_SHEET_NAME, TestResult.WARN, '個人別データ一覧（システム用マスタデータ）のシート名', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_BOOK_ID, TestResult.WARN, '個人情報ブック', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_BASE, TestResult.WARN, '個人情報ブックのシート名', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_PREFIX, TestResult.WARN, '個人情報ブックのシート名のプリフィックス', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_BOOK_ID, TestResult.WARN, '教員モニタリングブック', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_APPLY, TestResult.WARN, '教員モニタリングブックのシート名（APPLY）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ENTER, TestResult.WARN, '教員モニタリングブックのシート名（ENTER）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_TOTAL, TestResult.WARN, '教員モニタリングブックのシート名（TOTAL）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S1, TestResult.WARN, '教員モニタリングブックのシート名（S1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S2, TestResult.WARN, '教員モニタリングブックのシート名（S2）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S3, TestResult.WARN, '教員モニタリングブックのシート名（S3）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S4, TestResult.WARN, '教員モニタリングブックのシート名（S4）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_FINISH, TestResult.WARN, '教員モニタリングブックのシート名（FINISH）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ACTIVITY, TestResult.WARN, '教員モニタリングブックのシート名（ACTIVITY）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_BOOK_ID, TestResult.WARN, 'タスク完了管理ブック', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_SHEET_NAME, TestResult.WARN, 'タスク完了管理ブックのシート名', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_BOOK_ID, TestResult.WARN, '立場決定ブック', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1TEMP, TestResult.WARN, '立場決定ブックのシート名（S1TEMP）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1, TestResult.WARN, '立場決定ブックのシート名（S1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2TEMP, TestResult.WARN, '立場決定ブックのシート名（S2TEMP）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2GROUP, TestResult.WARN, '立場決定ブックのシート名（S2GROUP）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2COMMENTS, TestResult.WARN, '立場決定ブックのシート名（S2COMMENTS）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S3COMMENTS, TestResult.WARN, '立場決定ブックのシート名（S3COMMENTS）', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID, TestResult.WARN, 'Personalフォルダ', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T2）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T3_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T3）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T4_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T4）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T5_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T5）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T2）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T3_1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T3_2）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T4_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T4）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T2）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T3_1）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T3_2）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T4_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T4）', 'SIGLOCシステム設定ファイルが見つかりませんでした。。');
    updateResult(CheckListSetting.SYSTEM_SETTING.APPLY_DEADLINE, TestResult.WARN, '締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.REASON_STD_WORDS, TestResult.WARN, '志望理由の基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.ESSAY_STD_WORDS, TestResult.WARN, 'エッセイの基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T1_STD_DT, TestResult.WARN, 'Task1締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T1_STD_CT, TestResult.WARN, 'Task1基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T2_STD_DT, TestResult.WARN, 'Task2締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T2_STD_CT, TestResult.WARN, 'Task2基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T3_STD_DT, TestResult.WARN, 'Task3締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T3_STD_WDCT, TestResult.WARN, 'Task3基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T3_STD_CMCT, TestResult.WARN, 'Task3基準コメント数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T4_STD_DT, TestResult.WARN, 'Task4締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T4_STD_WDCT, TestResult.WARN, 'Task4基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T4_STD_CMCT, TestResult.WARN, 'Task4基準コメント数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T5_STD_DT, TestResult.WARN, 'Task5締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1T5_STD_CT, TestResult.WARN, 'Task5基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T1_STD_DT, TestResult.WARN, 'Task1締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T1_STD_CT, TestResult.WARN, 'Task1基準シート数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T2_STD_DT, TestResult.WARN, 'Task2締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T2_STD_CT, TestResult.WARN, 'Task2基準シート数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_STD_DT, TestResult.WARN, 'Task3締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_STD_WDCT, TestResult.WARN, 'Task3基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_STD_CMCT, TestResult.WARN, 'Task3基準コメント数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T4_STD_DT, TestResult.WARN, 'Task4締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2T4_STD_CT, TestResult.WARN, 'Task4基準シート数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T1_STD_DT, TestResult.WARN, 'Task1締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T1_STD_CT, TestResult.WARN, 'Task1基準シート数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T2_STD_DT, TestResult.WARN, 'Task2締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T2_STD_CT, TestResult.WARN, 'Task2基準シート数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_STD_DT, TestResult.WARN, 'Task3締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_STD_WDCT, TestResult.WARN, 'Task3基準文字数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_STD_CMCT, TestResult.WARN, 'Task3基準コメント数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T4_STD_DT, TestResult.WARN, 'Task4締め切り', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S3T4_STD_CT, TestResult.WARN, 'Task4基準シート数', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.ID_PREFIX, TestResult.WARN, 'IDの接頭辞', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.THRESH, TestResult.WARN, '立場決定APIで利用するしきい値', 'SIGLOCシステム設定ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.COURSE, TestResult.WARN, '会期のナンバリング', 'SIGLOCシステム設定ファイルが見つかりませんでした。');

  } else {
    // 【SIGLOCシステム設定ファイルの内容の確認】
    var systemFileSheet = SpreadsheetApp.openById(systemFileId);

    outputLog(LogLevel.INFO, 'SIGLOC_ErrorLogの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.ERROR_LOG_BOOK_ID).getValue() != errorLogBookId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_BOOK_ID, TestResult.ERROR, 'SIGLOC_ErrorLog', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_SHEET_NAME, TestResult.WARN, 'SIGLOC_ErrorLogのシート名', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.ERROR_LOG_BOOK_ID, TestResult.SUCCESS, 'SIGLOC_ErrorLog', '');

      // シート名がErrorLogであるか確認する。
      existSheetName(systemFileSheet, errorLogBookId, 'SIGLOC_ErrorLogのシート名', SystemFileSetting.ERROR_LOG_SHEET_NAME, CheckListSetting.SYSTEM_SETTING.ERROR_LOG_SHEET_NAME)
    }

    outputLog(LogLevel.INFO, '個人別データ一覧（システム用マスタデータ）の設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.MEMBER_LIST_BOOK_ID).getValue() != memberListBookId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_BOOK_ID, TestResult.ERROR, '個人別データ一覧（システム用マスタデータ）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_SHEET_NAME, TestResult.WARN, '個人別データ一覧（システム用マスタデータ）のシート名', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_BOOK_ID, TestResult.SUCCESS, '個人別データ一覧（システム用マスタデータ）', '');

      // シート名が個人別データ一覧であるか確認する。
      existSheetName(systemFileSheet, memberListBookId, '個人別データ一覧（システム用マスタデータ）のシート名', SystemFileSetting.MEMBER_LIST_SHEET_NAME, CheckListSetting.SYSTEM_SETTING.MEMBER_LIST_SHEET_NAME)
    }

    outputLog(LogLevel.INFO, '個人情報ブックの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.PERSONAL_INFO_BOOK_ID).getValue() != personalInfoBookId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_BOOK_ID, TestResult.ERROR, '個人情報ブック', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_BASE, TestResult.WARN, '個人情報ブックのシート名', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_BOOK_ID, TestResult.SUCCESS, '個人情報ブック', '');

      // シート名が個人情報シート_雛形であるか確認する。
      existSheetName(systemFileSheet, personalInfoBookId, '個人情報ブックのシート名', SystemFileSetting.PERSONAL_INFO_SHEET_NAME_BASE, CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_BASE)
    }
    // 「個人情報ブック」のシート名「個人情報シート_」は設定値の必須チェックを行う。
    checkReuireSystemSettingValue(systemFileSheet, '個人情報ブックのシート名のプリフィックス', SystemFileSetting.PERSONAL_INFO_SHEET_NAME_PREFIX, CheckListSetting.SYSTEM_SETTING.PERSONAL_INFO_SHEET_NAME_PREFIX);


    outputLog(LogLevel.INFO, '教員モニタリングブックの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.MONITORING_BOOK_ID).getValue() != monitoringBookId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_BOOK_ID, TestResult.ERROR, '教員モニタリングブック', 'ファイルIDが異なります。');
      // ファイルが存在しない場合、シートのチェック結果は警告扱いとする。
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_APPLY, TestResult.WARN, '教員モニタリングブックのシート名（APPLY）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ENTER, TestResult.WARN, '教員モニタリングブックのシート名（ENTER）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_TOTAL, TestResult.WARN, '教員モニタリングブックのシート名（TOTAL）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S1, TestResult.WARN, '教員モニタリングブックのシート名（S1）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S2, TestResult.WARN, '教員モニタリングブックのシート名（S2）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S3, TestResult.WARN, '教員モニタリングブックのシート名（S3）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S4, TestResult.WARN, '教員モニタリングブックのシート名（S4）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_FINISH, TestResult.WARN, '教員モニタリングブックのシート名（FINISH）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ACTIVITY, TestResult.WARN, '教員モニタリングブックのシート名（ACTIVITY）', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.MONITORING_BOOK_ID, TestResult.SUCCESS, '教員モニタリングブック', '');

      // シート名が教員モニタリングシートであるか確認する。
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（APPLY）', SystemFileSetting.MONITORING_SHEET_NAME_APPLY, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_APPLY)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（ENTER）', SystemFileSetting.MONITORING_SHEET_NAME_ENTER, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ENTER)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（TOTAL）', SystemFileSetting.MONITORING_SHEET_NAME_TOTAL, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_TOTAL)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（S1）', SystemFileSetting.MONITORING_SHEET_NAME_S1, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S1)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（S2）', SystemFileSetting.MONITORING_SHEET_NAME_S2, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S2)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（S3）', SystemFileSetting.MONITORING_SHEET_NAME_S3, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S3)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（S4）', SystemFileSetting.MONITORING_SHEET_NAME_S4, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_S4)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（FINISH）', SystemFileSetting.MONITORING_SHEET_NAME_FINISH, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_FINISH)
      existSheetName(systemFileSheet, monitoringBookId, '教員モニタリングブックのシート名（ACTIVITY）', SystemFileSetting.MONITORING_SHEET_NAME_ACTIVITY, CheckListSetting.SYSTEM_SETTING.MONITORING_SHEET_NAME_ACTIVITY)
    }

    outputLog(LogLevel.INFO, 'タスク完了管理ブックの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.TASK_MANAGEMENT_BOOK_ID).getValue() != taskManagementBookId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_BOOK_ID, TestResult.ERROR, 'タスク完了管理ブック', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_SHEET_NAME, TestResult.WARN, 'タスク完了管理ブックのシート名', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_BOOK_ID, TestResult.SUCCESS, 'タスク完了管理ブック', '');

      // シート名がタスク完了管理シートであるか確認する。
      existSheetName(systemFileSheet, taskManagementBookId, 'タスク完了管理ブックのシート名', SystemFileSetting.TASK_MANAGEMENT_SHEET_NAME, CheckListSetting.SYSTEM_SETTING.TASK_MANAGEMENT_SHEET_NAME)
    }

    outputLog(LogLevel.INFO, '立場決定ブックの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.STAND_POINT_BOOK_ID).getValue() != standPointBookId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_BOOK_ID, TestResult.ERROR, '立場決定ブック', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1TEMP, TestResult.WARN, '立場決定ブックのシート名（S1TEMP）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1, TestResult.WARN, '立場決定ブックのシート名（S1）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2TEMP, TestResult.WARN, '立場決定ブックのシート名（S2TEMP）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2GROUP, TestResult.WARN, '立場決定ブックのシート名（S2GROUP）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2COMMENTS, TestResult.WARN, '立場決定ブックのシート名（S2COMMENTS）', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S3COMMENTS, TestResult.WARN, '立場決定ブックのシート名（S3COMMENTS）', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.STAND_POINT_BOOK_ID, TestResult.SUCCESS, '立場決定ブック', '');

      // シート名が立場決定シートであるか確認する。
      existSheetName(systemFileSheet, standPointBookId, '立場決定ブックのシート名（S1TEMP）', SystemFileSetting.STAND_POINT_SHEET_NAME_S1TEMP, CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1TEMP)
      existSheetName(systemFileSheet, standPointBookId, '立場決定ブックのシート名（S1）', SystemFileSetting.STAND_POINT_SHEET_NAME_S1, CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S1)
      existSheetName(systemFileSheet, standPointBookId, '立場決定ブックのシート名（S2TEMP）', SystemFileSetting.STAND_POINT_SHEET_NAME_S2TEMP, CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2TEMP)
      existSheetName(systemFileSheet, standPointBookId, '立場決定ブックのシート名（S2GROUP）', SystemFileSetting.STAND_POINT_SHEET_NAME_S2GROUP, CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2GROUP)
      existSheetName(systemFileSheet, standPointBookId, '立場決定ブックのシート名（S2COMMENTS）', SystemFileSetting.STAND_POINT_SHEET_NAME_S2COMMENTS, CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S2COMMENTS)
      existSheetName(systemFileSheet, standPointBookId, '立場決定ブックのシート名（S3COMMENTS）', SystemFileSetting.STAND_POINT_SHEET_NAME_S3COMMENTS, CheckListSetting.SYSTEM_SETTING.STAND_POINT_SHEET_NAME_S3COMMENTS)
    }


    // ★生徒フォルダ（Personal）の情報を設定を確認する。
    // 今回会期の〇〇th_Student_WORKSPACEフォルダが存在するか確認する。
    outputLog(LogLevel.INFO, 'Personalフォルダの設定値を確認');
    var XXthStudentWorkspaceFolderId = getFolderId(thisTimeOnlineFolderId, thisTime + "_Student_WORKSPACE");
    if (!checkResponse(XXthStudentWorkspaceFolderId, 'Student_WORKSPACEフォルダ', true, thisTime + "_Student_WORKSPACE")) {
      // 生徒フォルダ（Personal）が存在するか確認する。
      var PersonalFolderId = getFolderId(XXthStudentWorkspaceFolderId, "Personal");
      if (!checkResponse(PersonalFolderId, 'Personalフォルダ', true, "Personal")) {
        // システム設定ファイルのPERSONAL_FOLDER_ID情報を確認
        if (systemFileSheet.getRange(SystemFileSetting.PERSONAL_FOLDER_ID).getValue() != PersonalFolderId) {
          updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID, TestResult.ERROR, 'Personalフォルダ', 'フォルダIDが異なります。');
        } else {
          updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID, TestResult.SUCCESS, 'Personalフォルダ', '');
        }
      } else {
        updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID, TestResult.ERROR, 'Personalフォルダ', 'フォルダが見つかりませんでした。');
      }
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID, TestResult.ERROR, 'Personalフォルダ', 'フォルダが見つかりませんでした。');
    }


    // ★Translateフォルダの情報を設定を確認する。
    // 今回会期のTranslateフォルダが存在するか確認する。
    outputLog(LogLevel.INFO, 'Translateフォルダの設定値を確認');
    var translateFolderId = getFolderId(thisTimeSystemFolderId, "translate");
    if (checkResponse(translateFolderId, 'Translateフォルダ', true, "Translate")) {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1T1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T1）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S1T2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T2）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S1T3_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T3）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S1T4_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T4）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S1T5_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S1T5）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S2T1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T1）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S2T2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T2）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T3_1）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S2T3_2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T3_2）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S2T4_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S2T4）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S3T1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T1）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S3T2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T2）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_1_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T3_1）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S3T3_2_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T3_2）', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.SYSTEM_SETTING.S3T4_TRANSLATE_FOLDER, TestResult.WARN, 'Translateフォルダ（S3T4）', 'フォルダが見つかりませんでした。');
    } else {
      // システム設定ファイルのTranslateフォルダ情報を確認
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S1T1）', SystemFileSetting.S1T1_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S1T1_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S1T2）', SystemFileSetting.S1T2_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S1T2_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S1T3）', SystemFileSetting.S1T3_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S1T3_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S1T4）', SystemFileSetting.S1T4_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S1T4_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S1T5）', SystemFileSetting.S1T5_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S1T5_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S2T1）', SystemFileSetting.S2T1_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S2T1_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S2T2）', SystemFileSetting.S2T2_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S2T2_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S2T3_1）', SystemFileSetting.S2T3_1_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S2T3_1_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S2T3_2）', SystemFileSetting.S2T3_2_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S2T3_2_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S2T4）', SystemFileSetting.S2T4_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S2T4_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S3T1）', SystemFileSetting.S3T1_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S3T1_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S3T2）', SystemFileSetting.S3T2_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S3T2_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S3T3_1）', SystemFileSetting.S3T3_1_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S3T3_1_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S3T3_2）', SystemFileSetting.S3T3_2_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S3T3_2_TRANSLATE_FOLDER);
      checkTranslateFolderIdSetting(systemFileSheet, translateFolderId, 'Translateフォルダ（S3T4）', SystemFileSetting.S3T4_TRANSLATE_FOLDER, CheckListSetting.SYSTEM_SETTING.S3T4_TRANSLATE_FOLDER);
    }

    // 各種締め切り/評価基準

    // 応募
    checkReuireSystemSettingValue(systemFileSheet, '締め切り', SystemFileSetting.APPLY_DEADLINE, CheckListSetting.SYSTEM_SETTING.APPLY_DEADLINE);
    checkReuireSystemSettingValue(systemFileSheet, '志望理由の基準文字数', SystemFileSetting.REASON_STD_WORDS, CheckListSetting.SYSTEM_SETTING.REASON_STD_WORDS);
    checkReuireSystemSettingValue(systemFileSheet, 'エッセイの基準文字数', SystemFileSetting.ESSAY_STD_WORDS, CheckListSetting.SYSTEM_SETTING.ESSAY_STD_WORDS);
    // Sesion1
    checkReuireSystemSettingValue(systemFileSheet, 'Task1締め切り', SystemFileSetting.S1T1_STD_DT, CheckListSetting.SYSTEM_SETTING.S1T1_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task1基準文字数', SystemFileSetting.S1T1_STD_CT, CheckListSetting.SYSTEM_SETTING.S1T1_STD_CT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task2締め切り', SystemFileSetting.S1T2_STD_DT, CheckListSetting.SYSTEM_SETTING.S1T2_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task2基準文字数', SystemFileSetting.S1T2_STD_CT, CheckListSetting.SYSTEM_SETTING.S1T2_STD_CT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3締め切り', SystemFileSetting.S1T3_STD_DT, CheckListSetting.SYSTEM_SETTING.S1T3_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3基準文字数', SystemFileSetting.S1T3_STD_WDCT, CheckListSetting.SYSTEM_SETTING.S1T3_STD_WDCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3基準コメント数', SystemFileSetting.S1T3_STD_CMCT, CheckListSetting.SYSTEM_SETTING.S1T3_STD_CMCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4締め切り', SystemFileSetting.S1T4_STD_DT, CheckListSetting.SYSTEM_SETTING.S1T4_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4基準文字数', SystemFileSetting.S1T4_STD_WDCT, CheckListSetting.SYSTEM_SETTING.S1T4_STD_WDCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4基準コメント数', SystemFileSetting.S1T4_STD_CMCT, CheckListSetting.SYSTEM_SETTING.S1T4_STD_CMCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task5締め切り', SystemFileSetting.S1T5_STD_DT, CheckListSetting.SYSTEM_SETTING.S1T5_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task5基準文字数', SystemFileSetting.S1T5_STD_CT, CheckListSetting.SYSTEM_SETTING.S1T5_STD_CT);
    // Sesion2
    checkReuireSystemSettingValue(systemFileSheet, 'Task1締め切り', SystemFileSetting.S2T1_STD_DT, CheckListSetting.SYSTEM_SETTING.S2T1_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task1基準シート数', SystemFileSetting.S2T1_STD_CT, CheckListSetting.SYSTEM_SETTING.S2T1_STD_CT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task2締め切り', SystemFileSetting.S2T2_STD_DT, CheckListSetting.SYSTEM_SETTING.S2T2_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task2基準シート数', SystemFileSetting.S2T2_STD_CT, CheckListSetting.SYSTEM_SETTING.S2T2_STD_CT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3締め切り', SystemFileSetting.S2T3_STD_DT, CheckListSetting.SYSTEM_SETTING.S2T3_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3基準文字数', SystemFileSetting.S2T3_STD_WDCT, CheckListSetting.SYSTEM_SETTING.S2T3_STD_WDCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3基準コメント数', SystemFileSetting.S2T3_STD_CMCT, CheckListSetting.SYSTEM_SETTING.S2T3_STD_CMCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4締め切り', SystemFileSetting.S2T4_STD_DT, CheckListSetting.SYSTEM_SETTING.S2T4_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4基準シート数', SystemFileSetting.S2T4_STD_CT, CheckListSetting.SYSTEM_SETTING.S2T4_STD_CT);
    // Sesion3
    checkReuireSystemSettingValue(systemFileSheet, 'Task1締め切り', SystemFileSetting.S3T1_STD_DT, CheckListSetting.SYSTEM_SETTING.S3T1_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task1基準シート数', SystemFileSetting.S3T1_STD_CT, CheckListSetting.SYSTEM_SETTING.S3T1_STD_CT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task2締め切り', SystemFileSetting.S3T2_STD_DT, CheckListSetting.SYSTEM_SETTING.S3T2_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task2基準シート数', SystemFileSetting.S3T2_STD_CT, CheckListSetting.SYSTEM_SETTING.S3T2_STD_CT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3締め切り', SystemFileSetting.S3T3_STD_DT, CheckListSetting.SYSTEM_SETTING.S3T3_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3基準文字数', SystemFileSetting.S3T3_STD_WDCT, CheckListSetting.SYSTEM_SETTING.S3T3_STD_WDCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task3基準コメント数', SystemFileSetting.S3T3_STD_CMCT, CheckListSetting.SYSTEM_SETTING.S3T3_STD_CMCT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4締め切り', SystemFileSetting.S3T4_STD_DT, CheckListSetting.SYSTEM_SETTING.S3T4_STD_DT);
    checkReuireSystemSettingValue(systemFileSheet, 'Task4基準シート数', SystemFileSetting.S3T4_STD_CT, CheckListSetting.SYSTEM_SETTING.S3T4_STD_CT);
    // その他
    checkReuireSystemSettingValue(systemFileSheet, 'IDの接頭辞', SystemFileSetting.ID_PREFIX, CheckListSetting.SYSTEM_SETTING.ID_PREFIX);
    checkReuireSystemSettingValue(systemFileSheet, '立場決定APIで利用するしきい値', SystemFileSetting.THRESH, CheckListSetting.SYSTEM_SETTING.THRESH);
    checkReuireSystemSettingValue(systemFileSheet, '会期のナンバリング', SystemFileSetting.COURSE, CheckListSetting.SYSTEM_SETTING.COURSE);

  }

  return thisTimeFolderId;
}


/**
* シート名が一致しているか確認する。
* @param {*} systemSheet -- システム設定ファイル
* @param {*} targetSheet -- 比較対象のシート
* @param {*} target -- チェック対象
* @param {*} systemSetting -- システム設定ファイルの設定値
* @param {*} CheckListSetting -- チェックリストの設定値
*/
function existSheetName(systemSheet, bookId, target, systemSetting, checkListSetting) {

  outputLog(LogLevel.INFO, target + 'の設定値を確認');

  if (bookId == null) {
    updateResult(checkListSetting, TestResult.ERROR, target, 'ファイルが見つかりませんでした。');
  } else {
    var targetSheet = SpreadsheetApp.openById(bookId);

    var settingValue = systemSheet.getRange(systemSetting).getValue();
    if (checkSheetName(targetSheet, settingValue)) {
      updateResult(checkListSetting, TestResult.SUCCESS, target, '');
    } else {
      updateResult(checkListSetting, TestResult.ERROR, target, 'シート名が異なります。');
    }
  }
}

/**
* TranslateフォルダのフォルダIDを確認する。
* @param {*} systemSheet -- システム設定ファイル
* @param {*} conpareTarget -- 比較対象のフォルダID
* @param {*} systemSetting -- システム設定ファイルの設定値
* @param {*} CheckListSetting -- チェックリストの設定値
*/
function checkTranslateFolderIdSetting(systemSheet, conpareValue, target, systemSetting, checkListSetting) {
  outputLog(LogLevel.INFO, target + 'の設定値を確認');
  if (systemSheet.getRange(systemSetting).getValue() != conpareValue) {
    updateResult(checkListSetting, TestResult.ERROR, target, 'フォルダIDが異なります。');
  } else {
    updateResult(checkListSetting, TestResult.SUCCESS, target, '');
  }
}

/**
* システム設定値を取得し、設定値が入っているか確認する。
* @param {*} systemSheet -- システム設定ファイル
* @param {*} target -- チェック対象
* @param {*} systemSetting -- システム設定ファイルの設定値
* @param {*} CheckListSetting -- チェックリストの設定値
*/
function checkReuireSystemSettingValue(systemSheet, target, systemSetting, checkListSetting) {
  outputLog(LogLevel.INFO, target + 'の設定値を確認');
  var value = systemSheet.getRange(systemSetting).getValue();
  if (value) {
    updateResult(checkListSetting, TestResult.SUCCESS, target, '');
  } else {
    updateResult(checkListSetting, TestResult.ERROR, target, '値が入っていません。');
  }
}