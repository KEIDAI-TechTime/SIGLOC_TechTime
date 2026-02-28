var linkRegex = /https:\/\/([^\/]+)\.google\.com\/(?:file|document|spreadsheets|presentation|forms|open)\/?(?:u\/\d\/)?(?:d\/(?:e\/)?|\?id=)([^\/#\?]+)/;
var idRegex = /[-\w]{16,}/;
var shortRegex = /https:\/\/forms\.gle\/[a-zA-Z0-9]+/;
var formRegex = /https:\/\/[a-zA-Z0-9.-]+\/forms\/d\/e\/[a-zA-Z0-9_-]+\/viewform(?:\?[a-zA-Z0-9=&_-]*)?/;
var logSheet;
var cmdName;
const LogLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

/**
 * フォルダのコピー
 * @param {string} sourceFolderId - コピー元フォルダのID
 * @param {string} destinationFolderId - コピー先フォルダのID
 * @param {string} oldKeyword - コピー元フォルダ名の置換前キーワード
 * @param {string} newKeyword - コピー先フォルダ名の置換後キーワード
 * @param {string} [newFolderName] - 新しいフォルダ名（省略可能）
 * @returns {string|null} - 新しいフォルダのID
 */
function copyFolder(sourceFolderId, destinationFolderId, oldKeyword, newKeyword, newFolderName) {
  var sourceFolder = DriveApp.getFolderById(sourceFolderId);
  var destinationFolder = DriveApp.getFolderById(destinationFolderId);

  var folderName = newFolderName || sourceFolder.getName().replace(oldKeyword, newKeyword);
  // すでに同じ名前のフォルダが存在する場合は何もしない
  var folders = destinationFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() === folderName) {
      return folder.getId();

    }
  }
  var newFolder = destinationFolder.createFolder(folderName);

  var files = sourceFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    var newFileName = file.getName().replace(oldKeyword, newKeyword);
    file.makeCopy(newFileName, newFolder);
  }

  var subfolders = sourceFolder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    copySubfolder(subfolder, newFolder, oldKeyword, newKeyword);
  }

  return newFolder.getId();
}

/**
 * サブフォルダのコピー
 * @param {Folder} sourceFolder - コピー元サブフォルダ
 * @param {Folder} destinationFolder - コピー先フォルダ
 * @param {string} oldKeyword - コピー元サブフォルダ名の置換前キーワード
 * @param {string} newKeyword - コピー先サブフォルダ名の置換後キーワード
 */
function copySubfolder(sourceFolder, destinationFolder, oldKeyword, newKeyword) {
  var newFolderName = sourceFolder.getName().replace(oldKeyword, newKeyword);
  var newFolder = destinationFolder.createFolder(newFolderName);

  var files = sourceFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    var newFileName = file.getName().replace(oldKeyword, newKeyword);
    file.makeCopy(newFileName, newFolder);
  }

  var subfolders = sourceFolder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    copySubfolder(subfolder, newFolder, oldKeyword, newKeyword);
  }
}

/**
 * 指定のフォルダIDに引数のフォルダ名でフォルダを作成する
 * @param {string} parentFolderId - 親フォルダのID
 * @param {string} folderName - 新しいフォルダ名
 * @returns {string} - 新しいフォルダのID
 */
function createFolder(parentFolderId, folderName) {
  var parentFolder = DriveApp.getFolderById(parentFolderId);
  // すでに同じ名前のフォルダが存在する場合は何もしない
  var folders = parentFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() === folderName) {
      return folder.getId();
    }
  }
  var folder = parentFolder.createFolder(folderName);
  return folder.getId();
}

/**
 * スプレッドシートの全てのシートについて指定行目以降を削除
 * @param {Spreadsheet} spreadsheet - 対象のスプレッドシート
 * @param {number} startRow - 削除開始行
 */
function deleteRows(spreadsheet, startRow) {
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var filter = sheet.getFilter()
    //フィルタがかかっていたら削除
    if (filter == null) {
    } else {
      sheet.getFilter().remove()
    }
    var rows = sheet.getLastRow();
    if (rows >= startRow) {
      var range = sheet.getRange(startRow, 1, rows - 1,sheet.getLastColumn());
      range.clear()
    }
  }
}

/**
 * スプレッドシートで指定のシート名以外を削除
 * @param {Spreadsheet} sheet - 対象のスプレッドシート
 * @param {string} sheetName - 削除しないシート名
 */
function deleteSheets(sheet, sheetName) {
  // スプレッドシート名を取得
  var spreadsheetName = sheet.getName();

  var sheets = sheet.getSheets();
  // 指定のシート名が存在しない場合は何もしない
  if (!sheet.getSheetByName(sheetName)) {
    // ログ出力 スプレッドシート名とシート名
    outputLog(LogLevel.WARN, `指定シートが見つからないため、シート削除を中止: ${spreadsheetName}| ${sheetName}`);
    return;
  }

  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== sheetName) {
      sheet.deleteSheet(sheets[i]);
    }
  }
}

/**
 * スプレッドシートの内容について2行目から59行目まで非表示
 * @param {Sheet} sheet - 対象のスプレッドシート
 */
function hideRows(sheet) {
  sheet.hideRows(2, 58);
}

/**
 * スプレッドシートのシート名を変更
 * @param {string} sheetId - スプレッドシートのID
 * @param {string} oldName - 変更前のシート名
 * @param {string} newName - 変更後のシート名
 */
function changeSheetName(sheetId, oldName, newName) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(oldName);
  // シートが存在しない場合は何もしない
  if (!sheet) {
    return;
  }
  sheet.setName(newName);
  return sheet;
}

/**
 * フォームの回答シートを変更
 * @param {string} formId - フォームのID
 * @param {string} folderId - 新しい回答シートのフォルダID
 */
