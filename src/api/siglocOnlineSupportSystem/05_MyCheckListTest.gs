/**
 * MyCheckListのテスト
 * @param {string} logSheetArg - ログシート
 * @param {string} testSheetArg - テストシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function testMyCheckList(logSheetArg, testSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
  settingLog(logSheetArg, cmdNameArg);
  settingTest(TestType.TEST_MY_CHECK_LIST, testSheetArg);

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
  var thisTimeStudentWorkTemplateFolderId = getFolderId(thisTimeSystemFolderId, "StudentWork_Template");
  if (checkResponse(thisTimeStudentWorkTemplateFolderId, '今回のStudentWork_Templateフォルダ', false, 'StudentWork_Template')) return;

  outputLog(LogLevel.INFO, '今回のMyChecklistファイル情報を取得');
  var thisTimeMyCheckListFileId = getFileId(thisTimeStudentWorkTemplateFolderId, "MyChecklist");
  if (checkResponse(thisTimeMyCheckListFileId, '今回のMyChecklistファイル', false, 'MyChecklist')) return;
  var thisTimeMyCheckListSheet = SpreadsheetApp.openById(thisTimeMyCheckListFileId).getSheetByName('Checklist');
  if (checkResponse(thisTimeMyCheckListSheet, '今回のMyChecklistファイルのChecklistシート', false, 'MyChecklist')) return;
  outputLog(LogLevel.INFO, '今回のMaterialフォルダ情報を取得');
  var thisTimeTeachersFolderId = getFolderId(thisTimeOnlineFolderId, "TEACHERS");
  if (checkResponse(thisTimeTeachersFolderId, '今回のTEACHERSフォルダ', false, 'TEACHERS')) return;
  var thisTimeMaterialFolderId = getFolderId(thisTimeTeachersFolderId, "Material");
  if (checkResponse(thisTimeMaterialFolderId, '今回のMaterialフォルダ', false, 'Material')) return;


  // ここからチェックスタート
  //チェック対象の値クリア
  clearCheckResult(thisTime);


  // Materialフォルダ内のファイルID一覧を取得
  var materialFolderFileIds = getAllFileIds(thisTimeMaterialFolderId);

  // MyCheckListのリンクが正しいかを確認
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "The FIRST Task is here! Way to go!", FreeSetting.MCL_0_1, CheckListSetting.MCL_0_1);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Pre-Course Overview", FreeSetting.MCL_0_2, CheckListSetting.MCL_0_2);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Participate Orientation or Watch movie", FreeSetting.MCL_0_3, CheckListSetting.MCL_0_3);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Add your self-intorduction to the MyOneSlide", FreeSetting.MCL_0_4, CheckListSetting.MCL_0_4);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Take the BEVI PreTask (will be opened AFTER the Orientation)", FreeSetting.MCL_0_5, CheckListSetting.MCL_0_5);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, thisTime + "_SIGLOC_MyOneSlide", FreeSetting.MCL_0_6, CheckListSetting.MCL_0_6);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Session1 Overview", FreeSetting.MCL_1_1, CheckListSetting.MCL_1_1);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Welcome Session", FreeSetting.MCL_1_2, CheckListSetting.MCL_1_2);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Make a constructive speech from the assgined position", FreeSetting.MCL_1_3, CheckListSetting.MCL_1_3);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Refute your opponent's argument", FreeSetting.MCL_1_4, CheckListSetting.MCL_1_4);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Review both refutations written by the opponents and write a reflection", FreeSetting.MCL_1_5, CheckListSetting.MCL_1_5);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Session2 Overview", FreeSetting.MCL_2_1, CheckListSetting.MCL_2_1);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Read sample books/ Make your picure book (Chapter 1) ", FreeSetting.MCL_2_2, CheckListSetting.MCL_2_2);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Analyzing issues and stakeholders / Add Chapter 2 to your picture book", FreeSetting.MCL_2_3, CheckListSetting.MCL_2_3);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Post a message to your Group channel (Slack)", FreeSetting.MCL_2_4, CheckListSetting.MCL_2_4);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Add comments to an assigned picture book made by other member", FreeSetting.MCL_2_5, CheckListSetting.MCL_2_5);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Add Chapter 3 to your picture book", FreeSetting.MCL_2_6, CheckListSetting.MCL_2_6);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Session3 Overview", FreeSetting.MCL_3_1, CheckListSetting.MCL_3_1);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Review and analyze your hypothesis and clarify the issue you will deal with (Chapter 4)", FreeSetting.MCL_3_2, CheckListSetting.MCL_3_2);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Add Chapter 5 to your picture book", FreeSetting.MCL_3_3, CheckListSetting.MCL_3_3);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Add comments to an assigned picture book made by other member", FreeSetting.MCL_3_4, CheckListSetting.MCL_3_4);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Reply to your member's comments and complete your picture book", FreeSetting.MCL_3_5, CheckListSetting.MCL_3_5);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Session4 Overview", FreeSetting.MCL_4_1, CheckListSetting.MCL_4_1);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Practice and present your picture book at the Final Presentation session", FreeSetting.MCL_4_2, CheckListSetting.MCL_4_2);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Send your feedback to other members'  final presentation", FreeSetting.MCL_4_3, CheckListSetting.MCL_4_3);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Review comments and revise your picture book", FreeSetting.MCL_4_4, CheckListSetting.MCL_4_4);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Attend a Closing Session", FreeSetting.MCL_4_5, CheckListSetting.MCL_4_5);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Session5 Overview", FreeSetting.MCL_5_1, CheckListSetting.MCL_5_1);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Write a Reflection Report", FreeSetting.MCL_5_2, CheckListSetting.MCL_5_2);
  checkMyCheckListLink(testSheetArg, thisTimeMyCheckListSheet, materialFolderFileIds, "Take the BEVI PostTask", FreeSetting.MCL_5_3, CheckListSetting.MCL_5_3);


  // C列の「Due (JST)」の締め切りが未入力か確認
  outputLog(LogLevel.INFO, '締め切りの確認（C列の「Due (JST)」の締め切りが未入力か確認）');
  //FreeSettingからMyChecklistのセル位置(カンマ区切り)を取得
  var myCheckListCellValue = testSheetArg.getRange(FreeSetting.MCL_DUE).getValue();
  if (myCheckListCellValue != '') {

    var isError = false; // エラーがあるかどうか
    // カンマ区切りでセル位置が入っているので、分割してループ
    var myCheckListCellValues = myCheckListCellValue.split(',');
    for (var i = 0; i < myCheckListCellValues.length; i++) {
      var cellValue = myCheckListCellValues[i].trim();
      // セル位置が入っているかどうか
      if (cellValue != '') {

        var dueValue = "";
        try {
          // セル位置を指定して、セルの値を取得
          // cellValueが不正な値の場合エラーとなるため、try-catchでエラーを回避
          // エラーの場合は、エラーメッセージを出力して締め切りのチェックを終了する
          dueValue = thisTimeMyCheckListSheet.getRange(cellValue).getValue(); //セルの範囲を取得
        } catch (e) {
          if (e.message.includes("Range not found") || e.message.includes("範囲は見つかりませんでした")) {
            outputLog(LogLevel.ERROR, "セル指定エラー| 指定元のセルの内容が不正か指摘先のセルが見つかりませんでした。");
            outputLog(LogLevel.ERROR, "セルの指定内容|" + cellValue);
          } else {
            outputLog(LogLevel.ERROR, "セル指定エラー| 予期せぬエラーが発生しました。" + e.message + "|" + e.stack);
          }
          isError = true;
        }

        // セルの値が空かどうか
        if (dueValue == '') {
          updateResult(CheckListSetting.MCL_DUE, TestResult.ERROR, '締め切り', '指摘先のセルが未入力です。｜セル位置' + cellValue);
          isError = true;
        }
      } else {
        updateResult(CheckListSetting.MCL_DUE, TestResult.ERROR, '締め切り', 'カンマで区切られた指定元のセルが未入力です。');
        isError = true;
      }
    }
    // カンマで区切られたセル位置の全てにエラーがなかった場合は成功
    if (!isError) {
      updateResult(CheckListSetting.MCL_DUE, TestResult.SUCCESS, '締め切り', '');
    }
  } else {
    updateResult(CheckListSetting.MCL_DUE, TestResult.ERROR, '締め切り', '指定元のセルが未入力です。');
  }


  // MyCheckListファイルの1~58行目が非表示になっているかを確認
  outputLog(LogLevel.INFO, '行を閉じるの確認（MyCheckListファイルの1~58行目が非表示になっているかを確認）');
  // 1~58行目が非表示になっているか確認
  var isError = false;
  var startRow = 1;
  var lastRow = 58;
  for (var i = startRow; i <= lastRow; i++) {
    if (!thisTimeMyCheckListSheet.isRowHiddenByUser(i)) {
      updateResult(CheckListSetting.MCL_CLOSE, TestResult.ERROR, '行を閉じる', '行が非表示になっていません。');
      isError = true
      break;
    }
  }
  // エラーがなかった場合は成功
  if (!isError) {
    updateResult(CheckListSetting.MCL_CLOSE, TestResult.SUCCESS, '行を閉じる', '');
  }

  return thisTimeFolderId;
}


/**
 * MyCheckListのリンクが正しいかを確認する
 * @param {Object} testSheetArg -- テストシート
 * @param {string} myCheckListFileId -- MyCheckListファイルID
 * @param {string[]} fileIds -- Materialフォルダ内のファイルID一覧
 * @param {string} targetItemName -- チェック対象の項目名
 * @param {string} targetFreeSetting -- チェック対象のFreeSetting
 * @param {string} targetCheckListSetting -- チェック対象のCheckListSetting
 */
function checkMyCheckListLink(testSheetArg, myCheckListSheet, fileIds, targetItemName, targetFreeSetting, targetCheckListSetting) {

  outputLog(LogLevel.INFO, targetItemName + 'を確認');

  //FreeSettingからMyChecklistのセル位置を取得
  var myCheckListCellValue = testSheetArg.getRange(targetFreeSetting).getValue();
  // セル情報が設定されているかどうか
  if (myCheckListCellValue == '') {
    updateResult(targetCheckListSetting, TestResult.ERROR, targetItemName, 'セル情報が設定されていません。');
  } else {

    var linkFileId = getLinkFileIdBySheetRange(myCheckListSheet, myCheckListCellValue)
    if (linkFileId == null) {
      updateResult(targetCheckListSetting, TestResult.ERROR, targetItemName, 'リンクが指定されていません。');
    } else {
      // リンクが正しいかどうか
      if (existFileIdInFileIds(fileIds, linkFileId)) {
        updateResult(targetCheckListSetting, TestResult.SUCCESS, targetItemName, '');
      } else {
        updateResult(targetCheckListSetting, TestResult.ERROR, targetItemName, 'リンク先のファイルが見つかりませんでした。');
      }
    }
  }
}