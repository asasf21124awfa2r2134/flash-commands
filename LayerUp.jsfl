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


*/

var myDoc = fl.getDocumentDOM();
var NumLayer = myDoc.getTimeline().layerCount;

var kokoLayerNum = myDoc.getTimeline().currentLayer;
fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].locked = true;

var nextLayerNum = myDoc.getTimeline().currentLayer - 1;
if(nextLayerNum == -1){
	
	myDoc.getTimeline().setSelectedLayers(NumLayer - 1);//myDoc.getTimeline().setSelectedLayers(nextLayerNum + 1);
}else{

	myDoc.getTimeline().setSelectedLayers(nextLayerNum);
}


var kokoLayerNum = myDoc.getTimeline().currentLayer;

fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].locked = false;

//Lname = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum];
fl.outputPanel.clear(); 



	fl.getDocumentDOM().selectNone();


	fl.getDocumentDOM().getTimeline().setSelectedFrames([]);


var NumLayer = fl.getDocumentDOM().getTimeline().layerCount - 1;


var layerFrame = fl.getDocumentDOM().getTimeline().frameCount;

var frameCount = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frameCount;

var layerType = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].layerType;

var byou = ~~(layerFrame / 24);
var koma =layerFrame % 24;
layerFrame = String(byou) + "+" + String(koma);

var TLn = fl.getDocumentDOM().getTimeline().name +"(" + layerFrame + ")";

var curFrame = fl.getDocumentDOM().getTimeline().currentFrame;

var kokoLayerNum = fl.getDocumentDOM().getTimeline().currentLayer;

if(curFrame <= frameCount && layerType != "folder"){//1

var stFrame = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].frames[curFrame].startFrame;

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
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
	
	}else{
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
		var cLayerNshita = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum + 1].name;


	}

	}else{
	if(kokoLayerNum == NumLayer){
		var cLayerNue = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum - 1].name;
		var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;

	}else{
	if(kokoLayerNum <= NumLayer){
	var cLayerNue = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum - 1].name;
	var cLayerN = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum].name;
	var cLayerNshita = fl.getDocumentDOM().getTimeline().layers[kokoLayerNum + 1].name;

	}}
}

}//1
fl.getDocumentDOM().getTimeline().setLayerProperty('visible', !false);
