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

//●選択されたレイヤーのインデックスの配列(レイヤー名当たりで選択の場合)
var myLayerArray = fl.getDocumentDOM().getTimeline().getSelectedLayers();
//alert("myLayerArray" + myLayerArray);


//●選択されたフレームの[レイヤーのインデックス,最初のフレームNO,終わりのフレームNO]のインデックス(フレーム側で選択の場合)
//一次配列で取るため必ず3の倍数になる
var myFrameArray = fl.getDocumentDOM().getTimeline().getSelectedFrames();
//alert("myFrameArray" + myFrameArray.length);

//●(レイヤー名当たりで選択の場合)選んでいるレイヤー郡の数
var countLA = myLayerArray.length;
//alert("LA" + countLA);

//●(フレーム側で選択の場合)選んでいるフレーム郡の数
var countFA = myFrameArray.length;
//alert("FA" + countFA);


//●1フレームしか選択してない条件
if(countLA == 1 && myFrameArray[2]-myFrameArray[1] == 1 && countFA == 3){
	//現在のレイヤーを取得
	var KLayer = fl.getDocumentDOM().getTimeline().currentLayer;

	//現在のフレームを取得
	var KFrame = fl.getDocumentDOM().getTimeline().currentFrame;

	// 問題なければ削除
	if(fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame == fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame){
		// キーフレームを削除
		fl.getDocumentDOM().getTimeline().clearKeyframes();
	}
}


//●フレームを選択していない条件
else if(countFA == 0){

	//現在のレイヤーを取得
	var KLayer = fl.getDocumentDOM().getTimeline().currentLayer;

	//現在のフレームを取得
	var KFrame = fl.getDocumentDOM().getTimeline().currentFrame;

	//現在のフレームを選択
	fl.getDocumentDOM().getTimeline().setSelectedFrames(KFrame,KFrame + 1);

	// 問題なければ削除
	if(fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame == fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame){
		// キーフレームを削除
		fl.getDocumentDOM().getTimeline().clearKeyframes();
	}

// 選択なし
fl.getDocumentDOM().selectNone();

// フレーム選択のクリア
fl.getDocumentDOM().getTimeline().setSelectedFrames([]);

}


//●フレームを複数選択している条件
else{

	//現在選択中の位置保存
	var prePosition = fl.getDocumentDOM().getTimeline().getSelectedFrames();

	//現在のフレームを保存
	var hozonKFrame = fl.getDocumentDOM().getTimeline().currentFrame;

	//現在のレイヤーを取得
	var KLayer = fl.getDocumentDOM().getTimeline().currentLayer;

	//現在のフレームを取得
	var KFrame = fl.getDocumentDOM().getTimeline().currentFrame;

	//▼キーフレームの頭のフレーム取得
	var stFrame = fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame;

	//▼フレームシーケンス内のフレーム数を frameSpan 変数に格納します。一つのキーフレームの長さ
	var FS = fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].duration;




	//条件追加選択1以上でも1フレーム全選択の場合軽量処理。
	if(FS == [myFrameArray[2]-myFrameArray[1]]){


		//現在のレイヤーを取得
		var KLayer = fl.getDocumentDOM().getTimeline().currentLayer;

		//現在のフレームを取得
		var KFrame = fl.getDocumentDOM().getTimeline().currentFrame;

		// 問題なければ削除
		if(fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame == fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame){
			// キーフレームを削除
			fl.getDocumentDOM().getTimeline().clearKeyframes();
		}

}else{


for( var i = 0; i < countFA; i++){//配列回数分作業します。
	if(i % 3 == 0){//配列のボックスが3の倍数か
		var FAhani = myFrameArray[i + 2] - myFrameArray[i + 1];
		for (var j = 0; j < FAhani; j++){//選択範囲のみ適応

			//作業箇所選択
			fl.getDocumentDOM().getTimeline().setSelectedLayers(myFrameArray[i]);
			//現在のレイヤーのフレーム数を取得
			var KLayerFcount = fl.getDocumentDOM().getTimeline().layers[myFrameArray[i]].frameCount;

			var myFrameArray_i1 = myFrameArray[i + 1];

			if((myFrameArray[i + 1] + j) < KLayerFcount && (myFrameArray[i + 1] + j) == fl.getDocumentDOM().getTimeline().layers[myFrameArray[i]].frames[myFrameArray[i + 1] + j].startFrame){//フレームのないエリアは処理しない。
				fl.getDocumentDOM().getTimeline().setSelectedFrames(myFrameArray[i + 1] + j,myFrameArray[i + 1] + j + 1);

				// 問題なければ削除
				if(fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame == fl.getDocumentDOM().getTimeline().layers[KLayer].frames[KFrame].startFrame){
					// キーフレームを削除
					fl.getDocumentDOM().getTimeline().clearKeyframes();
				}
			}
		}
	}
}
//保存された選択範囲を再現
fl.getDocumentDOM().getTimeline().setSelectedFrames(prePosition);

//再生位置を移動
fl.getDocumentDOM().getTimeline().currentFrame = hozonKFrame;

}

}//追加処理








