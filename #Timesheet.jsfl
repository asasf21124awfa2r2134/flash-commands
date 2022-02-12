 var fdoc          = fl.getDocumentDOM();
    var fltl          = fdoc.getTimeline();
    var camCount      = 0 ;
    var camCountFinal = 0 ;
    var frameArray    = [];
    var tapArray      = [];
    var comArray      = [];
    var cameraArray   = [];
    var nocam         = 0 ;
    var notapArray    = [];
    var notap         = 0 ;
    var kome          = "";
    var komeArray     = [];

    fl.showIdleMessage(false);

    /*---------------------------------- タップとカメラレイヤーのフレーム名を配列にする -----------------------------------*/

    for ( j = 0; j < fltl.layerCount; j++ )
    {
        frameArray = fltl.layers[j].frames;layerName = fltl.layers[j].name.toLowerCase();
    // カメラ情報とTAPレイヤーからキーフレーム位置を取得
        if ( layerName != "camera" && layerName != "tap" ) continue;
        for ( i = 0; i < frameArray.length; i++ )
        {
            if (i != frameArray[i].startFrame) { continue;}

            if ( layerName == "tap" )
            {
             if (frameArray[i].elements.length != 0)//TAPキーフレーム毎の素材検知
                {
                notapArray.push(i + 1 ); tapArray.push( i + 1 );// endフレーム
                if ( frameArray[i].name ) comArray.push( frameArray[i].name ); // 兼用カット名
                else {comArray.push("");}
                notap = 0;
                }
            else if (frameArray[i].elements.length == 0)
                {
                notap = i + 1;notapArray[notapArray.length - 1] = notap;
                }
            }
            if ( layerName == "camera" )
            {
                if( frameArray.length != frameArray[i].duration )
                    {cameraArray[camCount] = (frameArray[i].elements.length == 0) ? "blank" : frameArray[i].elements[0];}//blank
                else {cameraArray[camCount] = "blank";nocam = 1;}
                camCount++;
            }
        }
        camCountFinal = camCount;//カメラの停止を判断
    }
    tapArray.push( fltl.frameCount + 1 ); //配列最後に総尺を足す
    notapArray.push( fltl.frameCount + 1 ); //配列最後に総尺を足す

    /*--------------------------------------- フレーム情報算出 -----------------------------------------------------
     --------- フレーム名 →→ フレームの長さ →→ キーフレーム開始判断 →→ フレーム名判断 →→ frameMatrix配列に収納 --------------*/

    var key;
    var frameMatrix = [];var cellLayerArray  = [];var dougaMatrix  = [];var cellLayerNameArray = [];var splitSakuga = 0;var splitSerihu = 0;var splitKoukaon = 0;var splitSatuei = 0;var splitCamera = 0;var splitDouga = 0;var cellLayerCount = 0;
	
    for ( i = 0; i < fltl.frameCount; i++ )
    {
        frameMatrix[i] = []; // 全体のキーフレーム管理
        dougaMatrix[i] = []; // 動画欄記入のため別配列
    }
    cellLayerNameArray = ["a","b","c","d","e","f","g","h","i","j"];

    for ( j = 0; j < fltl.layerCount; j++ )
    { 
        key = 1;
        var dec    = fltl.layerCount -j-1;   // 昇順で判別
        frameArray = fltl.layers[dec].frames;
        layerName  = fltl.layers[dec].name.toLowerCase();

    // oldフォルダレイヤー無視
        if ( fltl.layers[dec].parentLayer && fltl.layers[dec].parentLayer.name.indexOf("old")>= 0 ) continue;

    // 原画 frameMatrix[i][dec] = フレーム名 or KEY or 空セル or「ヽ」
        if ( layerName == cellLayerNameArray[cellLayerCount] )
        {
            cellLayerArray[cellLayerCount] = dec;
            cellLayerCount++;
            for ( i = 0; i < frameArray.length; i++ )
            {
                if ( i != frameArray[i].startFrame ) {continue;}
                if ( frameArray[i].elements.length > 0 )//フレームに素材ある時
                {
                    frameMatrix[i][dec] = (frameArray[i].labelType == "name") ? frameArray[i].name : key;
                    if ( frameArray[i].labelType != "name" ) key++;
                } else
                    frameMatrix[i][dec] = (frameArray[i].labelType == "name") ? frameArray[i].name : "X";//フレームが空時
            }

            splitSakuga = cellLayerCount;

            if ( fltl.layers[dec - 1].name.toLowerCase() == layerName + "tm" ) // タイミング処理
            {
                frameArray = fltl.layers[dec - 1].frames;
                for ( i = 0; i < frameArray.length; i++ )
                {
                    if ( i != frameArray[i].startFrame ) continue;

                    if ( frameArray[i].labelType == "name" )
                        frameMatrix[i][dec] = frameArray[i].name;
                    else if ( frameMatrix[i][dec] == undefined && i > 0 ) // 最初のフレームは無視
                        frameMatrix[i][dec] = "ヽ";
                }
            }
            j = 0; // 下からレイヤー走査しなおしで順番入れ替え保証
        }

    // camera情報をタイムシートに記載 frameMatrix[i][dec] = フレーム名 or 撮影用語 or「|」
        else if ( layerName == "camera" )
        {
            cellLayerArray[cellLayerCount] = dec;
            cellLayerCount++;
            camCount = 0;

            for ( i = 0; i < frameArray.length; i++ )
            {
            //frameMatrix[i][dec] = "";
            if ( i == frameArray[i].startFrame){frameMatrix[i][dec] = "";}
                if ( i == frameArray[i].startFrame && nocam == 0)
                {
                    if ( frameArray[i].tweenType == "motion")
                    {
                        if ( frameArray[i].labelType == "name") // フレームに名前が付いているか
                        {
                            kome = frameArray[i].name ;komeArray = kome.split(" ");kome = "";
                            for (p = 0; p < komeArray.length; p++){if(fltl.frameCount > i+p){if( p == 0){kome += "( " + komeArray[p] + " )" + "\n";}else{kome += "  " +  komeArray[p] + "\n";}}}frameMatrix[i][dec] += kome;
                            //		frameMatrix[i][dec] += "( " + frameArray[i].name + " )";
                        }
                        else {frameMatrix[i][dec] += "(     )";}
                        var Easing = (fltl.layers[dec].frames[i].tweenEasing == 0) ? ""
                         :(fltl.layers[dec].frames[i].tweenEasing < 0) ? "前ツメ\n " + Math.abs(fltl.layers[dec].frames[i].tweenEasing) +" %"
                         : fltl.layers[dec].frames[i].tweenEasing +" %\n 後ツメ";
                        if (fltl.layers[dec].frames[i].hasCustomEase == true){Easing = "両ツメ";}
                        frameMatrix[i][dec] += camCheck( camCount ) + Easing;
                    }
                    else if ( frameArray[i].elements.length > 0 && i >= 1)
                    {
                        if(frameArray[i-1].tweenType == "motion")
                        {
                             frameMatrix[i][dec] += (frameArray[i].labelType == "name")? "(  " + frameArray[i].name + "  )" : "(       )" ;
                        }
                    }
                    else  frameMatrix[i][dec] += (frameArray[i].labelType == "name")?frameArray[i].name:"";

                    camCount++;
                }
                else if ( frameArray[i].tweenType == "motion" ) frameMatrix[i][dec] = "|";
                splitCamera = cellLayerCount;
            }
        }
        // セリフと効果音と撮影は共通 frameMatrix[i][dec] = ライブラリアイテム名 or「|」
        else if ( layerName.substring( 0,6 ) == "serihu" ){union( splitSerihu );splitSerihu  = cellLayerCount;}
        else if ( layerName.substring( 0,6 ) == "satuei" ){union( splitSatuei );splitSatuei  = cellLayerCount;}
        else if ( layerName.substring( 0,7 ) == "koukaon" ){union( splitKoukaon );splitKoukaon = cellLayerCount;}

    /*------ カメラの動き解析 ------*/
        function camCheck ( n )
        {
            var camStatus = "";
            if ( n == undefined || cameraArray.length == 0 )                                    {return "error";}
            if ( n + 1 == camCountFinal )                                                       { camStatus = "停止"}
            else
            {
                if ( cameraArray[n + 1] == "blank" )                                             camStatus  = "Ｌ\n ";
                if ( cameraArray[n + 1].scaleX - cameraArray[n].scaleX > 1 / 100 )               camStatus += "TB\n ";//TUかTB
                if ( cameraArray[n + 1].scaleX - cameraArray[n].scaleX < -1 / 100 )              camStatus += "TU\n ";
                if ( cameraArray[n + 1].rotation - cameraArray[n].rotation != 0 )                camStatus += "回転\n ";//回転
                if ( Math.abs( cameraArray[n + 1].transformX - cameraArray[n].transformX ) > 1 |
                     Math.abs( cameraArray[n + 1].transformY - cameraArray[n].transformY ) > 1 ) camStatus += "PAN\n ";//PAN"PAN\n "
            }
            return camStatus;
        }

    /*------ セリフと効果音と撮影 ------*/
        function union ( split )
        {
            cellLayerArray[cellLayerCount] = dec;
            cellLayerCount++;

            for ( i = 0; i < frameArray.length; i++ )
            {
                if ( i == frameArray[i].startFrame )
                {
                    if ( frameArray[i].labelType == "name" )//フレーム名あれば取り込む
                    {
                        if ( frameArray[i].elements.length > 0 )
                        {
                            frElement = frameArray[i].elements[0];
                            if (frElement.elementType == "instance")//シンボル名あれば取り込む
                            {
                                kome = frElement.libraryItem.name.substring( (frElement.libraryItem.name.lastIndexOf( "/" )+1) );
                                if ( frameArray[i].elements.length > 1)
                                {
                                    frElement = frameArray[i].elements[1];
                                    (frElement.elementType == "instance") ? kome = kome + "" + frElement.libraryItem.name.substring( (frElement.libraryItem.name.lastIndexOf( "/" )+1) ) : "";
                                }
                                kome += " " + frameArray[i].name;
                                komekko();
                            }
                            else{ kome = frameArray[i].name;komekko();}//インスタンスでない場合＋エレメントあり
                            frameMatrix[i][dec] = "|"+ frameMatrix[i][dec];
                        }
                        else{ kome = frameArray[i].name;komekko();frameMatrix[i][dec] += "|"+ frameMatrix[i][dec];}
                    }
                    else
                    {
                        if ( frameArray[i].elements.length > 0 )
                        {
                            frElement = frameArray[i].elements[0];
                            if (frElement.elementType == "instance")//シンボル名あれば取り込む
                            {kome = frElement.libraryItem.name.substring( (frElement.libraryItem.name.lastIndexOf( "/" )+1) );
                                if ( frameArray[i].elements.length > 1){
                                frElement = frameArray[i].elements[1];
                                (frElement.elementType == "instance") ? kome = kome + "" + frElement.libraryItem.name.substring( (frElement.libraryItem.name.lastIndexOf( "/" )+1) ) : "";}
                                komekko();}
                            frameMatrix[i][dec] = (frElement.elementType == "instance") ? "|" + frameMatrix[i][dec] : "|";
                        }
                    }
                }
                else if ( frameArray[i].elements.length > 0 && frameMatrix[i][dec] != undefined) frameMatrix[i][dec] = "|"+ frameMatrix[i][dec];
                else if ( frameArray[i].elements.length > 0) frameMatrix[i][dec] = "|";
            }
            //if ( split == splitSatuei )  splitSatuei  = cellLayerCount;
            //if ( split == splitSerihu )  splitSerihu  = cellLayerCount;
            //if ( split == splitKoukaon)  splitKoukaon = cellLayerCount;
        }
    }

       function komekko()
       {
           komeArray = kome.split("");
           for (p = 0; p < komeArray.length; p++)
           {
               if(fltl.frameCount > i+p &&  frameArray[i-1].tweenType != "motion"){frameMatrix[i + p][dec] = "\n" + komeArray[p];}
               else{frameMatrix[i][dec] = "";}
           }
       }