function changeDestination(formId, folderId) {
  var file = DriveApp.getFileById(formId);  // DriveApp でファイルを取得
  var form = FormApp.openById(formId);
  // 回答先リンクを外す
  form.removeDestination();
  // 新しいスプレッドシートを作る
  var new_ss = createSpreadsheet(folderId, file.getName() + ' (Responses)');
  SpreadsheetApp.flush();
  // フォームにリンク付する
  form.setDestination(FormApp.DestinationType.SPREADSHEET, new_ss.getId());
  // 余計なシートを削除
  var sheet = new_ss.getSheetByName('シート1');
  if (sheet) {
    new_ss.deleteSheet(sheet);
  }
  return new_ss.getId();
}

/**
 * フォームからリンクを取得
 * @param {string} formId - フォームのID
 * @returns {string|null} - DestinationId
 */
function getDestination(formId) {
  var form = FormApp.openById(formId);

  var destination = null;
  try {
    // 回答シートへのリンクの無いフォームの場合、エラーとなるため回避する。
    destination = form.getDestinationId();
  } catch (e) {
    //フォームには現在応答先がありません。
    destination = null;
  }

  if (destination) {
    return destination;
  }
  return null;
}

/**
 * フォルダIDに新しくスプレッドを新規作成する
 * @param {string} folderId - フォルダID
 * @param {string} ssName - スプレッドシート名
 * @returns {Spreadsheet} - 新しいスプレッドシート
 */
function createSpreadsheet(folderId, ssName) {
  var folder = DriveApp.getFolderById(folderId);
  var ss;
  if (folder.getFilesByName(ssName).hasNext()) {
    var file = folder.getFilesByName(ssName).next();
    ss = SpreadsheetApp.openById(file.getId());
  } else {
    var ssId = SpreadsheetApp.create(ssName).getId();
    var file = DriveApp.getFileById(ssId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    ss = SpreadsheetApp.openById(ssId);
  }
  return ss;
}

/**
 * ドライブのフォルダから対象ファイルのIDを取得
 * @param {string} folderId - 対象フォルダのID
 * @param {string} fileName - 対象ファイルの名前
 * @returns {string|null} - ファイルのID
 */
function getFileId(folderId, fileName) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getName() === fileName) {
      return file.getId();
    }
  }
  return null;
}

/**
 * ドライブのフォルダから対象フォルダのIDを取得
 * @param {string} parentFolderId - 親フォルダのID
 * @param {string} folderName - 対象フォルダの名前
 * @returns {string|null} - フォルダのID
 */
function getFolderId(parentFolderId, folderName) {
  var parentFolder = DriveApp.getFolderById(parentFolderId);
  var folders = parentFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() === folderName) {
      return folder.getId();
    }
  }
  return null;
}

/**
 * スプレッドの指定カラムの内容を値毎に集計する
 * @param {string} sheetId - 対象スプレッドシートのID
 * @param {number} column - 対象の列番号
 * @param {string} separator - セパレータ（分割する文字列）
 * @param {boolean} includeBlanks - ブランクを含むかどうか
 * @returns {Object} - 集計結果
 */
function aggregate(sheetId, column, separator, includeBlanks) {
  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var values = {};
  for (var i = 1; i < data.length; i++) {
    var cellValue = data[i][column - 1];
    if (!includeBlanks && !cellValue) {
      continue;
    }
    if (separator) {
      var splitValues = cellValue.split(separator);
      for (var j = 0; j < splitValues.length; j++) {
        var value = splitValues[j].trim();
        if (values[value]) {
          values[value]++;
        } else {
          values[value] = 1;
        }
      }
    } else {
      var value = cellValue;
      if (values[value]) {
        values[value]++;
      } else {
        values[value] = 1;
      }
    }
  }

  // 配列の中身をソート
  var sortedValues = Object.keys(values).sort().reduce((obj, key) => {
    obj[key] = values[key];
    return obj;
  }, {});

  return sortedValues;
}

/**
 * スプレッドの指定カラムの内容をリスト化して順番をランダムにして出力
 * @param {string} sheetId - 対象スプレッドシートのID
 * @param {number} column - 対象の列番号
 * @returns {Array} - ランダムに並び替えたリスト
 */
function shuffle(sheetId, column) {
  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var values = [];
  for (var i = 1; i < data.length; i++) {
    var cellValue = data[i][column - 1];
    if (typeof cellValue === 'string') {
      var value = cellValue.trim();
      if (value && value !== '\n') {
        values.push(value);
      }
    }
  }
  for (var i = values.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = values[i];
    values[i] = values[r];
    values[r] = tmp;
  }
  return values;
}

/**
 * 指定した文字列を日本語翻訳して戻り値として返す
 * @param {string} text - 翻訳する文字列
 * @returns {string} - 翻訳後の文字列
 */
function translate(text) {
  try {
    var translatedText = LanguageApp.translate(text, 'en', 'ja');
    return translatedText;
  } catch (e) {
    if ((e.message.includes('Service invoked too many times')) || (e.message.includes('を実行した回数が多すぎます。'))) {
      outputLog(LogLevel.ERROR, "翻訳の上限に達しました。以降の内容は原文のそのまま出力します。");
      return ; // 翻訳できない場合は元のテキストを返す
    } else {
      throw e; // その他のエラーは再スロー
    }
  }
}

/**
 * 指定したファイルを指定したフォルダにコピー
 * @param {string} docId - 対象ドキュメントのID
 * @param {string} folderId - コピー先フォルダのID
 * @param {string} [newFileName] - 新しいファイル名（省略可能）
 * @returns {string} - 新しいファイルのID
 */
function copyFileByFileId(docId, folderId, newFileName) {
  var doc = DriveApp.getFileById(docId);
  var folder = DriveApp.getFolderById(folderId);
  var fileName = newFileName || doc.getName();
  // すでに同じ名前のファイルが存在する場合は何もしない
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getName() === fileName) {
      outputLog(LogLevel.WARN, `ファイルが既に存在するためコピー中止: ${fileName}`);
      return file.getId();
    }
  }
  var newDoc = doc.makeCopy(fileName, folder);

  return newDoc.getId();
}