// キーフレームを削除
//fl.getDocumentDOM().getTimeline().clearKeyframes();


fl.outputPanel.clear(); 




	// 選択なし
	//fl.getDocumentDOM().selectNone();

	// フレーム選択のクリア
	//fl.getDocumentDOM().getTimeline().setSelectedFrames([]);


//現在のレイヤーの名前取得して告知
var kokoLayerNum = fl.getDocumentDOM().getTimeline().currentLayer;

var NumLayer = fl.getDocumentDOM().getTimeline().layerCount - 1;

//▼全フレーム数取得
var layerFrame = fl.getDocumentDOM().getTimeline().frameCount;
//▼フレーム数取得
var frameCount = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frameCount;
//レイヤーのタイプ確認
var layerType = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].layerType;

var byou = ~~(layerFrame / 24);
var koma =layerFrame % 24;
layerFrame = String(byou) + "+" + String(koma);

//現在のタイムラインの名前取得して告知
var TLn = fl.getDocumentDOM().getTimeline().name +"(" + layerFrame + ")";

//現在の再生ヘッドの位置の値を curFrame 変数に格納します。
var curFrame = fl.getDocumentDOM().getTimeline().currentFrame;

//現在のレイヤーの名前取得して告知
var kokoLayerNum = fl.getDocumentDOM().getTimeline().currentLayer;

if(curFrame <= frameCount && layerType != "folder"){//1

//キーフレームの頭のフレーム取得
var stFrame = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frames[curFrame].startFrame;

//フレームシーケンス内のフレーム数を frameSpan 変数に格納します。一つのキーフレームの長さ
var FS = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frames[curFrame].duration;


if(stFrame == curFrame){var keyF = "@";}else{

	var keyF = "@";

	for(i = 1;i < FS;i++){
		if(curFrame == stFrame + i){keyF = keyF + "+";}else{keyF = keyF + "-";}
		}
}curFrame = curFrame + 1;

var byou = ~~(curFrame / 24);
var koma =curFrame % 24;
curFrame = String(byou) + "+" + String(koma);

if(kokoLayerNum == 0){

	if(kokoLayerNum == NumLayer){
		//レイヤー１個だけ
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
	
	}else{
		//レイヤー一番上来た時
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
		var cLayerNshita = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum + 1].name;


	}

	}else{
	if(kokoLayerNum == NumLayer){
		//レイヤー一番下来た時
		var cLayerNue = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum - 1].name;
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
//alert("A");
	}else{
	if(kokoLayerNum <= NumLayer){
		//レイヤー途中
	var cLayerNue = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum - 1].name;
	var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
	var cLayerNshita = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum + 1].name;
//alert("B");
	}}
}

}//1


