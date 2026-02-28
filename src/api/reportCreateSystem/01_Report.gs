const LangType = {
  JP: 1,
  EN: 2
};

const OutputType = {
  TEXT: 1,  // テキスト
  GRAPH: 2, // グラフ
  GRAPH_COMMA: 3, // グラフ（項目分解）
  GRAPH_MIX: 4 // グラフ（混合）
};

const DataColumn = {
  Q1_1_Rating: 5,
  Q1_2_Reason: 6,
  Q1_3_Impression: 7,
  Q1_4_Networking: 8,
  Q2_1_Motivation: 9,
  Q2_2_Expectation: 10,
  Q2_3_Theme: 11,
  Q2_4_Situation: 12,
  Q2_5_Duration: 13,
  Q2_6_Month_January: 14,
  Q2_6_Month_February: 15,
  Q2_6_Month_March: 16,
  Q2_6_Month_April: 17,
  Q2_6_Month_May: 18,
  Q2_6_Month_June: 19,
  Q2_6_Month_July: 20,
  Q2_6_Month_August: 21,
  Q2_6_Month_September: 22,
  Q2_6_Month_October: 23,
  Q2_6_Month_November: 24,
  Q2_6_Month_December: 25,
  Q2_7_Application: 26,
  Q2_8_ICT_environment: 27,
  Q2_9_online_learning: 28,
  Q3_1_Session_1: 29,
  Q3_2_Comments_to_S1: 30,
  Q3_3_Session_2: 31,
  Q3_4_Comments_to_S2: 32,
  Q3_5_Session_S3: 33,
  Q3_6_Comments_to_S3: 34,
  Q3_7_Interaction: 35,
  Q3_8_Comments_to_interaction: 36,
  Q3_9_Group_leaders: 37,
  Q3_10_Instructions: 38,
  Q3_11_Support: 39,
  Q3_12_Instructors_and_staffs: 40,
  Q4_1_Individual_activities: 41,
  Q4_2_Group_activities: 42,
  Q4_3_Comments: 43,
  Q5_1_Impact: 44,
  Q5_2_Phrase: 45,
  Q5_3_Take_away: 46,
  Q5_4_Suggestions: 47,
  Q5_5_Any_other_comments: 48
};

/**
 * レポート作成
 * @param {Sheet} logSheetArg - ログシート
 * @param {string} cmdNameArg - コマンド名
 * @param {string} dataFileId - データファイルのID
 * @param {string} baseFileId - ベースファイルのID
 * @param {string} folderId - フォルダのID
 * @param {number} lang - 言語タイプ（LangType.JP または LangType.EN）
 */
function createReport(logSheetArg, cmdNameArg, dataFileId, baseFileId, folderId, lang) {
  settingLog(logSheetArg, cmdNameArg);

  // 引数のチェック
  checkFileId(dataFileId, 'データのドキュメントID');
  checkFileId(baseFileId, 'テンプレートファイルID');
  checkFolderId(folderId, '作成フォルダID');
  // 現在日時を取得
  var now = new Date();
  var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');

  // ファイル作成
  var newFileName;
  switch (lang) {
    case LangType.JP:
      newFileName = 'FeedbackResult_JP_' + formattedDate;
      break;
    case LangType.EN:
      newFileName = 'FeedbackResult_EN_' + formattedDate;
      break;
  }
  outputLog(LogLevel.INFO, 'ファイル作成：' + newFileName);
  var newFileId = copyFileByFileId(baseFileId, folderId, newFileName);

  // DataColumnをループしてデータを取得
  outputLog(LogLevel.INFO, 'データ取得');
  var values = [];
  for (var key in DataColumn) {
    switch (getOutputType(DataColumn[key])) {
      case OutputType.GRAPH:
        // グラフ項目
        values[DataColumn[key]] = JSON.stringify(aggregate(dataFileId, DataColumn[key], null, true), null, '\t');
        break;
      case OutputType.GRAPH_MIX:
        // グラフ項目（混合）
        values[DataColumn[key]] = JSON.stringify(aggregate(dataFileId, DataColumn[key], ",", false), null, '\t');
        break;
      case OutputType.GRAPH_COMMA:
        // グラフ項目 (項目分解)
        values[DataColumn[key]] = JSON.stringify(aggregate(dataFileId, DataColumn[key], ",", true), null, '\t');
        break;
      default:
        // 文字列項目
        values[DataColumn[key]] = shuffle(dataFileId, DataColumn[key], lang);
        break;
    }
  }

  // ドキュメントファイルの内容を更新
  outputLog(LogLevel.INFO, 'ドキュメントファイルの内容を更新');
  updateDocFile(newFileId, values, lang);

  return;
}

