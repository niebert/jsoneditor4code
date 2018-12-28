vDataJSON["umljs"] = {
    "data": {
        "classname": "LoadFile4DOM",
        "superclassname": " ",
        "comment": "Creates hidden file tag in the DOM to emulated loading interactively files from the local file system of you computer or mobile device into the browser for further processing\n",
        "reposinfo": {
            "JSCC_type": "CLASS",
            "JSCC_version": "2",
            "repository": "https://www.gitlab.com/niehausbert/loadfile4dom",
            "static": "no",
            "require_classes": "yes",
            "author": "Bert Niehaus",
            "email": "niebert GitHub",
            "created": "2018/12/12 14:49:10",
            "modified": "2018/12/12 14:49:10",
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
                "init": "null",
                "class": "Object",
                "comment": "This attribute stores the reference to the DIV node of the file holder node in the DOM that is created by this.create_holder()"
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
                "code": "//  save the reference \"document\" object\nthis.aDoc = pDoc;\n//  store options provided as parameter in the init-method\nthis.aOptions = pOptions || {};\nvar vLoadFileHolder = this.get_holder();\nif (vLoadFileHolder) {\n    console.log(\"DOM Node [\"+this.aOptions.id4loadfile+\"] exists!\");\n} else {\n    console.log(\"DIV Node [\"+this.aOptions.id4loadfile+\"] as LoadFile4DOM holder will be created!\");\n    this.create_holder();\n};"
            },
            {
                "visibility": "public",
                "name": "getTimeStamp",
                "parameter": [],
                "return": "Integer",
                "comment": "the method performs ...",
                "code": "// create a time stamp with a number\nvar now = new Date();\nvar timestamp = \"file\"+(this.aFileNode.length) +\"t\"+now.getTime();\n// return the integer as time in milli seconds since January 1st, 1970 0:00am\nreturn timestamp;"
            },
            {
                "visibility": "public",
                "name": "create",
                "parameter": [
                    {
                        "name": "pLoaderID",
                        "class": "String",
                        "comment": "the parameter provides the LoaderID "
                    },
                    {
                        "name": "pFileHandler",
                        "class": "Function",
                        "comment": "the parameter contains a function that handles the file content and if not successful the error."
                    }
                ],
                "return": " ",
                "comment": "the method creates a DOM node for the file in the `window.document` of the browser and  adds an object in `this.aFileLoader` the each constructed file loader with the appropriate ID.",
                "code": "// create a hidden DOM node and append the DOM node to this.aLoadFileHolder\nif (this.aLoadFileHolder) {\n    var fileloader = this.create_node4DOM(pLoaderID);\n    if (this.aLoadFileHolder) {\n        this.aLoadFileHolder.appendChild(fileloader);\n    } else {\n        console.log(\"ERROR: LoadFile4DOM.create() the aLoadFileHolder is not defined!\")\n    }\n}"
            },
            {
                "visibility": "public",
                "name": "create_file_node",
                "parameter": [
                    {
                        "name": "pID",
                        "class": "String",
                        "comment": "the parameter contains the DOM node"
                    }
                ],
                "return": "Object",
                "comment": "the method performs ...",
                "code": "// create a node <input type=\"file\" id=\"myloaderid\" name=\"myloader\" value=\"Dialog myloaderid\" onchange=\"vJSONEditor.loadJSON(this.id)\"/>\nvar doc = this.aDoc\nvar vInput = doc.createElement(\"input\");\nvar vAtt = {};\nvar vUniqueID = pID+this.getTimeStamp(); // has to be uniqued in the DOM\nvar att = {\n    \"type\":\"file\",\n    \"id\":vUniqueID,  \n    \"name\": pID,\n    \"value\": \"Dialog \"+pID,\n    \"onchange\":\"console.log('open dialog click '+this.id+')\"\n};\nfor (var key in att) {\n\tif (att.hasOwnProperty(key)) {\n        var vAtt = doc.createAttribute(key);\n        vAtt.nodeValue = att[key];\n\t\tvInput.setAttributeNode(vAtt)\n\t}\n};\nthis.aRootDiv.dom.appendChild(vInput); \nthis.aFileLoader[pID] = {\n    \"id\": vUniqueID, // e.g. \"loadjson9234090294\"\n    \"dom\": vInput // the element of the <input ...> tag in DOM (Document Object Model)\n};\nthis.aFileHolder.dom.appendChild(vInput);\n// return the create input tag - it is necessary to set the event handle \nreturn vInput\n  "
            },
            {
                "visibility": "public",
                "name": "create_holder",
                "parameter": [],
                "return": " ",
                "comment": "the method creates a hidden holder DIV element for the input-tags of the load file instance. The loader ID of the DIV element is stored in this.aOptions.id4loadfile",
                "code": "// this.aOptions.id4loadfile contains the ID of the DIV tag of the LoadFile holder.\n// get the LoadFile holder ID from Options that was defined in the init()-method\nvar vHolderID = \"id4loadfile\";\nif (this.aOptions.hasOwnProperty(\"id4loadfile\")) {\n    console.log(\"Create DOM.Node for id4loadfile=[\"+this.aOptions.id4loadfile+\"]\")\n};\nvar doc = this.aDoc;\nvar lf4d = doc.createElement('div');\n// create the \"id\" attribute\nvar att = doc.createAttribute(\"id\");\n// create a unique ID for the DIV element\nvar vUniqueID = vHolderID + this.getTimeStamp();\natt.nodeValue = vUniqueID;\n// append the DIV holder with the id id4loadfile\nlf4d.setAttributeNode(att);\n//DOM Node create: <div id=\"id4loadfile872934878924\"></div>  \n// append the LoadFileHolder at the document.body \ndoc.body.appendChild(lf4d);\n// store the unique ID and the DOM node in the attribute this.aLoadFileHolder\nthis.aLoadFileHolder = {\n    \"id\":vUniqueID,\n    \"dom\":lf4d\n};\nconsole.log(\"LoadFile holder created as DIV element with ID=[\"+vUniqueID+\"]\")"
            },
            {
                "visibility": "public",
                "name": "get_holder",
                "parameter": [],
                "return": "Object",
                "comment": "the method returns the LoadFile4DOM holder as DOM node. The id of the LoadFile4DOM holder is stored in this.aOptions.id4loadfile. The holder is an existing DIV node in the DOM (Document Object Model) or it will be created by the create_holder",
                "code": "  var vLoadFileHolder = null;\n  if (this.aOptions.hasOwnProperty(\"id4loadfile\")) {\n      console.log(\"CALL: get_holder(): id4loadfile=[\"+this.aOptions.id4loadfile+\"]\")\n  } else {\n      this.aOptions.id4loadfile = \"randomid4fileloader\"\n      console.log(\"CALL: get_holder():id4loadfile=[\"+this.aOptions.id4loadfile+\"] was generated\")\n  };\n  //  check if a div-node in the DOM exists with the ID\n  var vID = this.aOptions.id4loadfile;\n  //  vLoadFileHolder refers to hidden DIV-node that is used for adding the LoadFile instances.\n  var vLoadFileHolder = this.aDoc.getElementById(vID);\n  if (vLoadFileHolder) {\n      console.log(\"CALL: get_holder() DOM Node [\"+this.aOptions.id4loadfile+\"] exists!\");\n      this.aLoadFileHolder = vLoadFileHolder\n  } else {\n      console.log(\"CALL: get_holder(): DIV Node [\"+this.aOptions.id4loadfile+\"] as LoadFile4DOM holder does not exist!\");\n  };\n\n  return vLoadFileHolder"
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
                "comment": "the method performs ...",
                "code": "// get DOM id of the upload <input ...> tag with pID in this.aFileHolder\nvar fl = this.aFileLoader;\nif (fl.hasOwnProperty(pID)) {\n    console.log(\"CLICK: File Loader with iD=[\"+pID+\"] will open the file dialog of browser\")\n    var vLoaderDOM = fl[pID].dom;\n    // trigger a onclick event in the hidden Upload Button of the browser to open Load Dialog\n    vLoaderDOM.click();\n} else {\n    console.log(\"WARNING: File Loader with iD=[\"+pID+\"] is not defined\")\n}\n"
            },
            {
                "visibility": "public",
                "name": "handle_text_file",
                "parameter": [
                    {
                        "name": "pID",
                        "class": "String",
                        "comment": "the parameter stores stores the DOM id of the Loader that contains a text file"
                    },
                    {
                        "name": "pCallBack",
                        "class": "Function",
                        "comment": "the parameter stores a reference to a callback function"
                    }
                ],
                "return": " ",
                "comment": "the method performs ...",
                "code": "// insert your code here"
            }
        ]
    },
    "settings": {
        "extension4code": ".js",
        "classlist": [
            " ",
            "Array",
            "Boolean",
            "Document",
            "Float",
            "Function",
            "Hash",
            "Integer",
            "Object",
            "RegularExp",
            "String"
        ],
        "localclasslist": [],
        "remoteclasslist": [],
        "baseclasslist":  [
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
