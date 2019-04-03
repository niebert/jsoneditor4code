vDataJSON.umljs = {
    "data": {
        "classname": "LoadFile4DOM",
        "superclassname": " ",
        "comment": "Creates hidden file tag in the DOM to emulated loading interactively files from the local file system of you computer or mobile device into the browser for further processing\n",
        "reposinfo": {
            "JSCC_type": "CLASS",
            "JSCC_version": "2",
            "repository": "https://www.gitlab.com/niehausbert/loadfile4dom",
            "static": "no",
            "debugheader": "no",
            "require_classes": "yes",
            "author": "Bert Niehaus",
            "email": "niebert GitHub",
            "created": "2018/12/12 14:49:10",
            "modified": "2018/12/30 22:37:47",
            "configcode": "// the configuration code will be used to create some constants",
            "requirelist": []
        },
        "attributes": [
            {
                "visibility": "public",
                "name": "aDoc",
                "init": "null",
                "class": "Document",
                "comment": "This attribute stores a reference to the document object of the browser. Reference provided with the init-method"
            },
            {
                "visibility": "public",
                "name": "aOptions",
                "init": "null",
                "class": "Hash",
                "comment": "This hash stores the options of the init method - e.g. \"id4loadfile\" as DIV container for the input elements in the DOM that holds all created file loaders i.e. holding the input-file-tags for load a JSON file"
            },
            {
                "visibility": "public",
                "name": "aFileLoader",
                "init": "{}",
                "class": "Hash",
                "comment": "This attribute stores the number of file loaders created with instance"
            },
            {
                "visibility": "public",
                "name": "aLoadFileHolder",
                "init": "{\n    \"id\": \"holder4loadfile\",\n    \"dom\": null,\n    \"timeout\": 0,\n    \"var4dom\": \"undef_call_var\",\n    \"debug\": false\n}",
                "class": "Object",
                "comment": "This attribute stores the reference to the DIV node of the file holder node in the DOM that is created by this.create_holder()"
            },
            {
                "visibility": "public",
                "name": "defaults_options",
                "init": "{\n    \"id\": \"loadfile_holder_div\",\n    \"dom\": null,\n    \"setonload\": false,\n    \"timeout\": 1000,\n    \"debug\": false\n}",
                "class": "Hash",
                "comment": "the attribute stores the default options for LoadFile4DOM"
            },
            {
                "visibility": "public",
                "name": "type2accept",
                "init": "{\n    \"all\": \"*\",\n    \"audio\": \"audio/*\",\n    \"audiourl\": \"text/*\",\n    \"data\": \"*\",\n    \"image\": \"image/*\",\n    \"imagethumb\": \"image/*\",\n    \"json\": \"application/json\",\n    \"text\": \"text/*\",\n    \"texturl\": \"text/*\",\n    \"video\": \"video/*\",\n    \"videourl\": \"text/*\",\n    \"url\": \"text/*\",\n    \"zip\": \"application/zip\"\n}",
                "class": "Hash",
                "comment": "the attribute maps the type to the accept tag of files of the input-file-tag"
            },
            {
                "visibility": "public",
                "name": "defaults_loader",
                "init": "{\n    \"filetype\": \"text\",\n    \"id\": \"loader123456789\",\n    \"name\": \"defaultloader\",\n    \"value\": \"Dialog Loader Button\",\n    \"accept\": \"text/*\",\n    \"onchange\": \"console.log('open dialog click on 'defaultloader')\",\n    \"multiple\": true\n}",
                "class": "Hash",
                "comment": "the attribute stores the default loader tags if not options are provided"
            },
            {
                "visibility": "public",
                "name": "aLoaderCount",
                "init": "0",
                "class": "Integer",
                "comment": "the attribute stores the number of created loaders to create unique loader IDs in the DOM together with the method getTimeStamp()"
            }
        ],
        "methods": [
            {
                "visibility": "public",
                "name": "init",
                "parameter": [
                    {
                        "name": "pDoc",
                        "class": "Document",
                        "comment": "the parameter contains a reference to the document object of the browser"
                    },
                    {
                        "name": "pOptions",
                        "class": "Hash",
                        "comment": "the parameter stores options"
                    }
                ],
                "return": " ",
                "comment": "the method performs the initialization of the instance of LoadFile4DOM. pOptions contains the ID for the LoadFile4DOM holder, it is in general a DIV element with the HTML-input-tags for uploading a files.",
                "code": "\n\n\n\n            // ----Debugging------------------------------------------\n            //  console.log(\"loadfile4dom.js - Call: init(pDoc,pOptions)\");\n            //  alert(\"loadfile4dom.js - Call: init(pDoc,pOptions)\");\n            // ----Create Object/Instance of LoadFile4DOM and call init()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.init(pDoc,pOptions);\n            // -------------------------------------------------------\n            var self = this;\n            console.log(\"CALL: init() with options=\"+JSON.stringify(pOptions,null,4));\n            var vOptions = pOptions || {};\n            //  save the reference \"document\" object\n            this.aDoc = pDoc;\n            //  store options provided as parameter in the init-method\n            /*\n            this.defaults = {\n              \"id4loadfile\": \"loadfile_div\",\n              \"dom\": null,\n              \"var4dom\": \"loadfile_div\"+this.getTimeStamp()\n            };\n            */\n            // console.log(\"vOptions=\"+JSON.stringify(vOptions,null,4));\n            // set default options and store options as attribute\n            this.aOptions = this.set_defaults(vOptions,this.defaults_options);\n            console.log(\"this.aOptions=\"+JSON.stringify(this.aOptions,null,4));\n            // Create var4dom that is unique in DOM for calling the instance\n            var var4dom = \"var4dom\" + this.getTimeStamp();\n            this.aLoadFileHolder.var4dom = var4dom;\n            this.aDoc[var4dom] = this;\n            // WARNING: do not set options.setonload = true - LoadFile4DOM does not create input-file-tags\n            // setTimeout to assign \"LoadFile4DOM.create()\" to body onload event.\n            /*\n            if (this.aOptions.setonload === true) {\n              setTimeout(self.create,this.aOptions.timeout);\n            }\n            */\n\n    "
            },
            {
                "visibility": "public",
                "name": "getTimeStamp",
                "parameter": [],
                "return": "String",
                "comment": "the method creates a unique time stamp to IDs of DOM elements",
                "code": "\n\n\n\n            // ----Debugging------------------------------------------\n            //  console.log(\"loadfile4dom.js - Call: getTimeStamp()\");\n            //  alert(\"loadfile4dom.js - Call: getTimeStamp()\");\n            // ----Create Object/Instance of LoadFile4DOM and call getTimeStamp()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.getTimeStamp();\n            // -------------------------------------------------------\n            //  create a time stamp with a number\n            var now = new Date();\n            var timestamp = this.aLoaderCount + 't' + now.getTime();\n            this.aLoaderCount++;\n            //  return the integer as time in milli seconds since January 1st, 1970 0:00am\n            return timestamp;\n\n    "
            },
            {
                "visibility": "public",
                "name": "create_input_tags",
                "parameter": [],
                "return": " ",
                "comment": "the method injects the input-files tags for the loaders in the DOM - the method is called by LoadFile4DOM.create() with body-onload attribute.",
                "code": "\n\n\n\n            // ----Debugging------------------------------------------\n            // console.log(\"loadfile4dom.js - Call: create()\");\n            //  alert(\"loadfile4dom.js - Call: create()\");\n            // ----Create Object/Instance of LoadFile4DOM and call create()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.create(pLoaderID);\n            // -------------------------------------------------------\n            //  create a hidden DOM node and append the DOM node to this.aLoadFileHolder\n            var fl = this.aFileLoader;\n            var vLoadFileHolder = this.get_holder();\n            for (var loadid in fl) {\n              console.log(\"CALL: create_input_tags('\"+ loadid +\"')\");\n              if (fl.hasOwnProperty(loadid)) {\n                console.log(\"CALL: create_input_tags('\"+ loadid +\"') exists\");\n                // append the created \"input\" tag to the holder\n                if (vLoadFileHolder) {\n                    if (fl[loadid].dom) {\n                      console.log(\"CALL: create_input_tags('\" + loadid + \"') for DOM node for input-file tag with ID ['\" + fl[loadid].id + \"'] appended to DOM!\");\n                      vLoadFileHolder.appendChild(fl[loadid].dom);\n                    } else {\n                      console.error(\"ERROR: DOM node for input-file tag with ID ['\" + fl[loadid].id + \"'] was not created with !\");\n                    }\n                } else {\n                  console.log(\"LoadFile4DOM.create_input_tags():  LoadFile4DOM holder does not exist - no append Loader Dialog ['\" + loadid + \"'] to holder possible\");\n                }\n              }\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "create",
                "parameter": [],
                "return": " ",
                "comment": "the method creates a DOM node for the file in the `window.document` of the browser and  adds an object in `this.aFileLoader` the each constructed file loader with the appropriate ID.",
                "code": "\n\n\n\n            // ----Debugging------------------------------------------\n            //  console.log(\"loadfile4dom.js - Call: create()\");\n            //  alert(\"loadfile4dom.js - Call: create()\");\n            // ----Create Object/Instance of LoadFile4DOM and call create()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.create(pLoaderID);\n            // -------------------------------------------------------\n            //  create a hidden DOM node and append the DOM node to this.aLoadFileHolder\n            if (this.aLoadFileHolder) {\n              if (this.aLoadFileHolder.dom) {\n                console.log(\"LoadFile4DOM.create()-Call: aLoadFileHolder.dom exists\");\n              } else {\n                console.log(\"LoadFile4DOM.create()-Call: Create DIV node in DOM! this.aOptions.debug=\"+this.aOptions.debug);\n                this.create_holder();\n              }\n            } else {\n              console.log(\"CALL: LoadFile4DOM.create(): Create DIV node for LoadFile input-tagss: LoadFile4DOM.create_holder() because aLoadFileHolder is not defined!\");\n              this.create_holder();\n            }\n            this.create_input_tags();\n\n    "
            },
            {
                "visibility": "public",
                "name": "get_holder",
                "parameter": [],
                "return": "Object",
                "comment": "the method returns the LoadFile4DOM holder as DOM node. The id of the LoadFile4DOM holder is stored in this.aOptions.id4loadfile. The holder is an existing DIV node in the DOM (Document Object Model) or it will be created by the create_holder",
                "code": "\n\n\n\n            var vHolder = null;\n            if (this.aLoadFileHolder.hasOwnProperty(\"dom\")) {\n              vHolder = this.aLoadFileHolder.dom;\n              if (vHolder) {\n                console.log(\"CALL: get_holder(): aLoadFileHolder.dom exists with ID=[\"+this.aLoadFileHolder.id+\"]\");\n              } else {var vID = this.aOptions.id4loadfile;\n              //  vLoadFileHolder refers to hidden DIV-node that is used for adding the LoadFile instances.\n                vHolder = this.aDoc.getElementById(vID);\n                if (vHolder) {\n                  console.log(\"CALL: get_holder(): DOM node for Holder with aLoadFileHolder.id exists with ID=[\"+this.aLoadFileHolder.ide+\"] \");\n                } else {\n                  console.log(\"CALL: get_holder(): DOM node for Holder with aLoadFileHolder.id does not exist with ID=[\"+this.aLoadFileHolder.ide+\"] - Holder generation failed by LoadFile4DOM.create_holder()\");\n                  vHolder = null;\n                }\n              }\n            }\n            return vHolder;\n\n    "
            },
            {
                "visibility": "public",
                "name": "create_load_dialog",
                "parameter": [
                    {
                        "name": "pOptions",
                        "class": "Hash",
                        "comment": "the parameter provides the options for the created FileLoaders in DOM"
                    }
                ],
                "return": " ",
                "comment": "the method creates a Load Dialog in the LoadFile4DOM instance.\n - create the options with LoadFile4DOM-method e.g. with\n     var txtfile = lf4d.get_loader_options(\"mytxtfile\",\"text\")",
                "code": "\n\n\n\n            // ----Debugging------------------------------------------\n            //  alert(\"loadfile4dom.js - Call: create_load_dialog(pID)\");\n            // ----Create Object/Instance of LoadFile4DOM and call create_load_dialog()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.create_load_dialog(pID);\n            // -------------------------------------------------------\n            //  create a node <input type=\"file\" id=\"myloaderid\" name=\"myloader\" value=\"Dialog myloaderid\" onchange=\"vJSONEditor.loadJSON(this.id)\"/>\n            var vID = pOptions.name; // use pOptions.name as ID because it has no time stamp at the end.\n            console.log(\"loadfile4dom.js - Call: create_load_dialog('\"+vID+\"')\");\n            var doc = this.aDoc;\n            // create the file-input element\n            var vInput = doc.createElement(\"input\");\n            //\n            var vAttDef = (pOptions || this.get_input_attributes(vID));\n            // if multiple files can be loaded then the \"name\" attribute needs array brackets for multiple files\n            if (vAttDef.multiple === true) {\n              vAttDef.name += \"[]\";\n            }\n            // now add all attributes to the created \"input\" tag.\n            var a = null;\n            for (var key in vAttDef) {\n              if ((key != \"multiple\") && (key != \"onload\")) {\n                if (vAttDef.hasOwnProperty(key)) {\n                      console.log(\"create_load_dialog() ['\"+vID+\"'].\" + key +  \"=\"+vAttDef[key]);\n                      a = doc.createAttribute(key);\n                      a.nodeValue = vAttDef[key];\n              \t\t    vInput.setAttributeNode(a)\n              \t}\n              }\n            }\n            // if we allow multiple file select, add the attribute \"multiple\" to the input tag\n            if (vAttDef.multiple === true) {\n              a = doc.createAttribute('multiple');\n              a.nodeValue = \"multiple\";\n              vInput.setAttributeNode(a);\n            }\n            this.aFileLoader[vID] = {\n              \"id\": vAttDef.id, //  e.g. \"loadjson9234090294\"\n              \"filetype\": vAttDef.filetype, //  e.g. \"loadjson9234090294\"\n              \"dom\": vInput, //  the element of the <input ...> tag in DOM (Document Object Model)\n              \"onload\": pOptions.onload\n            };\n            //console.log('DOM vAttDef:\\n' + JSON.stringify(vAttDef,null,4));\n            console.log('DOM vInput:\\n' + vInput.outerHTML);\n\n\n    "
            },
            {
                "visibility": "public",
                "name": "create_holder",
                "parameter": [],
                "return": " ",
                "comment": "the method creates a hidden holder DIV element for the input-tags of the load file instance. The loader ID of the DIV element is stored in this.aOptions.id4loadfile",
                "code": "\n\n            // ----Debugging------------------------------------------\n            //  console.log(\"loadfile4dom.js - Call: create_holder()\");\n            //  alert(\"loadfile4dom.js - Call: create_holder()\");\n            // ----Create Object/Instance of LoadFile4DOM and call create_holder()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.create_holder();\n            // -------------------------------------------------------\n            //  this.aOptions.id4loadfile contains the ID of the DIV tag of the LoadFile holder.\n            //  get the LoadFile holder ID from Options that was defined in the init()-method\n            var vHolderID = this.aLoadFileHolder.id || \"holder4loadfile\";\n            this.aLoadFileHolder.dom =  null;\n            //this.aLoadFileHolder.var4dom = \"onload4inputfile\" + this.getTimeStamp();\n            var doc = this.aDoc;\n            var vBody = doc.getElementsByTagName(\"body\")[0];\n            if (vBody) {\n              console.log(\"CALL: create_holder() document.body exists!\");\n            } else {\n              console.log(\"WARNING: create_holder() document.body does not exist!\");\n            }\n            if (this.aOptions.hasOwnProperty(\"id4loadfile\")) {\n                console.log(\"Options contain a holder ID [\"+this.aOptions.id4loadfile+\"]\");\n                vHolderID = this.aOptions.id4loadfile;\n            } else {\n              // appending a time stamp make the id unique, e.g. 'holder4loadfile'\n              // so that it is not in conflict with existing ids in the HTML DOM tree\n              vHolderID += this.getTimeStamp();\n              console.log(\"Use default holder name of DIV tag [\"+vHolderID+\"]\");\n            }\n            // check if DIV element for holder exists\n            this.aLoadFileHolder.id = vHolderID;\n            this.aLoadFileHolder.dom = doc.getElementById(vHolderID);\n            if (this.aLoadFileHolder.dom) {\n              console.log(\"Load Dialog holder DIV tag with ID=[\"+vHolderID+\"] exists\");\n            } else {\n              var lf_holder = doc.createElement('div');\n              //  create the \"id\" attribute\n              var att = doc.createAttribute(\"id\");\n              //  create a unique ID for the DIV element\n              att.nodeValue = vHolderID;\n              //  append the DIV holder with the id id4loadfile\n              lf_holder.setAttributeNode(att);\n              // add \"var4dom\" variable to DIV tag\n              var attvar4dom = doc.createAttribute(\"var4dom\");\n              attvar4dom.nodeValue = this.aLoadFileHolder.var4dom;\n              lf_holder.setAttributeNode(attvar4dom);\n              //--- Hide Holder ---\n              if (this.aOptions.debug === false) {\n                // Hide Holder \"style=\"display:none\" if aOptions.debug=false\n                var atthide = doc.createAttribute(\"style\");\n                atthide.nodeValue = \"display:none\";\n                lf_holder.setAttributeNode(atthide);\n              } else {\n                console.log(\"CALL create_holder(): Holder and input-file tags are visible browser\");\n              }\n              // --- Append Holder to body in DOM ---\n              // DOM Node create: <div id=\"id4loadfile872934878924\"></div>\n              //  append the LoadFileHolder at the document.body\n              vBody.appendChild(lf_holder);\n              // store reference to holder node\n              this.aLoadFileHolder.dom = lf_holder;\n              console.log(\"CALL create_holder(): LoadFile holder created as DIV element with ID=[\"+vHolderID+\"]\");\n              //setTimeout(this)\n            };\n            return this.aLoadFileHolder.dom;\n\n    "
            },
            {
                "visibility": "public",
                "name": "open_dialog",
                "parameter": [
                    {
                        "name": "pID",
                        "class": "String",
                        "comment": "the parameter provides the ID of the FileLoader input tag in the DOM"
                    }
                ],
                "return": " ",
                "comment": "the method opens the load dialog for the loadtype (e.g. loadtype=text or json)",
                "code": "\n\n\n\n            // ----Debugging------------------------------------------\n            //  console.log(\"loadfile4dom.js - Call: open_dialog(pID)\");\n            //  alert(\"loadfile4dom.js - Call: open_dialog(pID)\");\n            // ----Create Object/Instance of LoadFile4DOM and call open_dialog()----\n            //     var vLoadFile4DOM = new LoadFile4DOM();\n            //     vLoadFile4DOM.open_dialog(pID);\n            // -------------------------------------------------------\n            //  get DOM id of the upload <input ...> tag with pID in this.aFileHolder\n            var fl = this.aFileLoader;\n            if (fl.hasOwnProperty(pID)) {\n                console.log(\"CLICK: File Loader with ID=[\"+pID+\"] will open the file dialog of browser\");\n                var vLoaderDOM = fl[pID].dom;\n                //  trigger a onclick event in the hidden Upload Button of the browser to open Load Dialog\n                vLoaderDOM.click();\n            } else {\n                console.error(\"ERROR: File Loader with ID=[\"+pID+\"] is not defined\");\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "set_defaults",
                "parameter": [
                    {
                        "name": "options",
                        "class": "Hash",
                        "comment": "the parameter provides the options that will be extended\nif some properties do not exist"
                    },
                    {
                        "name": " defaults",
                        "class": "Hash",
                        "comment": "the parameter provides the default value for \"options\" that will be added \nto parameter \"options\" with the default values if they properties do not exist "
                    }
                ],
                "return": " ",
                "comment": "the method sets default values of \"options\" with",
                "code": "\n\n\n\n            var obj = {};\n            defaults = defaults || {};\n            for (var d in defaults) {\n              if (defaults.hasOwnProperty(d)) {\n                obj[d] = defaults[d];\n              }\n            }\n            for (var k in options) {\n              if (options.hasOwnProperty(k)) {\n                obj[k] = options[k];\n              }\n            }\n            return obj;\n\n    "
            },
            {
                "visibility": "public",
                "name": "get_loader_options",
                "parameter": [
                    {
                        "name": "pID",
                        "class": "String",
                        "comment": "the parameter provides name for DOM input-file  for the loader"
                    },
                    {
                        "name": "pFileType",
                        "class": "String",
                        "comment": "the parameter provides the type of loader e.g. text, image, imagethumb, audio, video, zip  "
                    },
                    {
                        "name": "pOptions",
                        "class": "Hash",
                        "comment": "(optional) the parameter provides additional options e.g. style options with width and height for an image"
                    }
                ],
                "return": "Hash",
                "comment": "the method returns a hash for loader e.g. the command\nvar loader4txt = lf4d.get_loader_options(\"mytxtfile\",\"text\",loader_opts); \ncreates the following hash:\n    loader4txt={\n       \"type\": \"text\",\n        \"id\": \"mytxtfile1t1545978644012\",\n        \"name\": \"mytxtfile\",\n        \"value\": \"Dialog mytxtfile\",\n        \"accept\": \"text/*\",\n        \"onload\": \"var4dom0t1545978644011.open_dialog('mytxtfile')\",\n        \"multiple\": false\n    }\nIn loadfile4dom.js the call of create_load_dialog(loader_option) creates the loader.\n",
                "code": "\n\n\n\n            var vUniqueID = pID + this.getTimeStamp(); //  has to be uniqued in the DOM\n            var vFileType = pFileType || this.defaults_loader.filetype;\n            var vOptions = {\n              \"type\": \"file\",\n              \"filetype\": vFileType,\n              \"id\":vUniqueID,\n              \"name\": pID,\n              \"value\": \"Dialog \"+pID,\n              \"accept\": this.type2accept[vFileType],\n              //\"onload\":\"console.log('open dialog click '\"+pID+\"')\",\n              \"onchange\": this.aLoadFileHolder.var4dom + \".handle_file('\"+pID+\"')\",\n            };\n            // set defaults in options if not set by vOptions\n            this.set_defaults(vOptions,this.defaults_loader);\n            if (pOptions) {\n              // pOptions exists, overwrite specific options by pOptions\n              // e.g. multiple = false\n              for (var variable in pOptions) {\n                if (pOptions.hasOwnProperty(variable)) {\n                  //console.log(\"UPDATE: vOptions.\"+variable+\"=\"+pOptions[variable]);\n                  vOptions[variable] = pOptions[variable];\n                }\n              }\n            }\n            // return the genrated options\n            return vOptions;\n\n    "
            },
            {
                "visibility": "public",
                "name": "get_input_attributes",
                "parameter": [
                    {
                        "name": "pID",
                        "class": "String",
                        "comment": "the parameter provides ID of the Loader"
                    },
                    {
                        "name": "pFileType",
                        "class": "String",
                        "comment": "the parameter provides type of loader e.g. `text`, `image`, `zip`, ... "
                    }
                ],
                "return": " ",
                "comment": "the method create the attributes for input-type-file tag in DOM - the method is an internal method to create the required attributes for the input-tag e.g. setting the correct onchange-event-handler for the loader",
                "code": "\n\n\n\n            console.log(\"get_input_attributes('\"+pID+\"')\");\n            var vUniqueID = pID + this.getTimeStamp(); //  has to be uniqued in the DOM\n            // the following hash contains all the input attributes\n            var vLoader = this.aFileLoader[pID];\n            var vFileType = pFileType || \"all\";\n            var vAtts = {\n              \"type\": \"file\",\n              \"filetype\": vFileType,\n              \"id\":vUniqueID,\n              \"name\": pID,\n              \"value\": \"Dialog \"+pID,\n              \"accept\": this.type2accept[vType],\n              \"onchange\": this.aLoadFileHolder.var4dom + \".handle_file('\"+pID+\"')\",\n              \"multiple\": this.defaults_loader.multiple\n            };\n            return vAtts;\n\n    "
            },
            {
                "visibility": "public",
                "name": "error_file_type",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a options of loader created with get_loader_options() method"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs file type error check, e.g. does the loaded file has the correct MIME type or matches with the only allowed extension.",
                "code": "\n\n\n\n            console.log(\"handle_\"+pLoader.filetype+\"() LoaderID='\"+pLoader.id+\"' FileType='\"+pLoader.filetype+\"' FileName='\" + ((pFileToLoad.name) || \"?\") + \"'\");\n            var mime_type = this.type2accept[pLoader.filetype] || \"*\";\n                var vErrMsg = \"\";\n                var vSep = \"\";\n                if (mime_type === \"*\") {\n                  console.log(\"All MIME-types allowed by loader ['\" + pLoader.id + \"'] - Filetype='\" + pLoader.filetype + \"' MIME-Type of File='\" + pFileToLoad.type + \"'\");\n                } else {\n                  if (!pFileToLoad.type.match(mime_type)) {\n                    // early escape function if file type is not an image\n                    vErrMsg += vSep + \"File Type '\" + pFileToLoad.type + \"' does not match with the mime '\" + mime_type + \"'\";\n                    vSep = \"\\n\";\n                  }\n                }\n                var fn = pFileToLoad.name;\n                var ext = pLoader.file_extension;\n                var found = fn.indexOf(ext);\n                if (pLoader.hasOwnProperty(\"file_extension\")) {\n                  if ((found > 0) &&  (fn.length - ext.lenth - 1 >= found)) {\n                    console.log(\"Filename '\" + fn + \"' has extension '\" + ext + \"'!'\");\n                  } else {\n                    vErrMsg += vSep + \"The filename '\" + fn + \"' does not have the extension '\" + ext + \"'\";\n                    vSep = \"\\n\";\n                  }\n                }\n                if (vErrMsg === \"\") {\n                  vErrMsg = null;\n                } else {\n                  console.error(vErrMsg);\n                  // call the onload function with an Error Message\n                  pLoader.onload(pFileToLoad,vErrMsg);\n                }\n                return vErrMsg;\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_text",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a options of loader created with get_loader_options() method"
                    },
                    {
                        "name": "pFileReader",
                        "class": "Object",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of filetype=\"text\"",
                "code": "\n\n\n\n            if (!this.error_file_type(pLoader,pFileToLoad)) {\n              pFileReader.onload = function(fileLoadedEvent){\n                var vFile = fileLoadedEvent.target.result;\n                // send the file vFile to the defined file handler of the FileLoader\n                pLoader.onload(vFile);\n              };\n              pFileReader.readAsText(pFileToLoad, \"UTF-8\");\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_json",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    },
                    {
                        "name": "pFileReader",
                        "class": "Object",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of filetype=\"json\"",
                "code": "\n        if (pLoader) {\n          console.log(\"CALL: handle_json('\" + pLoader.id + \"','\" + pLoader.filetype + \"')\");\n          var err = null;\n          if (!this.error_file_type(pLoader,pFileToLoad)) {\n            pFileReader.onload = function(fileLoadedEvent){\n              var vFile = fileLoadedEvent.target.result;\n              // send the file vFile to the defined file handler of the FileLoader\n              var vJSON = null;\n              // Parse JSON and check if syntax is valid.\n              // console.log(\"handle_json() Loaded File:\\n\"+vFile);\n              try {\n                  vFile = vFile + \"\";\n                  vJSON = JSON.parse(vFile);\n              } catch (err) {\n                  vJSON = null; // Init with an empty class\n                  console.error(\"ERROR: onload handler with errors - \"+err); // error in the above string (in this case, yes)!\n                  // call onload handler with a ppopulated error err,\n                  pLoader.onload(vJSON,err);\n                  return; // early exit function\n              }\n              pLoader.onload(vJSON,err);\n            };\n            pFileReader.readAsText(pFileToLoad, \"UTF-8\");\n          }\n        } else {\n          console.error(\"CALL: handle_json() pLoader does not exist!\");\n        }\n    "
            },
            {
                "visibility": "public",
                "name": "handle_image",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    },
                    {
                        "name": "pFileReader",
                        "class": "Object",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of filetype=\"image\"",
                "code": "\n\n            if (!this.error_file_type(pLoader,pFileToLoad)) {\n              pFileReader.onload = function(event){\n                var img = new Image();\n                img.onload = function(){\n                  canvas.width = img.width;\n                  canvas.height = img.height;\n                  ctx.drawImage(img,0,0);\n                };\n                img.src = event.target.result;\n                // send the image file \"img\" to the defined file handler of the FileLoader\n                pLoader.onload(img);\n              };\n              pFileReader.readAsDataURL(pFileToLoad);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_image_thumb",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Object",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    },
                    {
                        "name": "pFileReader",
                        "class": "FileReader",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of filetype=\"imagethumb\"",
                "code": "\n\n            if (!this.error_file_type(pLoader,pFileToLoad)) {\n              pFileReader.onload = function(event){\n                var html = '<img class=\"thumb\" src=\"';\n                var vFilename = pFileToLoad.name;\n                vFilename = vFilename.replace(/[^A-Za-z0-9 _\\-\\.]/g,\"_\");\n                html += event.target.result;\n                html += '\" title=\"' + vFilename + '\"/>';\n                // send the image file \"img\" to the defined file handler of the FileLoader\n                pLoader.onload(html);\n              };\n              pFileReader.readAsDataURL(pFileToLoad);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_data",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a options of loader created with get_loader_options() method"
                    },
                    {
                        "name": "pFileReader",
                        "class": "FileReader",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of an arbitrary filetype",
                "code": "\n\n\n\n            // check if file type has no error according to MIME type and extension\n            if (!this.error_file_type(pLoader,pFileToLoad)) {\n              pFileReader.onload = function(event){\n                // send the image file \"img\" to the defined file handler of the FileLoader\n                pLoader.onload(event.target.result);\n              };\n              pFileReader.readAsDataURL(pFileToLoad);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_audio",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    },
                    {
                        "name": "pFileReader",
                        "class": "FileReader",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of the filetype=\"audio\"",
                "code": "\n\n\n\n            if (!this.error_file_type(pLoader,pFileToLoad)) {\n              pFileReader.onload = function(event){\n                // send the image file \"img\" to the defined file handler of the FileLoader\n                pLoader.onload(event.target.result);\n              };\n              pFileReader.readAsDataURL(pFileToLoad);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_video",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    },
                    {
                        "name": "pFileReader",
                        "class": "FileReader",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method performs the file handling if the loader is of the filetype=\"video\"",
                "code": "\n\n\n\n            if (!this.error_file_type(pLoader,pFileToLoad)) {\n              pFileReader.onload = function(event){\n                // send the image file \"img\" to the defined file handler of the FileLoader\n                pLoader.onload(event.target.result);\n              };\n              pFileReader.readAsDataURL(pFileToLoad);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_file_type",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    },
                    {
                        "name": "pFileReader",
                        "class": "FileReader",
                        "comment": "the parameter provides a FileReader instance for the triggered Load Dialog Event of the injected input-file-tag"
                    },
                    {
                        "name": "pFileToLoad",
                        "class": "Object",
                        "comment": "the parameter provides access to loaded files, selected by the user from the Load Dialog for uploads."
                    }
                ],
                "return": " ",
                "comment": "the method branches into the handlers according to the appropriate filetype with a switch command.",
                "code": "\n\n\n\n            console.log(\"CALL: handle_file_type('\" + pLoader.id + \"','\" + pLoader.filetype + \"')\");\n            switch (pLoader.filetype) {\n              case \"text\":\n                this.handle_text(pLoader,pFileReader,pFileToLoad);\n              break;\n              case \"json\":\n                this.handle_json(pLoader,pFileReader,pFileToLoad);\n              break;\n              case \"image\":\n                this.handle_image(pLoader,pFileReader,pFileToLoad);\n              break;\n              case \"imagethumb\":\n                this.handle_image_thumb(pLoader,pFileReader,pFileToLoad);\n              break;\n              case \"audio\",\"audiourl\":\n                this.handle_audio(pLoader,pFileReader,pFileToLoad);\n              break;\n              case \"video\",\"videourl\":\n                this.handle_audio(pLoader,pFileReader,pFileToLoad);\n              break;\n              case \"zip\":\n                this.handle_zip(pLoader,pFileReader,pFileToLoad);\n              break;\n              default:\n                this.handle_data(pLoader,pFileReader,pFileToLoad);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_single_file",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    }
                ],
                "return": " ",
                "comment": "the method performs single file selection of the user in the Load Dialog\n    var txtfile = lf4d.get_loader_options(\"mytxtfile\",\"text\");\n   txtfile.multiple = false",
                "code": "\n\n            console.log(\"CALL: handle_single_file('\"+pLoader.id+\"')\");\n            if (pLoader.dom.files) {\n              var fileToLoad = pLoader.dom.files[0]; //for input type=file\n              console.log(\"CALL: handle_single_file('\"+fileToLoad.name+\"') - pLoader.dom.files exist\");\n              if (fileToLoad) {\n                console.log(\"handle_single_file('\"+fileToLoad.name+\"') loaded.\");\n                var fileReader = new FileReader();\n                // set the onload handler\n                this.handle_file_type(pLoader,fileReader,fileToLoad);\n              } else {\n                console.error(\"ERROR: fileToLoad does not exist!\");\n              }\n            } else {\n              console.error(\"ERROR: pLoader.dom.files does not exist!\");\n            }\n    "
            },
            {
                "visibility": "public",
                "name": "handle_multiple_files",
                "parameter": [
                    {
                        "name": "pLoader",
                        "class": "Hash",
                        "comment": "the parameter provides a defined options of LoadFile4DOM.create_load_dialog(options)\n - allowed MIME types for the loader,\n - multiple file selection allowed, ..."
                    }
                ],
                "return": " ",
                "comment": "the method performs the handling of multiple files selected by the user in the Load Dialog\n    var txtfile = lf4d.get_loader_options(\"mytxtfile\",\"text\");\n   txtfile.multiple = true",
                "code": "\n\n            console.log(\"CALL: handle_multiple_files('\"+pLoader.id+\"')\");\n            if (pLoader.dom.files) {\n              console.log(\"CALL: handle_multiple_files('\"+pLoader.id+\"') - pLoader.dom.files exist with \"+(pLoader.dom.files.length)+\" files!\");\n              //for (var i = 0, f; f = pLoader.dom.files[i]; i++) {\n              for (var i = 0; i < pLoader.dom.files.length; i++) {\n                var fileToLoad = pLoader.dom.files[i]; //for input type=file\n                if (fileToLoad) {\n                  console.log(\"handle_multiple_file('\"+fileToLoad.name+\"') loaded.\");\n                  var fileReader = new FileReader();\n                  // set the onload handler\n                  this.handle_file_type(pLoader,fileReader,fileToLoad);\n                } else {\n                  console.error(\"ERROR: fileToLoad does not exist!\");\n                }\n              }\n            } else {\n              console.error(\"ERROR: pLoader.dom.files does not exist!\");\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "handle_file",
                "parameter": [
                    {
                        "name": "pID",
                        "class": "String",
                        "comment": "the parameter provides ID of create FileLoader by LoadFile4DOM.create_load_dialog(options)"
                    }
                ],
                "return": " ",
                "comment": "the method is called whenever a file or multiple file were selected by the user. It call handle_single() or handle_multiple_files according to the options of the Loader defined loader options",
                "code": "\n\n\n\n            //console.log(this.aFileHolder.var4dom + \".handle_file('\" + pID + \"')\");\n            console.log(\"handle_file() - FileHandler executed for Loader ['\" + pID + \"']\");\n            if (this.aFileLoader.hasOwnProperty(pID)) {\n              var vLoader = this.aFileLoader[pID];\n              if (vLoader.dom) {\n                console.log(\"handle_file() - DOM Node with ID='\" + pID + \"' exists in vLoader.dom\");\n              } else {\n                console.log(\"handle_file() - get DOM Node for ID='\" + pID + \"' with document.getElementById('\"+pID+\"')\");\n                var vNode = this.aDoc.getElementById(vLoader.id);\n                console.log(\"handle_file() - get DOM Node for Loader '\" + pID + \"' with document.getElementById('\"+vLoader.id+\"')\");\n                if (vNode) {\n                  console.log(\"handle_file() - Loader Node with ID='\"+vLoader.id+\"' exists. Update FileLoader['\" + pID + \"'].dom with vNode\");\n                  this.aFileLoader[pID].dom = vNode;\n                } else {\n                  //--- ERROR ----\n                  console.error(\"DOM node for loader does not exist - load operation cancelled\");\n                  return ; // early exist of handle_file() call.\n                }\n              }\n              if (vLoader.multiple === true) {\n                console.log(\"handle_file() - Loading multiple files is allowed - apply handle_file('\" + pID + \"') to all files\");\n                this.handle_multiple_files(vLoader);\n              } else {\n                console.log(\"handle_file() - Loading single file and apply handle_file('\" + pID + \"') to file\");\n                this.handle_single_file(vLoader);\n              }\n            } else {\n              console.error(\"ERROR: Loader ['\"+pID+\"'] does not exist in this.aFileLoader\");\n            }\n    "
            },
            {
                "visibility": "public",
                "name": "log",
                "parameter": [
                    {
                        "name": "pMessage",
                        "class": "String",
                        "comment": "the parameter provides message for console.log() - DO NOT USE if you need the line index in the log message - USE if you want to have additional debug message when options.debug=true in LoadFile4DOM.init()-call - those messages will disappear if debug=false"
                    }
                ],
                "return": " ",
                "comment": "the method create console.log() message if and only if this.aOptions.debug=true. The parameter provides message for console.log()\n - DO NOT USE if you need the line index in the log message\n - USE if you want to have additional debug message when options.debug=true in LoadFile4DOM.init()-call\n - these messages will disappear in the console if options.debug=false\n - debug setting is defined in the options of the LoadFile4DOM.init(document,options)-call",
                "code": "\n\n\n\n            //console.log(\"debug=\"+this.aOptions.debug);\n            if (this.aOptions.debug === true) {\n              console.log(pMessage);\n            }\n\n    "
            },
            {
                "visibility": "public",
                "name": "set_onload",
                "parameter": [],
                "return": " ",
                "comment": "DO NOT USE - FOR TESTING ONLY - the method sets the onload event of the body-tag - currently it does not work - it is currently used for testing - if this method is call on init the initialisation of LoadFile4DOM does not need a manual setting of the onload-event in the body-tag anymore - currently the body.onload event must be set manually.",
                "code": "\n\n\n\n            // Do not use if you import <script src=\"loadfile4dom.js\"> before <body> tag exists in DOM\n            var self = this;\n            var vBody = document.getElementsByTagName(\"body\")[0];\n\n            vBody.addEventListener(\"load\", self.create(), false);\n\n            console.log(\"LoadFile4DOM.create() call assigned to onload-handler of body-tag\");\n\n    "
            }
        ]
    },
    "settings": {
        "extension4code": ".js",
        "extension4json": "_uml.json",
        "localclasslist": [
          {
            "name": "LoadFile4DOM",
            "initvalue": "new LoadFile4DOM()",
            "repo": "loadfile4dom"
          },
          {
            "name": "LinkParam",
            "initvalue": "new LinkParam()",
            "repo": "linkparam"
          }
        ],
        "remoteclasslist": [
          {
            "name": "JSONEditor",
            "initvalue": "new JSONEditor()",
            "repo": "jsoneditor"
          }
        ],
        "baseclasslist": [
            {
              "name": "Array",
              "initvalue": "[]"
            },
            {
                "name": "Boolean",
                "initvalue": "true"
            },
            {
                "name": "Float",
                "initvalue": "0.0"
            },
            {
                "name": "Function",
                "initvalue": "function my_fun() {}"
            },
            {
                "name": "Document",
                "initvalue": "document"
            },
            {
                "name": "Integer",
                "initvalue": "0"
            },
            {
                "name": "String",
                "initvalue": "\"\""
            },
            {
                "name": "Hash",
                "initvalue": "{}"
            },
            {
                "name": "Object",
                "initvalue": "null"
            },
            {
                "name": "RegularExp",
                "initvalue": "/search/g"
            }
        ]
      }
};
