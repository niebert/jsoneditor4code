vDataJSON["class_schema"] = {
    "type": "object",
    "title": "Class: MyClass",
    "headerTemplate": "Class: {{self.classname}}",
    "properties": {
        "classname": {
          "title": "Class:",
          "type": "string",
          "default": "MyClass"
        },
        "superclass": {
          "title": "Super Class",
          "$ref": "#/definitions/selectclass",
          "default": ""
        },
        "comment": {
            "title": "Comment:",
            "$ref": "#/definitions/comment",
            "default": "What does the class do?"
        },
        "attributes": {
            "title": "Attribute",
            "type": "array",
            "format": "table",
            "uniqueItems": true,
            "items": {
                "title": "Attrib",
                "type": "object",
                "uniqueItems": true,
                "headerTemplate": "{{self.name}}",
            	"format": "table",
                "properties": {
                    "visibility": {
                        "title": "Visibility",
                        "$ref": "#/definitions/visibility"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 2,
                        "default": "aMyAttrib"
                    },
                    "init": {
                        "type": "string",
                        "default": "null"
                    },
                    "class": {
                        "title": "Class",
                        "$ref": "#/definitions/selectclass"
                    },
                    "comment": {
                        "title": "Comment",
                        "$ref": "#/definitions/comment",
                        "default": "What do you stored in this attribute?"
                    }
                }
            }
        },
        "methods": {
            "title": "Methods",
            "type": "array",
            "format": "tabs",
            "uniqueItems": true,
            "items": {
                "headerTemplate": "{{self.name}}()",
                "type": "object",
                "title": "Method",
                "id": "method",
                "defaultProperties": [
                    "visibility",
                    "name",
                    "parameter",
                    "return",
                    "comment",
                    "jscode"
                ],
                "properties": {
                    "visibility": {
                        "title": "Visibility",
                        "$ref": "#/definitions/visibility"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 1,
                        "default": "myMethod"
                    },
                    "parameter": {
                        "type": "array",
                        "title": "Parameter",
                        "format": "table",
                        "uniqueItems": true,
                        "items": {
                            "title":"Param",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "title": "Parameter",
                                    "minLength": 1,
                                    "default": "pVar"
                                },
                                "class": {
                                    "title": "Class",
                                    "$ref": "#/definitions/selectclass"
                                },
                   				 "comment": {
                        			"title": "Comment",
                        			"$ref": "#/definitions/comment",
                        			"default": "What do you stored in this attribute?"
                    			}
                            }
                        }
                    },
                    "return": {
                        "title": "Return",
                        "$ref": "#/definitions/selectclass"
                    },
                    "comment": {
                        "title": "Comment",
                        "$ref": "#/definitions/comment",
                        "default": "What kind of process does this method perform?"
                    },
                    "jscode": {
                        "title": "Code",
                        "type": "string",
                        "format": "javascript"
                    }
                }
            }
        }
    },
    "definitions": {
        "selectclass": {
            "type": "string",
            "enum": [
                "",
                "App ",
                "AppAbstract ",
                "Array",
                "Boolean",
                "CheckBoxList ",
                "DOMVar ",
                "DOMVarList ",
                "Database ",
                "DatabaseList ",
                "Document",
                "Editor4JSON ",
                "Float",
                "Function",
                "FuzzyController ",
                "FuzzyLayer ",
                "Hash",
                "Integer",
                "LinkParam ",
                "Object",
                "ParserHTML ",
                "RegularExp",
                "Server ",
                "String",
                "WrapJSON "
            ]
        },
        "comment": {
            "title": "Comment:",
            "type": "string",
            "format": "textarea"
        },
        "visibility": {
            "type": "string",
            "enum": [
                "public",
                "private"
            ]
        }
    }
}