/**
 * 指定ファイル名のファイルをコピーする(同名コピー)
 * @param {string} folderId - コピー元フォルダのID
 * @param {string} newFolderId - コピー先フォルダのID
 * @param {string} fileName - コピーするファイル名
 * @returns {string} - 新しいファイルのID
 */
function copyFileByFolderId(folderId, newFolderId, fileName) {
  var fileId = getFileId(folderId, fileName);
  // ファイルが存在しない場合は何もしない
  if (!fileId) {
    outputLog(LogLevel.WARN, `コピー元ファイルが見つからないためコピー中止: ${fileName}`);
    return null;
  }
  var newFileId = copyFileByFileId(fileId, newFolderId);
  return newFileId;
}

/**
 * 対象ファイルにある資料の内容を確認する
 * @param {string} targetFileId - 置換対象ファイルID
 * @param {string} materialFolderId - 参照先フォルダのID
 * @param {string} materialsFolderId - 参照元フォルダのID
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード 
 * @param {string} sheetName - シート名
 */
function replaceLinks(targetFileId, materialFolderId, materialsFolderId, oldKeyword, newKeyword, sheetName) {
  var fileMap = {};
  var formMap = {};

  getAllFilesRecursively(materialFolderId, fileMap);
  getAllFilesRecursivelyFrom(materialsFolderId, formMap);

  var file = DriveApp.getFileById(targetFileId);
  var mimeType = file.getMimeType();
  switch (mimeType) {
    case "application/vnd.google-apps.document":
      replaceLinksInDoc(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
      break;
    case "application/vnd.google-apps.spreadsheet":
      replaceLinksInSheet(file.getId(), fileMap, formMap, oldKeyword, newKeyword, sheetName);
      break;
    case "application/vnd.google-apps.presentation":
      replaceLinksInSlides(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
      break;
    case "application/vnd.google-apps.form":
      replaceLinksInForm(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
      break;
  }
}

/**
 * 対象フォルダにある資料の内容を確認する
 * @param {string} targetFileFolderId - 置換対象フォルダのID
 * @param {string} materialFolderId - 参照先フォルダのID
 * @param {string} materialsFolderId - 参照元フォルダのID
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード
 */
function replaceLinksInFiles(targetFileFolderId, materialFolderId, materialsFolderId, oldKeyword, newKeyword) {
  var fileMap = {};
  var formMap = {};
  getAllFilesRecursively(materialFolderId, fileMap);
  getAllFilesRecursivelyFrom(materialsFolderId, formMap);
  var folder1Files = getAllFilesRecursively(targetFileFolderId);
  folder1Files.forEach(file => {
    var mimeType = file.getMimeType();
    switch (mimeType) {
      case "application/vnd.google-apps.document":
        replaceLinksInDoc(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
        break;
      case "application/vnd.google-apps.spreadsheet":
        replaceLinksInSheet(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
        break;
      case "application/vnd.google-apps.presentation":
        replaceLinksInSlides(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
        break;
      case "application/vnd.google-apps.form":
        replaceLinksInForm(file.getId(), fileMap, formMap, oldKeyword, newKeyword);
        break;
    }
  });
}

/**
 * フォルダ内の全ファイルIDを再帰的に取得
 * @param {string} folderId - フォルダのID
 * @returns {Array} - ファイルリスト
 */
function getAllFileIds(folderId) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var fileIdList = [];

  while (files.hasNext()) {
    var file = files.next();
    fileIdList.push(file.getId());
  }

  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    fileIdList = fileIdList.concat(getAllFileIds(subFolder.getId()));
  }

  return fileIdList;
}

/**
 * フォルダ内の全ファイルを再帰的に取得
 * @param {string} folderId - フォルダのID
 * @param {Object} [fileMap] - ファイルマップ（省略可能）
 * @param {Object} [formMap] - Formマップ（省略可能）
 * @returns {Array} - ファイルリスト
 */
function getAllFilesRecursively(folderId, fileMap = null) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var fileList = [];

  while (files.hasNext()) {
    var file = files.next();
    if (fileMap) {
      fileMap[file.getName().trim()] = file.getId();
    }
    fileList.push(file);
  }

  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    fileList = fileList.concat(getAllFilesRecursively(subFolder.getId(), fileMap));
  }

  return fileList;
}
/**
 * フォルダ内の全Formファイルを再帰的に取得
 * @param {string} folderId - フォルダのID
 * @param {Object} [formMap] - Formマップ（省略可能）
 */
function getAllFilesRecursivelyFrom(folderId, formMap = null) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    if (formMap) {
      if (file.getMimeType() == 'application/vnd.google-apps.form') {
        // 回答フォームと編集フォームの変換用マップを作成
        var form = FormApp.openById(file.getId());
        var publishedUrl = form.getPublishedUrl();
        var publishedId = publishedUrl.split("/")[6];
        var formName = file.getName().trim();
        formMap[publishedId] = formName;
      }
    }
  }

  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    getAllFilesRecursivelyFrom(subFolder.getId(), formMap);
  }
}
/**
 * ファイルIDからURLを取得
 * @param {string} fileId - ファイルID
 * @returns {string} - ファイルURL
 */
function getFileUrl(fileId) {
  return "https://drive.google.com/open?id=" + fileId;
}

/**
 * ドキュメント内のリンクを置換
 * @param {string} docId - ドキュメントID
 * @param {Object} fileMap - ファイルマップ
 * @param {Object} formMap - Formマップ
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード
 */
