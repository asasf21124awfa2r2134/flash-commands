var myLayerArray = fltl.getSelectedLayers();
  var myFrameArray = fltl.getSelectedFrames();
  var countLA = myLayerArray.length;
  var countFA = myFrameArray.length;

  var KLayer = fltl.currentLayer;
  var KFrame = fltl.currentFrame;

var fdoc = fdoc;
var fltl = fdoc.getTimeline();
var layerName = fdoc.getTimeline().getLayerProperty("name");
var curLayer = fdoc.getTimeline().currentLayer;
var frameName = fdoc.getTimeline().getFrameProperty("name");
var theDocument = flash.getDocumentDOM();
var theTimeline = theDocument.getTimeline();
//creates text in the centre of the screen, combining the layer name and frame name
function label(){	
	fdoc.addNewText({left:0, top:0, right:100, bottom:100});
	fdoc.setElementTextAttr("fillColor", "#000000")
	fdoc.setElementTextAttr( 'size',60 );
  fdoc.setElementTextAttr("letterSpacing", -1);
  fdoc.setElementTextAttr('alignment', 'left');
  fdoc.setElementTextAttr( 'face','ＭＳ Ｐゴシック' );
  fdoc.setElementProperty('orientation', 'horizontal');
  fdoc.setElementTextAttr('lineSpacing', -1);
	fdoc.setTextString(layerName + ' ' + frameName); 
	fdoc.clipCopy();
	fdoc.deleteSelection();
	fdoc.clipPaste();}
//goes to the next keyframe
function ncel(){
	var l = theTimeline.currentLayer;
	var c = theTimeline.currentFrame;
	var f = theTimeline.layers[l].frames[c].startFrame + theTimeline.layers[l].frames[c].duration;

	theTimeline.currentFrame = f;}
//Select only 1 frame
  if(countLA == 1 && myFrameArray[2]-myFrameArray[1] == 1 && countFA == 3)
  {
    func();
  }
//No frame selected 
  else if(countFA == 0)
  {
  //Select the current frame
    fltl.setSelectedFrames(KFrame,KFrame + 1);
    func();

    fdoc.selectNone();
    fltl.setSelectedFrames([]);
  }
//Multiple frames are selected.
  else
  {
    var prePosition = fltl.getSelectedFrames();
    var hozonKFrame = fltl.currentFrame;
    var FS = fltl.layers[KLayer].frames[KFrame].duration;

  //Lightweight processing when all frames are selected, even if there are more than 1 additional selection.
    if (FS == [myFrameArray[2] - myFrameArray[1]])
      func();
    else
    {
      for (var i = 0; i < countFA; i++)
      {
        if (i % 3 == 0)
        {
          var FAhani = myFrameArray[i + 2] - myFrameArray[i + 1];

        //Apply only to selected areas
          for (var j = 0; j < FAhani; j++)
          {
          //Selection of work area
            fltl.setSelectedLayers(myFrameArray[i]);

          //Get the number of frames in the current layer
            var KLayerFcount = fltl.layers[myFrameArray[i]].frameCount;

			//Picking up keyframe spills during selection
			if((myFrameArray[i + 1] + j) < KLayerFcount && j == 0 
			&& myFrameArray[i + 1] + j != fltl.layers[myFrameArray[i]].frames[myFrameArray[i + 1] + j].startFrame)
				{
				KFrameSF = fltl.layers[myFrameArray[i]].frames[myFrameArray[i + 1]].startFrame
				fltl.setSelectedFrames(KFrameSF, KFrameSF + 1);
				KLayer = myFrameArray[i];
				KFrame = KFrameSF;
				func();
				}

			//Areas with no frames are not processed. Only key frames are processed.
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
    //Recreate saved selections.
      fltl.setSelectedFrames(prePosition);
      fltl.currentFrame = hozonKFrame;
    }
  }
//runs the functions if the layer is unlocked, visible and is a keyframe
  function func()
  {
		fdoc.selectNone();
    var OK1 = fltl.layers[KLayer].locked;
      OK1 = (OK1 == false) ? 1 : 0;

    var OK2 = fltl.layers[KLayer].visible;
      OK2 = (OK2 == true) ? 1 : 0;

    var OK3 = fltl.layers[KLayer].frames[KFrame].elements;
      if(OK1 + OK2 == 2 && OK3 != false){label();}
		var OK3 = fltl.layers[KLayer].frames[KFrame].elements;
      if(OK1 + OK2 == 2 && OK3 != true){ncel();}
	}