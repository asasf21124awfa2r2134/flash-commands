//
// Select Previous Keyframe on This Layer.jsfl
// 
// This command will select the previous keyframe on the current layer.
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
var p = theTimeline.currentFrame-1; if (p<0) p=0;
var f = theTimeline.layers[l].frames[p].startFrame;

theTimeline.currentFrame = f;