//変数
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
//函数
    function func()
    {
        var OK1 = fltl.layers[KLayer].locked;
            OK1 = (OK1 == false) ? 1 : 0;

        var OK2 = fltl.layers[KLayer].visible;
            OK2 = (OK2 == true)  ? 1 : 0;

        var OK3 = fltl.layers[KLayer].frames[KFrame].elements;
            if(OK1 + OK2 == 2){fltl.setFrameProperty( "name","" );}
//            if(OK1 + OK2 == 2){fdoc.deleteSelection();}

	}