/**
 * DataColumnからOutputTypeを返す
 * @param {number} dataColumn - DataColumnの値
 * @returns {number} - OutputTypeの値
 */
function getOutputType(dataColumn) {
  switch (dataColumn) {
    case DataColumn.Q1_1_Rating:
    case DataColumn.Q1_3_Impression:
    case DataColumn.Q1_4_Networking:
    case DataColumn.Q2_5_Duration:
    case DataColumn.Q3_1_Session_1:
    case DataColumn.Q3_3_Session_2:
    case DataColumn.Q3_5_Session_S3:
    case DataColumn.Q3_7_Interaction:
    case DataColumn.Q3_10_Instructions:
    case DataColumn.Q3_11_Support:
    case DataColumn.Q4_1_Individual_activities:
    case DataColumn.Q4_2_Group_activities:
      return OutputType.GRAPH;
    case DataColumn.Q2_4_Situation:
    case DataColumn.Q2_7_Application:
      return OutputType.GRAPH_COMMA;
    case DataColumn.Q2_6_Month_January:
    case DataColumn.Q2_6_Month_February:
    case DataColumn.Q2_6_Month_March:
    case DataColumn.Q2_6_Month_April:
    case DataColumn.Q2_6_Month_May:
    case DataColumn.Q2_6_Month_June:
    case DataColumn.Q2_6_Month_July:
    case DataColumn.Q2_6_Month_August:
    case DataColumn.Q2_6_Month_September:
    case DataColumn.Q2_6_Month_October:
    case DataColumn.Q2_6_Month_November:
    case DataColumn.Q2_6_Month_December:
      return OutputType.GRAPH_MIX;
    default:
      return OutputType.TEXT;
  }
}

/**
 * ドキュメントファイルの内容を更新
 * @param {string} newFileId - 新しいファイルのID
 * @param {Object} values - 更新する値
 * @param {number} lang - 言語タイプ（LangType.JP または LangType.EN）
 */
