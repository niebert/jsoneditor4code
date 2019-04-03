vDataJSON.uml_default = {
    "data":{
      "classname": "MyClass",
      "superclassname": "",
      "comment": "",
      "reposinfo": {
          "repository": "",
          "require_classes": "yes",
          "static": "no",
          "author": "",
          "email": "",
          "created": getDateTime(),
          "modified": getDateTime(),
          "debugheader": "no",
          "requirelist": []
      },
      "attributes": [],
      "methods": []
    },
    "settings":{
       "umleditor": "https://niebert.github.io/ClassEditorUML",
       "extension4code":".js",
      "extension4json":"_uml.json",
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
