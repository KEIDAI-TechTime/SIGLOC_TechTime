/**
 * StudentWorkTemplateファイルの作成
 * @param {string} logSheetArg - ログシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function updateStudentWorkTemplateFile(logSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
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
  var lastTimeStudentWorkTemplateFolderId = getFolderId(lastTimeSystemFolderId, "StudentWork_Template");
  if (checkResponse(lastTimeStudentWorkTemplateFolderId, '前回のStudentWork_Templateフォルダ', false, 'StudentWork_Template')) return;

  // 今回フォルダを検索
  outputLog(LogLevel.INFO, '今回のフォルダ情報を取得');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', false, 'Online')) return;
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', false, 'SYSTEM')) return;
  var thisTimeStudentWorkTemplateFolderId = getFolderId(thisTimeSystemFolderId, "StudentWork_Template");
  if (checkResponse(thisTimeStudentWorkTemplateFolderId, '今回のStudentWork_Templateフォルダ', false, 'StudentWork_Template')) return;
  //システム設定ファイル
  outputLog(LogLevel.INFO, 'システム設定ファイルを取得');
  var thisTimeSystemFileId = getFileId(thisTimeSystemFolderId, "SIGLOCシステム設定ファイル");
  if (checkResponse(thisTimeSystemFileId, '今回のシステム設定ファイル', false, 'SIGLOCシステム設定ファイル')) return;
  var thisTimeSystemFile = SpreadsheetApp.openById(thisTimeSystemFileId);
  var systemFileSheet = thisTimeSystemFile.getSheetByName('SIGLOC_' + thisTime);
  if (checkResponse(systemFileSheet, '今回のシステム設定ファイルの設定シート', false, 'SIGLOC_' + thisTime)) return;

  // MycheckListファイルをコピー
  outputLog(LogLevel.INFO, '前回のMyChecklistファイル情報を取得');
  var myCheckListId = getFileId(lastTimeStudentWorkTemplateFolderId, "MyChecklist");
  if (!checkResponse(myCheckListId, '前回のMyChecklistファイル', true, 'MyChecklist')) {
    outputLog(LogLevel.INFO, 'MyChecklistファイルをコピー');
    var thisTimeMyCheckListId = copyFileByFileId(myCheckListId, thisTimeStudentWorkTemplateFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにMyChecklistファイルを設定');
    systemFileSheet.getRange(SystemFileSetting.PROGRESS_BOOK_ID_BASE).setValue(thisTimeMyCheckListId);
  }

  // Post_Reflection_Reportファイルをコピー
  outputLog(LogLevel.INFO, '前回のPost_Reflection_Reportファイル情報を取得');
  var postReflectionReportId = getFileId(lastTimeStudentWorkTemplateFolderId, "Post_Reflection_Report");
  if (!checkResponse(postReflectionReportId, '前回のPost_Reflection_Reportファイル', true, 'Post_Reflection_Report')) {
    outputLog(LogLevel.INFO, 'Post_Reflection_Reportファイルをコピー');
    var thisTimePostReflectionReportId = copyFileByFileId(postReflectionReportId, thisTimeStudentWorkTemplateFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにPost_Reflection_Reportファイルを設定');
    systemFileSheet.getRange(SystemFileSetting.REFLECTION_REPORT_TEMP_FILE_ID).setValue(thisTimePostReflectionReportId);
  }

  //S1_Worksheet_Aファイルをコピー
  outputLog(LogLevel.INFO, '前回のS1_Worksheet_Aファイル情報を取得');
  var s1WorksheetAId = getFileId(lastTimeStudentWorkTemplateFolderId, "S1_Worksheet_A");
  if (!checkResponse(s1WorksheetAId, '前回のS1_Worksheet_Aファイル', true, 'S1_Worksheet_A')) {
    outputLog(LogLevel.INFO, 'S1_Worksheet_Aファイルをコピー');
    var thisTimeS1WorksheetAId = copyFileByFileId(s1WorksheetAId, thisTimeStudentWorkTemplateFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにS1_Worksheet_Aファイルを設定');
    systemFileSheet.getRange(SystemFileSetting.S1A_TEMP_FILE_ID).setValue(thisTimeS1WorksheetAId);
  }
  //S1_Worksheet_Bファイルをコピー
  outputLog(LogLevel.INFO, '前回のS1_Worksheet_Bファイル情報を取得');
  var s1WorksheetBId = getFileId(lastTimeStudentWorkTemplateFolderId, "S1_Worksheet_B");
  if (!checkResponse(s1WorksheetBId, '前回のS1_Worksheet_Bファイル', true, 'S1_Worksheet_B')) {
    outputLog(LogLevel.INFO, 'S1_Worksheet_Bファイルをコピー');
    var thisTimeS1WorksheetBId = copyFileByFileId(s1WorksheetBId, thisTimeStudentWorkTemplateFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにS1_Worksheet_Bファイルを設定');
    systemFileSheet.getRange(SystemFileSetting.S1B_TEMP_FILE_ID).setValue(thisTimeS1WorksheetBId);
  }
  //S1_Worksheet_Reflectionファイルをコピー
  outputLog(LogLevel.INFO, '前回のS1_Worksheet_Reflectionファイル情報を取得');
  var s1WorksheetReflectionId = getFileId(lastTimeStudentWorkTemplateFolderId, "S1_Worksheet_Reflection");
  if (!checkResponse(s1WorksheetReflectionId, '前回のS1_Worksheet_Reflectionファイル', true, 'S1_Worksheet_Reflection')) {
    outputLog(LogLevel.INFO, 'S1_Worksheet_Reflectionファイルをコピー');
    var thisTimeS1WorksheetReflectionId = copyFileByFileId(s1WorksheetReflectionId, thisTimeStudentWorkTemplateFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにS1_Worksheet_Reflectionファイルを設定');
    systemFileSheet.getRange(SystemFileSetting.S1REFLECTION_TEMP_FILE_ID).setValue(thisTimeS1WorksheetReflectionId);
  }
  //S2_PictureBookファイルをコピー
  outputLog(LogLevel.INFO, '前回のS2_PictureBookファイル情報を取得');
  var s2PictureBookId = getFileId(lastTimeStudentWorkTemplateFolderId, "S2_PictureBook");
  if (!checkResponse(s2PictureBookId, '前回のS2_PictureBookファイル', true, 'S2_PictureBook')) {
    outputLog(LogLevel.INFO, 'S2_PictureBookファイルをコピー');
    var thisTimeS2PictureBookId = copyFileByFileId(s2PictureBookId, thisTimeStudentWorkTemplateFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにS2_PictureBookファイルを設定');
    systemFileSheet.getRange(SystemFileSetting.S2_TEMP_FILE_ID).setValue(thisTimeS2PictureBookId);
  }
  // studentWorkTemplateフォルダを記録
  outputLog(LogLevel.INFO, 'システム設定ファイルにStudentWork_Templateフォルダを設定');
  systemFileSheet.getRange(SystemFileSetting.PERSONAL_FOLDER_ID_BASE).setValue(thisTimeStudentWorkTemplateFolderId);

  return thisTimeFolderId;
}



