/**
 * MyCheckListの作成
 * @param {string} logSheetArg - ログシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function updateMyCheckList(logSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
  settingLog(logSheetArg, cmdNameArg);
  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');
  //前回フォルダを検索
  outputLog(LogLevel.INFO, '前回のフォルダ情報を取得');
  var lastTimeOnlineFolderId = getFolderId(lastTimeFolderId, "Online");
  if (checkResponse(lastTimeOnlineFolderId, '前回のOnlineフォルダ', false, 'Online')) return;
  var lastTimeXXthStudentWorkspaceFolderId = getFolderId(lastTimeOnlineFolderId, lastTime + "_Student_WORKSPACE");
  if (checkResponse(lastTimeXXthStudentWorkspaceFolderId, 'Student_WORKSPACEフォルダ', true, lastTime + "_Student_WORKSPACE")) return;
  var lastTimeMaterialsFolderId = getFolderId(lastTimeXXthStudentWorkspaceFolderId, "Materials");
  if (checkResponse(lastTimeMaterialsFolderId, 'Materialsフォルダ', false, 'Materials')) return;

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


  outputLog(LogLevel.INFO, '今回のMyChecklistファイル情報を取得');
  var thisTimeMyCheckListFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "MyChecklist");
  if (checkResponse(thisTimeMyCheckListFileId, '今回のMyChecklistファイル', false, 'MyChecklist')) return;
  outputLog(LogLevel.INFO, '今回のMaterialフォルダ情報を取得');
  var thisTimeTeachersFolderId = getFolderId(thisTimeOnlineFolderId, "TEACHERS");
  if (checkResponse(thisTimeTeachersFolderId, '今回のTEACHERSフォルダ', false, 'TEACHERS')) return;
  var thisTimeMaterialFolderId = getFolderId(thisTimeTeachersFolderId, "Material");
  if (checkResponse(thisTimeMaterialFolderId, '今回のMaterialフォルダ', false, 'Material')) return;

  // Mychecklistファイルのシート名をシステム設定から取得
  var myCheckListSheetName = systemFileSheet.getRange(SystemFileSetting.PROGRESS_SHEET_NAME_BASE).getValue();
  if (checkResponse(myCheckListSheetName, '今回のMyCheckListのシート名', false, 'PROGRESS_SHEET_NAME_BASE')) return;

  // Util.jsの関数を呼び出し
  outputLog(LogLevel.INFO, 'MyChecklistファイルのリンクをMaterialフォルダに設定');
  replaceLinks(thisTimeMyCheckListFileId, thisTimeMaterialFolderId, lastTimeMaterialsFolderId, lastTime, thisTime, myCheckListSheetName)


  // Mychecklistファイルのシートを非表示
  var thisTimeMyCheckListSheet = SpreadsheetApp.openById(thisTimeMyCheckListFileId).getSheetByName(myCheckListSheetName);
  if (!checkResponse(thisTimeMyCheckListSheet, '今回のMyChecklistファイルのCheckListシート', false, myCheckListSheetName)) {
    outputLog(LogLevel.INFO, 'MyCheckListファイルのCheckListシートを非表示はしない');
    // hideRows(thisTimeMyCheckListSheet);
  }

  return thisTimeFolderId;
}