// 動画別途記入 dougaMatrix[i][dec] = フレーム名 or KEY or 空セル
    for ( j = 0; j < fltl.layerCount; j++ )
    {
		key = 1;
        var dec = fltl.layerCount -j -1;
        frameArray = fltl.layers[dec].frames;

    // レイヤー名に「dg」つかないものは無視
        if ( fltl.layers[dec].name.toLowerCase().indexOf( "dg" ) < 1 ) continue;

        cellLayerArray[cellLayerCount] = dec;
        cellLayerCount++;

        for ( i = 0; i < frameArray.length; i++ )
        {
            if ( i != frameArray[i].startFrame ) continue;

            if ( frameArray[i].elements.length > 0 )//フレームに素材ある時
            {
                dougaMatrix[i][dec] = (frameArray[i].labelType == "name") ? frameArray[i].name : key;
                if ( (frameArray[i].elements.length > 0) ) key++;
            }
            else
            {
                dougaMatrix[i][dec] = (frameArray[i].elements.length > 0) ? key : "x";
            }
        }
        splitDouga = cellLayerCount;
    }


    /*--------------------------------------- TimeSheetシンボル追加 -----------------------------------------------*/
	

    var sheetName = "#TimeSheet";
    if (fdoc.library.selectItem( sheetName ))
    {
        fltl.setSelectedFrames( [0,0,1] );
        if(fltl.layers[0].name != "ts")
            {
            fltl.addNewLayer( "ts" );
            fdoc.library.addItemToDocument( {x:416,y:360},"#TimeSheet" );
			fl.getDocumentDOM().transformSelection(0.000092, 1, -1, 0.000092);
			fl.getDocumentDOM().align('horizontal center', true);
			fl.getDocumentDOM().align('vertical center', true);
			fl.getDocumentDOM().match(true, true, true);
			fl.getDocumentDOM().getTimeline().setLayerProperty('layerType', 'guide');
            }

        fdoc.library.editItem( sheetName );
        var tl_Sheet = fl.getDocumentDOM().getTimeline();
        tl_Sheet.copyFrames(0); 
        tl_Sheet.setSelectedFrames( [0,0,1] );
        tl_Sheet.addNewLayer( "Time Sheet" );
        if ( tl_Sheet.frameCount > 1 )  tl_Sheet.setSelectedFrames( [0,1,tl_Sheet.frameCount] );
    }
    else
    {
        fdoc.library.addNewItem( "graphic",sheetName );

        fltl.setSelectedFrames( [0,0,1] );
        if(fltl.layers[0].name != "ts")
            {
            fltl.addNewLayer( "ts" );
            fdoc.library.addItemToDocument( {x:0,y:-230},"#TimeSheet" );
			fl.getDocumentDOM().transformSelection(0.000092, 1, -1, 0.000092);
fl.getDocumentDOM().match(true, true, true);
fl.getDocumentDOM().align('horizontal center', true);
fl.getDocumentDOM().align('vertical center', true);
fl.getDocumentDOM().getTimeline().setLayerProperty('layerType', 'guide');
            }

        fdoc.library.editItem( sheetName );
        var tl_Sheet = fl.getDocumentDOM().getTimeline();
        tl_Sheet.layers[0].name = "TimeSheet";
        tl_Sheet.copyFrames(0); 
    }

