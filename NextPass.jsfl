    var fdoc  = fl.getDocumentDOM();
    var fltl  = fdoc.getTimeline();
	
	  var myLayerArray = fltl.getSelectedLayers();
    var myFrameArray = fltl.getSelectedFrames();
    var countLA = myLayerArray.length;
    var countFA = myFrameArray.length;

    var KLayer = fltl.currentLayer;
    var KFrame = fltl.currentFrame;
	
	    var cLayerNum = fdoc.getTimeline().currentLayer;

var curLayer = fl.getDocumentDOM().getTimeline().currentLayer;
fl.getDocumentDOM().getTimeline().setSelectedLayers(curLayer);
fl.getDocumentDOM().getTimeline().copyFrames();
fltl.layers[cLayerNum].locked = true;
    var cLayerN = fltl.layers[cLayerNum].name;

// レイヤー名加工
    if((n = cLayerN.indexOf("tm"))!= -1) cLayerN = cLayerN.charAt(n-1);
    if((n = cLayerN.indexOf("%")) != -1) cLayerN = cLayerN.slice(0, n);
    if((n = cLayerN.indexOf("&")) != -1) cLayerN = cLayerN.slice(0, n);
    if((n = cLayerN.indexOf("_")) != -1) cLayerN = cLayerN.slice(1);
    if((n = cLayerN.indexOf("=")) != -1) cLayerN = cLayerN.slice(1);

// 平面レイヤー作成
    fltl.addNewLayer("----");

    var fill   = fdoc.getCustomFill("toolbar");
    var iro    = fill.color;
    var style  = fill.style;

    fill.style = "solid";
    fill.color = "#FFFFFFdd";
    fdoc.setCustomFill(fill);
    fdoc.addNewRectangle({left:0, top:200, right:fdoc.width, bottom:fdoc.height}, 0, false, true);
    //fl.getDocumentDOM().exitEditMode();
    fill.style = style;
    fill.color = iro;
    fdoc.setCustomFill(fill);

// 後処理
    var cLayerNum = fltl.currentLayer;
    fltl.layers[cLayerNum].locked = true;
    fltl.addNewLayer("" +cLayerN+ "");
	fl.getDocumentDOM().getTimeline().setSelectedLayers(curLayer);
	fl.getDocumentDOM().getTimeline().pasteFrames();
	
	    var fdoc = fl.getDocumentDOM();
    var fltl = fdoc.getTimeline();

    var myLayerArray = fltl.getSelectedLayers();
    var myFrameArray = fltl.getSelectedFrames();
    var countLA = myLayerArray.length;
    var countFA = myFrameArray.length;

    var KLayer = fltl.currentLayer;
    var KFrame = fltl.currentFrame;

//1フレームのみ選択
    if(countLA == 1 && myFrameArray[2]-myFrameArray[1] == 1 && countFA == 3)
    {
        func();
    }
//フレームを選択していない
    else if(countFA == 0)
    {
    //現在のフレームを選択
        fltl.setSelectedFrames(KFrame,KFrame + 1);
        func();

        fdoc.selectNone();
        fltl.setSelectedFrames([]);
    }
//フレームを複数選択している
    else
    {
        var prePosition = fltl.getSelectedFrames();
        var hozonKFrame = fltl.currentFrame;
        var FS = fltl.layers[KLayer].frames[KFrame].duration;

    //条件追加選択1以上でも1フレーム全選択の場合軽量処理。
        if (FS == [myFrameArray[2] - myFrameArray[1]])
            func();
        else
        {
            for (var i = 0; i < countFA; i++)
            {
                if (i % 3 == 0)
                {
                    var FAhani = myFrameArray[i + 2] - myFrameArray[i + 1];

                //選択範囲のみ適応
                    for (var j = 0; j < FAhani; j++)
                    {
                    //作業箇所選択
                        fltl.setSelectedLayers(myFrameArray[i]);

                    //現在のレイヤーのフレーム数を取得
                        var KLayerFcount = fltl.layers[myFrameArray[i]].frameCount;

			//選択時のキーフレームこぼし拾い
			if((myFrameArray[i + 1] + j) < KLayerFcount && j == 0 
			&& myFrameArray[i + 1] + j != fltl.layers[myFrameArray[i]].frames[myFrameArray[i + 1] + j].startFrame)
				{
				KFrameSF = fltl.layers[myFrameArray[i]].frames[myFrameArray[i + 1]].startFrame
				fltl.setSelectedFrames(KFrameSF, KFrameSF + 1);
				KLayer = myFrameArray[i];
				KFrame = KFrameSF;
				func();
				}

			//フレームのないエリアは処理しない。キーフレームのみ処理
                        if ((myFrameArray[i + 1] + j) < KLayerFcount 
			&& myFrameArray[i + 1] + j == fltl.layers[myFrameArray[i]].frames[myFrameArray[i + 1] + j].startFrame)
                        {
		                fltl.setSelectedFrames(myFrameArray[i + 1] + j, myFrameArray[i + 1] + j + 1);
				KLayer = myFrameArray[i];
				KFrame = myFrameArray[i + 1] + j;
				func();
                         }
                    }
                }
            }
        //保存された選択範囲を再現
            fltl.setSelectedFrames(prePosition);
            fltl.currentFrame = hozonKFrame;
        }
    }

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
}

//函数
    function func()
    {
      fdoc.deleteSelection();}
//            if(OK1 + OK2 == 2){fdoc.deleteSelection();}

	//}
	var orenjiiro = '#6600FF';
fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;