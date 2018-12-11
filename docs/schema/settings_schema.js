vDataJSON["settings_schema"] = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": true,
    "options":{
      "disable_collapse": false,
      "disable_properties": true,
      "disable_edit_json": false
    },
    "title": "Settings UML Class Editor",
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
        "settings"
    ],
    "properties": {
        "settings": {
            "title":"Settings Editor",
            "type": "object",
            "id": "/properties/config",
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
                        "default": "",
                        "format": "text"
                    },
                    "default": [
                        "",
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
                    "id": "/properties/settings/properties/localclasslist",
                    "title": "Local List of Classes",
                    "description":"A local class is a module required from local repository. The path name defined in the 'Repository Info' is used as prefix to require those local definition of classes.",
                    "format": "table",
                    "propertyOrder": 30,
        						"options": {
                      "collapsed": true
                    },
                    "items": {
                        "type": "string",
                        "id": "/properties/settings/properties/localclasslist/items",
                        "title": "Class",
                        "default": "App",
                        "format": "text"
                    },
                    "default": [
                        "App",
                        "AppAbstract"
                    ],
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
                        "type": "string",
                        "id": "/properties/settings/properties/remoteclasslist/items",
                        "title": "Remote Class",
                        "default": "LinkParam",
                        "format": "text"
                    },
                    "default": [
                        "LinkParam",
                        "JSONEditor"
                    ],
                },
                "baseclasslist": {
                    "type": "array",
                    "id": "/properties/settings/properties/baseclasslist",
                    "title": "List of Base Classes - Watch Auto Update",
                    "format": "table",
                    "propertyOrder": 50,
        						"options": {
                      "collapsed": true
                    },
                    "description":"A base class is provide by the programming language '"+vProgLanguage+"' itself, so using these classes in a module does not imply that the special module must be required locally of from a package manager.",
                    "items": {
                        "type": "string",
                        "id": "/properties/settings/properties/baseclasslist/items",
                        "title": "Base Class List",
                        "default": "",
                        "format": "text"
                    }
                },
                "baseclasses": {
                    "type": "array",
                    "id": "/properties/settings/properties/baseclasses",
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
