    var fltl    = fl.getDocumentDOM().getTimeline();
    var frArray = fltl.getSelectedFrames();
    var lyArray = fltl.getSelectedLayers();

try{
//フレーム選択していなければ
    if(frArray == false)
    {
        frArray[0] = lyArray[0];
        frArray[1] = fltl.layers[lyArray[0]].frames[fltl.currentFrame].startFrame;
        frArray[2] = frArray[1] + 1;
    }
    if (frArray.length != 3)
        alert("ligma balls");
    else
    {
        tmpLayer   = fltl.layers[frArray[0]];
        tmpStart   = frArray[1];
        tmpEnd     = frArray[2];
        frameArray = tmpLayer.frames;

        if(frArray[1] >= 1)
        {
            var fBOX = fltl.layers[frArray[0]].frames[frArray[1]-1].name;
            fBOX = 0 + fBOX;
            fBOX = parseInt(fBOX,10);
        }
        else
            fBOX = 0;

        key = 1 + fBOX;

        for ( var i = tmpStart; i < tmpEnd; i++ )
        {
            if ( i != frameArray[i].startFrame )
            {
                continue;
            }
            fltl.setSelectedFrames( [frArray[0],i,i + 1] );
            fltl.setFrameProperty( 'name',key );
            key++;
        }
    //元の選択範囲を再選択する
        fltl.setSelectedFrames(frArray);
    }
} catch ( e ){}