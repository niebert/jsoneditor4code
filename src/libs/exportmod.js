function JSONEditor4Code () {
  //---- attributes ----
  this.aLinkParam = new LinkParam();
  this.aDoc = null; // stores the "document" object init class with initDoc()
  // var editor = new JSONEditor4Code();
  // editor.initDoc(document)
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
  this.aSettingsBOOL = false;
  this.aEditor = null;
  //----  methods ----
  this.initDoc = function (pDoc) {
    this.aDoc = pDoc;
    //this.aDoc.JSONEditor = JSONEditor;
  };

  this.initJSON = function () {
    console.log("Init JSON in JSON Editor");
    this.aEditor.setValue(this.aDefaultJSON);
  };

  this.loadLinkParam = function (pLSID) {
    var vDataID = pLSID || "jsondata";
    var vJSON = null;
    var vJSONstring = "";
    console.log("loadLinkParam('"+vDataID+"')");
    //console.log("Start JSON:\n"+JSON.stringify(vJSON,null,3));
    //-------------------------------------------------------
    // LOCAL STORAGE: Check JSON Data is available in LocalStorage
    //console.log("loadParamStorage(pInitJSON,'"+vLSID+"' - JSON:\n"+(JSON.stringify(vJSON,null,3)).substr(0,120)+"...");
    //-------------------------------------------------------
    // LINK PARAMETER: Evaluation link parameter in JSON Path
    if (this.aLinkParam.exists(vDataID)) {
       console.log("LinkParameter provides '"+vDataID+"'  with value");
       vJSONstring = this.aLinkParam.getValue(vDataID);
       try {
         vJSON = JSON.parse(vJSONstring);
       } catch (e) {
         console.log("ERROR (JSON in LinkParam['"+vDataID+"']: "+e);
         vJSON = null;
       }
       if (vJSON) {
         console.log("LinkParam['"+vDataID+"']: JSON set to this.aJSON:\n"+JSON.stringify(vJSON.settings,null,4));
       }
     } else {
       console.log("LinkParam['"+vDataID+"'] does not contain data.");
    }
    return vJSON;
  };

  this.submit2callback = function(pLink) {
    var vJSONstring = JSON.stringify(this.getValue());
    var vLink = "receiver.html"; // is a default HTML as callback
    // to check the LinkParam communication between HTML documents
    if (pLink) {
      vLink = pLink;
    } else {
      if (this.aLinkParam.exists("callback")) {
        vLink = this.aLinkParam.getValue("callback");
        console.log("Callback defined in LinkParam:\n  "+vLink);
      }
    }
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

  this.getEditor = function(pEditorID) {
      var vEditor = null;
      if (this.aEditor) {
        e = this.aEditor.getEditor(pEditorID);
        if (e) {
          vEditor = e;
        } else {
          console.log("ERROR: JSONEditor4Code.getEditor('"+pEditor+"') - Editor not found!");
        }
      }
      // return the editor with the ID pEditorID
      return vEditor;
  };

  this.init_definitions = function () {
      var vJSON = this.aJSON;
      console.log("Call: init_definitions() Update Class in Schema - update filename");
      this.update_filename(); // update the filename in the DOM node with id "load_filename"
      console.log("HTML-INIT init_definitions(pJSON,pSchema)): vJSON.settings="+JSON.stringify(vJSON.settings,null,4));
      if (!vJSON) {
        console.log("WARNING: src/exportmod.js - init_definitions() - vJSON undefined!");
        alert("WARNING: src/exportmod.js - init_definitions() - vJSON undefined!");
      } else if (!(vJSON.settings)) {
        console.log("WARNING: src/exportmod.js - init_definitions() - vJSON.settings undefined!");
        alert("WARNING: src/exportmod.js - init_definitions() - vJSON.settings undefined!");
      } else {
          // use always one blank for "no class" otherwise value is regarded as undefined.
          var watchclasses = [" "]; //
          var i = 0;
          console.log("Call: init_definitions() ");
          // BASIC CLASSES: push all basic classes
          var basecl = vJSON.settings.baseclasslist;
          if (basecl) {
            for (i = 0; i <  basecl.length; i++) {
              watchclasses.push(basecl[i].name);
            }
          }
          // LOCAL CLASSES: push all local classes
          var localcl= vJSON.settings.localclasslist;
          console.log("Call: init_definitions() - LocalClassList: "+JSON.stringify(localcl,null,4));
          if (localcl) {
            for (i = 0; i < localcl.length; i++) {
              watchclasses.push(localcl[i].name);
            }
          }
          // REMOTE CLASSES: push all remote classes
          var remotecl = vJSON.settings.remoteclasslist;
          console.log("Call: init_definitions() - RemoteClassList: "+JSON.stringify(remotecl,null,4));
          if (remotecl) {
            for (i = 0; i < remotecl.length; i++) {
              watchclasses.push(remotecl[i].name);
            }
          }
          watchclasses.sort();
          console.log("Call: init_definitions() - watchclasses=('"+watchclasses.join("','")+"')");
          this.aSchema.definitions.selectorclass.enum = watchclasses;
      }
      //PARAM SCOPE WARNING: do not return an attribute of "this" instance - operated on this.aSchema instead;
      //DO NOT: return pSchema
  };

  this.init = function (pJSON,pDefaultJSON,pSchema,pTemplates,pOptions) {
    // LOAD PRIORITY
    // (1) jsondata in Link Parameter
    // (2) pJSON if init data provide by constructor
    // (3) pJSON as initialized with default data
    this.aLinkParam.init(this.aDoc);
    var vJSON = pDefaultJSON;
    var vJSON4LinkParam = this.loadLinkParam("jsondata");
    if (vJSON4LinkParam) {
      // (1) jsondata in Link Parameter
      console.log("CALL: JSONEditor4Code.init() - init with LinkParam JSON data");
      vJSON = vJSON4LinkParam;
    } else if (pJSON) {
      // (2) pJSON if init data provide by constructor
      console.log("CALL: JSONEditor4Code.init() - use init data in pJSON for JSON editor");
      vJSON = pJSON;
    } else {
      // (3) pJSON as initialized with default data
      console.log("CALL: JSONEditor4Code.init() - use default data in pDefaultJSON - also used by init_ask() method.");
      if (pDefaultJSON) {
        vJSON = pDefaultJSON;
        console.log("pDefautJSON defined in JSONEditor4Code.init()");
      } else {}
        console.error("WARNING: pDefautJSON undefined - use an empty JSON");
        vJSON = {
          data: {},
          settings: {}
        };
    }
    this.aJSON = vJSON;
    console.log("HTML-INIT init_definitions(pJSON,pSchema)): "+JSON.stringify(vJSON,null,4));
    this.aDefaultJSON = pDefaultJSON;
    // extend/overwrite options
    this.aOptions = pOptions;
    this.aTemplates = pTemplates;
    this.aSchema = pSchema;

    console.log("HTML-INIT (1) JSONEditor4Code.init(...)): vJSON.settings="+JSON.stringify(vJSON.settings,null,4));
    //PARMETER SCOPEERROR: do not provide attributes with parameter of methods - use aSchema and aJSON instead
    //DO NOT USE: this.aSchema = this.init_definitions(vJSON,pSchema);
    this.init_definitions();
    // Extend aOptions with settings in pOption
    for (var iKey in pOptions) {
      if (pOptions.hasOwnProperty(iKey)) {
        this.aOptions[iKey] = pOptions[iKey];
      }
    }
    // COMPILE the templates with Handlebars
    //this.aSchema = vSchema;
    this.create_compiler4tpl();
    this.create_editor();
    JSONEditor.defaults.theme = pOptions.theme;
    JSONEditor.defaults.iconlib = pOptions.iconlib;
    JSONEditor.plugins.ace.theme = pOptions.ace_theme;
    this.aDoc.JSONEditor = JSONEditor; //assign to document.JSONEditor
    this.update_filename();
  };

  // create the Handlebars compiler function from templates in this.aTemplates
  this.create_compiler4tpl = function () {
    var vTemplate = " ";
    for (var tplID in this.aTemplates) {
      if (this.aTemplates.hasOwnProperty(tplID)) {
        console.log("Compile Template ["+tplID+"]");
        vTemplate = this.aTemplates[tplID];
        //vTemplate = preProcessHandlebars(vTemplate,this.aJSON);
        this.compileCode[tplID] = Handlebars.compile(vTemplate);
      }
    }
  };

  this.create_editor = function () {
    // If an old editor exists - destroy the Editor to free resources
    if (this.aEditor) {
        /*
        this.aJSON = this.aEditor.getValue();
        this.saveLS("jsondata");
        */
        // this.update_watchclasslist();
        // free some resources if the editor already exists
        this.aEditor.destroy();
        console.log("Destroy JSONEditor in JSONEditor4Code");
    }

    console.log("CALL: create_editor() - create a new JSONEditor() in JSONEditor4Code");
    // update schema
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
    this.init_watch();
    this.update_filename();
    this.update_modified();
    this.saveLS("jsondata");
  };

  this.init_ask = function () {
    var vOK = confirm("Do you really want to initialize the UML-class '"+getClassName(this.aJSON)+"'?");
    if (vOK == true) {
    		var vSaveOK = confirm("Do you want to save the current UML-class '"+getClassName(this.aJSON)+"' first?");
    		if (vSaveOK == true) {
    			this.saveJSON();
    			console.log("JSON-DB initalized with UML class '"+getClassName(this.aJSON)+"'!");
    		} else {
    			console.log("JSON-DB for UML class '"+getClassName(this.aJSON)+"' not saved - data deleted!");
        }
      	console.log("JSON-DB for UML class '"+getClassName(this.aJSON)+"' not saved - data deleted!");
        this.aEditor.setValue(this.aDefaultJSON); // defined e.g. in /db/uml_default.js
    } else {
        console.log("initialize JSON-DB cancelled");
    }
  };

  this.delete_ask = function () {
    var vOK = confirm("Do you want to delete all data?");
    if (vOK == true) {
        var vSaveOK = confirm("Do you want to save the current UML-class '"+getClassName(this.aJSON)+"' first?");
        if (vSaveOK == true) {
          this.saveJSON();
          console.log("JSON-DB initalized with UML class '"+getClassName(this.aJSON)+"'!");
        } else {
          console.log("JSON-DB for UML class '"+getClassName(this.aJSON)+"' not saved - data deleted!");
        }
        var vEmptyJSON = {
            "data":{
              "classname":"MyClass"
            },
            "settings":(this.aJSON.settings || {})
        };
        this.aEditor.setValue(vEmptyJSON);
        localStorage.clear();
        console.log("JSON-DB deleted'!");
        //save changes to Local Storage
    } else {
        console.log("initialize JSON-DB cancelled");
    }
  };

  this.showEditor = function (pEditorID,pBoolean) {
    var self = this.getEditor(pEditorID);
    //if (self.collapsed) {
    if (self) {
      if (pBoolean == true) {
        self.editor_holder.style.display = '';
        self.collapsed = false;
        self.setButtonText(self.toggle_button, '', 'collapse', self.translate('button_collapse'));
      } else {
        self.editor_holder.style.display = 'none';
        self.collapsed = true;
        self.setButtonText(self.toggle_button, '', 'expand', self.translate('button_expand'));
      }
    } else {
      console.log("ERROR: showEditor('"+pEditor+"',pBoolean) Editor for ['"+pEditorID+"'] not found");
    }
  };

  this.toggleSettings = function (pSettingsID,pDataID) {
    // if(editor.getEditor('root.location').isEnabled()) alert("It's editable!");
    // Check if Settings are enabled
    //if (this.options.collapsed) {
    //  $trigger(this.toggle_button,'click');
    //}
    this.update_modified();
    if (this.aSettingsBOOL == false) {
      alert("JSON-Editor: Show Settings");
      this.showEditor(pSettingsID,true);
      this.showEditor(pDataID,false);
    } else {
      alert("JSON-Editor: Hide Settings");
      this.showEditor(pSettingsID,false);
      this.showEditor(pDataID,true);
    }
    this.aSettingsBOOL = !this.aSettingsBOOL;
  };

  this.toggleEnable = function () {
    if (this.aEditor.isEnabled()) {
      this.aEditor.disable();
    } else {
      this.aEditor.enable();
    }
  };

  this.enable = function (pID) {
    if (pID) {
      this.aEditor.getEditor(pID).enable();
    } else {
      this.aEditor.enable();
    }
  };

  this.disable = function (pID) {
    if (pID) {
      this.aEditor.getEditor(pID).disable();
    } else {
      this.aEditor.disable();
    }
  };

  this.init_buttons = function () {
    var vThis = this; // "vThis" used because "this" is not available in function
    this.set_button_click("submit",function() {
        // Get the value from the editor
        var vContent = JSON.stringify(vThis.aEditor.getValue(),null,4);
        vThis.el("tJSON");
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
  };



  this.init_watch = function () {
    console.log("CALL: init_watch() ");
    // watch event is fired before the value is changed,
    // so getValue() provides the value before alteration of JSON.
    // USE: onchange event with editor.on
    var vThis = this; // "vThis" used because "this" is not available in function
    if (this.aEditor) {
      /*
      var vEditor = this.aEditor;
      if (vEditor) {
        if (typeof vEditor.on === 'function') {
          vEditor.on('change',function() {
            console.log("onchange-Event 'root.data.classname'");
            vThis.update_filename();
          });
        } else {
          console.log("WARNING: In JSON-Editor ['"+vEditID+"'] on-Method not defined!");
        }
      };

      this.aEditor.watch('root.data.classname',function() {
        console.log("Watch-Event 'root.data.classname'");
        vThis.update_filename();
        //update_editor();
      });

      this.aEditor.watch('root.settings.baseclasslist',function() {
        vThis.update_watchclasslist();
        //update_editor();
      });
      this.aEditor.watch('root.settings.localclasslist',function() {
        vThis.update_watchclasslist();
        //update_editor();
      });
      this.aEditor.watch('root.settings.remoteclasslist',function() {
        vThis.update_watchclasslist();
        //update_editor();
      });
      */
      //this.start_watch()
    } else {
      console.log("aEditor not defined in init_watch()-call");
    }
  };

  this.start_watch = function () {
    var vThis = this; // "vThis" used because "this" is not available in function
    if (this.aEditor) {
      console.log("start_watch()-call");
      this.aEditor.on('change',function() {
        vThis.validate_errors();
        //vThis.saveLS("jsondata");
        vThis.update_filename();
        //update_editor();
        vThis.update_modified();
        // update_modified date
      });
    }
  };

  this.stop_watch = function () {
    var vThis = this; // "vThis" used because "this" is not available in function
    console.log("stop_watch()-call");
    if (this.aEditor) {
      this.aEditor.on('change',function() {
        //update_editor();
      });
    }
  };

  // ---- getElementById call ---
  this.el = function (pID) {
    return this.aDoc.getElementById(pID);
  };

  this.set_button_click = function (pID,pFunction) {
    var vNode = this.el(pID);
    if (vNode) {
        vNode.addEventListener('click',pFunction);
    } else {
        console.log("DOM node ["+pID+"] does not exist. Could not assign");
    }
  };

  this.update = function () {
    alert("update Schema changes for the JSONEditor4Code");
    this.create_editor();
  };

  this.getValue = function () {
    var vJSON = this.aJSON;
    if (this.aEditor) {
      vJSON = this.aEditor.getValue();
    } else {
      console.log("this.aEditor undefined in JSONEditor4Code.getValue()");
    }
    return vJSON;
  };

  this.setValue = function (pJSON) {
    this.aJSON = pJSON;
    if (this.aEditor) {
      this.aEditor.setValue(pJSON);
      console.log("setValue() executed!\n"+JSON.stringify(pJSON,null,4));
    } else {
      console.log("this.aEditor undefined in JSONEditor4Code.setValue(pJSON)");
    }
  };

  this.update_filename = function () {

    if (this.aOptions.hasOwnProperty("filename_key")) {
      var vNode = this.el(this.aOptions.filename_id); // e.g. filename_id = "load_filename";
      var vJSON = this.aJSON;
      if (vNode) {
        if (this.aEditor) {
          console.log("CALL: update_filename() - use vJSON = this.aEditor.getValue()!");
          vJSON = this.aEditor.getValue();
        } else {
          console.log("CALL: update_filename() - this.aEditor not defined!");
        }
      }

      var vDOMID = this.aOptions.filename_id;
      if (this.el(vDOMID)) {
        if (vJSON.data) {
          if (vJSON.data.hasOwnProperty("classname")) {
            console.log("CALL: update_filename('"+vJSON.data.classname+"') - Name of class was updated in DOM node ["+vDOMID+"]!");
            vNode.innerHTML = class2filename(vJSON.data.classname)+vJSON.settings.extension4code;
          } else {
            console.log("WARNING: update_filename() - Attribute 'classname' in 'this.aJSON.data.classname' - was not defined!");
          }
        } else {
          console.log("WARNING: update_filename() - this.aJSON does not contain the hash 'this.aJSON.data' for access to classname 'this.aJSON.data.classname' - update of classname in DOM was not performed!");
        }
      } else {
        console.log("WARNING: update_filename() - DOM node ["+vDOMID+"] does not exist!");
      }
    } else {
      console.log("WARNING: update_filename() - DOM-ID is not defined in this.aOptions['filename_id']");
    }
  };

  this.update_watchclasslist = function () {
    // updates the defintions/selectorclass in the schema
    console.log("Call: update_watchclasslist() Update Class in Schema ");
    //this.update_filename(); // update the filename in the DOM node with id "load_filename"
    if (this.aJSON && this.aJSON.settings) {
      if (this.aEditor) {
        var watchclasses = [" "]; //
        console.log("Call: update_watchclasslist() Editor defined ");
        var basecl = this.getEditor("root.settings.baseclasslist").getValue();
        // BASIC CLASSES: push all basic classes
        if (basecl) {
          for (var i = 0; i <  basecl.length; i++) {
            watchclasses.push(basecl[i].name);
          }
        }
        // LOCAL CLASSES: push all local classes
        var cl = [];
        var localcl= this.getEditor("root.settings.localclasslist").getValue();
        if (localcl) {
          for (var k = 0; k < localcl.length; k++) {
            cl.push(localcl[k].name);
          }
        }
        // REMOTE CLASSES: push all remote classes
        var remotecl = this.getEditor("root.settings.remoteclasslist").getValue();
        if (remotecl) {
          for (var j = 0; j < remotecl.length; j++) {
            cl.push(remotecl[j].name);
          }
        }
        cl.sort();
        console.log("cl=("+cl.join(",")+")");
        for (var m = 0; m < cl.length; m++) {
          watchclasses.push(cl[m].name);
        }
        var vEditNode = this.getEditor("root.watchclasslist");
        vEditNode.setValue(watchclasses);
      } else {
        console.log("WARNING: update_watchclasslist()-call aEditor not defined");
      }
    } else {
      console.log("WARNING: src/exportmod.js - update_watchclasslist() - this.aJSON.settings undefined!");
    }
  };


  this.update_subeditor = function (pEditPath,pJSON) {
    var ed_classlist =  this.getEditor(pEditPath);
    // `getEditor` will return null if the path is invalid
    var s = this.aJSON.settings;
    if (ed_classlist) {
      ed_classlist.setValue(pJSON);
      console.log("update_subeditor('"+pEditPath+"',pJSON) "+ed_classlist.getValue());
    } else {
      console.log("update_subeditor('"+pEditPath+"',pJSON) editor undefined - wrong Edit Path");
    }
  };

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
    }
    var vErrors = "";
    var vCR = "";
    for (var i = 0; i < errors.length; i++) {
      vErrors +=  vCR + errors[i].path + " - " +errors[i].property +" - "+errors[i].message;
      vCR = "\n";
    }
    this.el("tErrors").value = vErrors;
  };

  this.loadLS = function (pLSID) {
    var vLSID = pLSID || "jsondatra"; //this.aJSON.data.classname;
    var vJSONstring = "";
    if (typeof(Storage) != "undefined") {
        // Store
        if (typeof(localStorage.getItem(vLSID)) !== undefined) {
          console.log("LocalStorage: '"+vLSID+"' try loading from Local Storage");
          vJSONstring = localStorage.getItem(vLSID);
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
                alert("ERROR: "+ e);
            }
          }
        } else {
          console.log("JSON-Data '"+vLSID+"' is undefined in Local Storage.\nSave default as JSON");
          localStorage.setItem(vLSID, JSON.stringify(this.aEditor.getValue()));
        }
    }	 else {
        console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
    }
  };

  this.saveLS = function (pLSID) {
    var vLSID = pLSID || "jsondata";
    console.log("saveLS('"+vLSID+"')-Call");
    var vJSON = this.getValue();
    var vJSONstring = "";
    if (typeof(Storage) != "undefined") {
        // Store
        if (typeof(vJSON) != undefined) {
          console.log("LocalStorage: '"+vLSID+"' is defined, JSONDB in  Local Storage");
          if (vJSON) {
            //console.log("pJSONDB '"+vLSID+"' is saved to Local Storage");
            vJSONstring = JSON.stringify(vJSON);
            console.log("LocalStorage: saveLS('"+vLSID+"') JSONstring='"+vJSONstring.substr(0,240)+"...' DONE");
            localStorage.setItem(vLSID,vJSONstring);
          } else {
            console.log("vJSON with JSON is NOT defined");
          }
        } else {
          console.log("JSON Data '"+vLSID+"' is undefined");
        }
      }	 else {
        console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
      }
  };

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
            vThis.update_filename();
            alert("File JSON '"+fileToLoad.name+"' loaded successfully!");
            vThis.validate_errors();
          } catch(e) {
            vThis.aEditor.setValue([]); // Init with an empty class
            alert(e); // error in the above string (in this case, yes)!
          }
        };
      //onload handler set now start loading the file
      fileReader.readAsText(fileToLoad, "UTF-8");
    } else {
      alert("File is missing");
    }
    this.saveLS("jsondata");
  };

  this.getClassname4File = function () {
    return class2filename(getClassName(this.aJSON),"_juml.json");
  };

  this.getFilename = function(pJSON) {
    var vClassName = "Undefined_Class";
    var vExtension = pJSON.settings.extension4json || "_uml.json";
    if (pJSON) {
      if (pJSON.data) {
        if (pJSON.data.classname) {
          vClassName  = pJSON.data.classname;
        } else {
          console.log("WARNING: pJSON.data.classname undefined in JSONEditor4Code.getFilename()");
        }
      } else {
        console.log("WARNING: pJSON.data undefined in JSONEditor4Code.getFilename()");
      }
    } else {
      console.log("WARNING: pJSON undefined in JSONEditor4Code.getFilename()");
    }
    var vFilename = class2filename(vClassName) + vExtension;
    return vFilename;
  };

  this.setFilename = function (pFilename) {
    if (this.aJSON) {
      if (this.aJSON.data) {
        if (this.aJSON.data.classname) {
          this.aJSON.data.classname = pFilename;
        }
      }
    }
  };

  this.saveJSON = function () {
    // Get the value from the editor
    //alert("saveJSON()-Call");
    var vJSON = this.aEditor.getValue();
    this.saveLS("jsondata");
    var vFile = this.getFilename(vJSON);
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
  };

  this.saveDocumentation = function () {
    // see e.g. template tpl/docu4github_tpl.js
    // stored  vDataJSON["tpl"]["docu4github"]
    this.save4Template("docu4github","_github.md","Github MarkDown Documentation");
  };

  this.viewOutput = function (pContent) {
    //--Textarea Output----------------
    var vOutNode = this.el("tOutput");
    if (vOutNode) {
      vOutNode.value = pContent;
    } else {
      console.log("WARNING: JSONEditor4Code.viewOutput()-call - textarea 'tOutput' not defined in DOM");
    }
    //---------------------------------
  };

  this.getOutput4Template = function (pTplID) {
      console.log("getOutput4Template('"+pTplID+"')");
      this.update_modified();
      var vJSON = this.aEditor.getValue();
      //-- HandleBars: Compile with javascript-template ---
      // vDataJSON["out"]["javascript"] is HandleBars compiler function
      // Compile functions was generated from "tpl/docu4github_tpl.js"
      var vContent = "Undefined Handlebars Compiler TplID='"+pTplID+"'";
      if (this.compileCode[pTplID]) {
        vContent = this.compileCode[pTplID](vJSON);
        //--Textarea Output----------------
        this.viewOutput(vContent);
        //---------------------------------
      } else {
        console.log("compileCode['"+pTplCode+"'] undefined");
      }

      return vContent;
  };

  this.save4Template = function (pTplID,pExtension,pMessage) {
      console.log("save4Template('"+pTplID+"'.'"+pExtension+"','"+pMessage+"')");
      var vMessage = pMessage || "Code";
      //vContent = postProcessHandlebars(vContent,vJSON);
      var vContent = this.getOutput4Template(pTplID);
      console.log("save4Template() vContent="+vContent.substr(0,120)+"...");
      //--Textarea Output----------------
      this.viewOutput(vContent);
      //---------------------------------
      //--JSON Output--------------------
      var vJSON = this.getValue();
      var vFile = class2filename(vJSON.data.classname,pExtension);
      saveFile2HDD(vFile,vContent);
      //alert("File '"+vFile+"' saved - "+vMessage);
      console.log("File '"+vFile+"' saved - "+vMessage);
  };


  this.saveCode = function (pTplID,pExt,pMessage) {

    var vTplID = pTplID || "javascript";
    var vExt = pExt || ".js";
    var vMessage = pMessage || "Javascript Code for Class";
    // see e.g. template tpl/javascript_class_tpl.js
    // stored  vDataJSON["tpl"]["javascript"]
    this.save4Template(vTplID,vExt,vMessage);
  };

  this.update_modified = function () {
    if (this.aJSON) {
      if (this.aJSON.reposinfo) {
        this.aJSON.reposinfo.modified = getDateTime();
        console.log("reposinfo.modified updated with: '"+this.aJSON.reposinfo.modified+"'");
      } else {
        console.log("this.aJSON.reposinfo.modified was undefined - src/libs/exportmod.js:518");
      }
      this.update_filename();
    }
  };


} // end JSONEditor4Code