// 6秒毎にページを定義 兼用カットにも対応
    var sec     = [];
    var notapsec= [];
    var m       = 0;
    var n       = 0;
    var secPlus = 0;

    for ( i = 0; i < tapArray.length - 1; i++ )   // フレーム差分を計算
    {
        var diff = Math.abs( tapArray[i] - tapArray[i + 1] );
        var notapdiff = Math.abs( notapArray[i] - tapArray[i + 1] ); if (diff == notapdiff){notapdiff = 0;}//else{notapdiff += 1 ;}//空TAPフレーム差分算出
        if (fltl.layers[fltl.findLayerIndex("TAP")].frames[tapArray[i] - 1].elements.length > 0 ) // tapレイヤーが空白でなければ
        {
            sec.push( diff );notapsec.push( notapdiff )
            if ( diff > 144 ) {m += Math.floor(diff/144);if ( diff%144 == 0 ){ m = m - 1 }}
        }
    }

// フレーム調整
    for (i = tl_Sheet.layerCount; 0<i; i--) tl_Sheet.deleteLayer(i);

    tl_Sheet.removeFrames(1,tl_Sheet.frameCount);
    if (tl_Sheet.frameCount < tapArray.length) tl_Sheet.insertFrames(sec.length-1 + m, true);

    fdoc.library.addItemToDocument( {x:0,y:0},"_sheet" );
    fl.getDocumentDOM().align( 'left',true );
    fl.getDocumentDOM().align( 'top' ,true );
    fdoc.selectNone();tl_Sheet.layers[0].locked = true;

    fdoc.getTimeline().addNewLayer( "header" );

    if ( tl_Sheet.frameCount > 1 ) tl_Sheet.convertToKeyframes( 0,(tl_Sheet.frameCount) );
    tl_Sheet.currentFrame = 0;

