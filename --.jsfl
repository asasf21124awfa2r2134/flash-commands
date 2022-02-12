var cock = fl.getDocumentDOM().getTimeline().currentLayer;

//myDoc.getTimeline().setSelectedLayers(cock + 2);
fl.getDocumentDOM().getTimeline().layers[cock].visible = false;
fl.getDocumentDOM().getTimeline().layers[cock + 1].visible = false;
fl.getDocumentDOM().getTimeline().layers[cock + 2].visible = true;
//myDoc.getTimeline().setSelectedLayers(cock + 1);
//fl.getDocumentDOM().getTimeline().layers[cock].visible = false;

