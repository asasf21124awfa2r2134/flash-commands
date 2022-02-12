/*
    TIMONOTE CONFIDENTIAL

    Copyright 2014 Timonote Animation.All Rights Reserved.

    NOTICE:  All information contained herein is, and remains the
    property of Timonote Animation , if any.
    The intellectual and technical concepts contained
    herein are proprietary to Timonote Animation and its
    suppliers and may be covered by Japan and Foreign Patents,
    patents in process, and are protected by trade secret or
    copyright law.  Dissemination of this information or
    reproduction of this material is strictly forbidden unless
    prior written permission is obtained from Timonote Animation.


    ちものとコンフィデンシャル


    注意：すべてのプログラム情報は下書に書かれている通り、
    ちものとアニメーションの知的·技術的な概念財産 が含まれています。
    これはちものとアニメーション独自のもので、その知的財産は
    日本と外国の特許の対象となる場合があり、サプライヤー、
    プロセスの特許は、営業秘密及び著作権法により保護されています。
    この情報の発信やプログラムの複製は厳密に禁止されており、
    事前に書面によるちものとアニメーションからの許可書が必要です。
*/

// ベタの色を作って色入れ替え
    var fill = fl.getDocumentDOM().getCustomFill("toolbar");
    fill.style = "solid";
    fill.color = "#FFD3FC";
    fl.getDocumentDOM().setCustomFill(fill);
    fl.getDocumentDOM().swapStrokeAndFill();

// ベタの色を作って色入れ替え
    var fill = fl.getDocumentDOM().getCustomFill("toolbar");
    fill.style = "solid";
    fill.color = "#0080FF";
    fl.getDocumentDOM().setCustomFill(fill);
    fl.getDocumentDOM().swapStrokeAndFill();