// タイムシート情報記載
    for ( i = 0; i < sec.length; i++ )
    {
        for ( j = 0; j <= Math.floor( sec[i] / 145 ); j++ ) //最低１回はヘッダに記入
        {
            fdoc.addNewText({left: 35, top:80, right:160, bottom:125});
							fdoc.setTextString((comArray.length > 0)? comArray[i]:"");                  //カットNo  comArray.join("/"):"");     if (notapArray[i] == 1)
            fdoc.addNewText({left:565, top:20, right:600, bottom: 50});
							fdoc.setTextString((sec[i] <= 144)? 1 : ++n );                              //ページ分子
            if ((sec[i] % 144) != 0 ){ secPlus = 1;}else {secPlus = 0;}                                                          //丁度フレーム時の調整
            fdoc.addNewText({left:605, top:40, right:630, bottom: 75});
							fdoc.setTextString((sec[i] <= 144)? 1 : Math.floor(sec[i]/144) + secPlus ); //ページ分母
            fdoc.addNewText({left:250, top:80, right:275, bottom:125})
							fdoc.setTextString(Math.floor( (sec[i] - notapsec[i]) / fdoc.frameRate ) );//秒
            fdoc.addNewText({left:350, top:80, right:375, bottom:125});
							fdoc.setTextString((sec[i] - notapsec[i]) % fdoc.frameRate );              //コマ
            tl_Sheet.currentFrame++;
        }
        n = 0;
    }

    fdoc.selectNone();
    fdoc.setFillColor( '#000000' );

    for ( i = 0; i < tl_Sheet.frameCount; i++ )// フォントスタイル
    {
        fdoc.selectNone();
        tl_Sheet.setSelectedFrames( [0,i,i + 1] );
        fdoc.setElementTextAttr( 'size',20 );
        fdoc.setElementTextAttr('alignment', 'left');
        fdoc.setElementTextAttr( 'face','ＭＳ Ｐゴシック' );
        fdoc.setElementProperty('orientation', 'horizontal');//横文字
        fdoc.setElementTextAttr('lineSpacing', -1);//行間狭く

        fdoc.setFillColor( '#000000' );
    }
    fdoc.selectNone();tl_Sheet.layers[0].locked = true;

    /*-------------------------------------------- タイムシートに情報記入 ----------------------------------------------------*/

    fl.outputPanel.clear();

    var dxSakuga  = 11;
    var oxSakuga  = 11;
    var dxSerihu  = 12.75;
    var dxKoukaon = 12.75;
    var dxSatuei  = 12.6;
    var dxCamera  = 29;
    var dxDouga   = 14.25;
    var dy        = 11.25;
    var sx        = 25;
    var sy        = 8;
    var oxSerihu  = 129;//132;縦文字差分129横文字差分
    var oxKoukaon = 147;//150;縦文字差分147横文字差分
    var oxSatuei  = 317;//321;縦文字差分317横文字差分
    var oxCamera  = 384.25;//385.25;縦文字差分 382.25横文字差分
    var oxDouga   = 171;//修正前位置185
    var oy        = 343;
    var colx      = 412.5;
    var m         = 0;
    var n         = 1;
    var flag      = true;
    var e         = 0;
    var exTxtData = 0;
    var exTxt     = "";
    var exTxtArray= [];
    var jcheck    = 0;//dell

    fdoc.getTimeline().addNewLayer( "keyData" );
    if ( tl_Sheet.frameCount > 1 ) tl_Sheet.convertToKeyframes( 0,(tl_Sheet.frameCount));
    tl_Sheet.currentFrame = 0;

    for ( i = 0; i < fltl.frameCount; i++ )
    {
    // 頁送り
        if ( i == tapArray[n]-1 )
        {
            if(fltl.layers[fltl.findLayerIndex("TAP")].frames[i].elements.length > 0) tl_Sheet.currentFrame ++;
            n ++;
            m = 0;
            flag  = false;
        }
        if ( m!=0 && m%144 == 0 && !flag) tl_Sheet.currentFrame++; // tapキーフレーム時
        if ( i!=0 && i%144 == 0 &&  flag) tl_Sheet.currentFrame++; // 通常時

    //書き込みユニット
            function addText ( dx,sp,ox )
            {
                var tap = (flag)?i:m; //ページ切替時の位置整理に使う		
                fdoc.addNewText( {
                    left  : (j-sp) *dx + ox +     ((tap-tap%72)/72)%2 *colx,
                    top   : tap%72 *dy + oy,
                    right : (j-sp) *dx + ox + sx +((tap-tap%72)/72)%2 *colx,
                    bottom: tap%72 *dy + oy + sy
                })
				fdoc.setTextString((j >= splitCamera )?dougaMatrix[i][cellLayerArray[j]]:frameMatrix[i][cellLayerArray[j]]);
            }

    // 書き込み条件
        for ( j = 0; j < cellLayerArray.length; j++ )
        {
           if ( j < splitCamera &&frameMatrix[i][cellLayerArray[j]] == undefined                                    ){exTxtSet();continue;fl.trace("1 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + frameMatrix[i][cellLayerArray[j]] + "]");continue;} // 記入なし
           else if ( j <  splitSakuga  )                     {addText( dxSakuga,0,oxSakuga                          );exTxtSet();continue;fl.trace("2 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + frameMatrix[i][cellLayerArray[j]] + "]");continue;} // 原画欄記入
           //else if ( j >= splitSakuga  && j < splitSerihu   ){addText( dxSerihu,splitSakuga,oxSerihu                );exTxtSet();continue;fl.trace("3 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + frameMatrix[i][cellLayerArray[j]] + "]");continue;} // 台詞欄記入
           //else if ( j >= splitSerihu  && j < splitKoukaon  ){addText( dxKoukaon,splitSerihu,oxKoukaon              );exTxtSet();continue;fl.trace("4 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + frameMatrix[i][cellLayerArray[j]] + "]");continue;} // 効果音記入
           //else if ( j >= splitKoukaon && j < splitSatuei   ){addText( dxSatuei,splitKoukaon,oxSatuei               );exTxtSet();continue;fl.trace("5 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + frameMatrix[i][cellLayerArray[j]] + "]");continue;} // 撮影欄記入
           else if ( j >= splitSatuei  && j < splitCamera   ){addText( dxCamera,splitSatuei,oxCamera                );exTxtSet();continue;fl.trace("6 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + frameMatrix[i][cellLayerArray[j]] + "]");continue;} // カメラ記入
           else if ( j >= splitCamera  &&  dougaMatrix.length != 0 && dougaMatrix[i][cellLayerArray[j]] == undefined){exTxtSet();continue;fl.trace("7 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + dougaMatrix[i][cellLayerArray[j]] + "]");continue;} // 動画欄記入なし
           else if ( j >= splitCamera  && j < cellLayerCount){addText( dxDouga,splitCamera,oxDouga                  );exTxtSet();continue;fl.trace("8 " + fltl.layers[cellLayerArray[j] + 1].name + "[" + dougaMatrix[i][cellLayerArray[j]] + "]");continue;} // 動画欄記入  
        }
        m++;
    }

    function exTxtSet ()
        {
        if(i == 0)
            {exTxtArray[j] = '"' + fltl.layers[cellLayerArray[j] + 1].name + '"' + ',';}
        exTxt = (j >= splitCamera)?dougaMatrix[i][cellLayerArray[j]]:frameMatrix[i][cellLayerArray[j]];if (exTxt == undefined){exTxt = "";}
        exTxtArray[j] += '"' + exTxt + '"' + ',' ; 
        }


    for ( i = 0; i < tl_Sheet.frameCount; i++ )// フォントスタイル
    {
        tl_Sheet.currentFrame = i;
        tl_Sheet.setSelectedFrames ( [0,i,i + 1] );
        fdoc.setElementTextAttr( 'size',10 );
        fdoc.setElementTextAttr("letterSpacing", -1);
        fdoc.setElementTextAttr('alignment', 'left');
        fdoc.setElementTextAttr( 'face','ＭＳ Ｐゴシック' );
        fdoc.setElementProperty('orientation', 'horizontal');//横文字
        fdoc.setElementTextAttr('lineSpacing', -1);//行間狭く
        //fdoc.setElementProperty('orientation', 'vertical left to right');//縦文字変換
    }
    fdoc.selectNone();tl_Sheet.layers[0].locked = true;

    /*-------------------------------------------- タイムシートに情報記入2(縦文字) ----------------------------------------------------*/

    m         = 0;
    n         = 1;
    flag      = true;

    fdoc.getTimeline().addNewLayer( "tateData" );
    if ( tl_Sheet.frameCount > 1 ) tl_Sheet.convertToKeyframes( 0,(tl_Sheet.frameCount));
    tl_Sheet.currentFrame = 0;

    for ( i = 0; i < fltl.frameCount; i++ )
    {
    // 頁送り
        if ( i == tapArray[n]-1 )
        {
            if(fltl.layers[fltl.findLayerIndex("TAP")].frames[i].elements.length > 0) tl_Sheet.currentFrame ++;
            n ++;
            m = 0;
            flag  = false;
        }
        if ( m!=0 && m%144 == 0 && !flag) tl_Sheet.currentFrame++; // tapキーフレーム時
        if ( i!=0 && i%144 == 0 &&  flag) tl_Sheet.currentFrame++; // 通常時

    // 書き込み条件
        for ( j = 0; j < cellLayerArray.length; j++ )
        {
           if ( frameMatrix[i][cellLayerArray[j]] == undefined                                               ){continue;} // 記入なし
            else if ( j >= splitSakuga  && j < splitSerihu  ){addText( dxSerihu,splitSakuga,oxSerihu         );continue;} // 台詞欄記入
            else if ( j >= splitSerihu  && j < splitKoukaon ){addText( dxKoukaon,splitSerihu,oxKoukaon       );continue;} // 効果音記入
            else if ( j >= splitKoukaon && j < splitSatuei  ){addText( dxSatuei,splitKoukaon,oxSatuei        );continue;} // 撮影欄記入
        }
        m++;
    }

    for ( i = 0; i < tl_Sheet.frameCount; i++ )// フォントスタイル
    {
        tl_Sheet.currentFrame = i;
        tl_Sheet.setSelectedFrames( [0,i,i + 1] );
        fdoc.setElementTextAttr( 'size',9 );
        fdoc.setElementTextAttr("letterSpacing", -1);
        fdoc.setElementTextAttr( 'face','ＭＳ Ｐゴシック' );
        fdoc.setElementTextAttr('alignment', 'left');
        fdoc.setElementTextAttr('lineSpacing', -1);//行間狭く
        fdoc.setElementProperty('orientation', 'vertical left to right');//縦文字変換
    }
    fdoc.selectNone();tl_Sheet.layers[0].locked = true;

    /*--------------------------------------------- memoレイヤー復帰 --------------------------------------------------*/

    tl_Sheet.setSelectedFrames([0,0,1]);
    var tl_Sheetpos = fl.getDocumentDOM().getTimeline();//変化後のシート枚数再確認
	tl_Sheet.pasteFrames();
	tl_Sheet.layers[0].name = "memo";
    if ( tl_Sheet.frameCount > 1 ) tl_Sheet.convertToKeyframes( 0,(tl_Sheet.frameCount) );
    tl_Sheet.setSelectedFrames([0,0,1]);
    fdoc.selectNone();
    fdoc.selectNone();tl_Sheet.layers[0].locked = false;
    /*--------------------------------------------- エンドマーカー設置 --------------------------------------------------*/

    tl_Sheet.setSelectedFrames([0,0,1]);
    fdoc.getTimeline().addNewLayer( "endbar" );
    if ( tl_Sheet.frameCount > 1 ) tl_Sheet.convertToKeyframes( 0,(tl_Sheet.frameCount));
    tl_Sheet.currentFrame = 0;
    for ( i = 0; i < tapArray.length - 1; i++ )
    {
    // ６秒刻みの時特殊配置、Tapレイヤーが空白キーフレームの時はエンドバーを置かない
        var arr =  Math.abs( tapArray[i] - tapArray[i + 1]) - notapsec[i];
        var arrH = 0;                      //3秒時表記変更用
        if ( arr % 144 == 0)
        {
         arr = arr - 1;
         tl_Sheet.currentFrame = tl_Sheet.currentFrame + (Math.floor(arr/144) );
         fdoc.library.addItemToDocument({x:((arr-(arr%72))/72)%2*colx + 210, y:(arr%72)*11.25 + 345 + 11.25},"_endbar");
         tl_Sheet.currentFrame++;
         continue;
        }
        if ( fltl.layers[fltl.findLayerIndex("TAP")].frames[tapArray[i] - 1].elements.length == 0 ) continue;
        if ( arr > 144 ) tl_Sheet.currentFrame += Math.floor( arr/144 );
　　　　if (arr % 72 == 0 ){arrH = 11.25; arr = arr - 1;}
        fdoc.library.addItemToDocument({x:((arr-(arr%72))/72)%2*colx + 210, y:(arr%72)*11.25 + 345 + arrH},"_endbar");
        tl_Sheet.currentFrame++;
    }
    fdoc.selectNone();tl_Sheet.layers[0].locked = true;



    /*----------------------------------------------- シンボル選択(解像度144相当印刷用) ---------------------------------------------------*/

    //var sheetName = "#TimeSheetx2";
    //if ( !fdoc.library.selectItem( sheetName ) )
    //{
        //fdoc.library.addNewItem( "graphic",sheetName );
       // fdoc.library.selectItem( sheetName );
       // fdoc.library.editItem();
       // fdoc.library.addItemToDocument( {x:0,y:0},"#TimeSheet" );
       // fdoc.setElementProperty( 'symbolType','graphic' );
       // fdoc.transformSelection( 2,0,0,2 );
       // fdoc.align( 'top',true );
       // fdoc.align( 'left',true );
    //}else

    fdoc.library.editItem( sheetName );          //fl.getDocumentDOM().enterEditMode( 'inPlace' );//fl.getDocumentDOM().exitEditMode();
    fdoc.getTimeline().layers[0].locked = false;fdoc.getTimeline().setSelectedFrames( [0,0,1] );fdoc.swapElement('#TimeSheet');

        if (tl_Sheetpos.frameCount != fl.getDocumentDOM().getTimeline().frameCount)
        {
            if (tl_Sheetpos.frameCount > fl.getDocumentDOM().getTimeline().frameCount)
            {fl.getDocumentDOM().getTimeline().insertFrames ( tl_Sheetpos.frameCount - fl.getDocumentDOM().getTimeline().frameCount );}//短すぎる場合
            else if (tl_Sheetpos.frameCount < fl.getDocumentDOM().getTimeline().frameCount)
            {fl.getDocumentDOM().getTimeline().removeFrames((tl_Sheetpos.frameCount),fl.getDocumentDOM().getTimeline().frameCount);}//長すぎる場合
        }
        //fl.getDocumentDOM().getTimeline().insertFrames( tl_Sheet.frameCount - 1 );
        //fl.getDocumentDOM().exitEditMode();

    fdoc.library.editItem( "#TimeSheet" );
    fdoc.zoomFactor = 1;

    /*----------------------------------------------- テキスト表記用 ---------------------------------------------------*/

//continue;

var preTxt = "";
for (i = 0; i < fltl.frameCount + 2; i++ )
{
    if ( i == 0){exTxt = '"Frame",';}
    if ( i == 1 ){exTxt += '"",';}
    if ( i >= 2 ){exTxt += '"' + ( i -1) + '",';}
    for ( j = 0; j < cellLayerArray.length + 1; j++ )
        {
        if ( i == 0 && j >= 1 ){exTxt += '"",';}
        if ( i == 1 && j >= 1 ){exTxt += '"' + fltl.layers[cellLayerArray[j-1]+1].name + '",';}
        if ( i >= 2 && j >= 1 )
            {
            if(j -1 < splitCamera )
                {
                if (frameMatrix[i - 2][cellLayerArray[j -1]] == undefined){exTxt += '"",'; }
                else
                    {
                    preTxt = "_" + frameMatrix[i - 2][cellLayerArray[j -1]] ;preTxt = preTxt.replace('_','');
                    if (preTxt.indexOf('\n')>= 0){preTxt = preTxt.replace('\n','');preTxt = preTxt.replace('\n','');preTxt = preTxt.replace('\n','');}
                    exTxt += '"' + preTxt + '",'; 
                    }
                }
            else if (j -1 >= splitCamera &&  dougaMatrix.length != 0 )
                {
                if (dougaMatrix[i - 2][cellLayerArray[j -1]] == undefined){exTxt += '"",'; }
                else
                    {
                    preTxt = "_" + dougaMatrix[i - 2][cellLayerArray[j -1]] ;preTxt = preTxt.replace('_','');
                    if (preTxt.indexOf('\n')>= 0){preTxt = preTxt.replace('\n','');preTxt = preTxt.replace('\n','');}
                    exTxt += '"' + preTxt + '",'; 
                    }
                }
            }
        if ( j == cellLayerArray.length  ){exTxt = exTxt.substring(0,(exTxt.length - 1)) + "\r"}
        }
}


 fl.trace(exTxt);
 fdoc.selectNone();tl_Sheet.layers[0].locked = true;
fl.getDocumentDOM().getTimeline().setSelectedLayers(1);

