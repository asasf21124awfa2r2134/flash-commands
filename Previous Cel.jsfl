var fl = flash;
var theDocument = fl.getDocumentDOM();
var theTimeline = theDocument.getTimeline();

var currentLayerIndex = theTimeline.currentLayer;
var currentFrameIndex = theTimeline.currentFrame;

// Find the previous keyframe on the left or the last keyframe on the layer
var prevKeyframeIndex = findPrevKeyframe(currentLayerIndex, currentFrameIndex);

// Move to the previous keyframe if found
if (prevKeyframeIndex !== -1) {
    theTimeline.currentFrame = prevKeyframeIndex;
} else {
    alert("No previous keyframe found on this layer.");
}

// Function to find the previous keyframe on the left or the last keyframe on the layer
function findPrevKeyframe(layerIndex, startFrame) {
    var frames = theTimeline.layers[layerIndex].frames;

    // Check if startFrame is out of bounds
    if (startFrame < 0 || startFrame >= frames.length) {
        return findLastKeyframe(layerIndex); // Find the last keyframe on the layer
    }

    // Search for the previous keyframe starting from the current frame index
    for (var i = startFrame - 1; i >= 0; i--) {
        if (frames[i].startFrame === i) {
            return i; // Found the previous keyframe
        }
    }

    // If no keyframe found to the left, find the last keyframe on the layer
    return findLastKeyframe(layerIndex);
}

// Function to find the last keyframe on the layer
function findLastKeyframe(layerIndex) {
    var frames = theTimeline.layers[layerIndex].frames;

    // Search backwards from the end of frames array to find the last keyframe
    for (var j = frames.length - 1; j >= 0; j--) {
        if (frames[j].startFrame === j) {
            return j; // Found the last keyframe on the layer
        }
    }

    return -1; // Return -1 if no keyframe found on the layer
}
