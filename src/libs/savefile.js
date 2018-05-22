function saveFile2HDD(pFilename,pContent) {
  var file = new File([pContent], {type: "text/plain;charset=utf-8"});
  saveAs(file,pFilename);
}
