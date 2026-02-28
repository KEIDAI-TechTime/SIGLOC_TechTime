/**
 * 各種フォルダのテスト
 * @param {string} logSheetArg  - ログシート
 * @param {string} testSheetArg - テストシート名
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 * @returns 
 */
function testVariousFolder(logSheetArg, testSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
  settingLog(logSheetArg, cmdNameArg);
  settingTest(TestType.TEST_VARIOUS_FOLDER, testSheetArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');

  // ここからチェックスタート
  //チェック対象の値クリア
  clearCheckResult(thisTime);

  // ONLINE情報を確認
  outputLog(LogLevel.INFO, 'Onlineフォルダを確認');
  var thisTimeOnlineFolderId = getFolderId(thisTimeFolderId, "Online");
  if (checkResponse(thisTimeOnlineFolderId, '今回のOnlineフォルダ', true, 'Online')) {
    updateResult(CheckListSetting.ONLINE_FOLDER_ID, TestResult.ERROR, 'Onlineフォルダ', 'フォルダが見つかりませんでした。');
    // 今回のOnlineフォルダが見つからない場合は、以降の処理を行わない
    return thisTimeFolderId;
  } else {
    updateResult(CheckListSetting.ONLINE_FOLDER_ID, TestResult.SUCCESS, 'Onlineフォルダ', '');
  }

  // SYSTEM情報を確認
  outputLog(LogLevel.INFO, 'SYSTEMフォルダを確認');
  var existThisTimeSystemFolderId = false
  var thisTimeSystemFolderId = getFolderId(thisTimeOnlineFolderId, "SYSTEM");
  if (checkResponse(thisTimeSystemFolderId, '今回のSYSTEMフォルダ', true, 'SYSTEM')) {
    updateResult(CheckListSetting.SYSTEM_FOLDER_ID, TestResult.ERROR, 'SYSTEMフォルダ', 'フォルダが見つかりませんでした。');
    existThisTimeSystemFolderId = false
  } else {
    updateResult(CheckListSetting.SYSTEM_FOLDER_ID, TestResult.SUCCESS, 'SYSTEMフォルダ', '');
    existThisTimeSystemFolderId = true
  }

  // th_Student_WORKSPACE情報を確認
  outputLog(LogLevel.INFO, '_Student_WORKSPACEフォルダを確認');
  var thisTimethStudentWorkspaceFolderId = getFolderId(thisTimeOnlineFolderId, thisTime + '_Student_WORKSPACE');
  if (checkResponse(thisTimethStudentWorkspaceFolderId, '今回のth_Student_WORKSPACEフォルダ', true, thisTime + '_Student_WORKSPACE')) {
    updateResult(CheckListSetting.WORKSPACE_FOLDER_ID, TestResult.ERROR, '_Student_WORKSPACEフォルダ', 'フォルダが見つかりませんでした。');
    updateResult(CheckListSetting.PERSONAL_FOLDER_ID, TestResult.WARN, 'Personalフォルダ', 'Student_WORKSPACEフォルダが見つからないためスキップしました。');
    updateResult(CheckListSetting.MATERIALS_FOLDER_ID, TestResult.WARN, 'Materialsフォルダ', 'Student_WORKSPACEフォルダが見つからないためスキップしました。');
    updateResult(CheckListSetting.SHARED_FOLDER_ID, TestResult.WARN, 'Sharedフォルダ', 'Student_WORKSPACEフォルダが見つからないためスキップしました。');

  } else {
    updateResult(CheckListSetting.WORKSPACE_FOLDER_ID, TestResult.SUCCESS, '_Student_WORKSPACEフォルダ', '');

    //Personalフォルダを確認
    outputLog(LogLevel.INFO, 'Personalフォルダを確認');
    var thisTimePersonalFolderId = getFolderId(thisTimethStudentWorkspaceFolderId, "Personal");
    if (checkResponse(thisTimePersonalFolderId, '今回のPersonalフォルダ', true, 'Personal')) {
      updateResult(CheckListSetting.PERSONAL_FOLDER_ID, TestResult.ERROR, 'Personalフォルダ', 'フォルダが見つかりませんでした。');
    } else {
      updateResult(CheckListSetting.PERSONAL_FOLDER_ID, TestResult.SUCCESS, 'Personalフォルダ', '');
    }

    //Materialsフォルダを確認
    outputLog(LogLevel.INFO, 'Materialsフォルダを確認');
    var thisTimeMaterialsFolderId = getFolderId(thisTimethStudentWorkspaceFolderId, "Materials");
    if (checkResponse(thisTimeMaterialsFolderId, '今回のMaterialsフォルダ', true, 'Materials')) {
      updateResult(CheckListSetting.MATERIALS_FOLDER_ID, TestResult.ERROR, 'Materialsフォルダ', 'フォルダが見つかりませんでした。');
    } else {
      updateResult(CheckListSetting.MATERIALS_FOLDER_ID, TestResult.SUCCESS, 'Materialsフォルダ', '');
    }

    //Sharedフォルダを確認
    outputLog(LogLevel.INFO, 'Sharedフォルダを確認');
    var thisTimeSharedFolderId = getFolderId(thisTimethStudentWorkspaceFolderId, "Shared");
    if (checkResponse(thisTimeSharedFolderId, '今回のSharedフォルダ', true, 'Shared')) {
      updateResult(CheckListSetting.SHARED_FOLDER_ID, TestResult.ERROR, 'Sharedフォルダ', 'フォルダが見つかりませんでした。');
    } else {
      updateResult(CheckListSetting.SHARED_FOLDER_ID, TestResult.SUCCESS, 'Sharedフォルダ', '');
    }
  }

  // StudentWork_Template情報を確認
  outputLog(LogLevel.INFO, 'StudentWork_Templateフォルダを確認');
  if (existThisTimeSystemFolderId) {
    var thisTimeStudentWorkTemplateFolderId = getFolderId(thisTimeSystemFolderId, "StudentWork_Template");
    if (checkResponse(thisTimeStudentWorkTemplateFolderId, '今回のStudentWork_Templateフォルダ', true, 'StudentWork_Template')) {
      updateResult(CheckListSetting.TEMPLATE_FOLDER_ID, TestResult.ERROR, 'StudentWork_Templateフォルダ', 'フォルダが見つかりませんでした。');
    } else {
      updateResult(CheckListSetting.TEMPLATE_FOLDER_ID, TestResult.SUCCESS, 'StudentWork_Templateフォルダ', '');
    }
  } else {
    updateResult(CheckListSetting.TEMPLATE_FOLDER_ID, TestResult.WARN, 'StudentWork_Templateフォルダ', 'SYSTEMフォルダが見つからないためスキップしました。');
  }


  // translate情報を確認
  outputLog(LogLevel.INFO, 'translateフォルダを確認');
  if (existThisTimeSystemFolderId) {
    var thisTimeTranslateFolderId = getFolderId(thisTimeSystemFolderId, "translate");
    if (checkResponse(thisTimeTranslateFolderId, '今回のtranslateフォルダ', true, 'translate')) {
      updateResult(CheckListSetting.TRANSLATE_FOLDER_ID, TestResult.ERROR, 'translateフォルダ', 'フォルダが見つかりませんでした。');
    } else {
      updateResult(CheckListSetting.TRANSLATE_FOLDER_ID, TestResult.SUCCESS, 'translateフォルダ', '');
    }
  } else {
    updateResult(CheckListSetting.TRANSLATE_FOLDER_ID, TestResult.WARN, 'translateフォルダ', 'SYSTEMフォルダが見つからないためスキップしました。');
  }


  // 修了証情報を確認
  outputLog(LogLevel.INFO, '修了証を確認');
  if (existThisTimeSystemFolderId) {
    var thisTimeCertificateFolderId = getFolderId(thisTimeSystemFolderId, "修了証");
    if (checkResponse(thisTimeCertificateFolderId, '今回の修了証フォルダ', true, '修了証')) {
      updateResult(CheckListSetting.CERTIFICATE_FOLDER_ID, TestResult.ERROR, '修了証フォルダ', 'フォルダが見つかりませんでした。');
      updateResult(CheckListSetting.CERTIFICATE_ORIGINAL_FOLDER_ID, TestResult.WARN, '修了証原本フォルダ', '修了証フォルダが見つからないためスキップしました。');
      updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER_ID, TestResult.WARN, 'Certificate of Completionフォルダ', '修了証フォルダが見つからないためスキップしました。');
    } else {
      updateResult(CheckListSetting.CERTIFICATE_FOLDER_ID, TestResult.SUCCESS, '修了証フォルダ', '');

      // 修了証原本情報を確認
      outputLog(LogLevel.INFO, '修了証原本フォルダを確認');
      var thisTimeCertificateBaseFolderId = getFolderId(thisTimeCertificateFolderId, '修了証原本');
      if (checkResponse(thisTimeCertificateBaseFolderId, '今回の修了証原本フォルダ', true, '修了証原本')) {
        updateResult(CheckListSetting.CERTIFICATE_ORIGINAL_FOLDER_ID, TestResult.ERROR, '修了証原本フォルダ', 'フォルダが見つかりませんでした。');
      } else {
        updateResult(CheckListSetting.CERTIFICATE_ORIGINAL_FOLDER_ID, TestResult.SUCCESS, '修了証原本フォルダ', '');
      }

      // Certificate of Completion情報を確認
      outputLog(LogLevel.INFO, 'Certificate of Completionフォルダを確認');
      var thisTImeCertificateOfCompletionFolderId = getFolderId(thisTimeCertificateFolderId, 'Certificate of Completion');
      if (checkResponse(thisTImeCertificateOfCompletionFolderId, 'Certificate of Completionフォルダ', true, 'Certificate of Completion')) {
        updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER_ID, TestResult.ERROR, 'Certificate of Completionフォルダ', 'フォルダが見つかりませんでした。');
      } else {
        updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER_ID, TestResult.SUCCESS, 'Certificate of Completionフォルダ', '');
      }
    }
  } else {
    updateResult(CheckListSetting.CERTIFICATE_FOLDER_ID, TestResult.WARN, '修了証フォルダ', 'SYSTEMフォルダが見つからないためスキップしました。');
    updateResult(CheckListSetting.CERTIFICATE_ORIGINAL_FOLDER_ID, TestResult.WARN, '修了証原本フォルダ', 'SYSTEMフォルダが見つからないためスキップしました。');
    updateResult(CheckListSetting.CERTIFICATE_OF_COMPLETION_FOLDER_ID, TestResult.WARN, 'Certificate of Completionフォルダ', 'SYSTEMフォルダが見つからないためスキップしました。');
  }


  //TEACHERS情報を確認
  outputLog(LogLevel.INFO, 'TEACHERSフォルダを確認');
  var thisTimeTeachersFolderId = getFolderId(thisTimeOnlineFolderId, "TEACHERS");
  if (checkResponse(thisTimeTeachersFolderId, '今回のTEACHERSフォルダ', true, 'TEACHERS')) {
    updateResult(CheckListSetting.TEACHERS_FOLDER_ID, TestResult.ERROR, 'TEACHERSフォルダ', 'フォルダが見つかりませんでした。');
  } else {

    //TEACHERSフォルダ内のMaterial情報を確認
    outputLog(LogLevel.INFO, 'Materialフォルダを確認');
    var thisTimeMaterialFolderId = getFolderId(thisTimeTeachersFolderId, "Material");
    if (checkResponse(thisTimeMaterialFolderId, '今回のMaterialフォルダ', true, 'Material')) {
      updateResult(CheckListSetting.TEACHERS_FOLDER_ID, TestResult.ERROR, 'TEACHERSフォルダ', 'Materialフォルダが見つかりませんでした。');
    } else {
      //Materialフォルダ内の確認
      //フォルダ内にファイルかフォルダがあるか確認
      if (checkFolder(thisTimeMaterialFolderId)) {
        updateResult(CheckListSetting.TEACHERS_FOLDER_ID, TestResult.SUCCESS, 'TEACHERSフォルダ', '');
      } else {
        updateResult(CheckListSetting.TEACHERS_FOLDER_ID, TestResult.WARN, 'TEACHERSフォルダ', 'Materialフォルダが空です。');
      }
    }
  }


  //Google_Form情報を確認
  outputLog(LogLevel.INFO, 'Google_Formフォルダを確認');
  var thisTimeGoogleFormFolderId = getFolderId(thisTimeOnlineFolderId, "Google_Form");
  if (checkResponse(thisTimeGoogleFormFolderId, '今回のGoogle_Formフォルダ', true, 'Google_Form')) {
    updateResult(CheckListSetting.GOOGLE_FORM_FOLDER_ID, TestResult.ERROR, 'Google_Formフォルダ', 'フォルダが見つかりませんでした。');
  } else {
    updateResult(CheckListSetting.GOOGLE_FORM_FOLDER_ID, TestResult.SUCCESS, 'Google_Formフォルダ', '');
  }


  return thisTimeFolderId;
}