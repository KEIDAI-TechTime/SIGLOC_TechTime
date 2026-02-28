/**
 * 修了証の作成
 * @param {Sheet} logSheetArg - ログシート
 * @param {string} testSheetArg - テストシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @param {string} certificateOfCompletionName -前回の修了証ファイル名
 * @returns {string} - 今回フォルダのID
 */
function testCompletionCertificate(logSheetArg, testSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime, certificateOfCompletionName) {
  settingLog(logSheetArg, cmdNameArg);
  settingTest(TestType.TEST_COMPLETION_CERTIFICATE, testSheetArg);

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
  var thisTimeCertificateFolderId = getFolderId(thisTimeSystemFolderId, "修了証");
  if (checkResponse(thisTimeCertificateFolderId, '今回の修了証フォルダ', false, '修了証')) return;

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

  // 修了証情報を確認
  outputLog(LogLevel.INFO, '修了証を確認');
  var thisTimeCertificateOfCompletionFileId = getFileId(thisTimeCertificateFolderId, certificateOfCompletionName.replace(lastTime, thisTime));
  if (checkResponse(thisTimeCertificateOfCompletionFileId, '修了証ファイル', true, certificateOfCompletionName.replace(lastTime, thisTime))) {
    updateResult(CheckListSetting.CERTIFCARTE_OF_COMPLETION, TestResult.ERROR, '修了証ファイル', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BOOK_ID, TestResult.WARN, '修了証ファイル', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.CERTIFCARTE_OF_COMPLETION, TestResult.SUCCESS, '修了証ファイル', '');
    // システム設定ファイルの修了証情報を確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_BOOK_ID).getValue() != thisTimeCertificateOfCompletionFileId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BOOK_ID, TestResult.ERROR, '修了証ファイル', 'ファイルIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BOOK_ID, TestResult.SUCCESS, '修了証ファイル', '');
    }
  }

  // 修了証ファイルのシート名を確認
  outputLog(LogLevel.INFO, '修了証ファイルのシート名を確認');
  if (thisTimeCertificateOfCompletionFileId) {
    var certificateSheet = SpreadsheetApp.openById(thisTimeCertificateOfCompletionFileId);
    var certificateSheetName = systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_SHEET_NAME).getValue()
    if (checkSheetName(certificateSheet, certificateSheetName)) {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_SHEET_NAME, TestResult.SUCCESS, '修了証ファイルのシート名', '');
    }
    else {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_SHEET_NAME, TestResult.ERROR, '修了証ファイルのシート名', 'シート名が異なります。');
    }
  }
  else {
    updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_SHEET_NAME, TestResult.WARN, '修了証ファイルのシート名', 'ファイルが見つからないためスキップします。');
  }

  // 修了証原本のフォルダIDを確認
  outputLog(LogLevel.INFO, '修了証フォルダを確認');
  var thisTimeCertificateBaseFolderId = getFolderId(thisTimeCertificateFolderId, '修了証原本');
  if (checkResponse(thisTimeCertificateBaseFolderId, '修了証原本フォルダ', true, '修了証原本')) {
    updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_BASE_FOLDER, TestResult.ERROR, '修了証原本フォルダ', 'フォルダが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BASE_FOLDER_ID, TestResult.WARN, '修了証原本フォルダ', 'フォルダが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_BASE_FOLDER, TestResult.SUCCESS, '修了証原本フォルダ', '');
    // システム設定ファイルの修了証原本フォルダIDを確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_BASE_FOLDER_ID).getValue() != thisTimeCertificateBaseFolderId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BASE_FOLDER_ID, TestResult.ERROR, '修了証原本フォルダ', 'フォルダIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_BASE_FOLDER_ID, TestResult.SUCCESS, '修了証原本フォルダ', '');
    }
  }

  // Certificate of CompletionフォルダIDを確認
  outputLog(LogLevel.INFO, 'Certificate of Completionフォルダを確認');
  var thisTImeCertificateOfCompletionFolderId = getFolderId(thisTimeCertificateFolderId, 'Certificate of Completion');
  if (checkResponse(thisTImeCertificateOfCompletionFolderId, 'Certificate of Completionフォルダ', true, 'Certificate of Completion')) {
    updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER, TestResult.ERROR, 'Certificate of Completionフォルダ', 'フォルダが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_FOLDER_ID, TestResult.WARN, 'Certificate of Completionフォルダ', 'フォルダが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER, TestResult.SUCCESS, 'Certificate of Completionフォルダ', '');
    // システム設定ファイルのCertificate of CompletionフォルダIDを確認
    outputLog(LogLevel.INFO, 'システム設定ファイルの設定値を確認');
    if (systemFileSheet.getRange(SystemFileSetting.CERTIFICATE_FOLDER_ID).getValue() != thisTImeCertificateOfCompletionFolderId) {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_FOLDER_ID, TestResult.ERROR, 'Certificate of Completionフォルダ', 'フォルダIDが異なります。');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.CERTIFICATE_FOLDER_ID, TestResult.SUCCESS, 'Certificate of Completionフォルダ', '');
    }
  }

  return thisTimeFolderId;
}