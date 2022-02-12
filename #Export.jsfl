   var fdoc = fl.getDocumentDOM();
  //var uri = fl.documents[0].pathURI;
    var uri  = fl.browseForFolderURL();
    if (uri != null)
    {       
    // 変数
        var fdoc = fl.getDocumentDOM();
        var fltl = fdoc.getTimeline();
        var key;
        var frameArray;
        var layerName;
        var can = 0;
        var setL = 0;
        var CELLcheck = "";

    //追加変数
        var LayerSUU = fltl.layerCount + 1;
        var LayerFG = new Array();
        var kokoLayerNum = fltl.currentLayer;
        var INlayerFrame = fltl.frameCount;

    // 同名リネーム
        var numArray = [];
        for(var l = 0; l < fltl.layerCount; l++) numArray.push(fltl.layers[l].name);

        for (var l = fltl.layerCount; l>0; l--)
        {
            var n = 2; // レイヤーの整理番号

            for(var m = l-1; m>0; m--)
            {
                if (numArray[l] != numArray[m]) continue;

                if( fltl.layers[m].name.indexOf("_")>=0)
                    fltl.layers[m].name.split("_")[0] + "_" + n;
                else
                    fltl.layers[m].name += "_" + n;
                n++;
            }
        }
    // ナンバリングレイヤー追加
        fltl.setSelectedLayers(0);
        if(fltl.layers[0].name == "num") fltl.deleteLayer(0);
        fltl.addNewLayer("num");
        for(var i = 0;i < LayerSUU; i++ ){(fltl.layers[i].visible == true)?LayerFG[i] = 1:LayerFG[i] = 0;}
        fltl.setLayerProperty('visible', false, 'all');

    //tapレイヤーとnumレイヤーのみ表示
        for (j = 0; j < fltl.layerCount; j++)
        {
            layerName = fltl.layers[j].name;
            if(layerName.toLowerCase()=="tap"|layerName.toLowerCase()=="num")
                frameArray = fltl.layers[j].visible = true;
				if(layerName.toLowerCase()=="paper")
                frameArray = fltl.layers[j].visible = true;
        }

        for (j = 1; j < fltl.layerCount; j++)
        {
        /*----------------------------------------XUL設定---------------------------------------------------------------*/
           if(j == 1)
            {
                var xmlString = '<?xml version="1.0" encoding="UTF-8"?>';
                    xmlString +='<dialog id="PNG Setting" title="PNG Setting" buttons="accept, cancel">';
                    xmlString +='<label value="出力サイズ"/>';
                    xmlString +='<hbox>';
                    xmlString +='<label value="   "/>';
                    xmlString +='<label value="幅: "/>';
                    xmlString +='<textbox id="width"  value="" oncreate="setW()" width="50"/>';
                    xmlString +='<label value="px"/>';
                    xmlString +='<label value="高さ: "/>';
                    xmlString +='<textbox id="height" value="" oncreate="setH()" width="50"/>';
                    xmlString +='<label value="px"/>';
                    xmlString +='</hbox>';
                    xmlString +='<hbox align="center">';
                    xmlString +='<label value="解像度: "/>';
                    xmlString +='<textbox id="reso" value="72" onchange="resolution()" width="50" />';
                    xmlString +='<label value="dpi"/>';
                    xmlString +='</hbox>';
                    xmlString +='<label value=""/>';
                    xmlString +='<label value="出力オプション"/>';
                    xmlString +='<hbox align="center">';
                    xmlString +='<label value="  "/>';
                    xmlString +='<checkbox id="alpha" label="アルファチャンネル" checked="true"/>';
                    xmlString +='</hbox>';
                    xmlString +='<script>';
                    xmlString +='var fdoc = fl.getDocumentDOM();';
                    xmlString +='var LOreso = 1;';
                    xmlString +='if (fdoc.getTimeline().name == "LO"||fdoc.getTimeline().name.indexOf("=")>= 0){ LOreso = 0.5625;}';
                    xmlString +='function setH(){';
                    xmlString +='fl.xmlui.set("height",Math.round(fdoc.height*LOreso));';
                    xmlString +='}';
                    xmlString +='function setW(){';
                    xmlString +='fl.xmlui.set("width",Math.round(fdoc.width*LOreso));';
                    xmlString +='}';
                    xmlString +='function flag()';
                    xmlString +='{';
                    xmlString +='if(fl.xmlui.getEnabled("width")){';
                    xmlString +='fl.xmlui.set("height",fdoc.height*2);';
                    xmlString +='fl.xmlui.set("width" ,fdoc.width*2);';
                    xmlString +='fl.xmlui.setEnabled("width",  false);';
                    xmlString +='fl.xmlui.setEnabled("height", false);';
                    xmlString +='}else{';
                    xmlString +='fl.xmlui.set("height",fdoc.height);';
                    xmlString +='fl.xmlui.set("width" ,fdoc.width);';
                    xmlString +='fl.xmlui.setEnabled("width",  true);';
                    xmlString +='fl.xmlui.setEnabled("height", true);';
                    xmlString +='}';
                    xmlString +='}';
                    xmlString +='function resolution(){';
                    xmlString +='fl.xmlui.set("height",Math.round(fdoc.height*LOreso));';
                    xmlString +='fl.xmlui.set("width" ,Math.round(fdoc.width*LOreso));';
                    xmlString +='var r = fl.xmlui.get("reso");';
                    xmlString +='var h = fl.xmlui.get("height");';
                    xmlString +='var w = fl.xmlui.get("width") ;';
                    xmlString +='fl.xmlui.set("height",Math.floor(h*(r/72)));';
                    xmlString +='fl.xmlui.set("width" ,Math.floor(w*(r/72)));';
                    xmlString +='}';
                    xmlString +='</script>';
                    xmlString +='</dialog>';

            // XULの書き出し
                var temp = fl.configURI + "dialog" + new Date().getTime() + ".xml";
                FLfile.write( temp , xmlString );
                var dialog = fdoc.xmlPanel( temp );
                FLfile.remove( temp );

            // publishプロファイルに幅と高さ アルファ書き込み
               // if (dialog.dismiss == "accept")
               // {
            //        var profileXML = fdoc.exportPublishProfileString();
            //        var xml = XML(profileXML);
//
            //        xml.PublishPNGProperties.MatchMovieDim = 0;
            //        xml.PublishPNGProperties.Width    = Number(dialog.width);
            //        xml.PublishPNGProperties.Height   = Number(dialog.height);
            //        xml.PublishPNGProperties.BitDepth = (dialog.alpha == "false")?"24 ビット (アルファチャンネル)":"24 ビット";
             //       fdoc.importPublishProfileString(xml);
             //   }
             //   else
                //    break;
           }
        /*-------------------------------------------書き出し------------------------------------------------------------*/

            layerName = fltl.layers[j].name;

        // 書き出すレイヤーの条件
            if (layerName == 'TAP' || layerName.indexOf("tm")>= 0) continue;//|| layerName.indexOf("dg")>= 0 
            if (fltl.layers[j].parentLayer && fltl.layers[j].parentLayer.name.indexOf("old")>= 0) continue;

            if(layerName.length < 4             |
               layerName.substring(0,2) == "GS" |
               layerName.substring(0,1) == "_"  |
               layerName.substring(0,1) == "=")
            {
            // 上から順番にレイヤーを表示
                key = 1;
                frameArray = fltl.layers[j].frames;
                fltl.setSelectedLayers(j);
                fltl.setLayerProperty('visible', true);
                if(layerName.substring(0,1) == "=") {fltl.layers[j+1].visible = !fltl.layers[j+1].visible;setL = 1;}
              //  if(layerName == "Time Sheet"){for(var i = 0;i < LayerSUU; i++ ){(LayerFG[i] == 0)?fltl.layers[i].visible = false:fltl.layers[i].visible = true;}}

                layerName = fltl.layers[j].name.replace(/%|#|@|_|=/,"");// 記号排除と同名検出
                layerName = layerName.replace(/%|#|@|_|=/,"");
				
				fl.getDocumentDOM().getTimeline().selectAllFrames();
var tl = fl.getDocumentDOM().getTimeline();
var selFrames = tl.getSelectedFrames();
for (n=0; n<selFrames.length; n+=3)
{
	layerNum=selFrames[n];
	if(tl.layers[layerNum].visible == true){
		tl.layers[layerNum].layerType = "normal";
	}
	else
	{
		if(tl.layers[layerNum].visible == false){
			tl.layers[layerNum].layerType = "guide";
		}
	}
}
fl.getDocumentDOM().getTimeline().setSelectedFrames(1, 0, true);

                //CELLcheck = confirm(layerName + "セルを出力します");if (CELLcheck == false) can = 1;
            // 前から順番にフレーム走査
                for (i = 0; i < frameArray.length; i++)
                {
                    if (i != frameArray[i].startFrame) continue;
                    if (can != 0) break;
                    if(frameArray[i].elements.length != 0)// 空白キーフレムを除外
                    {
                        fltl.currentFrame = i;
                        if (frameArray[i].labelType=="name")// フレームに名前があるか
                            func(frameArray[i].name);
                        else
                            func(zeroformat(key, 4));
                    // numレイヤー初期化
                        fdoc.selectNone();
                        fltl.setSelectedFrames([0,i,i+1]);
                        fdoc.deleteSelection();
                        key++;
                    }
                }
                fltl.setSelectedLayers(j);
                fltl.setLayerProperty('visible', false);
                if(setL > 0) fltl.layers[j+1].visible = !fltl.layers[j+1].visible;
                if( setL > 0)j++;setL = 0;
            }
        }
    // すべてのレイヤーを可視化 numレイヤー削除
      //fltl.setLayerProperty('visible', true, 'all');
        for(var i = 0;i < LayerSUU; i++ ){(LayerFG[i] == 0)?fltl.layers[i].visible = false:fltl.layers[i].visible = true;}
        fltl.setSelectedLayers(0);
        fltl.deleteLayer();
        fltl.setSelectedLayers(kokoLayerNum);
    }

// セル番号を左上に記入して書き出し
var label = layerName+"_"+name;

function func(name)
{
    fltl.setSelectedLayers(0);
    fdoc.addNewText({left: 0, top: 20, right:20, bottom:20});
    fltl.setSelectedFrames([0,i,i+1]);
    fdoc.setElementTextAttr( 'size',40 );
    fdoc.setElementTextAttr("letterSpacing", -1);
    fdoc.setElementTextAttr('alignment', 'left');
    fdoc.setElementTextAttr( 'face','ＭＳ Ｐゴシック' );
    fdoc.setElementProperty('orientation', 'horizontal');//横文字
    fdoc.setElementTextAttr('lineSpacing', -1);//行間狭く
    fdoc.setElementProperty('orientation', 'vertical left to right');//縦文字変換
	fdoc.setTextString( label );
    //fdoc.exportPNG(uri+"/"+layerName+"_"+name+".png",true,true);

    if(fltl.name.indexOf("LO")>= 0 )
    { var LOcurL = j;var LOcurF = i;
        // 編集モードの終了
        fdoc.exitEditMode();
        //▼全フレーム数取得
        var RlayerFrame = fl.getDocumentDOM().getTimeline().frameCount;
        if(INlayerFrame != RlayerFrame)
        {
            if(INlayerFrame > RlayerFrame)
            {
            //シンボル内のフレーム数より親のステージのフレーム数が少ない場合同じ長さにする
            fl.getDocumentDOM().getTimeline().insertFrames(INlayerFrame -RlayerFrame);
            }
            else if(INlayerFrame < RlayerFrame)
            {
            //シンボル内のフレーム数より親のステージのフレーム数が多い場合同じ長さにする
            fl.getDocumentDOM().getTimeline().removeFrames(INlayerFrame,RlayerFrame);
            }
        }
        //再生位置を移動
        fdoc.getTimeline().currentFrame = LOcurF;
        fdoc.exportPNG(uri+"/"+layerName+"_"+name+".png",true,true);
        //すべて選択。
        fdoc.selectAll();
        if(fdoc.selection.length == 1)
        {
        // 編集モードに切り替える: inPlace
        fdoc.enterEditMode('inPlace');
        }
    }
    else
    {
        fdoc.exportPNG(uri+"/"+layerName+"_"+name+".png",true,true);
    }
}

function zeroformat(v, n)// 連番用の桁あわせ関数
{
    if(n > String(v).length)
        return (new Array((n - String(v).length) + 1).join(0)) + v;
    else
        return v;
}