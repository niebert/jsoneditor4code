function JSONEditor4Code (pDocument) {
  //---- attributes ----
  this.aLinkParam = new LinkParam();
  this.aDoc = pDocument;
  this.aJSON = {};
  this.aDefaultJSON = {};
  this.aSchema = null;
  this.aOptions = {
    "editor_id": "editor_holder",
    "validator_id":"valid_indicator",
    "load_file_id" : "load_filename",
    "filename_key" : "filename",
    "out_json": "tOutJSON",
    "out_code": "tOutput",
    "out_errors": "tErrors"
  };
  this.aEditor = null;
  //----  methods ----
  this.initDoc = function (pDoc) {
    this.aDoc = pDoc;
  };

  this.loadParamStorage = function (pInitJSON,pLSID) {
    var vLSID = pLSID || "jsondata";
    var vJSON = null;
    var vJSONstring = "";
    console.log("loadParamStorage(pInitJSON,'"+vLSID+"')");
    //console.log("Start JSON:\n"+JSON.stringify(vJSON,null,3));
    //-------------------------------------------------------
    // LOCAL STORAGE: Check JSON Data is available in LocalStorage
    var vLSID = "jsondata";
    this.loadLS(vLSID);
    //console.log("loadParamStorage(pInitJSON,'"+vLSID+"' - JSON:\n"+(JSON.stringify(vJSON,null,3)).substr(0,120)+"...");
    //-------------------------------------------------------
    // LINK PARAMETER: Evaluation link parameter in JSON Path
    if (this.aLinkParam.exists("jsondata")) {
       console.log("LinkParameter provides 'jsondata'  with value");
       vJSONstring = this.aLinkParam.getValue("jsondata");
       try {
         vJSON = JSON.parse(vJSONstring);
       } catch (e) {
         alert("ERROR (JSON in LinkParam): "+e);
       };
       if (vJSON) {
         console.log("LinkParam: JSON set to this.aJSON");
         this.aJSON = vJSON;
       };
     } else {
       console.log("LinkParam do not contain 'jsondata'");
     };
     //-------------------------------------------------------
     // JSON DEFINED: Evaluation link parameter or local storage have defined vJSON
     if (this.aJSON) {
        console.log("this.aJSON data is defined for the JSONEditor4Code");
     } else {
       console.log("src/exportmod.js:56 - Define missing this.aJSON will be initialized pInitJSON");
       this.aJSON = pInitJSON;
     };
     console.log("Loaded JSON:\n"+JSON.stringify(vJSON,null,3));
  }

  this.submit2callback = function(pLink) {
    var vJSONstring = JSON.stringify(this.getValue());
    var vLink = pLink || "receiver.html"; // is a default HTML as callback
    // to check the LinkParam communication between HTML documents
    if (this.aLinkParam.exists("callback")) {
      vLink = this.aLinkParam.getValue("callback");
      console.log("Callback defined in LinkParam:\n  "+vLink);
    };
    this.aLinkParam.setValue("jsondata",vJSONstring);
    this.aLinkParam.deleteValue("callback");
    // send current JSON data back to callback URL
    document.location.href = vLink + this.aLinkParam.getParam4URL();
  };

  /*
  el-method is used to replace calls
  document.getElementById
  */
  this.el = function (pID) {
    return this.aDoc.getElementById(pID);
  };
/*
  defined in /src/libs/handlebars_helpers

  function compileCode(pTplID,pJSON) {
    // pJSON is JSON data of the UML Class
    var vCode = vCodeCompiler[pTplID](pJSON);
    vCode = postProcessHandlebars(vCode,pJSON);
    return vCode;
  };
  */
  JSONEditor.defaults.theme = 'bootstrap3';
  JSONEditor.defaults.iconlib = 'fontawesome4';
  JSONEditor.plugins.ace.theme = 'xcode';

  this.compileCode = {};

  this.init = function (pJSON,pDefaultJSON,pSchema,pTemplates,pOptions) {
    this.aLinkParam.init(this.aDoc);
    this.aJSON = pJSON || {};
    this.aDefaultJSON = pDefaultJSON;
    this.aSchema = pSchema;
    // extend/overwrite options
    this.aOptions = pOptions;
    this.aTemplates = pTemplates;

    for (var iKey in pOptions) {
      if (pOptions.hasOwnProperty(iKey)) {
        this.aOptions[iKey] = pOptions[iKey]
      }
    };
    // update the class selectors in schema
    this.loadParamStorage(pJSON);
    this.create_compiler4tpl();
    this.create_editor();
    JSONEditor.defaults.theme = pOptions.theme;
    JSONEditor.defaults.iconlib = pOptions.iconlib;
    JSONEditor.plugins.ace.theme = pOptions.ace_theme;
  };


  // create the Handlebars compiler function from templates in this.aTemplates
  this.create_compiler4tpl = function () {
    var vTemplate = "";
    for (var tplID in this.aTemplates) {
      if (this.aTemplates.hasOwnProperty(tplID)) {
        console.log("Compile Template ["+tplID+"]");
        vTemplate = this.aTemplates[tplID];
        //vTemplate = preProcessHandlebars(vTemplate,this.aJSON);
        this.compileCode[tplID] = Handlebars.compile(vTemplate);
      }
    };
  }

  this.create_editor = function () {
    if (this.aEditor) {
        this.aJSON = this.aEditor.getValue();
        this.saveLS("jsondata");
        // free some resources if the editor already exists
        this.aEditor.destroy();
    };
    // update schema
    this.update_schema();
    console.log("Start Editor with JSON:\n"+JSON.stringify(this.aJSON,null,3));
    var vEditorNode = this.el(this.aOptions.editor_id);
    this.aEditor = new JSONEditor(vEditorNode,{
            // Enable fetching schemas via ajax
            ajax: true,

            // The schema for the editor
            schema: this.aSchema,

            // Seed the form with a starting value
            startval: this.aJSON,
            // Disable additional properties
            no_additional_properties: true,

            // Require all properties by default
            required_by_default: true
          });
    this.parent_editor = this;
    this.init_buttons();
    this.update_filename();
    this.saveLS("jsondata");
  };

  this.init_ask = function () {
    var vOK = confirm("Do you really want to initialize the UML-class '"+this.aJSON.data.classname+"'?");
    if (vOK == true) {
    		var vSampleOK = confirm("Do you want to save the current UML-class '"+this.aJSON.data.classname+"' first?");
    		if (vSampleOK == true) {
    			this.saveJSON();
    			console.log("JSON-DB initalized with UML class '"+this.aJSON.data.classname+"'!");
    		} else {
    			console.log("JSON-DB for UML class '"+this.aJSON.data.classname+"' not saved - data deleted!");
    		};
    		this.aEditor.setValue(this.aDefaultJSON); // defined e.g. in /db/uml_default.js
    		console.log("JSON-DB initalized with UML class '"+this.aJSON.data.classname+"'!");
    		//save changes to Local Storage
    } else {
        console.log("initialize JSON-DB cancelled")
    };
  }

  this.toggleEnable = function () {
    if(this.aEditor.isEnabled()) {
      this.aEditor.enable()
    } else {
      this.aEditor.enable()
    };
  };

  this.enable = function () {
    this.aEditor.enable();
  };

  this.disable = function () {
    this.aEditor.disable();
  };

  this.init_buttons = function () {
    var vThis = this; // "vThis" used because "this" is not available in function
    this.set_button_click("submit",function() {
        // Get the value from the editor
        var vContent = JSON.stringify(vThis.aEditor.getValue(),null,4);
        vThis.el("tJSON")
        console.log("JSON Data:\n"+vContent);
    });
    this.set_button_click("enable_disable",function() {
        if (vThis.aEditor) {
            // Enable form
            if(!vThis.aEditor.isEnabled()) {
                vThis.aEditor.enable();
            }
            // Disable form
            else {
                vThis.aEditor.disable();
            }
        }
    });
    this.aEditor.on('change',function() {
      vThis.validate_errors();
      vThis.saveLS("jsondata");
      vThis.update_filename();
      //update_editor();
    });
    this.aEditor.watch('root.settings.baseclasslist',function() {
      vThis.update_schema();
      //update_editor();
    });
    this.aEditor.watch('root.settings.localclasslist',function() {
      vThis.update_schema();
      //update_editor();
    });
    this.aEditor.watch('root.settings.remoteclasslist',function() {
      vThis.update_schema();
      //update_editor();
    });
  };

  // ---- getElementById call ---
  this.el = function (pID) {
    return this.aDoc.getElementById(pID)
  }

  this.set_button_click = function (pID,pFunction) {
    var vNode = this.el(pID);
    if (vNode) {
        vNode.addEventListener('click',pFunction);
    } else {
        console.log("DOM node ["+pID+"] does not exist. Could not assign");
    }
  }

  this.update = function () {
    alert("update Schema changes for the JSONEditor4Code")
    this.create_editor();
  }

  this.getValue = function () {
    var vJSON = this.aJSON;
    if (this.aEditor) {
      vJSON = this.aEditor.getValue();
    } else {
      console.log("this.aEditor undefined in JSONEditor4Code.getValue()");
    };
    return vJSON;
  }

  this.setValue = function (pJSON) {
    this.aJSON = pJSON;
    if (this.aEditor) {
      this.aEditor.setValue(pJSON);
    } else {
      console.log("this.aEditor undefined in JSONEditor4Code.setValue(pJSON)");
    };
    return vJSON;
  }

  this.update_filename = function () {
    var vNode = this.el(this.aOptions["filename_id"]); // e.g. filename_id = "load_filename";
    if (vNode) {
        var vJSON = this.getValue();
        var vPath = this.aOptions["filename_key"];
        if (vJSON.data) {
          if (vJSON.data.hasOwnProperty()) {
            vNode.innerHTML = class2filename(vJSON.data.classname)+vJSON.settings.extension4code;
          }
        };
    } else {
        console.log("DOM node ["+this.aOptions["filename_id"]+"] not found");
    };
  }

  this.update_schema = function () {
    // updates the defintions/selectorclass in the schema
    this.update_filename(); // update the filename in the DOM node with id "load_filename"
    if (this.aJSON && this.aJSON.settings) {
      var s = this.aJSON.settings;
      var vRequired_Classes = concat_array(s.remoteclasslist,s.localclasslist);
      //console.log("vRequired_Classes: "+vRequired_Classes.join(","));
      s.classlist = concat_array(s.baseclasslist,vRequired_Classes);
      //console.log("vRequired_Classes: ('"+s.classlist.join("','")+"')");
      s.classlist.sort();
      // update the class selector in the schema with classes submitted to the editor by pJSON.
      this.aSchema.definitions.selectorclass.enum = s.classlist;
    } else {
      console.log("src/exportmod.js - update_schema() - this.aJSON.settings undefined!");
    };

  }

  this.validate_errors = function () {
    // Get an array of errors from the validator
    var errors = this.aEditor.validate();

    var indicator = this.el(this.aOptions.validator_id);

    // Not valid
    if(errors.length) {
      indicator.style.color = 'red';
      indicator.textContent = "not valid";
    }
    // Valid
    else {
      indicator.style.color = 'green';
      indicator.textContent = "valid";
    };
    var vErrors = "";
    var vCR = "";
    for (var i = 0; i < errors.length; i++) {
      vErrors +=  vCR + errors[i].path + " - " +errors[i].property +" - "+errors[i].message;
      vCR = "\n";
    };
    this.el("tErrors").value = vErrors;
  };

  this.loadLS = function (pLSID) {
    var vLSID = pLSID || "jsondatra"; //this.aJSON.data.classname;
    var vJSONstring = "";
    if (typeof(Storage) != "undefined") {
        // Store
        if (typeof(localStorage.getItem(vLSID)) !== undefined) {
          console.log("LocalStorage: '"+vLSID+"' try loading from Local Storage");
          var vJSONstring = localStorage.getItem(vLSID);
          if (!vJSONstring) {
            console.log("LocalStorage: '"+vLSID+"' undefined in Local Storage.\nSave default as JSON");
            vJSONstring = JSON.stringify(this.getValue());
            console.log("LocalStorage: loadLS('"+vLSID+"') - init with JSONstring='"+vJSONstring.substr(0,120)+"...'");
            localStorage.setItem(vLSID, vJSONstring);
          } else {
            console.log("parse JSON '"+vLSID+"') from LocalStorage JSONstring='"+vJSONstring.substr(0,120)+"...'");
            try {
                this.aJSON = JSON.parse(vJSONstring);
            } catch(e) {
                alert("ERROR: "+ e)
            };
          };
        } else {
          console.log("JSON-Data '"+vLSID+"' is undefined in Local Storage.\nSave default as JSON");
          localStorage.setItem(vLSID, JSON.stringify(this.aEditor.getValue()));
        };
    }	 else {
        console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
    };
  }

  this.saveLS = function (pLSID) {
    var vLSID = pLSID || "jsondata";
    console.log("saveJS('"+vLSID+"')-Call");
    var vJSON = this.getValue();
    if (typeof(Storage) != "undefined") {
        // Store
        if (typeof(vJSON) != undefined) {
          console.log("LocalStorage: '"+vLSID+"' is defined, JSONDB in  Local Storage");
          if (vJSON) {
            //console.log("pJSONDB '"+vLSID+"' is saved to Local Storage");
            var vJSONstring = JSON.stringify(vJSON)
            console.log("LocalStorage: saveLS('"+vLSID+"') JSONstring='"+vJSONstring.substr(0,120)+"...' DONE");
            localStorage.setItem(vLSID,vJSONstring);
          } else {
            console.log("vJSON with JSON is NOT defined");
          }
        } else {
          console.log("JSON Data '"+vLSID+"' is undefined");
        };
      }	 else {
        console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
      }
  }

  this.loadJSON = function () {
    var vThis = this;
    var fileToLoad = this.el(this.aOptions.filejson_id).files[0]; //for input type=file
    if (fileToLoad) {
      console.log("loader4JSON() - File '"+fileToLoad.name+"' exists.");
      $('#load_filename').html(fileToLoad.name); // this.value.replace(/.*[\/\\]/, '')
      var fileReader = new FileReader();
      // set the onload handler
      fileReader.onload = function(fileLoadedEvent){
          var vTextFromFileLoaded = fileLoadedEvent.target.result;
          //document.getElementById("inputTextToSave").value = textFromFileLoaded;
          //alert("textFromFileLoaded="+textFromFileLoaded);
          try {
            vThis.aEditor.setValue(JSON.parse(vTextFromFileLoaded));
            alert("File JSON '"+fileToLoad.name+"' loaded successfully!");
            vThis.validate_errors();
          } catch(e) {
            vThis.aEditor.setValue([]); // Init with an empty class
            alert(e); // error in the above string (in this case, yes)!
          };
        };
      //onload handler set now start loading the file
      fileReader.readAsText(fileToLoad, "UTF-8");
    } else {
      alert("File is missing");
    };
    this.saveLS("jsondata");
  }

  this.getClassname4File = function () {
    return class2filename(this.aJSON.data.classname,"_uml.json");
  }

  this.getFilename = function() {
    var vFilename = "jsondata.json";
    if (this.aJSON) {
      if (this.aJSON.data) {
        if (this.aJSON.data.classname) {
          vFilename = this.getClassname4File(this.aJSON.data.classname);
        }
      }
    };
    return vFilename;
  }

  this.setFilename = function (pFilename) {
    if (this.aJSON) {
      if (this.aJSON.data) {
        if (this.aJSON.data.classname) {
          this.aJSON.data.classname = pFilename;
        }
      }
    };
  }

  this.saveJSON = function () {
    // Get the value from the editor
    //alert("saveJSON()-Call");
    var vJSON = this.aEditor.getValue();
    this.saveLS("jsondata");
    var vFile = this.getFilename();
   // set modified date in reposinfo.modified
    this.update_modified();
    var vContent = JSON.stringify(vJSON,null,4);
    saveFile2HDD(vFile,vContent);
    console.log("JSON output '"+vFile+"':\n"+vContent);
    alert("JSON File: '"+vFile+"' saved!");
  }

  this.saveSchema = function () {
    var vContent = JSON.stringify(this.aSchema,null,4);
    var vFile = "class_uml_schema.json";
    saveFile2HDD(vFile,vContent);
    console.log("JSON Schema '"+vFile+"' saved!");
    alert("JSON Schema File: '"+vFile+"' saved!");
  }

  this.saveDocumentation = function () {
    // see e.g. template tpl/docu4github_tpl.js
    // stored  vDataJSON["tpl"]["docu4github"]
    this.save4Template("docu4github","_github.md","Github MarkDown Documentation")
  }

  this.save4Template = function (pTplID,pExtension,pMessage) {
    console.log("save4Template('"+pTplID+"'.'"+pExtension+"','"+pMessage+"')");
    var vMessage = pMessage || "Code";
    var vJSON = this.aEditor.getValue();
    this.update_modified();
    //-- HandleBars: Compile with javascript-template ---
    // vDataJSON["out"]["javascript"] is HandleBars compiler function
    // Compile functions was generated from "tpl/docu4github_tpl.js"
    var vContent = "Undefined Handlebars Compiler TplID='"+pTplID+"'";
    if (this.compileCode[pTplID]) {
      vContent = this.compileCode[pTplID](this.aJSON);
    } else {
      console.log("compileCode['"+pTplCode+"'] undefined");
    };
    //vContent = postProcessHandlebars(vContent,vJSON);
    console.log("save4Template() vContent="+vContent.substr(0,120)+"...");
    //--Textarea Output----------------
    var vOutNode = this.el("tOutput");
    vOutNode.value = vContent;
    //--JSON Output----------------
    var vFile = class2filename(vJSON.data.classname,pExtension);
    saveFile2HDD(vFile,vContent);
    //alert("File '"+vFile+"' saved - "+vMessage);
    console.log("File '"+vFile+"' saved - "+vMessage);
  }

  this.saveCode = function (pTplID,pExt,pMessage) {

    var vTplID = pTplID || "javascript";
    var vExt = pExt || ".js";
    var vMessage = pMessage || "Javascript Code for Class";
    // see e.g. template tpl/javascript_class_tpl.js
    // stored  vDataJSON["tpl"]["javascript"]
    this.save4Template(vTplID,vExt,vMessage);
  }

  this.update_modified = function () {
    if (this.aJSON) {
      if (this.aJSON.reposinfo) {
        this.aJSON.reposinfo.modified = getDateTime();
        console.log("reposinfo.modified updated with: '"+this.aJSON.reposinfo.modified+"'");
      } else {
        console.log("this.aJSON.reposinfo.modified was undefined - src/libs/exportmod.js:518");
      }
    };
  }

}; // end JSONEditor4Code
