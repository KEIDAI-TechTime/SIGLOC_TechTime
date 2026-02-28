const FormType = {
  GMAIL_REGISTRATION_FORM: "Gmail登録フォーム",
  APPLICATION_FORM: "応募フォーム",
  ADMISSION_FORM: "入学フォーム",
  FEEDBACK_FORM: "事後報告フォーム"
};

/**
 * GoogleFormファイルのテスト
 * @param {Sheet} logSheetArg - ログ出力先シート
 * @param {Sheet} testSheetArg - テストシート
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
function testGoogleForm(logSheetArg, testSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime, applicationFormName, admissionFormName, feedbackFormName) {
  settingLog(logSheetArg, cmdNameArg);
  settingTest(TestType.TEST_GOOGLE_FORM, testSheetArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');
  checkString(applicationFormName, '応募フォーム名(変更前)');
  checkString(admissionFormName, '入学フォーム名(変更前)');
  checkString(feedbackFormName, '事後報告フォーム名(変更前)');

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


  // ここからチェックスタート
  //チェック対象の値クリア
  clearCheckResult(thisTime);

  // ★Gmail登録フォーム
  // Gmail登録フォーム
  // ※参照できるドライブに存在しないためチェック不可
  outputLog(LogLevel.INFO, FormType.GMAIL_REGISTRATION_FORM + 'は確認無し');
  updateResult(CheckListSetting.MAIL_CONFIRM_FORM_BOOK, TestResult.NONE, FormType.GMAIL_REGISTRATION_FORM, '');


  // Gmail登録フォーム（回答）
  outputLog(LogLevel.INFO, FormType.GMAIL_REGISTRATION_FORM + '（回答）を確認');
  // 設定と比較
  var thisMailConfirmFormBookId = systemFileSheet.getRange(SystemFileSetting.MAIL_CONFIRM_FORM_BOOK_ID).getValue();
  var thisMailConfirmFormBook = null;

  thisMailConfirmFormBook = checkSheetOpenById(thisMailConfirmFormBookId);

  if (checkResponse(thisMailConfirmFormBook, FormType.GMAIL_REGISTRATION_FORM + '（回答）', true, FormType.GMAIL_REGISTRATION_FORM + '（回答）')) {
    updateResult(CheckListSetting.MAIL_CONFIRM_FORM_BOOK_ID, TestResult.ERROR, FormType.GMAIL_REGISTRATION_FORM + '（回答）', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_BOOK_ID, TestResult.ERROR, FormType.GMAIL_REGISTRATION_FORM + '（回答）', 'ファイルが見つかりませんでした。');
    updateResult(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_SHEET_NAME, TestResult.WARN, FormType.GMAIL_REGISTRATION_FORM + '（回答）', 'ファイルが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.MAIL_CONFIRM_FORM_BOOK_ID, TestResult.SUCCESS, FormType.GMAIL_REGISTRATION_FORM + '（回答）', '');
    updateResult(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_BOOK_ID, TestResult.SUCCESS, FormType.GMAIL_REGISTRATION_FORM + '（回答）', '');

    // 回答シートチェック
    outputLog(LogLevel.INFO, FormType.GMAIL_REGISTRATION_FORM + '（回答）のシート名を確認');
    var sheetName = systemFileSheet.getRange(SystemFileSetting.MAIL_CONFIRM_FORM_SHEET_NAME).getValue();
    if (checkSheetName(thisMailConfirmFormBook, sheetName)) {
      updateResult(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_SHEET_NAME, TestResult.SUCCESS, FormType.GMAIL_REGISTRATION_FORM + '（回答）のシート名', '');
    } else {
      updateResult(CheckListSetting.SYSTEM_SETTING.MAIL_CONFIRM_FORM_SHEET_NAME, TestResult.ERROR, FormType.GMAIL_REGISTRATION_FORM + '（回答）のシート名', 'シート名が異なります。');
    }
  }


  // 応募フォーム と　応募フォーム（回答）
  checkForm(applicationFormName, FormType.APPLICATION_FORM, thisTimeGoogleFormFolderId, lastTime, thisTime, systemFileSheet)
  // 入学フォーム と　入学フォーム（回答）
  checkForm(admissionFormName, FormType.ADMISSION_FORM, thisTimeGoogleFormFolderId, lastTime, thisTime, systemFileSheet)
  // 事後報告フォーム　と　事後報告フォーム（回答）
  checkForm(feedbackFormName, FormType.FEEDBACK_FORM, thisTimeGoogleFormFolderId, lastTime, thisTime, systemFileSheet)

  return thisTimeFolderId;
}

/**
 * フォームと回答スプレッドシートのチェックを行う
 * @param {string} oldFormName - 前回のフォーム名
 * @param {FormType} formTypeName - フォームの種類
 * @param {string} thisTimeGoogleFormFolderId - 今回のGoogleフォームフォルダID
 * @param {string} lastTime - 前回開催回
 * @param {string} thisTime - 今回開催回
 * @param {Object} systemFileSheet - システムファイルシート
 */
