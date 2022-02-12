addLabels();

function addLabels(){
	
	var doc = fl.getDocumentDOM();
	var tml = doc.getTimeline();
	var myLayer = tml.layers[ tml.currentLayer ];				// current layer
	var myLabelString;
	var myFrame;
	var f = 0; 													// start frame
	var cnt = myLayer.frames.length;							// end frame

	// loop
	do{

		tml.currentFrame = f;									// go to frame
		myFrame = myLayer.frames[ f ];
		
		if( myConditionFunction( myFrame ) ){					// check for condition to create label

			myLabelString = myLayer.name + "  " + myFrame.name;	// construct the label string
			createLabel( doc, myLabelString );					// create label
		}
		
		f = getLayerNextKey( myLayer, f );						// calculate next keyframe on the current layer
		
	}while( f < cnt );
	
	
}
function myConditionFunction( aframe ){
	
	/**		
		Currently the function returns true, if:
		- the frame contains any elements (shapes, instances, etc)
		- the frame has label
		
		But you can easily change the condition to anything else.
	*/
	
	return Boolean( aframe.elements.length > 0 ) && Boolean ( aframe.name.length > 0 );
}
function createLabel( doc, astring ){
	fl.getDocumentDOM().selectNone();
	doc.addNewText({left:0, top:0, right:100, bottom:100});
	doc.setElementTextAttr("fillColor", "#000000")
	doc.setElementTextAttr( 'size',60 );
	doc.setElementTextAttr("letterSpacing", -1);
	doc.setElementTextAttr('alignment', 'left');
	doc.setElementTextAttr( 'face','ＭＳ Ｐゴシック' );
	doc.setElementProperty('orientation', 'horizontal');
	doc.setElementTextAttr('lineSpacing', -1);
	doc.setTextString( astring );
	doc.clipCopy();
	//alert(astring);
	doc.clipCopy();
	//	if(doc.clipCopy == 'OpenClipboard Failed')
//		{
			//doc.clipCopy();
			//return 
			//}
	doc.deleteSelection();
	doc.clipPaste();
	}
function getLayerNextKey( alayer, sf ){
	if( ! alayer ) return null;
	var fr = alayer.frames[ sf ];
	if( ! fr ) return null;
	return fr.startFrame + fr.duration;
}