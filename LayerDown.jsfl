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


    ¿à̂ƃRtBfV


    ӁF·ׂẴvOîñ͉ºɏ©êĂ¢éʂèA
    ¿à̂ƃAj[V̒mIEZpIȊTOàY ª܂܂êĂ¢܂·B
    ±ê͂¿à̂ƃAj[VƎ©̂à̂ŁA»̒mIàYÍ
    ú{ƊO̓Á̑ΏۂƂȂéꍇª èATvC[A
    vZX̓Á́AcƔ閧yђ쌠@ɂæèی삳êĂ¢܂·B
    ±̏îñ̔­MâvO̕¡»͌µ§ɋ֎~³êĂ¨èA
    Oɏʂɂæ邿à̂ƃAj[V©ç̋ªKvł·B
*/

var myDoc = fl.getDocumentDOM();
var myTL = myDoc.getTimeline();
var NumLayer = myDoc.getTimeline().layerCount;

//ima̃C[ԍð擾
var kokoLayerNum = myDoc.getTimeline().currentLayer;
fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].locked = true;

//º̃C[ԍð擾
var nextLayerNum = myDoc.getTimeline().currentLayer + 1;
if(nextLayerNum == NumLayer){
	//ue̃C[Ɉړ®
	myDoc.getTimeline().setSelectedLayers(0);//myDoc.getTimeline().setSelectedLayers(nextLayerNum - 1);
}else{
	//º̃C[Ɉړ®
	myDoc.getTimeline().setSelectedLayers(nextLayerNum);
}

//ima̃C[ԍð擾
var kokoLayerNum = myDoc.getTimeline().currentLayer;
fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].locked = false;

//Lname = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum];
fl.outputPanel.clear(); 

	// IðȂµ
	fl.getDocumentDOM().selectNone();

	// t[Ið̃NA
	fl.getDocumentDOM().getTimeline().setSelectedFrames([]);

var NumLayer = fl.getDocumentDOM().getTimeline().layerCount - 1;

//¥St[擾
var layerFrame = fl.getDocumentDOM().getTimeline().frameCount;
//¥t[擾
var frameCount = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frameCount;
//C[̃^CvmF
var layerType = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].layerType;

var byou = ~~(layerFrame / 24);
var koma =layerFrame % 24;
layerFrame = String(byou) + "+" + String(koma);

//»݂̃^CC̖¼O擾µčm
var TLn = fl.getDocumentDOM().getTimeline().name +"(" + layerFrame + ")";

//»݂̍Đ¶wbh̈ʒu̒lð curFrame ϐɊi[µ܂·B
var curFrame = fl.getDocumentDOM().getTimeline().currentFrame;

//»݂̃C[̖¼O擾µčm
var kokoLayerNum = fl.getDocumentDOM().getTimeline().currentLayer;

if(curFrame <= frameCount && layerType != "folder"){//1

//L[t[̓ª̃t[擾
var stFrame = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frames[curFrame].startFrame;

//t[V[PXà̃t[ð frameSpan ϐɊi[µ܂·Bê̃L[t[̒·³
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
		//C[P¾¯
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
	
	}else{
		//C[êԏ㗈½
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
		var cLayerNshita = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum + 1].name;


	}

	}else{
	if(kokoLayerNum == NumLayer){
		//C[êԉº½
		var cLayerNue = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum - 1].name;
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
//alert("A");
	}else{
	if(kokoLayerNum <= NumLayer){
		//C[r
	var cLayerNue = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum - 1].name;
	var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
	var cLayerNshita = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum + 1].name;
//alert("B");
	}}
}

}//1
fl.getDocumentDOM().getTimeline().setLayerProperty('visible', !false);
