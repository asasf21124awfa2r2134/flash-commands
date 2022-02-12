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

// 変数
    var murasakiiro = '#00FFFF'; var aoiro = '#00FFFF'; var orenjiiro = '#00FFFF'; var akairo = '#00FFFF'; var midoriiro = '#00FFFF'; var haiiro = '#00FFFF'; var siroiro = '#00FFFF';
    var orenjiiroT = '#00FFFF';var orenjiiroD = '#00FFFF';
    var fdoc = fl.getDocumentDOM();
    var fltl  = fdoc.getTimeline();
    var Lcolor = fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color;
    var hako  = 0 ;
	var cLayerN = 0 ;
	var cLayerNpre = 0 ;

//現在のレイヤー番号を取得
    var cLayerNum = fdoc.getTimeline().currentLayer;
    var curFrame  = fltl.currentFrame;

//現在のレイヤをロック
    fltl.layers[cLayerNum].locked = true;
    cLayerN = fltl.layers[cLayerNum].name;
	if ( cLayerNum != 0){cLayerNpre = fltl.layers[cLayerNum - 1].name;}

    if(cLayerN == "paper")
    {
        fltl.addNewLayer("BG");
        hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = murasakiiro;
    }
    if(cLayerN == "BG"){fltl.addNewLayer("yyyyyyyy");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "A" && cLayerNum - 1 >= 0 && cLayerNpre == "B" ){
        fltl.addNewLayer("Atm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "A"){fltl.addNewLayer("B");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Atm"){fltl.addNewLayer("Adg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Adg"){fltl.addNewLayer("B");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "B" && cLayerNum - 1 >= 0 && cLayerNpre == "C" ){
        fltl.addNewLayer("Btm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "B"){fltl.addNewLayer("C");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Btm"){fltl.addNewLayer("Bdg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Bdg"){fltl.addNewLayer("C");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "C" && cLayerNum - 1 >= 0 && cLayerNpre == "D" ){
        fltl.addNewLayer("Ctm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "C"){fltl.addNewLayer("D");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Ctm"){fltl.addNewLayer("Cdg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Cdg"){fltl.addNewLayer("D");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "D" && cLayerNum - 1 >= 0 && cLayerNpre == "E" ){
        fltl.addNewLayer("Dtm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "D"){fltl.addNewLayer("E");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Dtm"){fltl.addNewLayer("Ddg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Ddg"){fltl.addNewLayer("E");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "E" && cLayerNum - 1 >= 0 && cLayerNpre == "F" ){
        fltl.addNewLayer("Etm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "E"){fltl.addNewLayer("F");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Etm"){fltl.addNewLayer("Edg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Edg"){fltl.addNewLayer("F");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "F" && cLayerNum - 1 >= 0 && cLayerNpre == "G" ){
        fltl.addNewLayer("Ftm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "F"){fltl.addNewLayer("G");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Ftm"){fltl.addNewLayer("Fdg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Fdg"){fltl.addNewLayer("G");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "G" && cLayerNum - 1 >= 0 && cLayerNpre == "H" ){
        fltl.addNewLayer("Gtm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "G"){fltl.addNewLayer("H");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Gtm"){fltl.addNewLayer("Gdg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Gdg"){fltl.addNewLayer("H");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "H" && cLayerNum - 1 >= 0 && cLayerNpre == "I" ){
        fltl.addNewLayer("Htm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "H"){fltl.addNewLayer("I");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Htm"){fltl.addNewLayer("Hdg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Hdg"){fltl.addNewLayer("I");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "I" && cLayerNum - 1 >= 0 && cLayerNpre == "J" ){
        fltl.addNewLayer("Itm");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "I"){fltl.addNewLayer("J");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "Itm"){fltl.addNewLayer("Idg");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroD;}

    if(cLayerN == "Idg"){fltl.addNewLayer("J");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}
    if(cLayerN == "J" && cLayerNum - 1 >= 0 && cLayerNpre == "SERIHU" ){
        fltl.addNewLayer("yyyyyyyyy");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiroT;}
        else if(cLayerN == "J"){fltl.addNewLayer("yyyyyyyyy");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = siroiro;}
    if(cLayerN == "yyyyyyyy"){fltl.addNewLayer("A");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = orenjiiro;}

    if(cLayerN == "yyyyyyyyy"){fltl.addNewLayer("yyyyyyyyy");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = siroiro;}
    if(cLayerN == "bk1"){fltl.addNewLayer("yyyyyyyy");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = siroiro;}
    if(cLayerN == "bk2"){fltl.addNewLayer("yyyyyyyy");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = midoriiro;}
    if(cLayerN == "SATUEI1" && cLayerNum - 1 >= 0 && cLayerNpre == "CAMERA" )
    {fltl.addNewLayer("SATUEI2");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = midoriiro;}
    else if(cLayerN == "SATUEI1")
    {
        fltl.addNewLayer("CAMERA");
        hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = akairo;
        if (fdoc.library.selectItem('CAMERA'))
        {
            fdoc.library.selectItem('CAMERA');
            fltl.layers[cLayerNum].outline = true;
            fdoc.library.addItemToDocument({x:640.35, y:298.8 });//({x:417.45, y:297.5});({x:640.35, y:298.8 });({x:644, y:305 });
            var cLayerNum = fdoc.getTimeline().currentLayer;
            var curFrame = fltl.currentFrame;
            fltl.layers[cLayerNum].frames[curFrame].elements[0].symbolType = "graphic";
        }
    }
    if(cLayerN == "SATUEI2"){fltl.addNewLayer("SATUEI3");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = midoriiro;}
    if(cLayerN == "SATUEI3"){fltl.addNewLayer("SATUEI4");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = midoriiro;}
    if(cLayerN == "SATUEI4"){fltl.addNewLayer("SATUEI5");hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = midoriiro;}

    if(cLayerN == "SATUEI5")
    {
        fltl.addNewLayer("CAMERA");
        hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = akairo;
        if (fdoc.library.selectItem('CAMERA'))
        {
            fdoc.library.selectItem('CAMERA');
            fltl.layers[cLayerNum].outline = true;
            fdoc.library.addItemToDocument({x:640.35, y:298.8 });//({x:417.45, y:297.5});({x:640.35, y:298.8 });({x:644, y:305 });
            var cLayerNum = fdoc.getTimeline().currentLayer;
            var curFrame = fltl.currentFrame;
            fltl.layers[cLayerNum].frames[curFrame].elements[0].symbolType = "graphic";
        }
    }

    if(cLayerN == "fffffffffffffffffffffffffffffffffffffffff")
    {
        fltl.addNewLayer("TAP");fl.getDocumentDOM().getTimeline().layers[fl.getDocumentDOM().getTimeline().currentLayer].frames[fl.getDocumentDOM().getTimeline().currentFrame].name = 'c000';
        hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = midoriiro;
        if (fdoc.library.selectItem('144_TIMER'))
        {
            fdoc.library.selectItem('144_TIMER');
            fdoc.library.addItemToDocument({x:927, y:-177.5});//youshi({x:583.6, y:17.0});
            fdoc.setInstanceTint('#646464', 100);
            fdoc.scaleSelection(1.25 , 1.25);//(0.73 , 0.73);
            fdoc.library.selectItem('tap');
            fdoc.library.addItemToDocument({x:643.66, y:-167.45});//({x:418.64, y:27.2});
            fdoc.library.addItemToDocument({x:638.7, y:349.8},"lo_pass");//youshi({x:415.95, y:323.34},"lo_pass");({x:640.7, y:349.8},"lo_pass");
            fdoc.setElementProperty('symbolType', 'movie clip');
            fdoc.setBlendMode('multiply')
        }
    }
    if(cLayerN == "TAP" || cLayerN == "LO")
    {
        fltl.addNewLayer("TEMPO");
        hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = siroiro;
        if (fdoc.library.selectItem('tempo_1m6k.wav')||fdoc.library.selectItem('tempo.wav'))
        {
            fdoc.getTimeline().setFrameProperty('soundName', 'tempo_1m6k.wav');
            fdoc.getTimeline().setFrameProperty('soundName', 'tempo.wav');
            fdoc.getTimeline().setFrameProperty('soundSync', 'stream');
            fdoc.getTimeline().setFrameProperty('soundLoopMode', 'repeat');
        }
    }
    if(cLayerN == "TEMPO")
   {
    fltl.addNewLayer("wav");
    hako = 1;fltl.layers[fl.getDocumentDOM().getTimeline().currentLayer].color = siroiro;
   }
    if(hako == 0) fltl.addNewLayer("yyyyyyyyy");

//上のレイヤーに移動//現在のレイヤをロック解除
    fdoc.getTimeline().setSelectedLayers(cLayerNum);
    fltl.layers[cLayerNum].locked = false;
    fl.outputPanel.clear();

// 選択なし// フレーム選択のクリア
    fdoc.selectNone();
    fltl.setSelectedFrames([]);

//現在のレイヤーの名前取得して告知
    var kokoLayerNum = fltl.currentLayer;
    var NumLayer = fltl.layerCount - 1;

    var layerFrame = fltl.frameCount;
    var frameCount = fltl.layers[kokoLayerNum].frameCount;
    var layerType = fltl.layers[kokoLayerNum].layerType;
    var byou = ~~(layerFrame / 24);
    var koma =layerFrame % 24;
        layerFrame = String(byou) + "+" + String(koma);
    var TLn = fltl.name +"(" + layerFrame + ")";
    var curFrame = fltl.currentFrame;
    var kokoLayerNum = fltl.currentLayer;

    if(curFrame <= frameCount && layerType != "folder")
    {
        var FS      = fltl.layers[kokoLayerNum].frames[curFrame].duration;
        var stFrame = fltl.layers[kokoLayerNum].frames[curFrame].startFrame;
        var keyF    = "@";

        if(stFrame != curFrame)
        {
            for(i = 1;i < FS;i++)
                keyF = (curFrame == stFrame + i)?keyF + "+":keyF + "-";
        }
            curFrame += 1;
            curFrame = String(Math.floor(curFrame / 24)) + "+" + String(curFrame % 24);

        if(kokoLayerNum == 0)
        {
            if(kokoLayerNum == NumLayer)
            {
                var cLayerN = fltl.layers[kokoLayerNum].name;
            }
            else
            {
                var cLayerN = fltl.layers[kokoLayerNum].name;
                var cLayerNshita = fltl.layers[kokoLayerNum + 1].name;
            }
        }else{
            if(kokoLayerNum == NumLayer)
            {
                var cLayerN = fltl.layers[kokoLayerNum].name;
                var cLayerNue = fltl.layers[kokoLayerNum - 1].name;
            }
            else if(kokoLayerNum <= NumLayer)
            {
                var cLayerN = fltl.layers[kokoLayerNum].name;
                var cLayerNue = fltl.layers[kokoLayerNum - 1].name;
                var cLayerNshita = fltl.layers[kokoLayerNum + 1].name;
            }
        }
    }
