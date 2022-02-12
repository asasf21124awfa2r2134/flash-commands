var tl = fl.getDocumentDOM().getTimeline();
var selFrames = tl.getSelectedFrames();
for (n=0; n<selFrames.length; n+=3)
{
	layerNum=selFrames[n];
	if(tl.layers[layerNum].layerType == "guide"){
		tl.layers[layerNum].layerType = "normal";
	}
	else
	{
		if(tl.layers[layerNum].layerType == "normal")
		{
			tl.layers[layerNum].layerType = "guide";
		}
	}
}
