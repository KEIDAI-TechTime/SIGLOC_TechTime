/**
 * 文字列であることをチェックする関数
 * @param {string} target - チェックする値
 * @param {string} targetName - 名前
 * @throws {Error} - 無効な場合にエラーをスローする
 */
function checkString(target, targetName) {
  if (!target || typeof target !== 'string' || target.length === 0) {
    throw new Error(`値が無効です: ${targetName}`);
  }
  return true;
}

/**
 * フォルダIDであることをチェックする関数
 * @param {string} targetId - チェックするフォルダID
 * @param {string} targetName - 名前
 * @throws {Error} - 無効な場合にエラーをスローする
 */
function checkFolderId(targetId, targetName) {
  if (!checkString(targetId, targetName)) return false;
  // ここでIDの形式をチェックする
  try {
    let file = DriveApp.getFolderById(targetId);
    if (!file) {
      throw new Error(`フォルダIDではありません: ${targetName}`);
    }
    return true;
  } catch (e) {
    if (e.message.includes("Unexpected error while getting the method or property")) {
      throw new Error(`フォルダが存在しないか権限がありません: ${targetName}`);
    } else if (e.message.includes("No item with the given ID could be found")) {
      throw new Error(`フォルダが見つかりません: ${targetName}`);
    } else {
      throw e;
    }
  }
}

/**
 * ファイルIDであることをチェックする関数
 * @param {string} targetId - チェックするファイルID
 * @param {string} targetName - 名前
 * @throws {Error} - 無効な場合にエラーをスローする
 */
function checkFileId(targetId, targetName) {
  if (!checkString(targetId, targetName)) return false;
  // ここでIDの形式をチェックする
  try {
    let file = DriveApp.getFileById(targetId);
    if (!file) {
      throw new Error(`ファイルIDではありません: ${targetName}`);
    }
    return true;
  } catch (e) {
    if (e.message.includes("Unexpected error while getting the method or property")) {
      throw new Error(`ファイルが存在しないか権限がありません: ${targetName}`);
    } else if (e.message.includes("No item with the given ID could be found")) {
      throw new Error(`フォルダが見つかりません: ${targetName}`);

    } else {
      throw e;
    }
  }
}

/**
 * レスポンスをチェックする関数
 * @param {Object} response - レスポンス
 * @param {string} targetName - 名前
 * @param {boolean} resumeFlg - 再開フラグ
 * @param {Object} options - オプション
 * @returns {boolean} - レスポンスが無効かどうか
 */
function checkResponse(response, targetName, resumeFlg, options) {
  if (!response) {
    if (resumeFlg) {
      outputLog(LogLevel.ERROR, `${targetName}が見つかりませんでした。| ${options}`);
    } else {
      throw new Error(`${targetName}が見つかりませんでした。| ${options}`);
    }
  }
  return !response;
}

/**
 * シート内に指定シート名のファイルがあるか確認する関数
 * @param {Sheet} sheet - シート
 * @param {string} sheetName - シート名
 * @returns {boolean} - ファイルがあるかどうか
 */
function checkSheetName(sheet, sheetName) {
  if (!sheet.getSheetByName(sheetName)) {
    return false;
  }
  return true;
}


/**
 * フォルダが空かどうかを確認する関数
 * @param {string} folderId - フォルダID
 * @returns {boolean} - 空かどうか
 */
function checkFolder(folderId) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var folders = folder.getFolders();
  if (files.hasNext() || folders.hasNext()) {
    return true;
  } else {
    return false;
  }
}
/**
 * ファイルのシートを開けるか確認
 * @param {string} fileId - ファイルID
 * @param {Sheet} file - ファイル
 * @returns {boolean} - エラーがあるかどうか
 */
function checkSheetOpenById(fileId) {

  var retFile = null;

  try {
    retFile = SpreadsheetApp.openById(fileId);
  } catch (e) {
    if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
      outputLog(LogLevel.WARN, "ファイルオープンエラー| ファイルが存在しないか、権限がありません。");
      outputLog(LogLevel.WARN, "　エラーファイル| " + fileId);
    } else if (e.message.includes("You do not have permission to access the requested document") || e.message.includes("リクエストされたドキュメントにアクセスする権限がありません。")) {
      outputLog(LogLevel.WARN, "ファイルオープンエラー| ファイルのアクセス権限がありません。");
      outputLog(LogLevel.WARN, "　エラーファイル| " + fileId);
    } else {
      outputLog(LogLevel.WARN, "予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
      outputLog(LogLevel.WARN, "　エラーファイル| " + fileId);
    }
    retFile = false;
  }

  return retFile
}