function updateDocFile(newFileId, values, lang) {
  var newFile = DocumentApp.openById(newFileId);
  var body = newFile.getBody();

  clearAndAppendText(body, values[DataColumn.Q1_1_Rating], getOutputType(DataColumn.Q1_1_Rating), lang, 0, 1, 2); // Q1_1_Rating
  clearAndAppendText(body, values[DataColumn.Q1_2_Reason], getOutputType(DataColumn.Q1_2_Reason), lang, 0, 2, 2); // Q1_2_Reason
  clearAndAppendText(body, values[DataColumn.Q1_3_Impression], getOutputType(DataColumn.Q1_3_Impression), lang, 0, 3, 2); // Q1_3_Impression
  clearAndAppendText(body, values[DataColumn.Q1_4_Networking], getOutputType(DataColumn.Q1_4_Networking), lang, 0, 4, 2); // Q1_4_Networking
  clearAndAppendText(body, values[DataColumn.Q2_1_Motivation], getOutputType(DataColumn.Q2_1_Motivation), lang, 1, 1, 2); // Q2_1_Motivation
  clearAndAppendText(body, values[DataColumn.Q2_2_Expectation], getOutputType(DataColumn.Q2_2_Expectation), lang, 1, 2, 2); // Q2_2_Expectation
  clearAndAppendText(body, values[DataColumn.Q2_3_Theme], getOutputType(DataColumn.Q2_3_Theme), lang, 1, 3, 2); // Q2_3_Theme
  clearAndAppendText(body, values[DataColumn.Q2_4_Situation], getOutputType(DataColumn.Q2_4_Situation), lang, 1, 4, 2); // Q2_4_Situation
  clearAndAppendText(body, values[DataColumn.Q2_5_Duration], getOutputType(DataColumn.Q2_5_Duration), lang, 1, 5, 2); // Q2_5_Duration

  clearAndAppendMix(body, values); // Q2_6_Month

  clearAndAppendText(body, values[DataColumn.Q2_7_Application], getOutputType(DataColumn.Q2_7_Application), lang, 1, 7, 2); // Q2_7_Application
  clearAndAppendText(body, values[DataColumn.Q2_8_ICT_environment], getOutputType(DataColumn.Q2_8_ICT_environment), lang, 1, 8, 2); // Q2_8_ICT_environment
  clearAndAppendText(body, values[DataColumn.Q2_9_online_learning], getOutputType(DataColumn.Q2_9_online_learning), lang, 1, 9, 2); // Q2_9_online_learning
  clearAndAppendText(body, values[DataColumn.Q3_1_Session_1], getOutputType(DataColumn.Q3_1_Session_1), lang, 2, 1, 2); // Q3_1_Session_1
  clearAndAppendText(body, values[DataColumn.Q3_2_Comments_to_S1], getOutputType(DataColumn.Q3_2_Comments_to_S1), lang, 2, 2, 2); // Q3_2_Comments_to_S1
  clearAndAppendText(body, values[DataColumn.Q3_3_Session_2], getOutputType(DataColumn.Q3_3_Session_2), lang, 2, 3, 2); // Q3_3_Session_2
  clearAndAppendText(body, values[DataColumn.Q3_4_Comments_to_S2], getOutputType(DataColumn.Q3_4_Comments_to_S2), lang, 2, 4, 2); // Q3_4_Comments_to_S2
  clearAndAppendText(body, values[DataColumn.Q3_5_Session_S3], getOutputType(DataColumn.Q3_5_Session_S3), lang, 2, 5, 2); // Q3_5_Session_S3
  clearAndAppendText(body, values[DataColumn.Q3_6_Comments_to_S3], getOutputType(DataColumn.Q3_6_Comments_to_S3), lang, 2, 6, 2); // Q3_6_Comments_to_S3
  clearAndAppendText(body, values[DataColumn.Q3_7_Interaction], getOutputType(DataColumn.Q3_7_Interaction), lang, 2, 7, 2); // Q3_7_Interaction
  clearAndAppendText(body, values[DataColumn.Q3_8_Comments_to_interaction], getOutputType(DataColumn.Q3_8_Comments_to_interaction), lang, 2, 8, 2); // Q3_8_Comments_to_interaction
  clearAndAppendText(body, values[DataColumn.Q3_9_Group_leaders], getOutputType(DataColumn.Q3_9_Group_leaders), lang, 2, 9, 2); // Q3_9_Group_leaders
  clearAndAppendText(body, values[DataColumn.Q3_10_Instructions], getOutputType(DataColumn.Q3_10_Instructions), lang, 2, 10, 2); // Q3_10_Instructions
  clearAndAppendText(body, values[DataColumn.Q3_11_Support], getOutputType(DataColumn.Q3_11_Support), lang, 2, 11, 2); // Q3_11_Support
  clearAndAppendText(body, values[DataColumn.Q3_12_Instructors_and_staffs], getOutputType(DataColumn.Q3_12_Instructors_and_staffs), lang, 2, 12, 2); // Q3_12_Instructors_and_staffs
  clearAndAppendText(body, values[DataColumn.Q4_1_Individual_activities], getOutputType(DataColumn.Q4_1_Individual_activities), lang, 3, 1, 2); // Q4_1_Individual_activities
  clearAndAppendText(body, values[DataColumn.Q4_2_Group_activities], getOutputType(DataColumn.Q4_2_Group_activities), lang, 3, 2, 2); // Q4_2_Group_activities
  clearAndAppendText(body, values[DataColumn.Q4_3_Comments], getOutputType(DataColumn.Q4_3_Comments), lang, 3, 3, 2); // Q4_3_Comments
  clearAndAppendText(body, values[DataColumn.Q5_1_Impact], getOutputType(DataColumn.Q5_1_Impact), lang, 4, 1, 2); // Q5_1_Impact
  clearAndAppendText(body, values[DataColumn.Q5_2_Phrase], getOutputType(DataColumn.Q5_2_Phrase), lang, 4, 2, 2); // Q5_2_Phrase
  clearAndAppendText(body, values[DataColumn.Q5_3_Take_away], getOutputType(DataColumn.Q5_3_Take_away), lang, 4, 3, 2); // Q5_3_Take_away
  clearAndAppendText(body, values[DataColumn.Q5_4_Suggestions], getOutputType(DataColumn.Q5_4_Suggestions), lang, 4, 4, 2); // Q5_4_Suggestions
  clearAndAppendText(body, values[DataColumn.Q5_5_Any_other_comments], getOutputType(DataColumn.Q5_5_Any_other_comments), lang, 4, 5, 2); // Q5_5_Any_other_comments

  newFile.saveAndClose();

  return;
}

