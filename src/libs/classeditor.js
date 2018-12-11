
function deleteClass() {
  vJSONEditor.initAsk();
  //editor.setValue(vDataJSON["UML_DEFAULT"]);
}

function update_editor(pJSON) {
  var vJSON = pJSON || editor.getValue();
  $('#display_filename').html(class2filename(vJSON.data.classname,".json"));
  vEditNode = editor.getEditor('root.data');
  if (vEditNode) {
    if (vJSON.data.hasOwnProperty("reposinfo")) {
        vJSON.data.reposinfo.modified = getDateTime();
    };
    vEditNode.setValue(vJSON.data);
  } else {
    console.log("Update 'root.data' undefined");
  };
  editor.setValue(vJSON);
  update_editor_post(pJSON);
}

function update_editor_post(pJSON) {
  console.log("CALL: update_editor_post(pJSON) jsoneditor4code.js");
}

function saver4JSON(pFile) {
  //var vFile = pFile || vFileBase+".json";
  vJSONEditor.saveJSON();
  //alert("File: '"+vFile+"' saved!");
};

function exporter4Schema(pFilename) {
    // Get the value from the editor
    /*
    console.log("BEFORE editor.schema:\n"+JSON.stringify(vDataJSON["class_schema"],null,4));
    var vContent = vDataJSON["class_schema"];
    var vFile = pFilename || "uml_schema.json";
    console.log("JSON Schema output '"+vFile+"':\n"+vContent);
    saveFile2HDD(vFile,vContent);
    */
    vJSONEditor.saveSchema();
}

function exporter4JSON(pFile) {
 // Get the value from the editor
 var vJSON = vJSONEditor.getValue();
 var vFile = class2filename(vJSON.data.classname,".json");
// set modified date in reposinfo.modified
 updateModified(vJSON);
 var vContent = JSON.stringify(vJSON,null,4);
 saveFile2HDD(vFile,vContent);
 console.log("JSON output '"+vFile+"':\n"+vContent);
};

function updateModified(pJSON) {
  if (pJSON) {
    if (pJSON.reposinfo) {
      pJSON.reposinfo.modified = getDateTime();
      console.log("reposinfo.modified updated: '"+pJSON.reposinfo.modified+"'");
    }
  };

};

function class2filename(pClassName,pExt) {
  var vExt = pExt || "";
  var vFilename = pClassName || "Undefined Class";
  vFilename = vFilename.toLowerCase();
  vFilename = vFilename.replace(/[^a-z0-9]/g,"_");
  vFilename = vFilename.replace(/_[_]+/g,"_");
  return vFilename+vExt;
}


function loader4JSON(pFileID4DOM) {
  var fileToLoad = document.getElementById(pFileID4DOM).files[0]; //for input type=file
  if (fileToLoad) {
    console.log("loader4JSON() - File '"+fileToLoad.name+"' exists.");
    $('#display_filename').html(fileToLoad.name); // this.value.replace(/.*[\/\\]/, '')
    var fileReader = new FileReader();
    // set the onload handler
    fileReader.onload = function(fileLoadedEvent){
        var vTextFromFileLoaded = fileLoadedEvent.target.result;
        //document.getElementById("inputTextToSave").value = textFromFileLoaded;
        //alert("textFromFileLoaded="+textFromFileLoaded);
        try {
          editor.setValue(JSON.parse(vTextFromFileLoaded));
          alert("File JSON '"+fileToLoad.name+"' loaded successfully!");
          validate_errors();
        } catch(e) {
          editor.setValue([]); // Init with an empty class
          alert(e); // error in the above string (in this case, yes)!
        };
      };
    //onload handler set now start loading the file
    fileReader.readAsText(fileToLoad, "UTF-8");
  } else {
    alert("File is missing");
  };
  saveLS(fileToLoad.name);
};