function replaceLinksInDoc(docId, fileMap, formMap, oldKeyword, newKeyword) {
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();

  var links = getAllLinks(body);

  for (var l = 0; l < links.length; l++) {
    var link = links[l];
    var shortUrl = "";
    //短縮URLの場合
    if (link.url.match(shortRegex)) {
      shortUrl = link.url;
      var formId = cnvFormShortUrlToPublishedId(link.url);
      if (!formId) continue;

      //下記処理に流すため公開用フォームIDで正規表現にマッチするように変更
      link.url = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
    }

    var match = link.url.match(linkRegex);
    if (match) {
      var fileId = match[2];
      try {
        // urlがフォームの場合(formRegex)
        if (link.url.match(formRegex)) {
          // 回答用フォームのIDを取得
          var publishedFormId = link.url.split("/")[6];
          var fileName = formMap[publishedFormId]　//回答用フォームIDから編集用フォームIDを取得
          if (fileName) {
            fileName = fileName.replace(oldKeyword, newKeyword);
            //materialフォルダ内にファイルが存在するか確認
            if (fileMap[fileName]) {
              //編集用フォームを取得
              var form = FormApp.openById(fileMap[fileName]);
              var newFormUrl = form.getPublishedUrl(); // 回答用URLを取得
              var newtext = link.text;
              if ((link.text.match(formRegex)) || (link.text.match(shortRegex))) {
                if (shortUrl) {
                  newtext = newtext.replace(shortUrl, newFormUrl);
                } else {
                  newtext = newtext.replace(link.url, newFormUrl);
                }
              } else {
                newtext = newtext.replace(oldKeyword, newKeyword);
              }
              link.element.setText(link.element.getText().replace(link.text, newtext));
              link.element.setLinkUrl(link.startOffset, link.startOffset + newtext.length - 1, newFormUrl);


            } else {
              outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがMaterialフォルダに存在しません。");
              outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
              outputLog(LogLevel.WARN, "　エラーリンク先フォーム| " + fileName);
              if (shortUrl) {
                outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
              }
            }
          } else {
            outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがコピー元XXth_Student_WORKSPACE/Materialsフォルダに存在しません。");
            outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
            outputLog(LogLevel.WARN, "　エラーリンク先回答フォーム| " + publishedFormId);

          }
        } else {

          var fileName = DriveApp.getFileById(fileId).getName().trim().replace(oldKeyword, newKeyword);
          if (fileMap[fileName]) {
            var newtext = link.text;
            if (link.text.match(linkRegex)) {
              newtext = newtext.replace(link.url, getFileUrl(fileMap[fileName]));
            } else {
              newtext = newtext.replace(oldKeyword, newKeyword);
            }
            link.element.setText(link.element.getText().replace(link.text, newtext));
            link.element.setLinkUrl(link.startOffset, link.startOffset + newtext.length - 1, getFileUrl(fileMap[fileName]));
          } else {
            outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
            outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
            outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId);
          }
        }
      } catch (e) {
        if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
          outputLog(LogLevel.WARN, "リンク置換エラー| ファイルが存在しないか、権限がありません。");
          outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
          outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
        } else {
          outputLog(LogLevel.WARN, "リンク置換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
          outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
          outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
        }
      }
    }
  }


  // リッチリンクのリンクを検索して置き換え
  var searchResult = body.findElement(DocumentApp.ElementType.RICH_LINK);

  while (searchResult) {
    var element = searchResult.getElement();
    var richLink = element.asRichLink();
    if (richLink.getType() === DocumentApp.ElementType.RICH_LINK) {
      var url = richLink.getUrl(); // Googleドライブのリンク or Webリンク

      // Googleドライブのファイルリンクの場合
      var match = url.match(linkRegex);
      if (match) {
        var fileId = match[2]; // ファイルIDを取得
        try {
          var fileName = DriveApp.getFileById(fileId).getName().trim().replace(oldKeyword, newKeyword);
          if (fileMap[fileName]) {
            //更新方法がない
            outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルが置き換えできません。スマートチップの可能性があります。"); // エラーメッセージ
            outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName()); // エラーファイル名     
            outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId); // エラーリンク先ファイル名

          } else {
            outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
            outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
            outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId);
          }
        } catch (e) {
          if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
            outputLog(LogLevel.WARN, "リンク置換エラー| ファイルが存在しないか、権限がありません。");
            outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
            outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
          } else {
            outputLog(LogLevel.WARN, "リンク置換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
            outputLog(LogLevel.WARN, "　エラーファイル| " + doc.getName());
            outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
          }
        }
      }
    }
    // 次の `RICH_LINK` を検索
    searchResult = body.findElement(DocumentApp.ElementType.RICH_LINK, searchResult);
  }

  doc.saveAndClose();
}


/**
 * Document内のリンクを取得
 * @param {DocumentApp.Element} element - Documentの要素
 * @returns {Array} - リンクリスト
 */
function getAllLinks(element) {
  var links = [];
  element = element || DocumentApp.getActiveDocument().getBody();

  if (element.getType() === DocumentApp.ElementType.TEXT) {
    var textObj = element.editAsText();
    var text = element.getText();
    var inUrl = false;
    for (var ch = 0; ch < text.length; ch++) {
      var url = textObj.getLinkUrl(ch);
      if (url != null) {
        if (!inUrl) {
          // We are now!
          inUrl = true;
          var curUrl = {};
          curUrl.element = element;
          curUrl.url = String(url);
          curUrl.startOffset = ch;
          curUrl.endOffsetInclusive = ch;
          curUrl.text = text.substring(curUrl.startOffset, curUrl.endOffsetInclusive + 1);
        }
        else {
          curUrl.endOffsetInclusive = ch;
          curUrl.text = text.substring(curUrl.startOffset, curUrl.endOffsetInclusive + 1);
        }
      }
      else {
        if (inUrl) {
          inUrl = false;
          links.push(curUrl);
          curUrl = {};
        }
      }
    }
    if (inUrl) {
      links.push(curUrl);
    }
  }
  else {
    // childを持てないElementはエラーになるのでここで除外する
    try {

      var numChildren = element.getNumChildren();
    } catch (e) {
      if (e.message.includes(".getNumChildren is not a function")) {
        // 子要素がないエレメントはスルー
        numChildren = -1;
      } else {
        throw (e);
      }
    }

    for (let i = 0; i < numChildren; i++) {
      const childElement = element.getChild(i);
      links = links.concat(getAllLinks(childElement));
    }
  }

  return links;
}


