//
// Select Next Keyframe on This Layer.jsfl
// 
// This command will select the next keyframe on the current layer.
//
// By Todd Slaughter
// Copyright 2011, All rights reserved
//

// initialization ---------------------------------------------------------------------------------------------

// store the document object and the timeline
var theDocument = flash.getDocumentDOM();
var theTimeline = theDocument.getTimeline();

// main code --------------------------------------------------------------------------------------------------

var l = theTimeline.currentLayer;
var c = theTimeline.currentFrame;
var f = theTimeline.layers[l].frames[c].startFrame + theTimeline.layers[l].frames[c].duration;

theTimeline.currentFrame = f;
