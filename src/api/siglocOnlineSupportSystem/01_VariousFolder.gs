/**
 * 各種フォルダの作成
 * @param {string} thisTimeFolderId - 今回フォルダのID
 * @param {string} thisTime - 今回
 * @param {string} lastTimeFolderId - 前回フォルダのID
 * @param {string} lastTime - 前回
 * @returns {string} - 今回フォルダのID
 */
function createVariousFolder(logSheetArg, cmdNameArg, thisTimeFolderId, thisTime, lastTimeFolderId, lastTime) {
  settingLog(logSheetArg, cmdNameArg);

  // 引数のチェック
  checkFolderId(thisTimeFolderId, '今回のフォルダID');
  checkString(thisTime, '今回開催回');
  checkFolderId(lastTimeFolderId, '前回のフォルダID');
  checkString(lastTime, '前回開催回');

  // ルートのフォルダにOnlineフォルダを作る
  outputLog(LogLevel.INFO, 'ルートのフォルダに「Online」フォルダを作成');
  var onlineFolderId = createFolder(thisTimeFolderId, "Online");

  // Onlineフォルダに「/SYSTEM」フォルダを作成する
  outputLog(LogLevel.INFO, 'Onlineフォルダに「SYSTEM」フォルダを作成');
  var systemFolderId = createFolder(onlineFolderId, "SYSTEM");

  // Onlineフォルダに「/XXth_online_Student_WORKSPACE」フォルダを作成する
  outputLog(LogLevel.INFO, 'Onlineフォルダに「' + thisTime + '_Student_WORKSPACE」フォルダを作成');
  var onlineStuentWorkSpaceFolderId = createFolder(onlineFolderId, thisTime + "_Student_WORKSPACE");
  // XXth_online_Student_WORKSPACEフォルダに「/Personal」フォルダを作成する
  outputLog(LogLevel.INFO, thisTime + '_online_Student_WORKSPACEフォルダに「Personal」フォルダを作成');
  var personalFolderId = createFolder(onlineStuentWorkSpaceFolderId, "Personal");
  // XXth_online_Student_WORKSPACEフォルダに「/Materials」フォルダを作成する
  outputLog(LogLevel.INFO, thisTime + '_online_Student_WORKSPACEフォルダに「Materials」フォルダを作成');
  var materialsFolderId = createFolder(onlineStuentWorkSpaceFolderId, "Materials");
  // XXth_online_Student_WORKSPACEフォルダに「/Shared」フォルダを作成する
  outputLog(LogLevel.INFO, thisTime + '_online_Student_WORKSPACEフォルダに「Shared」フォルダを作成');
  var sharedFolderId = createFolder(onlineStuentWorkSpaceFolderId, "Shared");

  // systemフォルダに「/StudentWork_Template」フォルダを作成する
  outputLog(LogLevel.INFO, 'systemフォルダに「StudentWork_Template」フォルダを作成');
  var studentWorkTemplateFolderId = createFolder(systemFolderId, "StudentWork_Template");
  // systemフォルダに「/translate」フォルダを作成する
  outputLog(LogLevel.INFO, 'systemフォルダに「translate」フォルダを作成');
  var translateFolderId = createFolder(systemFolderId, "translate");
  // systemフォルダに「/修了証」フォルダを作成する
  outputLog(LogLevel.INFO, 'systemフォルダに「修了証」フォルダを作成');
  var certificateFolderId = createFolder(systemFolderId, "修了証");
  // 修了証フォルダに「/修了証原本」フォルダを作成する
  outputLog(LogLevel.INFO, '修了証フォルダに「修了証原本」フォルダを作成');
  var certificateOriginalFolderId = createFolder(certificateFolderId, "修了証原本");
  // 修了証フォルダに「/Certificate of Completion」フォルダを作成する
  outputLog(LogLevel.INFO, '修了証フォルダに「Certificate of Completion」フォルダを作成');
  var certificateOfCompletionFolderId = createFolder(certificateFolderId, "Certificate of Completion");

  // Onlineフォルダに「/TEACHERS」フォルダを作成する
  outputLog(LogLevel.INFO, 'Onlineフォルダに「TEACHERS」フォルダを作成');
  var teachersFolderId = createFolder(onlineFolderId, "TEACHERS");

  // 前回>online>th_online_Student_WORKSPACE>MaterialsフォルダをTEACHERSフォルダにコピーする
  outputLog(LogLevel.INFO, '前回のMaterialsフォルダ情報の取得');
  var lastTimeOnlineFolderId = getFolderId(lastTimeFolderId, "Online");
  if (checkResponse(lastTimeOnlineFolderId, '前回のOnlineフォルダ', false, 'Online')) return;
  var lastTimeStudentWorkSpaceFolderId = getFolderId(lastTimeOnlineFolderId, lastTime + "_Student_WORKSPACE");
  if (checkResponse(lastTimeStudentWorkSpaceFolderId, '前回のStudent_WORKSPACEフォルダ', false, 'Student_WORKSPACE')) return;
  var lastTimeMaterialsFolderId = getFolderId(lastTimeStudentWorkSpaceFolderId, "Materials");
  if (checkResponse(lastTimeMaterialsFolderId, '前回のMaterialsフォルダ', false, 'Materials')) return;

  // utilを使用してフォルダをコピーする
  outputLog(LogLevel.INFO, '前回のMaterialsフォルダをTEACHERSフォルダにコピー');
  var materialFolderId = copyFolder(lastTimeMaterialsFolderId, teachersFolderId, lastTime, thisTime, "Material");
  outputLog(LogLevel.INFO, 'TEACHERSフォルダ内のファイルのリンクを変更');
  replaceLinksInFiles(materialFolderId, materialFolderId, lastTimeMaterialsFolderId, lastTime, thisTime);

  // Onlineフォルダに「/Google_Form」フォルダを作成する
  outputLog(LogLevel.INFO, 'Onlineフォルダに「Google_Form」フォルダを作成');
  var googleFormFolderId = createFolder(onlineFolderId, "Google_Form");

  return thisTimeFolderId;
}