/**
 * スプレッドシート内のリンクを置換
 * @param {string} sheetId - スプレッドシートID
 * @param {Object} fileMap - ファイルマップ
 * @param {Object} formMap - Formマップ
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード
 * @param {string} sheetName - シート名
 */
function replaceLinksInSheet(sheetId, fileMap, formMap, oldKeyword, newKeyword, sheetName) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheets = sheetName ? [ss.getSheetByName(sheetName)] : ss.getSheets();

  sheets.forEach(sheet => {
    var range = sheet.getDataRange();
    var values = range.getValues(); // スマートチップ用
    // データカラムの最後の列を取得
    var richTexts = range.getRichTextValues(); // リッチテキスト用

    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < values[i].length; j++) {

        var text = values[i][j]; // セルのテキスト
        var textOrg = values[i][j]; // セルのテキスト退避用
        var rt = richTexts[i][j]; // 既存のリッチテキスト
        var builder = SpreadsheetApp.newRichTextValue().setText(rt.getText()); // 書式維持
        var cell = sheet.getRange(i + 1, j + 1)
        var shortUrl = "";

        // 1️⃣ スマートチップの処理（セル全体がURLの場合）
        if (typeof text === "string") {

          // Form短縮URLの場合
          var shortMatch = text.match(shortRegex);
          if (shortMatch) {
            shortUrl = shortMatch[0];
            var formId = cnvFormShortUrlToPublishedId(shortUrl);
            //下記処理に流すため公開用フォームIDで正規表現にマッチするように変更
            url = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
            text = text.replace(shortUrl, url)
          }


          var match = text.match(linkRegex);
          if (match) {
            var fileId = match[2]; // IDを取得
            try {


              // urlがフォームの場合(forms viewform)
              if (text.match(formRegex)) {
                // 回答用フォームのIDを取得
                var publishedFormId = text.split("/")[6];
                var fileName = formMap[publishedFormId]　//回答用フォームIDから編集用フォームIDを取得
                if (fileName) {
                  fileName = fileName.replace(oldKeyword, newKeyword);
                  //materialフォルダ内にファイルが存在するか確認
                  if (fileMap[fileName]) {
                    //編集用フォームを取得
                    var form = FormApp.openById(fileMap[fileName]);
                    newUrl = form.getPublishedUrl(); // 回答用URLを取得
                    var newText = text;
                    var matchUrl = text.match(formRegex)
                    newText = text.replace(matchUrl[0], newUrl);
                    if (textOrg !== newText) {
                      builder.setText(newText);
                    }
                    builder.setLinkUrl(newUrl);
                    cell.setRichTextValue(builder.build());

                    continue;

                  } else {
                    outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがMaterialフォルダに存在しません。");
                    outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                    outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                    outputLog(LogLevel.WARN, "　エラーリンク先フォーム| " + fileName + "|" + fileId);
                    if (shortUrl) {
                      outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
                    }
                    outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                  }
                } else {
                  outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがコピー元XXth_Student_WORKSPACE/Materialsフォルダに存在しません。");
                  outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                  outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                  outputLog(LogLevel.WARN, "　エラーリンク先回答フォーム| " + publishedFormId);
                  if (shortUrl) {
                    outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
                  }
                  outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                }
              } else {
                var fileName = DriveApp.getFileById(fileId).getName().trim().replace(oldKeyword, newKeyword);

                if (fileMap[fileName]) {
                  var newUrl = getFileUrl(fileMap[fileName]);

                  // スマートチップのテキストとURL変更
                  var newText = text.replace(match[0], newUrl);
                  builder.setText(newText.replace(oldKeyword, newKeyword));
                  builder.setLinkUrl(newUrl);
                  cell.setRichTextValue(builder.build());

                  continue;
                } else {
                  outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
                  outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                  outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                  outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId);
                  outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                  continue;
                }
              }
            } catch (e) {
              if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
                outputLog(LogLevel.WARN, "リンク置換エラー| ファイルが存在しないか、権限がありません。");
                outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
                outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                continue;
              } else {
                outputLog(LogLevel.WARN, "リンク置換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
                outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
                outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                continue;
              }
            }
          }
        }

        // 2️⃣ リッチテキスト（セル内の一部にリンクがある場合）
        var runs = rt.getRuns();
        runs.forEach(run => {
          var segmentText = run.getText();
          var link = run.getLinkUrl();

          if (link) {
            // Form短縮URLの場合
            if (link.match(shortRegex)) {
              var formId = cnvFormShortUrlToPublishedId(link);
              //下記処理に流すため公開用フォームIDで正規表現にマッチするように変更
              link = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
            }

            var match = link.match(linkRegex);
            var newUrl = link;
            if (match) {
              var fileId = match[2];
              try {

                // urlがフォームの場合(forms viewform)
                if (newUrl.match(formRegex)) {
                  // 回答用フォームのIDを取得
                  var publishedFormId = newUrl.split("/")[6];
                  var fileName = formMap[publishedFormId]　//回答用フォームIDから編集用フォームIDを取得
                  if (fileName) {
                    fileName = fileName.replace(oldKeyword, newKeyword);
                    //materialフォルダ内にファイルが存在するか確認
                    if (fileMap[fileName]) {
                      //編集用フォームを取得
                      var form = FormApp.openById(fileMap[fileName]);
                      newUrl = form.getPublishedUrl(); // 回答用URLを取得
                      var newText = segmentText;
                      if ((segmentText.match(formRegex)) || (segmentText.match(shortRegex))) {
                        newText = newUrl;
                      } else {
                        newText = segmentText.replace(oldKeyword, newKeyword);
                      }
                      if (newText !== segmentText) {
                        builder.setText(text.replace(segmentText, newText));
                      }
                      builder.setLinkUrl(run.getStartIndex(), run.getStartIndex() + newText.length, newUrl);
                      cell.setRichTextValue(builder.build());

                    } else {
                      outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがMaterialフォルダに存在しません。");
                      outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                      outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                      outputLog(LogLevel.WARN, "　エラーリンク先フォーム| " + fileName + "|" + fileId);
                      if (shortUrl) {
                        outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
                      }
                      outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                    }
                  } else {
                    outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがコピー元XXth_Student_WORKSPACE/Materialsフォルダに存在しません。");
                    outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                    outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                    outputLog(LogLevel.WARN, "　エラーリンク先回答フォーム| " + publishedFormId);
                    if (shortUrl) {
                      outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
                    }
                    outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                  }
                } else {

                  var fileName = DriveApp.getFileById(fileId).getName().trim().replace(oldKeyword, newKeyword);

                  if (fileMap[fileName]) {
                    var newId = fileMap[fileName];
                    newUrl = getFileUrl(fileMap[fileName]);
                    var newText = segmentText.replace(fileId, newId).replace(oldKeyword, newKeyword);

                    if (newText !== segmentText) {
                      builder = builder.setText(text.replace(segmentText, newText));
                    }

                    builder = builder.setLinkUrl(run.getStartIndex(), run.getStartIndex() + newText.length, newUrl);
                    cell.setRichTextValue(builder.build());

                  } else {
                    outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
                    outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                    outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                    outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId);
                    outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                  }
                }

              } catch (e) {
                if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
                  outputLog(LogLevel.WARN, "リンク置換エラー| ファイルが存在しないか、権限がありません。");
                  outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                  outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                  outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
                  outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                } else {
                  outputLog(LogLevel.WARN, "リンク置換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
                  outputLog(LogLevel.WARN, "　エラーファイル| " + ss.getName());
                  outputLog(LogLevel.WARN, "　エラーシート| " + sheet.getName());
                  outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
                  outputLog(LogLevel.WARN, "　エラーセル| " + (i + 1) + "行" + (j + 1) + "列");
                }
              }
            }
          }
        });
      }
    }
  });
}


