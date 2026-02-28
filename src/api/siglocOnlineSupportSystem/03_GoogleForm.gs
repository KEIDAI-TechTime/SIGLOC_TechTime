/**
 * GoogleFormファイルの更新
 * @param {Sheet} logSheetArg - ログ出力先シート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @param {string} applicationFormName - 応募フォームの名前
 * @param {string} admissionFormName - 入学フォームの名前
 * @param {string} feedbackFormName - フィードバックフォームの名前
 * @returns {string} - 今回フォルダのID
 */
function updateGoogleForm(logSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime, applicationFormName, admissionFormName, feedbackFormName) {
  settingLog(logSheetArg, cmdNameArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');
  checkString(applicationFormName, '応募フォーム名(変更前)');
  checkString(admissionFormName, '入学フォーム名(変更前)');
  checkString(feedbackFormName, '事後報告フォーム名(変更前)');

  // 前回フォルダを検索
  outputLog(LogLevel.INFO, '前回のフォルダ情報を取得');
  var lastTimeOnlineFolderId = getFolderId(lastTimeFolderId, "Online");
  if (checkResponse(lastTimeOnlineFolderId, '前回のOnlineフォルダ', false, 'Online')) return;
  var lastTimeGoogleFormFolderId = getFolderId(lastTimeOnlineFolderId, "Google_Form");
  if (checkResponse(lastTimeGoogleFormFolderId, '前回のGoogle_Formフォルダ', false, 'Google_Form')) return;

  // 今回フォルダを検索
  outputLog(LogLevel.INFO, '今回のフォルダ情報を取得');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', false, 'Online')) return;
  var thisTimeGoogleFormFolderId = getFolderId(thisTimeOnlineFolderId, "Google_Form");
  if (checkResponse(thisTimeGoogleFormFolderId, '今回のGoogle_Formフォルダ', false, 'Google_Form')) return;

  //システム設定ファイル
  outputLog(LogLevel.INFO, 'システム設定ファイルを取得');
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', false, 'SYSTEM')) return;
  var thisTimeSystemFileId = getFileId(thisTimeSystemFolderId, "SIGLOCシステム設定ファイル");
  if (checkResponse(thisTimeSystemFileId, '今回のシステム設定ファイル', false, 'SIGLOCシステム設定ファイル')) return;
  var thisTimeSystemFile = SpreadsheetApp.openById(thisTimeSystemFileId);
  var systemFileSheet = thisTimeSystemFile.getSheetByName('SIGLOC_' + thisTime);
  if (checkResponse(systemFileSheet, 'システム設定ファイルの設定シート', false, 'SIGLOC_' + thisTime)) return;

  //応募フォームのIDを取得
  outputLog(LogLevel.INFO, '前回の応募フォームを取得');
  var lastTimeApplicationFormId = getFileId(lastTimeGoogleFormFolderId, applicationFormName);
  if (!checkResponse(lastTimeApplicationFormId, '前回の応募フォーム', true, applicationFormName)) {
    outputLog(LogLevel.INFO, '今回の応募フォームにコピー');
    var thisTimeApplicationFormId = copyFileByFileId(lastTimeApplicationFormId, thisTimeGoogleFormFolderId, applicationFormName.replace(lastTime, thisTime));
    outputLog(LogLevel.INFO, '今回の応募フォームの回答を作成');
    var thisTimeApplicationDestinationId = changeDestination(thisTimeApplicationFormId, thisTimeGoogleFormFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルに応募フォーム（回答）を設定');
    systemFileSheet.getRange(SystemFileSetting.APPLICATION_FORM_BOOK_ID).setValue(thisTimeApplicationDestinationId);
  }
  //入学フォームのIDを取得
  outputLog(LogLevel.INFO, '前回の入学フォームを取得');
  var lastTimeAdmissionFormId = getFileId(lastTimeGoogleFormFolderId, admissionFormName);
  if (!checkResponse(lastTimeAdmissionFormId, '前回の入学フォーム', true, admissionFormName)) {
    outputLog(LogLevel.INFO, '今回の入学フォームにコピー');
    var thisTimeAdmissionFormId = copyFileByFileId(lastTimeAdmissionFormId, thisTimeGoogleFormFolderId, admissionFormName.replace(lastTime, thisTime));
    outputLog(LogLevel.INFO, '今回の入学フォームの回答を作成');
    var thisTimeAdmissionDestinationId = changeDestination(thisTimeAdmissionFormId, thisTimeGoogleFormFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルに入学フォーム（回答）を設定');
    systemFileSheet.getRange(SystemFileSetting.ENROLLMENT_FORM_BOOK_ID).setValue(thisTimeAdmissionDestinationId);
  }
  //フィードバックフォームのIDを取得
  outputLog(LogLevel.INFO, '前回のフィードバックフォームを取得');
  var lastTimeFeedbackFormId = getFileId(lastTimeGoogleFormFolderId, feedbackFormName);
  if (!checkResponse(lastTimeFeedbackFormId, '前回のフィードバックフォーム', true, feedbackFormName)) {
    outputLog(LogLevel.INFO, '今回のフィードバックフォームにコピー');
    var thisTimeFeedbackFormId = copyFileByFileId(lastTimeFeedbackFormId, thisTimeGoogleFormFolderId, feedbackFormName.replace(lastTime, thisTime));
    outputLog(LogLevel.INFO, '今回のフィードバックフォームの回答を作成');
    var thisTimeFeedbackDestinationId = changeDestination(thisTimeFeedbackFormId, thisTimeGoogleFormFolderId);
    outputLog(LogLevel.INFO, 'システム設定ファイルにフィードバックフォーム（回答）を設定');
    systemFileSheet.getRange(SystemFileSetting.POST_QUESTIONNAIRE_FORM_BOOK_ID).setValue(thisTimeFeedbackDestinationId);
  }

  return thisTimeFolderId;
}



