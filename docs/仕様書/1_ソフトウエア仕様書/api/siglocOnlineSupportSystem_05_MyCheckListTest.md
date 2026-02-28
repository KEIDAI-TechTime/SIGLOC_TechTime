siglocOnlineSupportSystem/05_MyCheckListTest

testMyCheckList

###  **処理の流れ**

- **初期設定**

### **ログの設定**

- ログを記録するために **settingLog** を呼び出す。

### **チェックリストの設定**

- テストを記録するために **settingTest** を呼び出す。

<!-- -->

- **引数のチェック**

  - フォルダIDや開催回情報が正しく渡されているかを確認する。

    - **checkFolderId**で今回のフォルダIDを検証。

    - **checkString** で今回の開催回情報を検証。

    - **checkFolderId** で前回のフォルダIDを検証。

    - **checkString** で前回の開催回情報を検証。

    - 

<!-- -->

- **今回の StudentWork_Template 関連フォルダを検索**

  - 今回の Online フォルダを検索し、IDを取得。

  - 今回の SYSTEMフォルダを検索し、IDを取得。

  - 今回の StudentWork_Templateフォルダを検索し、IDを取得。

  <!-- -->

  - **確認の実施**

- **システム設定ファイルの取得**

  - 今回システム設定ファイルを取得。

  - 今回のシステム設定シートを取得。

- **MyCheckListファイルの取得**

  - 今回MyCheckListファイルを取得。

- **該当項目について順次下記の確認を行う。**

  - チェックリストの対象セルからMyCheckListの該当Cell情報を取得

  - MyCheckListの該当Cellからリンク情報を取得

  - リンクよりファイルIDを取得し、Materialフォルダ内に該当ファイルが存在するかチェックする

<table style="width:84%;">
<colgroup>
<col style="width: 32%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>セッション</th>
<th>項目</th>
</tr>
<tr>
<th rowspan="6">Pre</th>
<th>The FIRST Task is here! Way to go!</th>
</tr>
<tr>
<th>Pre-Course Overview</th>
</tr>
<tr>
<th>Participate Orientation or Watch movie</th>
</tr>
<tr>
<th>Add your self-intorduction to the MyOneSlide</th>
</tr>
<tr>
<th>Take the BEVI PreTask (will be opened AFTER the Orientation)</th>
</tr>
<tr>
<th>11th_SIGLOC_MyOneSlide</th>
</tr>
<tr>
<th rowspan="5">Session1</th>
<th>Session1 Overview</th>
</tr>
<tr>
<th>Welcome Session</th>
</tr>
<tr>
<th>Make a constructive speech from the assgined position</th>
</tr>
<tr>
<th>Refute your opponent's argument</th>
</tr>
<tr>
<th>Review both refutations written by the opponents and write a
reflection</th>
</tr>
<tr>
<th rowspan="6">Session2</th>
<th>Session2 Overview</th>
</tr>
<tr>
<th>Read sample books/ Make your picure book (Chapter 1)</th>
</tr>
<tr>
<th>Analyzing issues and stakeholders / Add Chapter 2 to your picture
book</th>
</tr>
<tr>
<th>Post a message to your Group channel (Slack)</th>
</tr>
<tr>
<th>Add comments to an assigned picture book made by other member</th>
</tr>
<tr>
<th>Add Chapter 3 to your picture book</th>
</tr>
<tr>
<th rowspan="5">Session3</th>
<th>Session3 Overview</th>
</tr>
<tr>
<th>Review and analyze your hypothesis and clarify the issue you will
deal with (Chapter 4)</th>
</tr>
<tr>
<th>Add Chapter 5 to your picture book</th>
</tr>
<tr>
<th>Add comments to an assigned picture book made by other member</th>
</tr>
<tr>
<th>Reply to your member's comments and complete your picture book</th>
</tr>
<tr>
<th rowspan="5">Session4</th>
<th>Session4 Overview</th>
</tr>
<tr>
<th>Practice and present your picture book at the Final Presentation
session</th>
</tr>
<tr>
<th>Send your feedback to other members' final presentation</th>
</tr>
<tr>
<th>Review comments and revise your picture book</th>
</tr>
<tr>
<th>Attend a Closing Session</th>
</tr>
<tr>
<th rowspan="3">Session5</th>
<th>Session5 Overview</th>
</tr>
<tr>
<th>Write a Reflection Report</th>
</tr>
<tr>
<th>Take the BEVI PostTas</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

- **締め切りの確認**

  - C列の「Due (JST)」が未入力かどうかチェックする。

- **設定の非表示**

  - 1~58行目が非表示になっているかチェックする

####  **フォルダIDの返却**

- 作成した thisTimeFolderId を返すことで、処理の結果を次の工程に渡す。

### **連携モジュール**

#### **呼び出し元**

- **SIGLOC-online新期開始時サポートシステム**

  - **callApi.gs**

#### **参照**

- **同プロジェクト**

  - **check.gs** … チェック処理部品

  - **testUtil.gs** … テスト共通処理部品

  - **util.gs** … 共通処理部品

### **FreeSetting の定義\**
※実際はtestUtilに定義

#### **定数**

> FreeSetting

MCL_0_1: 'F47',

MCL_0_2: 'F48',

MCL_0_3: 'F49',

MCL_0_4: 'F50',

MCL_0_5: 'F51',

MCL_0_6: 'F52',

MCL_1_1: 'F54',

MCL_1_2: 'F55',

MCL_1_3: 'F56',

MCL_1_4: 'F57',

MCL_1_5: 'F58',

MCL_2_1: 'F60',

MCL_2_2: 'F61',

MCL_2_3: 'F62',

MCL_2_4: 'F63',

MCL_2_5: 'F64',

MCL_2_6: 'F65',

MCL_3_1: 'F67',

MCL_3_2: 'F68',

MCL_3_3: 'F69',

MCL_3_4: 'F70',

MCL_3_5: 'F71',

MCL_4_1: 'F73',

MCL_4_2: 'F74',

MCL_4_3: 'F75',

MCL_4_4: 'F76',

MCL_4_5: 'F77',

MCL_5_1: 'F79',

MCL_5_2: 'F80',

MCL_5_3: 'F81',

MCL_DUE: 'F83',

MCL_CLOSE: 'F84',
