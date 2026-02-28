**SIGLOC-online\
新期開始時サポートシステム**
============================

## **1. 概要**

> 本処理は、各種フォルダの作成、システムファイルの更新、Googleフォームの作成、Student
> Work Template
> Fileの更新、MyCheckListの更新、および修了証の作成を行う。また、作成された内容についてチェックリストに基づきテストを行う。

## **2. 関数一覧**

| 関数名                            | 説明                                   |
|-----------------------------------|----------------------------------------|
| callCreateVariousFolder           | 各種フォルダを作成する                 |
| callUpdateSystemFile              | システムファイルを更新する             |
| callUpdateGoogleForm              | Googleフォームを更新する               |
| callUpdateStudentWorkTemplateFile | Student Work Template Fileを更新する   |
| callUpdateMyCheckList             | MyCheckListを更新する                  |
| callCreateCompletionCertificate   | 修了証を作成する                       |
| callTestVariousFolder             | 各種フォルダをテストする               |
| callTestSystemFile                | システムファイルをテストする           |
| callTestGoogleForm                | Googleフォームをテストする             |
| callTestStudentWorkTemplateFile   | Student Work Template Fileをテストする |
| callTestMyCheckList               | MyCheckListをテストする                |
| callTestCompletionCertificate     | 修了証をテストする                     |

## **3. 共通処理**

### **3.1 事前チェック**

> 各関数で checkSetting を使用し、以下のパラメータの設定を確認。

- lastTimeFolderId が空でないこと

- thisTimeFolderId が空でないこと

- lastTime が空でないこと

- thisTime が空でないこと

> エラー時のメッセージ:

- "前回フォルダIDが指定されていないため実行できません。"

- "今回フォルダIDが指定されていないため実行できません。"

- "前回の開催数が指定されていないため実行できません。"

- "今回の開催数が指定されていないため実行できません。"

> callUpdateGoogleForm およびcallTestGoogleForm では checkForm
> を使用し、フォーム名の設定を確認。 エラー時のメッセージ:

- "応募フォーム名(変更前)が指定されていないため実行できません。"

- "入学フォーム名(変更前)が指定されていないため実行できません。"

- "事後報告フォーム名(変更前)が指定されていないため実行できません。"

> callCreateCompletionCertificate および callTestCompletionCertificate
> では checkCertificate を使用し、修了証名の設定を確認。
> エラー時のメッセージ:

- "修了証名(変更前)が指定されていないため実行できません。”

## **4. 各関数の処理詳細**

### **callCreateVariousFolder**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.createVariousFolder を呼び出してフォルダを作成。

4.  完了ダイアログを表示。

### **callUpdateSystemFile**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.updateSystemFile を呼び出してシステムファイルを更新。

4.  完了ダイアログを表示。

### **callUpdateGoogleForm**

1.  checkSetting で事前チェック。

2.  checkForm でフォーム名を確認。

3.  ユーザーに確認ダイアログを表示。

4.  COIL.updateGoogleForm を呼び出してGoogleフォームを更新。

5.  完了ダイアログを表示。

### **callUpdateStudentWorkTemplateFile**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.updateStudentWorkTemplateFile
    を呼び出してテンプレートファイルを更新。

4.  完了ダイアログを表示。

### **callUpdateMyCheckList**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.updateMyCheckList を呼び出してMyCheckListを更新。

4.  完了ダイアログを表示。

### **callCreateCompletionCertificate**

1.  checkSetting で事前チェック。

2.  checkCertificate で修了証名を確認。

3.  ユーザーに確認ダイアログを表示。

4.  COIL.createCompletionCertificate を呼び出して修了証を作成。

5.  完了ダイアログを表示。

### **callTestVariousFolder**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.testVariousFolder を呼び出してフォルダをテスト。

4.  完了ダイアログを表示。

### **callTestSystemFile**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.TestSystemFile を呼び出してシステムファイルをテスト。

4.  完了ダイアログを表示。

### **callTestGoogleForm**

1.  checkSetting で事前チェック。

2.  checkForm でフォーム名を確認。

3.  ユーザーに確認ダイアログを表示。

4.  COIL.TestGoogleForm を呼び出してGoogleフォームをテスト。

5.  完了ダイアログを表示。

### **callTestStudentWorkTemplateFile**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.TestStudentWorkTemplateFile
    を呼び出してテンプレートファイルを更新。

4.  完了ダイアログを表示。

### **callTestMyCheckList**

1.  checkSetting で事前チェック。

2.  ユーザーに確認ダイアログを表示。

3.  COIL.TestMyCheckList を呼び出してMyCheckListをテスト。

4.  完了ダイアログを表示。

### **callTestCompletionCertificate**

1.  checkSetting で事前チェック。

2.  checkCertificate で修了証名を確認。

3.  ユーザーに確認ダイアログを表示。

4.  COIL.testCompletionCertificate を呼び出して修了証をテスト。

5.  完了ダイアログを表示。

## **5. 参照ライブラリ**

COIL

> 01_VariousFolder.gs
>
> 02_SystemFile.gs
>
> 03_GoogleForm.gs
>
> 04_StudentWorkTemplateFile.gs
>
> 05_MyCheckList.gs
>
> 06_CompletionCertificate.gs
>
> 01_VariousFolderTest.gs
>
> 02_SystemFileTest.gs
>
> 03_GoogleFormTest.gs
>
> 04_StudentWorkTemplateFileTest.gs
>
> 05_MyCheckListTest.gs
>
> 06_CompletionCertificateTest.gs