/**
 * ドキュメントファイルの内容を更新（テキスト）
 * @param {Body} body - ドキュメントの本文
 * @param {Array|string} values - 更新する値
 * @param {number} outputType - OutputTypeの値
 * @param {number} lang - 言語タイプ（LangType.JP または LangType.EN）
 * @param {number} tableIndex - テーブルのインデックス
 * @param {number} rowIndex - 行のインデックス
 * @param {number} colIndex - 列のインデックス
 */
function clearAndAppendText(body, values, outputType, lang, tableIndex, rowIndex, colIndex) {
  var tables = body.getTables();
  if (tables.length <= tableIndex) {
    outputLog(LogLevel.ERROR, "指定されたインデックスのテーブルが存在しません。| tableIndex: " + tableIndex);
    return;
  }

  var table = tables[tableIndex];
  var cell = table.getRow(rowIndex).getCell(colIndex);
  while (cell.getNumChildren() > 0) {
    cell.removeChild(cell.getChild(0));
  }

  switch (outputType) {
    case OutputType.GRAPH:
    case OutputType.GRAPH_COMMA:
      //　不要
      // cell.appendParagraph(values);
      break;
    case OutputType.GRAPH_MIX:
      break;
    case OutputType.TEXT:
      var errFlg = false;
      values.forEach(function (item) {
        if (lang == LangType.JP && errFlg == false) {
          var res = translate(item);
          if (res) {
            item = res;
            Utilities.sleep(100)
          } else {
            errFlg = true;
          }
        }
        var para = cell.appendParagraph(item);
      });
      break;
  }
  return;
}

/**
 * ドキュメントファイルの内容を更新（混合セル）
 * @param {Body} body - ドキュメントの本文
 * @param {Object} values - 更新する値
 */
function clearAndAppendMix(body, values) {
  var tableIndex = 1;
  var rowIndex = 6;
  var colIndex = 2;

  var tables = body.getTables();
  if (tables.length <= tableIndex) {
    outputLog(LogLevel.ERROR, "指定されたインデックスのテーブルが存在しません。| tableIndex: " + tableIndex);
    return;
  }

  var table = tables[tableIndex];
  var cell = table.getRow(rowIndex).getCell(colIndex);
  while (cell.getNumChildren() > 0) {
    cell.removeChild(cell.getChild(0));
  }
  // cell.appendParagraph('Month_January');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_January]);
  // cell.appendParagraph('Month_February');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_February]);
  // cell.appendParagraph('Month_March');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_March]);
  // cell.appendParagraph('Month_April');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_April]);
  // cell.appendParagraph('Month_May');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_May]);
  // cell.appendParagraph('Month_June');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_June]);
  // cell.appendParagraph('Month_July');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_July]);
  // cell.appendParagraph('Month_August');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_August]);
  // cell.appendParagraph('Month_September');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_September]);
  // cell.appendParagraph('Month_October');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_October]);
  // cell.appendParagraph('Month_November');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_November]);
  // cell.appendParagraph('Month_December');
  // cell.appendParagraph(values[DataColumn.Q2_6_Month_December]);

  return;
}