/**
 * スライド内のリンクを置換
 * @param {string} slideId - スライドID
 * @param {Object} fileMap - ファイルマップ
 * @param {Object} formMap - Formマップ
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード
 */
function replaceLinksInSlides(slideId, fileMap, formMap, oldKeyword, newKeyword) {
  var presentation = SlidesApp.openById(slideId);
  var slides = presentation.getSlides();

  slides.forEach(slide => {
    var elements = slide.getPageElements();
    elements.forEach(element => {
      if (element.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
        var shape = element.asShape();
        var textRange = shape.getText();

        for (var i = 0; i < textRange.getRuns().length; i++) {
          var run = textRange.getRuns()[i];
          var textStyle = run.getTextStyle();
          var link = textStyle.getLink();
          var linkOrg = textStyle.getLink();
          var shortUrl = "";
          if (link && link.getUrl()) {
            var newUrl = link.getUrl();
            // Form短縮URLの場合
            if (newUrl.match(shortRegex)) {
              shortUrl = newUrl;
              //短縮をに置き換え
              var formId = cnvFormShortUrlToPublishedId(newUrl);
              //下記処理に流すため公開用フォームIDで正規表現にマッチするように変更
              newUrl = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
            }

            var match = newUrl.match(linkRegex);
            if (match) {
              var fileId = match[2]; // ファイルIDを取得
              try {

                // urlがフォームの場合(forms viewform)
                if (newUrl.includes("forms")) {
                  // 回答用フォームのIDを取得
                  var publishedFormId = newUrl.split("/")[6];
                  var fileName = formMap[publishedFormId]　//回答用フォームIDから編集用フォームIDを取得
                  if (fileName) {
                    fileName = fileName.replace(oldKeyword, newKeyword);
                    //materialフォルダ内にファイルが存在するか確認
                    if (fileMap[fileName]) {
                      //編集用フォームを取得
                      var form = FormApp.openById(fileMap[fileName]);
                      newUrl = form.getPublishedUrl(); // 回答用URLを取得
                      // テキストを更新
                      run.replaceAllText(linkOrg.getUrl(), newUrl);
                      run.replaceAllText(oldKeyword, newKeyword);
                      // リンクを更新
                      textStyle.setLinkUrl(newUrl);

                    } else {
                      outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
                      outputLog(LogLevel.WARN, "　エラーファイル| " + presentation.getName());
                      outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId);
                      if (shortUrl) {
                        outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
                      }
                    }
                  } else {
                    outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがコピー元XXth_Student_WORKSPACE/Materialsフォルダに存在しません。");
                    outputLog(LogLevel.WARN, "　エラーファイル| " + presentation.getName());
                    outputLog(LogLevel.WARN, "　エラーリンク先回答フォーム| " + publishedFormId);
                    if (shortUrl) {
                      outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
                    }
                  }
                } else {
                  var fileName = DriveApp.getFileById(fileId).getName().trim().replace(oldKeyword, newKeyword);
                  if (fileMap[fileName]) {
                    var newUrl = getFileUrl(fileMap[fileName]);
                    // テキストを更新
                    run.replaceAllText(link.getUrl(), newUrl);
                    run.replaceAllText(oldKeyword, newKeyword);
                    // リンクを更新
                    textStyle.setLinkUrl(newUrl);

                  } else {
                    outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
                    outputLog(LogLevel.WARN, "　エラーファイル| " + presentation.getName());
                    outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName + "|" + fileId);
                    continue;
                  }
                }
              }
              catch (e) {
                if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
                  outputLog(LogLevel.WARN, "リンク置換エラー| ファイルが存在しないか、権限がありません。");
                  outputLog(LogLevel.WARN, "　エラーファイル| " + presentation.getName());
                  outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);

                  continue;
                } else {
                  outputLog(LogLevel.WARN, "リンク置換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
                  outputLog(LogLevel.WARN, "　エラーファイル| " + presentation.getName());
                  outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
                  continue;
                }
              }

            }
          }
        }
      }
    });
  });
}

