(function(){

	mainLoop();

	function mainLoop(){

		// Define main variables 
		var doc = fl.getDocumentDOM();
		var myTimeline = doc.getTimeline();
		var cl = myTimeline.currentLayer;
		var cf = myTimeline.currentFrame;
		var sel = doc.selection;
		var i, j, myLayer, myFrame;
		
		// Define working scope -
		// if there is a timeline selection, use it.
		// Otherwise, use the current layer + current frame
		// as one-frame 'selection'
		var selectedFrames = myTimeline.getSelectedFrames();
		
		if( selectedFrames.length === 0 ){
			selectedFrames = [ cl, cf, cf+1 ];
		}
		
		// Loop through our 'selected frames'
		for( i = 0; i < selectedFrames.length; i+=3 ){
			
			myLayer = myTimeline.layers[ selectedFrames[ i ] ];
			
			//fl.trace( "LAYER: " + myLayer.name );
			
			for( j = selectedFrames[i+1]; j < selectedFrames[i+2]; j++ ){
				
				// Go to the frame
				myTimeline.currentFrame = j;
				
				myFrame = myLayer.frames[ j ];
				
				// if the frame is null, contunue
				if( ! myFrame ) continue;
				
				// If the frame is a keyframe,
				// we call our function to process all of the its elements
				if( isKeyFrame( myLayer, j ) ){

					//  Call the function to select all non-grouped shapes
					convertShapesToGroup( doc, myFrame );
					//fl.trace( "\tframe: " + j );

				}
			}
			
		}
		
		// Restore the timeline state
		myTimeline.currentFrame = cf;
		myTimeline.currentLayer = cl;
	}

	function isKeyFrame( aLayer, frameNum ){
		if( ! aLayer.frames[ frameNum ] ) return false;
		return ( aLayer.frames[ frameNum ].startFrame === frameNum );
	}
	
	function convertShapesToGroup( doc, aFrame ){
		
		var e, el;

		// Deselect all to ensure that the selection will contain only items that meet our criteria.
		doc.selectAll();

		// Iterate through elements in the frame
		// and select shapes one by one if they are not groups
		for( e = 0; e < aFrame.elements.length; e++ ){
			
			el = aFrame.elements[ e ];

			// Skip non-shape elements
			if( el.elementType === "shape" ){
				if( el.isGroup ){
					el.selected = false;
				}
			}
		}
		// Convert selected items to a group and clear selection.
		doc.group();
		doc.selectNone();
	}


})();