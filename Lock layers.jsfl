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

var LayerSUU   = fl.getDocumentDOM().getTimeline().layerCount;
var layerArray = fl.getDocumentDOM().getTimeline().getSelectedLayers();
var KLayer     = fl.getDocumentDOM().getTimeline().currentLayer;

for(var x = 0; x < LayerSUU; x++)
{
    if(x == KLayer){fl.getDocumentDOM().getTimeline().layers[KLayer].locked = false;}
    else{fl.getDocumentDOM().getTimeline().layers[x].locked = true;}
}

fl.getDocumentDOM().getTimeline().layers[KLayer].locked = false;

for(var i = 0; i < layerArray.length; i++)
{
	var myValue = layerArray[i];
	var myLayer = fl.getDocumentDOM().getTimeline().layers[myValue];
	myLayer.visible = true;
	myLayer.outline = false;


}