/**
 * フォーム内のリンクを置換
 * @param {string} formId - フォームID
 * @param {Object} fileMap - ファイルマップ
 * @param {Object} formMap - Formマップ
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード
 */
function replaceLinksInForm(formId, fileMap, formMap, oldKeyword, newKeyword) {
  var fileName = DriveApp.getFileById(formId).getName().trim();
  // 指定されたフォームを開く
  var form = FormApp.openById(formId);

  // フォーム内のすべての項目（質問）を取得
  var items = form.getItems();

  items.forEach(item => {
    // 各質問の説明文 (helpText) を取得
    var helpText = item.getHelpText();
    // ハイパーリンクを置換
    var newHelpText = replaceHyperlinks(fileName, "質問", helpText, fileMap, formMap, oldKeyword, newKeyword);
    // 変更があれば更新
    if (newHelpText !== helpText) {
      item.setHelpText(newHelpText);
    }
  });

  // フォーム全体の説明文を取得
  var formDesc = form.getDescription();
  // ハイパーリンクを置換
  var newFormDesc = replaceHyperlinks(fileName, "説明", formDesc, fileMap, formMap, oldKeyword, newKeyword);
  // 変更があれば更新
  if (newFormDesc !== formDesc) {
    form.setDescription(newFormDesc);
  }
}

/**
 * テキスト内のハイパーリンクを置換
 * @param {string} TargetFileName - 対象ファイル名
 * @param {string} area - 対象エリア
 * @param {string} text - テキスト
 * @param {Object} fileMap - ファイルマップ
 * @param {Object} formMap - Formマップ
 * @param {string} oldKeyword - 置換前キーワード
 * @param {string} newKeyword - 置換後キーワード
 * @returns {string} - 置換後のテキスト
 */
function replaceHyperlinks(TargetFileName, area, text, fileMap, formMap, oldKeyword, newKeyword) {
  if (!text) return text;

  let regex = new RegExp(linkRegex, 'g'); // Google Drive のリンクを検索
  let updatedText = text;

  // 短縮URLを検索して全て置換
  let regexShort = new RegExp(shortRegex, 'g'); // Google Drive のリンクを検索

  let matchesShort = [...updatedText.matchAll(regexShort)];
  matchesShort.forEach(match => {
    let fullMatch = match[0];  // 元の URL
    let oldFileId = match[1];  // 抽出したファイルID
    var formId = cnvFormShortUrlToPublishedId(fullMatch);
    //後続処理に流すため公開用フォームIDで正規表現にマッチするように変更
    link = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
    let linkText = getLinkText(updatedText, fullMatch); // 表示テキストを取得

    // **リンクの表示テキストが URL の場合のみ、URL を置換**
    if (linkText === fullMatch) {
      updatedText = updatedText.replace(fullMatch, link);
    }
  });

  let matches = [...updatedText.matchAll(regex)];
  matches.forEach(match => {
    let fullMatch = match[0];  // 元の URL
    let oldFileId = match[2];  // 抽出したファイルID

    try {

      // urlがフォームの場合(forms viewform)
      if (fullMatch.includes("forms")) {
        // 回答用フォームのIDを取得
        var fileName = formMap[oldFileId]　//回答用フォームIDから編集用フォームIDを取得
        if (fileName) {
          fileName = fileName.replace(oldKeyword, newKeyword);
          //materialフォルダ内にファイルが存在するか確認
          if (fileMap[fileName]) {
            //編集用フォームを取得
            var form = FormApp.openById(fileMap[fileName]);
            newUrl = form.getPublishedUrl().replace("/viewform", ""); // 回答用URLを取得
            let linkText = getLinkText(updatedText, fullMatch); // 表示テキストを取得

            // **リンクの表示テキストが URL の場合のみ、URL を置換**
            if (linkText === fullMatch) {
              updatedText = updatedText.replace(fullMatch, newUrl);
            } else {
              updatedText = updatedText.replace(oldKeyword, newKeyword);
            }

          } else {
            outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
            outputLog(LogLevel.WARN, "　エラーファイル| " + TargetFileName + "|" + area);
            outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName);
          }
        } else {
          outputLog(LogLevel.WARN, "リンク置換エラー| 対象のフォームがコピー元XXth_Student_WORKSPACE/Materialsフォルダに存在しません。");
          outputLog(LogLevel.WARN, "　エラーファイル| " + TargetFileName + "|" + area);
          outputLog(LogLevel.WARN, "　エラーリンク先回答フォーム| " + oldFileId);
        }
      } else {

        let fileName = DriveApp.getFileById(oldFileId).getName().trim().replace(oldKeyword, newKeyword); // ID からファイル名を取得
        let newFileId = fileMap[fileName]; // `fileMap` のキーはファイル名

        if (newFileId) {
          let newUrl = fullMatch.replace(oldFileId, newFileId); // **ID のみを置換**
          let linkText = getLinkText(updatedText, fullMatch); // 表示テキストを取得

          // **リンクの表示テキストが URL の場合のみ、URL を置換**
          if (linkText === fullMatch) {
            updatedText = updatedText.replace(fullMatch, newUrl);
          } else {
            updatedText = updatedText.replace(oldKeyword, newKeyword);
          }
        } else {
          outputLog(LogLevel.WARN, "リンク置換エラー| 対象のファイルがMaterialフォルダに存在しません。");
          outputLog(LogLevel.WARN, "　エラーファイル| " + TargetFileName + "|" + area);
          outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileName);
        }
      }
    } catch (e) {
      if (e.message.includes("No item with the given ID") || e.message.includes("指定した ID のアイテムは見つかりませんでした。このアイテムを編集したことがないか、アクセス権限がないことが原因と考えられます。")) {
        outputLog(LogLevel.WARN, "リンク置換エラー| ファイルが存在しないか、権限がありません。");
        outputLog(LogLevel.WARN, "　エラーファイル| " + TargetFileName + "|" + area);
        outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);

      } else {
        outputLog(LogLevel.WARN, "リンク置換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
        outputLog(LogLevel.WARN, "　エラーファイル| " + TargetFileName + "|" + area);
        outputLog(LogLevel.WARN, "　エラーリンク先ファイル| " + fileId);
      }
    }
  });

  return updatedText;
}

