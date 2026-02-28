/**
 * 修了証の作成
 * @param {Sheet} logSheetArg - ログシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function createCompletionCertificate(logSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime, certificateOfCompletionName) {

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
  var lastTimeCertificateFolderId = getFolderId(lastTimeSystemFolderId, "修了証");
  if (checkResponse(lastTimeCertificateFolderId, '前回の修了証フォルダ', false, '修了証')) return;
  var lastTimeCertificateOfCompletionFileId = getFileId(lastTimeCertificateFolderId, certificateOfCompletionName);
  if (checkResponse(lastTimeCertificateOfCompletionFileId, '前回の修了証', false, certificateOfCompletionName)) return;
  // 今回フォルダを検索
  outputLog(LogLevel.INFO, '今回のフォルダ情報を取得');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', false, 'Online')) return;
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', false, 'SYSTEM')) return;
  var thisTimeCertificateFolderId = getFolderId(thisTimeSystemFolderId, "修了証");
  if (checkResponse(thisTimeCertificateFolderId, '今回の修了証フォルダ', false, '修了証')) return;

  // システム設定ファイル
  outputLog(LogLevel.INFO, 'システム設定ファイルを取得');
  var thisTimeSystemFileId = getFileId(thisTimeSystemFolderId, "SIGLOCシステム設定ファイル");
  if (checkResponse(thisTimeSystemFileId, '今回のシステム設定ファイル', false, 'SIGLOCシステム設定ファイル')) return;
  var thisTimeSystemFile = SpreadsheetApp.openById(thisTimeSystemFileId);
  var systemFileSheet = thisTimeSystemFile.getSheetByName('SIGLOC_' + thisTime);
  if (checkResponse(systemFileSheet, '今回のシステム設定ファイルの設定シート', false, 'SIGLOC_' + thisTime)) return;

  // 修了証を前回からコピー＆リネーム
  outputLog(LogLevel.INFO, '修了証をコピーしリネーム');
  var thisTimeCertificateOfCompletionFileId = copyFileByFileId(lastTimeCertificateOfCompletionFileId, thisTimeCertificateFolderId, certificateOfCompletionName.replace(lastTime, thisTime));
  if (thisTimeCertificateOfCompletionFileId) {
    outputLog(LogLevel.INFO, 'システム設定ファイルに修了証を設定');
    systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_BOOK_ID).setValue(thisTimeCertificateOfCompletionFileId);
  }
  outputLog(LogLevel.INFO, '修了証原本のフォルダ情報を取得');
  var certificateOriginalFolderId = getFolderId(thisTimeCertificateFolderId, "修了証原本");
  if (!checkResponse(certificateOriginalFolderId, '今回の修了証原本フォルダ', true, '修了証原本')) {
    outputLog(LogLevel.INFO, 'システム設定ファイルに修了証原本フォルダを設定');
    systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_BASE_FOLDER_ID).setValue(certificateOriginalFolderId);
  }
  outputLog(LogLevel.INFO, 'Certificate of Completionフォルダ情報を取得');
  var certificateOfCompletionFolderId = getFolderId(thisTimeCertificateFolderId, "Certificate of Completion");
  if (!checkResponse(certificateOfCompletionFolderId, '今回のCertificate of Completionフォルダ', true, 'Certificate of Completion')) {
    outputLog(LogLevel.INFO, 'システム設定ファイルにCertificate of Completionフォルダを設定');
    systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_FOLDER_ID).setValue(certificateOfCompletionFolderId);
  }
  return thisTimeFolderId;
}