function checkForm(oldFormName, formTypeName, thisTimeGoogleFormFolderId, lastTime, thisTime, systemFileSheet) {

  // フォームによって設定を変更
  switch (formTypeName) {
    case FormType.GMAIL_REGISTRATION_FORM:
    // 個別でロジック作成
    case FormType.APPLICATION_FORM:
      var formBookSetting = CheckListSetting.APPLICATION_FORM_BOOK;
      var formBookIdSetting = CheckListSetting.APPLICATION_FORM_BOOK_ID;
      var formBookIdSystemSetting = CheckListSetting.SYSTEM_SETTING.APPLICATION_FORM_BOOK_ID
      var formSheetNameSystemSetting = CheckListSetting.SYSTEM_SETTING.APPLICATION_FORM_SHEET_NAME;
      var formBookIdSystemSettingOrg = SystemFileSetting.APPLICATION_FORM_BOOK_ID;
      var formSheetNameSystemSettingOrg = SystemFileSetting.APPLICATION_FORM_SHEET_NAME;
      break;
    case FormType.ADMISSION_FORM:
      var formBookSetting = CheckListSetting.ENROLLMENT_FORM_BOOK;
      var formBookIdSetting = CheckListSetting.ENROLLMENT_FORM_BOOK_ID;
      var formBookIdSystemSetting = CheckListSetting.SYSTEM_SETTING.ENROLLMENT_FORM_BOOK_ID
      var formSheetNameSystemSetting = CheckListSetting.SYSTEM_SETTING.ENROLLMENT_FORM_SHEET_NAME;
      var formBookIdSystemSettingOrg = SystemFileSetting.ENROLLMENT_FORM_BOOK_ID;
      var formSheetNameSystemSettingOrg = SystemFileSetting.ENROLLMENT_FORM_SHEET_NAME;
      break;
    case FormType.FEEDBACK_FORM:
      var formBookSetting = CheckListSetting.POST_QUESTIONNAIRE_FORM_BOOK;　//フォーム
      var formBookIdSetting = CheckListSetting.POST_QUESTIONNAIRE_FORM_BOOK_ID; //回答スプシ
      var formBookIdSystemSetting = CheckListSetting.SYSTEM_SETTING.POST_QUESTIONNAIRE_FORM_BOOK_ID //回答のスプシID
      var formSheetNameSystemSetting = CheckListSetting.SYSTEM_SETTING.POST_QUESTIONNAIRE_FORM_SHEET_NAME;　//回答のシート名
      var formBookIdSystemSettingOrg = SystemFileSetting.POST_QUESTIONNAIRE_FORM_BOOK_ID; //回答のスプシID
      var formSheetNameSystemSettingOrg = SystemFileSetting.POST_QUESTIONNAIRE_FORM_SHEET_NAME; //回答のシート名
      break;
  }

  // フォームの確認
  var thisTimeFormName = oldFormName.replace(lastTime, thisTime);
  var thisTimeFormFileId = getFileId(thisTimeGoogleFormFolderId, thisTimeFormName);
  outputLog(LogLevel.INFO, formTypeName + 'を確認');
  if (checkResponse(thisTimeFormFileId, formTypeName, true, thisTimeFormName)) {
    updateResult(formBookSetting, TestResult.ERROR, formTypeName, 'ファイルが見つかりませんでした。');
  } else {
    updateResult(formBookSetting, TestResult.SUCCESS, formTypeName, '');
  }

  // 回答スプレッドシートの確認
  outputLog(LogLevel.INFO, formTypeName + '（回答）を確認');
  // 回答ファイルの検索
  var thisTimeAnsFileId = getFileId(thisTimeGoogleFormFolderId, thisTimeFormName + ' (Responses)');
  if (checkResponse(thisTimeAnsFileId, formTypeName + '（回答）', true, thisTimeFormName + ' (Responses)')) {
    updateResult(formBookIdSetting, TestResult.ERROR, formTypeName + '（回答）', 'ファイルが見つかりませんでした。');
    updateResult(formBookIdSystemSetting, TestResult.WARN, formTypeName + '（回答）', 'ファイルが見つかりませんでした。');
    updateResult(formSheetNameSystemSetting, TestResult.WARN, formTypeName + '（回答）のシート名', 'ファイルが見つかりませんでした。');
  } else {

    // 設定と比較
    if (systemFileSheet.getRange(formBookIdSystemSettingOrg).getValue() != thisTimeAnsFileId) {
      updateResult(formBookIdSystemSetting, TestResult.ERROR, formTypeName + '（回答）', 'ファイルIDが異なります。');
      updateResult(formSheetNameSystemSetting, TestResult.WARN, formTypeName + '（回答）のシート名', 'ファイルIDが異なります。');
    } else {
      updateResult(formBookIdSystemSetting, TestResult.SUCCESS, formTypeName + '（回答）', '');

      // リンクチェック
      outputLog(LogLevel.INFO, 'リンクが回答スプレッドシートのリンクと一致するか確認');
      if (thisTimeFormFileId) {
        var thisTimeFormDestination = getDestination(thisTimeFormFileId);
        if (thisTimeFormDestination) {
          if (thisTimeFormDestination == thisTimeAnsFileId) {
            updateResult(formBookIdSetting, TestResult.SUCCESS, formTypeName, '');
          } else {
            updateResult(formBookIdSetting, TestResult.ERROR, formTypeName, 'リンクが回答スプレッドシートのリンクと異なっています。');
          }
        } else {
          updateResult(formBookIdSetting, TestResult.ERROR, formTypeName, '回答スプレッドシートへのリンクが見つかりませんでした。');
        }
      } else {
        updateResult(formBookIdSetting, TestResult.WARN, formTypeName, 'フォームが見つかりませんでした。');
      }

      // 回答シートチェック
      outputLog(LogLevel.INFO, formTypeName + '（回答）のシート名を確認');
      var sheet = SpreadsheetApp.openById(thisTimeAnsFileId);
      var sheetName = systemFileSheet.getRange(formSheetNameSystemSettingOrg).getValue();
      if (checkSheetName(sheet, sheetName)) {
        updateResult(formSheetNameSystemSetting, TestResult.SUCCESS, formTypeName + '（回答）のシート名', '');
      } else {
        updateResult(formSheetNameSystemSetting, TestResult.ERROR, formTypeName + '（回答）のシート名', 'シート名が異なります。');
      }
    }
  }
}