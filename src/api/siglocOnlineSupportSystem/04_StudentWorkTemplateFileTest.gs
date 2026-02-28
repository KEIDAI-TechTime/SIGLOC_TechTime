/**
 * StudentWorkTemplateファイルのテスト
 * @param {string} logSheetArg - ログシート
 * @param {string} testSheetArg - テストシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function testStudentWorkTemplateFile(logSheetArg, testSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {

  settingLog(logSheetArg, cmdNameArg);
  settingTest(TestType.TEST_STUDENT_WORK_TEMPLATE_FILE, testSheetArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkString(lastTime, '前回開催回');


  // 今回フォルダを検索
  outputLog(LogLevel.INFO, '今回のフォルダ情報を取得');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', false, 'Online')) return;
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', false, 'SYSTEM')) return;
  var thisTimeStudentWorkTemplateFolderId = getFolderId(thisTimeSystemFolderId, "StudentWork_Template");
  if (checkResponse(thisTimeStudentWorkTemplateFolderId, '今回のStudentWork_Templateフォルダ', false, 'StudentWork_Template')) return;

  // システム設定ファイル
  outputLog(LogLevel.INFO, 'システム設定ファイルを取得');
  var thisTimeSystemFileId = getFileId(thisTimeSystemFolderId, "SIGLOCシステム設定ファイル");
  if (checkResponse(thisTimeSystemFileId, '今回のシステム設定ファイル', false, 'SIGLOCシステム設定ファイル')) return;
  var thisTimeSystemFile = SpreadsheetApp.openById(thisTimeSystemFileId);
  var systemFileSheet = thisTimeSystemFile.getSheetByName('SIGLOC_' + thisTime);
  if (checkResponse(systemFileSheet, '今回のシステム設定ファイルの設定シート', false, 'SIGLOC_' + thisTime)) return;


  // ここからチェックスタート
  //チェック対象の値クリア
  clearCheckResult(thisTime);

  //MyChecklistファイルを確認
  outputLog(LogLevel.INFO, 'MyChecklistを確認');
  var thisTimeMyCheckListFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "MyChecklist");
  if (checkResponse(thisTimeMyCheckListFileId, 'MyChecklistファイル', true, 'MyChecklist')) {
    updateResult(CheckListSetting.MY_CHECK_LIST_BOOK, TestResult.ERROR, 'MyChecklistファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_BOOK_ID_BASE, TestResult.WARN, 'MyChecklistファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_SHEET_NAME_BASE, TestResult.WARN, 'MyChecklistファイルのシート名', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.MY_CHECK_LIST_BOOK, TestResult.SUCCESS, 'MyChecklistファイル', '');
    // システム設定ファイルのMyChecklist情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.PROGRESS_BOOK_ID_BASE).getValue() != thisTimeMyCheckListFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_BOOK_ID_BASE, TestResult.ERROR, 'MyChecklistファイル', 'ファイルIDが異なります。');
      updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_SHEET_NAME_BASE, TestResult.WARN, 'MyChecklistファイルのシート名', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_BOOK_ID_BASE, TestResult.SUCCESS, 'MyChecklistファイル', '');

      // MycheckListのシート名確認
      outputLog(LogLevel.INFO, 'MyChecklistのシート名を確認');
      var sheetName = systemFileSheet.getRange(SystemFileSetting.PROGRESS_SHEET_NAME_BASE).getValue()
      var myCheckListFile = SpreadsheetApp.openById(thisTimeMyCheckListFileId);
      if (checkSheetName(myCheckListFile, sheetName)) {
        updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_SHEET_NAME_BASE, TestResult.SUCCESS, 'MyChecklistののシート名', '');
      } else {
        updateResult(CheckListSetting.SYSTEM_SETTING.PROGRESS_SHEET_NAME_BASE, TestResult.ERROR, 'MyChecklistのシート名', 'シート名が異なります。');
      }
    }
  }

  // Post_Reflection_Reportファイルを確認
  outputLog(LogLevel.INFO, 'Post_Reflection_Reportを確認');
  var thisTimePostReflectionReportFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "Post_Reflection_Report");
  if (checkResponse(thisTimePostReflectionReportFileId, 'Post_Reflection_Reportファイル', true, 'Post_Reflection_Report')) {
    updateResult(CheckListSetting.POST_REFLECTION_REPORT_BOOK, TestResult.ERROR, 'Post_Reflection_Reportファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.REFLECTION_REPORT_TEMP_FILE_ID, TestResult.WARN, 'Post_Reflection_Reportファイル', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.POST_REFLECTION_REPORT_BOOK, TestResult.SUCCESS, 'Post_Reflection_Reportファイル', '');
    // システム設定ファイルのPost_Reflection_Report情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.REFLECTION_REPORT_TEMP_FILE_ID).getValue() != thisTimePostReflectionReportFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.REFLECTION_REPORT_TEMP_FILE_ID, TestResult.ERROR, 'Post_Reflection_Reportファイル', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.REFLECTION_REPORT_TEMP_FILE_ID, TestResult.SUCCESS, 'Post_Reflection_Reportファイル', '');
    }
  }

  // S1_Worksheet_Aファイルを確認
  outputLog(LogLevel.INFO, 'S1_Worksheet_Aを確認');
  var thisTimeS1WorksheetAFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "S1_Worksheet_A");
  if (checkResponse(thisTimeS1WorksheetAFileId, 'S1_Worksheet_Aファイル', true, 'S1_Worksheet_A')) {
    updateResult(CheckListSetting.S1_WORKSHEET_A_BOOK, TestResult.ERROR, 'S1_Worksheet_Aファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1A_TEMP_FILE_ID, TestResult.WARN, 'S1_Worksheet_Aファイル', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.S1_WORKSHEET_A_BOOK, TestResult.SUCCESS, 'S1_Worksheet_Aファイル', '');
    // システム設定ファイルのS1_Worksheet_A情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.S1A_TEMP_FILE_ID).getValue() != thisTimeS1WorksheetAFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1A_TEMP_FILE_ID, TestResult.ERROR, 'S1_Worksheet_Aファイル', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1A_TEMP_FILE_ID, TestResult.SUCCESS, 'S1_Worksheet_Aファイル', '');
    }
  }

  // S1_Worksheet_Bファイルを確認
  outputLog(LogLevel.INFO, 'S1_Worksheet_Bを確認');
  var thisTimeS1WorksheetBFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "S1_Worksheet_B");
  if (checkResponse(thisTimeS1WorksheetBFileId, 'S1_Worksheet_Bファイル', true, 'S1_Worksheet_B')) {
    updateResult(CheckListSetting.S1_WORKSHEET_B_BOOK, TestResult.ERROR, 'S1_Worksheet_Bファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1B_TEMP_FILE_ID, TestResult.WARN, 'S1_Worksheet_Bファイル', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.S1_WORKSHEET_B_BOOK, TestResult.SUCCESS, 'S1_Worksheet_Bファイル', '');
    // システム設定ファイルのS1_Worksheet_B情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.S1B_TEMP_FILE_ID).getValue() != thisTimeS1WorksheetBFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1B_TEMP_FILE_ID, TestResult.ERROR, 'S1_Worksheet_Bファイル', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1B_TEMP_FILE_ID, TestResult.SUCCESS, 'S1_Worksheet_Bファイル', '');
    }
  }

  // S1_Worksheet_Reflectionファイルを確認
  outputLog(LogLevel.INFO, 'S1_Worksheet_Reflectionを確認');
  var thisTimeS1WorksheetReflectionFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "S1_Worksheet_Reflection");
  if (checkResponse(thisTimeS1WorksheetReflectionFileId, 'S1_Worksheet_Reflectionファイル', true, 'S1_Worksheet_Reflection')) {
    updateResult(CheckListSetting.S1_WORKSHEET_REFLECTION_BOOK, TestResult.ERROR, 'S1_Worksheet_Reflectionファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S1REFLECTION_TEMP_FILE_ID, TestResult.WARN, 'S1_Worksheet_Reflectionファイル', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.S1_WORKSHEET_REFLECTION_BOOK, TestResult.SUCCESS, 'S1_Worksheet_Reflectionファイル', '');
    // システム設定ファイルのS1_Worksheet_Reflection情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.S1REFLECTION_TEMP_FILE_ID).getValue() != thisTimeS1WorksheetReflectionFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1REFLECTION_TEMP_FILE_ID, TestResult.ERROR, 'S1_Worksheet_Reflectionファイル', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.S1REFLECTION_TEMP_FILE_ID, TestResult.SUCCESS, 'S1_Worksheet_Reflectionファイル', '');
    }
  }

  // S2_PictureBookファイルを確認
  outputLog(LogLevel.INFO, 'S2_PictureBookを確認');
  var thisTimeS2PictureBookFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "S2_PictureBook");
  if (checkResponse(thisTimeS2PictureBookFileId, 'S2_PictureBookファイル', true, 'S2_PictureBook')) {
    updateResult(CheckListSetting.S2_PICTURE_BOOK_BOOK, TestResult.ERROR, 'S2_PictureBookファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.S2_TEMP_FILE_ID, TestResult.WARN, 'S2_PictureBookファイル', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.S2_PICTURE_BOOK_BOOK, TestResult.SUCCESS, 'S2_PictureBookファイル', '');
    // システム設定ファイルのS2_PictureBook情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.S2_TEMP_FILE_ID).getValue() != thisTimeS2PictureBookFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.S2_TEMP_FILE_ID, TestResult.ERROR, 'S2_PictureBookファイル', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.S2_TEMP_FILE_ID, TestResult.SUCCESS, 'S2_PictureBookファイル', '');
    }
  }

  // studentWorkTemplateフォルダを確認
  outputLog(LogLevel.INFO, 'StudentWork_Templateを確認');
  var thisTimeStudentWorkTemplateFolderId = getFolderId(thisTimeSystemFolderId, "StudentWork_Template");
  if (checkResponse(thisTimeStudentWorkTemplateFolderId, 'StudentWork_Templateフォルダ', true, 'StudentWork_Template')) {
    updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID_BASE, TestResult.ERROR, 'StudentWork_Templateフォルダ', 'フォルダが見つかりませんでした。');

  } else {
    updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID_BASE, TestResult.SUCCESS, 'StudentWork_Templateフォルダ', '');
    // システム設定ファイルのStudentWork_Template情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.PERSONAL_FOLDER_ID_BASE).getValue() != thisTimeStudentWorkTemplateFolderId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID_BASE, TestResult.ERROR, 'StudentWork_Templateフォルダ', 'フォルダIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.PERSONAL_FOLDER_ID_BASE, TestResult.SUCCESS, 'StudentWork_Templateフォルダ', '');
    }
  }


  return thisTimeFolderId;
}



