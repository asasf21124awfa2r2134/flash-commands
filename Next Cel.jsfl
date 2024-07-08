var fl = flash;
var theDocument = fl.getDocumentDOM();
var theTimeline = theDocument.getTimeline();

var currentLayerIndex = theTimeline.currentLayer;
var currentFrameIndex = theTimeline.currentFrame;

// Find the next keyframe on the right or the first keyframe on the layer
var nextKeyframeIndex = findNextKeyframe(currentLayerIndex, currentFrameIndex);

// Move to the next keyframe if found
if (nextKeyframeIndex !== -1) {
    theTimeline.currentFrame = nextKeyframeIndex;
} else {
    alert("No next keyframe found on this layer.");
}

// Function to find the next keyframe on the right or the first keyframe on the layer
function findNextKeyframe(layerIndex, startFrame) {
    var frames = theTimeline.layers[layerIndex].frames;
    for (var i = startFrame + 1; i < frames.length; i++) {
        if (i === frames[i].startFrame) {
            return i; // Found the next keyframe
        }
    }
    // If no keyframe found to the right, find the first keyframe on the layer
    for (var j = 0; j < frames.length; j++) {
        if (j === frames[j].startFrame) {
            return j; // Found the first keyframe on the layer
        }
    }
    return -1; // Return -1 if no keyframe found
}
