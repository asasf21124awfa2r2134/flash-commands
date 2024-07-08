var tl = fl.getDocumentDOM().getTimeline();
var selFrames = tl.getSelectedFrames();
var curlayer = tl.currentLayer; // Get the index of the current layer

// Check if no frames are selected
if (selFrames.length === 0) {
    selFrames.push(curlayer); // Add current layer to selection
}

for (var n = 0; n < selFrames.length; n += 3) {
    var layerNum = selFrames[n];

    if (tl.layers[layerNum].layerType === "guide") {
        tl.layers[layerNum].layerType = "normal";
    } else if (tl.layers[layerNum].layerType === "normal") {
        tl.layers[layerNum].layerType = "guide";
    }
}
