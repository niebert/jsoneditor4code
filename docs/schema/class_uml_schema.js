vDataJSON["class_schema"] = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": true,
    "options":{
      "disable_collapse": false,
      "disable_properties": true,
      "disable_edit_json": false
    },
    "title": "Unified Modelling Language - UML",
    "definitions": {
      "comment": {
          "title": "Comment:",
          "type": "string",
          "format": "textarea",
          "default": ""
      },
      "visibility": {
          "title": "Visibility",
          "type": "string",
          "enum": [
              "public",
              "private"
          ],
          "default":"public"
      },
      "yesno":{
        "default": "yes",
        "type": "string",
        "enum": [
            "yes",
            "no"
        ]
      },
      "selectorclass": {
        "type": "string",
        "default": "",
        "enum":[
           "",
           "Array",
           "Boolean",
           "Float",
           "Function",
           "Hash",
           "Integer",
           "Object",
           "RegularExp",
           "String",
           "App",
           "AppAbstract",
           "Document",
           "LinkParam",
           "JSONEditor"
        ]
      }

    },
    "type": "object",
    "id": "https://niebert.github.io/json-editor",
    "defaultProperties": [
        "data",
        "settings"
    ],
    "properties": {
        "data": {
            "title":"JSON Data",
            "type": "object",
            "headerTemplate": "Class: {{self.classname}}",
            "id": "/properties/data",
            "options": {
              "collapsed": false,
              "disable_properties": true
            },
            "defaultProperties": [
                "classname",
                "superclassname",
                "comment",
                "reposinfo",
                "attributes",
                "methods"
            ],
            "properties": {
                "classname": {
                    "type": "string",
                    "id": "/properties/data/properties/classname",
                    "title": "Class:",
                    "default": "NewClass",
                    "format": "text",
                    "description": "Use a classname with uppercase first character e.g. 'Myclass' or 'MyClass' and not 'myclass'."
                },
                "superclassname": {
                    "type": "string",
                    "id": "/properties/data/properties/superclassname",
                    "title": "Super Class",
                    "default": "",
                    "$ref": "#/definitions/selectorclass"
                },
                "comment": {
                    "type": "string",
                    "id": "/properties/data/properties/comment",
                    "title": "Description of Class",
                    "description": "Describe the main application of this class for the software development. This description will be used to generate a documentation of the UML definition.",
                    "$ref": "#/definitions/comment"
                },
                "reposinfo": {
                    "type": "object",
                    "title": "Repository Info",
                    "id": "/properties/data/properties/reposinfo",
                    "options": {
                      "collapsed": true,
                      "disable_properties": true
                    },
                    "defaultProperties": [
                        "JSCC_type",
                        "JSCC_version",
                        "repository",
                        "static",
                        "require_classes",
                        "author",
                        "email",
                        "created",
                        "modified",
                        "requirelist"
                    ],
                    "properties": {
                        "JSCC_type": {
                          "type": "string",
                          "id": "/properties/data/properties/reposinfo/properties/JSCC_type",
                          "title": "JSCC Type",
                          "options": {
                            "hidden": true
                          },
                          "default": "CLASS",
                          "format": "text",
                          "description": "Hidden JSON attribute to handle with JavascriptClassCreator JSCC as CLASS - allows integration into UML based Software Development Framework"
                        },
                        "JSCC_version": {
                          "type": "string",
                          "id": "/properties/data/properties/reposinfo/properties/JSCC_type",
                          "title": "JSCC Version",
                          "options": {
                            "hidden": true
                          },
                          "default": "2",
                          "format": "text",
                          "description": "Hidden JSON attribute to handle the version of JSON with JavascriptClassCreator JSCC as CLASS - allows integration into UML based Software Development Framework"
                        },
                        "repository": {
                            "type": "string",
                            "id": "/properties/data/properties/reposinfo/properties/repository",
                            "title": "URL Repository",
                            "default": "https://www.github.com/author/NewClass",
                            "format": "text",
                            "description": "Enter e.g. the Link to your GitHub repository."
                        },
                        "require_classes": {
                            "type": "string",
                            "id": "/properties/data/properties/reposinfo/properties/require_classes",
                            "$ref": "#/definitions/yesno",
                            "title": "Require Classes NPM:",
                            "description": "Set to 'Yes' if you want to insert the require commands for used classes in the generated code and add a 'module.exports' at the end of the generated code"
                        },
                        "static": {
                            "type": "string",
                            "id": "/properties/data/properties/reposinfo/properties/static",
                            "$ref": "#/definitions/yesno",
                            "title": "Static Class:",
                            "default": "no",
                            "description": "If set to 'Yes' the generated class will be an Object (hash) with attributes and assigned functions. You do not need to instantiate a class with new MyClass()"
                        },
                        "requirelist": {
                            "title":"Require List",
                            "type": "array",
                            "id": "/properties/data/properties/reposinfo/properties/requirelist",
                            "format": "table",
                            "description": "Add required modules for the definition of the class. This creates a require('modulename') in the generated code.",
                            "options": {
                              "collapsed": true
                            },
                            "items": {
                              "type": "object",
                              "id": "/properties/requirelist/items",
                              "defaultProperties": [
                                  "module",
                                  "variable"
                              ],
                              "properties": {
                                "variable": {
                                    "type": "string",
                                    "id": "/properties/requirelist/items/properties/variable",
                                    "title": "Variable",
                                    "default": "Handlebars",
                                    "format": "text"
                                },
                                "module": {
                                      "type": "string",
                                      "id": "/properties/requirelist/items/properties/module",
                                      "title": "Require Module",
                                      "default": "handlebars",
                                      "format": "text"
                                  }
                              }
                          }
                        },
                        "author": {
                            "type": "string",
                            "id": "/properties/data/properties/reposinfo/properties/author",
                            "title": "Author of Class",
                            "default": "My Name",
                            "format": "text"
                        },
                        "email": {
                            "type": "string",
                            "id": "/properties/data/properties/reposinfo/properties/email",
                            "title": "e-Mail:",
                            "default": "name@example.com",
                            "format": "text"
                        },
                        "created": {
                            "title": "Created:",
                            "type": "string",
                            "default": getDate(),
                            "id": "/properties/data/properties/reposinfo/properties/created",
                            "format": "text"
                        },
                        "modified": {
                            "title": "Modified:",
                            "type": "string",
                            "default": getDate(),
                            "id": "/properties/data/properties/reposinfo/properties/modified",
                            "format": "text"
                        }
                    }
                },
                "attributes": {
                    "title": "Attribute",
                    "type": "array",
                    "format": "table",
                    "uniqueItems": true,
                    "id": "/properties/data/properties/attributes",
                    "options": {
                      "collapsed": false
                    },
                    "items": {
                        "title": "Attrib",
                        "type": "object",
                        "id": "/properties/data/properties/attributes/items",
                        "headerTemplate": "{{self.name}}",
                        "format": "table",
                        "defaultProperties": [
                            "visibility",
                            "name",
                            "init",
                            "class",
                            "comment"
                        ],
                        "properties": {
                            "visibility": {
                                "type": "string",
                                "id": "/properties/data/properties/attributes/items/properties/visibility",
                                "$ref": "#/definitions/visibility"
                            },
                            "name": {
                                "type": "string",
                                "id": "/properties/data/properties/attributes/items/properties/name",
                                "title": "Name",
                                "default": "aMyAttrib",
                                "format": "text"
                            },
                            "init": {
                                "type": "string",
                                "id": "/properties/data/properties/attributes/items/properties/init",
                                "title": "Init",
                                "default": "",
                                "format": "text"
                            },
                            "class": {
                                "id": "/properties/data/properties/attributes/items/properties/class",
                                "title": "Class",
                                "$ref": "#/definitions/selectorclass"
                            },
                            "comment": {
                                "type": "string",
                                "id": "/properties/data/properties/attributes/items/properties/comment",
                                "title": "Comment",
                                "$ref": "#/definitions/comment",
                                "default": "This attribute stores ...",
                                "format": "text",
                            }
                        }
                    }
                },
                "methods": {
                    "type": "array",
                    "title":"Methods",
                    "id": "/properties/data/properties/methods",
                    "format": "tabs",
                    "uniqueItems": true,
                    "options": {
                      "collapsed": false
                    },
                    "items": {
                        "type": "object",
                        "title": "Method",
                        "headerTemplate": "{{self.name}}()",
                        "id": "/properties/data/properties/methods/items",
                        "defaultProperties": [
                            "visibility",
                            "name",
                            "parameter",
                            "return",
                            "comment",
                            "code"
                        ],
                        "properties": {
                            "visibility": {
                                "type": "string",
                                "id": "/properties/data/properties/methods/items/properties/visibility",
                                "title": "Visibility",
                                "propertyOrder": 10,
                    						"$ref": "#/definitions/visibility"
                            },
                            "name": {
                                "type": "string",
                                "id": "/properties/data/properties/methods/items/properties/name",
                                "title": "Method Name",
                                "default": "myMethod",
                                "propertyOrder": 20,
                    						"format": "text"
                            },
                            "parameter": {
                                "title": "Parameter",
                                "type": "array",
                                "id": "/properties/data/properties/methods/items/properties/parameter",
                                //"format": "tabs",
                                "format": "table",
                                "propertyOrder": 30,
                    						"uniqueItems": true,
                                "options": {
                                  "collapsed": true
                                },
                                "items": {
                                    "title":"Param",
                                    "type": "object",
                                    "id": "/properties/data/properties/methods/items/properties/parameter/items",
                                    "defaultProperties": [
                                        "name",
                                        "class",
                                        "comment"
                                    ],
                                    "properties": {
                                        "name": {
                                            "type": "string",
                                            "id": "/properties/data/properties/methods/items/properties/parameter/items/properties/name",
                                            "title": "Parameter",
                                            "default": "pVar",
                                            "minLength": 1,
                                            "propertyOrder": 10,
                                						"format": "text"
                                        },
                                        "class": {
                                            "type": "string",
                                            "id": "/properties/data/properties/methods/items/properties/parameter/items/properties/class",
                                            "title": "Class",
                                            "propertyOrder": 20,
                                						"$ref": "#/definitions/selectorclass"
                                        },
                                        "comment": {
                                            "type": "string",
                                            "id": "/properties/data/properties/methods/items/properties/parameter/items/properties/comment",
                                            "$ref": "#/definitions/comment",
                                            "propertyOrder": 30,
                                						"default": "the parameter stores ..."
                                            //"format": "text"
                                        }
                                    }
                                }
                            },
                            "return": {
                                "type": "string",
                                "id": "/properties/data/properties/methods/items/properties/return",
                                "title": "Return",
                                "propertyOrder": 40,
                    						"$ref": "#/definitions/selectorclass"
                            },
                            "code": {
                                "type": "string",
                                "id": "/properties/data/properties/methods/items/properties/code",
                                "title": "Code - Language: '"+vProgLanguage+"'",
                                "default": "// insert your code here",
                                "propertyOrder": 50,
                    						"format": vProgLanguage
                            },
                            "comment": {
                                "type": "string",
                                "id": "/properties/data/properties/methods/items/properties/comment",
                                "title":"Comment",
                                "format":"textarea",
                                "$ref": "#/definitions/comment",
                                "default": "the method performs ...",
                                "propertyOrder": 60,
                    						"description": "Describe the purpose of the method. This description will be used to generate a documentation of the UML definition."
                            }

                        }
                    }
                }
            }
        },
        "settings": {
            "title":"Settings Editor",
            "type": "object",
            "id": "/properties/settings",
            "options": {
              "collapsed": true
            },
            "defaultProperties": [
                "extension4code",
                "classlist",
                "localclasslist",
                "remoteclasslist",
                "baseclasslist",
                "baseclasses"
            ],
            "properties": {
              "extension4code": {
                "type": "string",
                "id": "/properties/settings/properties/extension4code",
                "title": "Extension for Generated Code:",
                "default": ".js",
                "format": "text",
                "propertyOrder": 10,
                "size":12,
                "description": "When ClassEditorUML generates code, it stores a generated file in the programming language '"+vProgLanguage+"' with this file extension"
              },
              "extension4json": {
                "type": "string",
                "id": "/properties/settings/properties/extension4json",
                "title": "Extension for saved JSON:",
                "default": ".json",
                "format": "text",
                "propertyOrder": 10,
                "size":12,
                "description": "JSON Editor stores a JSON file with this file extension"
              },
              "classlist": {
                    "type": "array",
                    //"id": "/properties/settings/properties/classlist",
                    "title": "Select List of Classes",
                    "format": "table",
                    "propertyOrder": 20,
        						"options": {
                      "collapsed": true,
                      "hidden": true
                    },
                    "items": {
                        "type": "string",
                        "id": "/properties/settings/properties/classlist/items",
                        "title": "Class",
                        "default": " ",
                        "format": "text"
                    },
                    "default": [
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
                },
                "localclasslist": {
                    "type": "array",
                    //"id": "/properties/settings/properties/localclasslist",
                    "title": "Local List of Classes",
                    "description":"A local class is a module that is required and implemented on your local filesystem (and NOT installed from a remote repository via NPM). The pathname prefix is defined in 'Repository Info'. The prefix is concatenated for all local modules that are listed in  Local Classes.",
                    "format": "table",
                    "propertyOrder": 30,
        						"options": {
                      "collapsed": true
                    },
                    "items": {
                        "type": "object",
                        "id": "/properties/settings/properties/localclasslist/items",
                        "title": "Local Class",
                        "headerTemplate": "{{self.name}}()",
                        "defaultProperties": [
                            "name",
                            "initvalue",
                            "repo"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "id": "/properties/settings/properties/localclasslist/items/properties/name",
                                "title": "Base Class Name",
                                "default": "",
                                "propertyOrder": 10,
                                "format": "text"
                            },
                            "initvalue": {
                                "type": "string",
                                "id": "/properties/settings/properties/localclasslist/items/properties/initvalue",
                                "title": "Init Value",
                                "default": "",
                                "propertyOrder": 20,
                                "format": "text"
                            },
                            "repo": {
                                "type": "string",
                                "id": "/properties/settings/properties/baseclasses/items/properties/repo",
                                "title": "Module Name (repo)",
                                "default": "",
                                "propertyOrder": 20,
                                "format": "text"
                            }
                        }
                    }
                },
                "remoteclasslist": {
                    "type": "array",
                    "id": "/properties/settings/properties/remoteclasslist",
                    "title": "Remote List of Classes",
                    "format": "table",
                    "propertyOrder": 40,
        						"options": {
                      "collapsed": true
                    },
                    "description":"A remote class is a module required from a package manager like NPM.",
                    "items": {
                        "type": "object",
                        "id": "/properties/settings/properties/remoteclasslist/items",
                        "title": "Base Class",
                        "headerTemplate": "{{self.name}}()",
                        "defaultProperties": [
                            "name",
                            "initvalue",
                            "repo"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "id": "/properties/settings/properties/remoteclasslist/items/properties/name",
                                "title": "Base Class Name",
                                "default": "",
                                "propertyOrder": 10,
                    						"format": "text"
                            },
                            "initvalue": {
                                "type": "string",
                                "id": "/properties/settings/properties/remoteclasslist/items/properties/initvalue",
                                "title": "Init Value",
                                "default": "",
                                "propertyOrder": 20,
                                "format": "text"
                            },
                            "repo": {
                                "type": "string",
                                "id": "/properties/settings/properties/baseclasses/items/properties/repo",
                                "title": "Module Name (repo)",
                                "default": "",
                                "propertyOrder": 20,
                                "format": "text"
                            }
                        }
                    }
                },
                "baseclasslist": {
                    "type": "array",
                    "id": "/properties/settings/properties/baseclasslist",
                    "title": "List of Base Classes",
                    "format": "table",
                    "propertyOrder": 60,
        						"options": {
                      "collapsed": true
                    },
                    "description":"A base class is provide by the programming language '"+vProgLanguage+"' itself, so using these classes in a module does not imply that the special module must be required locally of from a package manager.",
                    "items": {
                        "type": "object",
                        "id": "/properties/settings/properties/baseclasses/items",
                        "title": "Base Class",
                        "headerTemplate": "{{self.name}}()",
                        "defaultProperties": [
                            "name",
                            "initvalue"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "id": "/properties/settings/properties/baseclasses/items/properties/name",
                                "title": "Base Class Name",
                                "default": "",
                                "propertyOrder": 10,
                    						"format": "text"
                            },
                            "initvalue": {
                                "type": "string",
                                "id": "/properties/settings/properties/baseclasses/items/properties/initvalue",
                                "title": "Init Value",
                                "default": "",
                                "propertyOrder": 20,
                                "format": "text"
                            }
                        }
                    }
                }
            }
        }
    }
}