/**
 * フォームの短縮URLから回答用IDに変換
 * @param {string} shortUrl - フォームの短縮URL
 * @returns {string} - 回答用ID
 */
function cnvFormShortUrlToPublishedId(shortUrl) {
  if (!shortUrl) return null;

  var options = {
    "method": "get",
    "followRedirects": true  // リダイレクトを追跡
  };
  try {
    // 短縮URLにアクセス
    var response = UrlFetchApp.fetch(shortUrl, options);
    var headers = response.getAllHeaders();  // ヘッダー情報を取得

    // 'reporting-endpoints' ヘッダーを探してその値を取得
    var reportingEndPoints = headers['reporting-endpoints'] || headers['Reporting-EndPoints'];

    if (reportingEndPoints) {
      // URLからフォームIDを抽出
      var formId = getFormIdFromUrl(reportingEndPoints);
      if (formId) {
        return formId;
      }
      return null;
    } else {
      return null;
    }
  } catch (e) {
    if (e.message.includes("Exception: Address unavailable:") || e.message.includes("Exception: 使用できないアドレス:")) {
      outputLog(LogLevel.WARN, "短縮URL変換エラー| 短縮URLへアクセスできません");
      outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);

    } else {
      outputLog(LogLevel.WARN, "短縮URL変換エラー| 予期せぬエラーが発生しました。|" + e.message + "|" + e.stack);
      outputLog(LogLevel.WARN, "　エラー短縮URL| " + shortUrl);
    }
  }
}

/**
 * URLからフォームIDを抽出
 * @param {string} url - URL
 * @returns {string} - フォームID
 */
function getFormIdFromUrl(url) {
  // 正規表現を使用してフォーム ID を抽出
  var regex = /\/d\/e\/([^\/]+)/;
  var matches = url.match(regex);

  if (matches && matches[1]) {
    return matches[1];  // フォームIDを返す
  } else {
    return null;  // IDが見つからなかった場合
  }
}

/**
 * テキスト内のリンク表示テキストを取得
 * @param {string} text - テキスト
 * @param {string} url - URL
 * @returns {string} - リンク表示テキスト
 */
function getLinkText(text, url) {
  let index = text.indexOf(url);
  if (index === -1) return ""; // URL が見つからない場合は空文字列
  return text.substring(index, index + url.length).trim(); // URL 部分を返す
}

/**
 * スプレッドシートのセルのリンクからフォームIDを取得
 * @param {string} sheet -- シート
 * @param {string} rangeStr -- セル範囲
 * @returns {string} -- ファイルID
 */
function getLinkFileIdBySheetRange(sheet, rangeStr) {

  var range = sheet.getRange(rangeStr); //セル
  var values = range.getValues(); // スマートチップ用
  var richTexts = range.getRichTextValues(); // リッチテキスト用

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {

      var text = values[i][j]; // セルのテキスト
      var rt = richTexts[i][j]; // 既存のリッチテキスト

      // 1️⃣ スマートチップの処理（セル全体がURLの場合）
      if (typeof text === "string") {

        // Form短縮URLの場合
        var shortMatch = text.match(shortRegex);
        if (shortMatch) {
          var shortUrl = shortMatch[0];
          var formId = cnvFormShortUrlToPublishedId(shortUrl);
          //下記処理に流すため公開用フォームIDで正規表現にマッチするように変更
          url = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
          text = text.replace(shortUrl, url)
        }

        var match = text.match(linkRegex);
        if (match) {
          return match[2]; // IDを取得
        }
      }

      // 2️⃣ リッチテキスト（セル内の一部にリンクがある場合）
      var runs = rt.getRuns();
      for (var h = 0; h < runs.length; h++) {
        var run = runs[h];
        var link = run.getLinkUrl();

        if (link) {
          // Form短縮URLの場合
          if (link.match(shortRegex)) {
            var formId = cnvFormShortUrlToPublishedId(link);
            //下記処理に流すため公開用フォームIDで正規表現にマッチするように変更
            link = "https://docs.google.com/forms/d/e/" + formId + "/viewform";
          }

          var match = link.match(linkRegex);
          if (match) {
            return match[2]; // ループを抜けて値を返す
          }
        }
      }
    }
  }
}

/**
 * ログの設定
 * @param {Sheet} logSheetArg - ログシート
 * @param {string} cmdNameArg - コマンド名
 */
function settingLog(logSheetArg, cmdNameArg) {
  logSheet = logSheetArg;
  cmdName = cmdNameArg;
}

/**
 * ログの出力
 * @param {string} logLevel - ログレベル
 * @param {string} message - メッセージ
 */
function outputLog(logLevel, message) {
  logSheet.appendRow([new Date(), cmdName, logLevel, message]);
}

/**
 * 移行用フォルダコピー
 */
function copyOwner(befFolderIdArg,aftFolderIdArg) {
  var befFolderId = befFolderIdArg || "1bXYzy45PfnfjVmdFCApn35s0tUCZuC79";
  var aftFolderId = aftFolderIdArg || "1zOY5lMiwKveDHapBh4sjP1FVcnwH-JaV";
  var sourceFolder = DriveApp.getFolderById(befFolderId);
  var destinationFolder = DriveApp.getFolderById(aftFolderId);

  // ファイルをコピー
  var files = sourceFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    file.makeCopy(file.getName(), destinationFolder);
  }

  // サブフォルダを再帰的にコピー
  var subFolders = sourceFolder.getFolders();
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    var newSubFolder = destinationFolder.createFolder(subFolder.getName());
    copyOwner(subFolder.getId(), newSubFolder.getId());
  }
}
