# JSONEditor4Code
`JSONEditor4Code` is a JSON Editor for UML Diagrams developed with Javascript Code Templates based on JSON Editor of Jeremy Dorn

<!-- BEGIN: src/readme/headerinto.md -->
The following table of contents is generated with `node doctoc README.md`.
<!-- END:   src/readme/headerinto.md -->
<hr>
<h2>Table of Contents</h2>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Start WebApp `JSONEditor4Code`](#start-webapp-jsoneditor4code)
- [Installation `JSONEditor4Code`](#installation-jsoneditor4code)
  - [Installation for Browsers](#installation-for-browsers)
  - [Init the JSON Editor](#init-the-json-editor)
- [Folder and Files in `docs/`](#folder-and-files-in-docs)
- [Files, Folders and Structure of Repository](#files-folders-and-structure-of-repository)
- [Quick Start for Users of JSONEditor4Code](#quick-start-for-users-of-jsoneditor4code)
- [Templates for Handlebars4Code](#templates-for-handlebars4code)
- [vDataJSON as Template Storage](#vdatajson-as-template-storage)
- [Templates and JSON into vDataJSON](#templates-and-json-into-vdatajson)
  - [Load JSON Data with Script Tag](#load-json-data-with-script-tag)
  - [Load Templates with Script Tag](#load-templates-with-script-tag)
- [Script Tag for handlebars4code.js](#script-tag-for-handlebars4codejs)
- [Additional Handlebars Helpers for Code generation](#additional-handlebars-helpers-for-code-generation)
  - [List of Helpers in Handlebars4Code](#list-of-helpers-in-handlebars4code)
  - [Helper: `filename`](#helper-filename)
    - [Template 1: `filename`](#template-1-filename)
    - [JSON Data 1: `filename`](#json-data-1-filename)
    - [Compiler Output 1: `filename`](#compiler-output-1-filename)
    - [JSON Data 2: `filename`](#json-data-2-filename)
    - [Template 2: `filename`](#template-2-filename)
    - [Compiler Output 2: `filename`](#compiler-output-2-filename)
  - [Helper: `ifcond`](#helper-ifcond)
    - [Template: `ifcond`](#template-ifcond)
    - [JSON Data: `ifcond`](#json-data-ifcond)
    - [Compiler Output: `ifcond`](#compiler-output-ifcond)
  - [Helper: `require_class_list`](#helper-require_class_list)
    - [Template: `require_class_list`](#template-require_class_list)
    - [JSON Data: `require_class_list`](#json-data-require_class_list)
    - [Compiler Output: `require_class_list`](#compiler-output-require_class_list)
  - [Helper: `requirelibs`](#helper-requirelibs)
    - [Template: `requirelibs`](#template-requirelibs)
    - [JSON Data: `requirelibs`](#json-data-requirelibs)
    - [Compiler Output: `requirelibs`](#compiler-output-requirelibs)
  - [Helper: `foreach`](#helper-foreach)
    - [Template: `foreach`](#template-foreach)
    - [Parameter of Helper:  `foreach`](#parameter-of-helper--foreach)
    - [JSON Data: `foreach`](#json-data-foreach)
    - [Compiler Output: `foreach`](#compiler-output-foreach)
  - [Helper: `paramcall`](#helper-paramcall)
    - [Template: `paramcall`](#template-paramcall)
    - [JSON Data: `paramcall`](#json-data-paramcall)
    - [Compiler Output: `paramcall`](#compiler-output-paramcall)
  - [Helper: `parameterlist`](#helper-parameterlist)
    - [Template: `parameterlist`](#template-parameterlist)
    - [JSON Data: `parameterlist`](#json-data-parameterlist)
    - [Compiler Output: `parameterlist`](#compiler-output-parameterlist)
  - [Helper: `indent`](#helper-indent)
    - [Template: `indent`](#template-indent)
    - [JSON Data: `indent`](#json-data-indent)
    - [Compiler Output: `indent`](#compiler-output-indent)
- [Build Process of `npm run build`](#build-process-of-npm-run-build)
  - [Define Filename for build in `package.json`](#define-filename-for-build-in-packagejson)
  - [Compress after Build](#compress-after-build)
- [Build and Compress with Browserify, Watchify, UglifyJS](#build-and-compress-with-browserify-watchify-uglifyjs)
  - [Browserify and Watchify](#browserify-and-watchify)
  - [Global Installation of Browserify, Watchify, UglifyJS and DocToc](#global-installation-of-browserify-watchify-uglifyjs-and-doctoc)
  - [Package Installation of Browserify and Watchify - Alternative](#package-installation-of-browserify-and-watchify---alternative)
  - [Start Watching the Files with Watchify](#start-watching-the-files-with-watchify)
  - [Source JS file and development bundle output](#source-js-file-and-development-bundle-output)
- [Acknowledgement](#acknowledgement)
- [Libraries required for  `JSONEditor4Code`](#libraries-required-for--jsoneditor4code)
- [Libraries for Building and Developement](#libraries-for-building-and-developement)
- [NPM Library Information](#npm-library-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Start WebApp `JSONEditor4Code`
* [`JSONEditor4Code`](https://niebert.github.io/jsoneditor4code/index.html) 

## Installation `JSONEditor4Code`
The library was designed to used in a browser (WebApp). So use the installation for your browser by using a bundle `dist/jsoneditor4code.js`  - see example [`Demo JSONEditor4Code`](https://niebert.github.io/jsoneditor4code/index.html) .

### Installation for Browsers
If you want to use the library `jsoneditor4code.js` in a browser, please copy the file `dist/jsoneditor4code.js` into your library folder of WebApp that you want to test with a browser (e.g. `js/jsoneditor4code.js`). If you want expand existing examples check the basic example in `docs/index.html` first and play around with that HTML-file. If you want to import the library with `script`-tag do it in the standard way with:
```html
<script src="js/jsoneditor4code.js"></script>
```
Now it is possible to use the constructor of `JSONEditor4Code`
```javascript
if (JSONEditor4Code) {
  var vJSONEditor = new JSONEditor4Code();
  vJSONEditor.initDoc(document);
}
```
Now we define a hash that contains the options for the `init()`-call.
```javascript
var pOptions = {
        "editor_var": "vJSONEditor", // Variable in index.html that stores the JSONeditor
        "editor_id": "editor_holder", // ID of DOM element, that stores the editor.
        "validator_id":"valid_indicator",  // ID of DOM, that contains the validator result "valid" or "not valid"
        "filejson_id" : "fileJSON", // ID of DOM element that contains the JSON file upload
        "filename_id" : "display_filename", // innerHTML for DOM element to display the loaded filename
        "filename_key" : "data.classname",  // key that stores the basename for the filename
        "out_json": "tOutJSON", // ID of textarea to visualise the generated JSON
        "out_code": "tOutput", // ID of textarea to visualise the generated code/markdown with the templates in docs/tpl
        "out_errors": "tErrors" // ID of textarea that shows the errors in the loaded JSON
};

```
After the `initDoc()` call the `JSONEditor4Code` is aware about the `document` in the browser.

### Init the JSON Editor
The init method of the JSON Editor gets as parameter the follow JavaScript objects:
* `pJSON` is JSON data with which the JSON Editor is populated,
* `pDefaultJSON` is the JSON data which is used, when the JSON Editor is resetted,
* `pSchema` is JSON Schema which defines the input elements of JSON Editor `JSONEditor4Code`
* `vDataJSON.tpl` is a hash of string templates for [`Handlebars4Code`](https://github.com/niebert/Handlebars4Code). `vDataJSON.tpl` is  hash with defined template strings. With the template ID the [`Handlebars4Code`](https://github.com/niebert/Handlebars4Code) template engine uses this template for code generation.
* `pOption` are options for the JSON Editor.

```javascript
vJSONEditor.init(vJSON,
  vDefaultJSON,
  vDataJSON["class_schema"],
  vDataJSON.tpl,
  vOptions);
```

`vDataJSON` is a JSON container for all the loaded data. Templates are loaded with `script`-tags (see `docs/index.html`):

```html
<script src="tpl/javascript_tpl.js"></script>
<!-- ### COMPILE HANDLEBARS TEMPLATES  ############
Template ID: "docu4github"
Template: vDataJSON["tpl"]["docu4github"]
-->
<script src="tpl/docu4github_tpl.js"></script>
<!-- ### SCHEMA LOADER ############################
script tag stores the JSON schema in
vDataJSON.tpl.["class_schema"]
<script src="schema/class_uml_schema.js"></script>
-->
<script src="schema/class_uml_schema.js"></script>
```
<!-- src/readme/folderdocs.md -->
## Folder and Files in `docs/`
The folder `docs/` contains all files for the web demo of this repository, that can be accessed to the `https://___PKG_GITHUBUSER___.github.io/JSONEditor4Code`.


## Files, Folders and Structure of Repository
The following enumeration explains the structure of the repository and folders.
* `dist/` folder contains the generated libraries by the command `npm run build`.
* `docs/` folder contains all the web content that you can access via `github.io` defined in the settings of the GitHub repository as server root for the demo.
  * `docs/ace` folder contains files for the editor ACE, that is used in JSON-Editor to edit source code.
  * `docs/db` folder contains JSON database which initializes the JSON-Editor with the default JSON data. If the user saves the file, the current JSON data is stored in the LocalStorage of the browser.
  * `docs/css` folder contains all style sheet for the webbased demo in `docs`.
  * `docs/fonts` folder contains the fonts for the FontAwesome.
  * `docs/jquery` folder contains the JQuery implementation so that a webbased demo runs offline.
  * `docs/js` folder contains all Javascript libraries used for the webbased demo.
  * `docs/schema` folder contains JSON schema for the webbased demo created [JSON2schema](https://niebert.github.io/JSON2Schema), defining the input user interface for editing the JSON file
  * `docs/tpl` folder contains the HandleBars template generating the source code from the [UML definition](https://en.wikipedia.org/wiki/Unified_Modeling_Language).
  * `docs/index.html` files starts the webbased demo.
* `jscc/` folder contains the [JavascriptClassCreator](https://niebert.github.io/JavascriptClassCreator) files that are used to create object-oriented Javascript class files.  
* `src/` folder contains the file `main.js` for NPM defined in `package.json` and other source files in the future, to create a the library for webbased use in a browser can be found in the folder `dist/`. The files in `dist/` are created with `browsersify` and/or  `watchify`.
* `update_src_libs.sh` is a shell script that works on Linux and MacOSX to perform some library updates from the web and the `update_src_libs.sh` can be used to initialize a new repository with the basic WebApp structure as an privacy friendly [AppLSAC](https://en.wikiversity.org/wiki/AppLSAC).
<!-- BEGIN: src/readme/usage.md -->

## Quick Start for Users of JSONEditor4Code

Just download the [ZIP-file of the JSONEditor4Code repository](https://github.com/niebert/jsoneditor4code/archive/master.zip). For using the [AppLSAC](https://en.wikiversity.org/wiki/WebApps_with_LocalStorage_and_AppCache) unzip the file
and navigate to the `docs/`-folder and load the
`docs/index.html` in your browser as privacy-friendly [AppLSAC-2](https://en.wikiversity.org/wiki/WebApps_with_LocalStorage_and_AppCache/Types_of_AppLSAC).
All files, that are equired  for the AppLSAC to run are stored in the docs folder. Only if you are planing the change the source code of the AppLSAC `JSONEditor4Code` you need the other folders.

If you just want to use `JSONEditor4Code` in your browser it is recommended to
* copy just the `docs/`-folder,
* rename the folder to `jsoneditor4code/` and
* start `index.html` with your browser as [AppLSAC-2](https://en.wikiversity.org/wiki/WebApps_with_LocalStorage_and_AppCache/Types_of_AppLSAC).


<!-- END:   src/readme/usage.md -->
<!-- BEGIN: src/readme/handlebars4code.md -->

## Templates for Handlebars4Code
In the `Handlebars4Code` demo the JSON data is stored in `vDataJSON`, which is the main JSON data storage defined in `index.html`. Data (`docs/db/`) and templates (`docs/tpl/`) are loaded into the JSON. All templates reside in `vDataJSON.tpl`, which is provided as parameter to `Handlebars4Code.create_compiler(vDataJSON.tpl)`. The method `create_compiler(vDataJSON.tpl)` creates Handlebars compilers for all templates in `vDataJSON.tpl`.  
* `create_compiler(vTplHash)` expects a hash, for which the template ID is the key for accessing template (e.g. `vDataJSON.tpl["docu4github"])` or `vDataJSON.tpl["javascript"])` (see directory `docs/tpl/`).
* The compilers need to be generated only once. Then the compiler for all templates are ready to process JSON data and generate output according to the template definition.
* `var my_compilers = Handlebars4Code.get_compiler()` stores the generated Handlebars compilers in an individual compiler hash. `var my_output = my_compilers.javascript(vJSON)` provides JSON to the compiler function for the template `javascript`. `var my_output = my_compilers.docu4github(vJSON)` provides JSON to the compiler function for the template `docu4github`.

## vDataJSON as Template Storage
Create a template storage in your main HTML file.
```html
<script language="javascript">
  var vDataJSON = {};
  vDataJSON.tpl = {};
  vDataJSON.out = {};
</script>
```
`vDataJSON.out` contain the compilers, that are generated by `Handelbars4Code`. Each compiler in `vDataJSON.out` have are corresponding template in `vDataJSON.tpl`. `vDataJSON.tpl` is  hash of strings for each ID and `vDataJSON.out` is hash of functions with the corresponding ID. The following code generates the compiler with `HandleBars4Code`.

```javascript
Handlebars4Code.create_compiler(vDataJSON.tpl);
vDataJSON.out = Handlebars4Code.get_compiler();
```
Assume you have a template with the ID `mytpl` you will get a compiler function in `vDataJSON.out.mytpl()` that you can populate with JSON data. The call of `vDataJSON.out.mytpl(pMyData)` will replace the JSON data `pMyData` in the template `mytpl`.


## Templates and JSON into vDataJSON
The javascript files in `docs/tpl/` and `docs/db/` are designed in way that allows the population of `vDataJSON` just by including a script tag in the underlying HTML file (see example `docs/index.html`).

### Load JSON Data with Script Tag
The following script tag loads the JSON data into `vDataJSON`.
```html
<script src="db/umljs.js"></script>
```
The data is stored in the following way in the JavaScript file:
```javascript
vDataJSON["umljs"]= {
  "author": "Bert Niehaus",
  "description": "My description for repository."
}
```
It is recommended to use the same ID in `vDataJSON` as the basename of the corresponding JavaScript file `db/umljs.js` without path `db/` and extension `.js`.

### Load Templates with Script Tag
Every script tag loads a single template from the subdirectory `docs/js/`:
```html
<script src="tpl/javascript_tpl.js"></script>
<script src="tpl/docu4github_tpl.js"></script>
```

## Script Tag for handlebars4code.js
Use the script tag to embed the Handlebars4Code library in your HTML file::

```html
<script src="js/handlebars4code.js"></script>
```

## Additional Handlebars Helpers for Code generation
The following Handlebars helpers are added to the basic Handlebars features, to support better code generation. Generated code can be in any programming language (of course including markup or markdown languages):

### List of Helpers in Handlebars4Code
* `filename` create lower case filenames from camel-case class names (e.g. `MyClass` into `myclass`).
* `ifcond` creates id-conditions in the Handlebars template to create JSON context dependent compiler output.
* `require_class_list` inserts `require` commands according the used classes in the attributes and return values of the methods. It requires only modules that are not base classes that are provided by the programming language itself.
* `requirelibs` The helper is designed to generate local and remote require commands in a class/module.
* `foreach` is slighty different from the standard `each` helper in Handlebars. It allows to assign parent `data` hash to `foreach` context of the template

### Helper: `filename`
The helper function `filename` generates from any input string a usable filename in lowercase that contains no blanks an no special characters.

#### Template 1: `filename`
Assume we have the following templates stored `vDataJSON.tpl["mytpl1"]` with
```javascript
// The filename of the class {{data.classname}} is {{filename data.classname}}.js
```
The template ID `mytpl1` is

#### JSON Data 1: `filename`
The following JSON
```javascript
var my_json = {
  "data":{
    "classname" : "MyClass"
  }
}
```

#### Compiler Output 1: `filename`
The compiler call `Handlebars4Code.compile.mytpl1(my_json)` for the JSON data `my_json` and the template generates the following code

```javascript
// The filename of the class MyClass is myclass.js
```
#### JSON Data 2: `filename`
The following JSON
```javascript
var my_json = {
  "data":{
    "classname" : "MyClass",
    "superclassname" : "MySuperClass"
  }
}
```

#### Template 2: `filename`
Assume we have templates `vDataJSON.tpl["mytpl2"]` with:
```javascript
const {{data.superclassname}} = require('{{filename data.superclassname}}');

```

#### Compiler Output 2: `filename`
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:

```javascript
const MySuperClass = require('mysuperclass');

```
If the input string contains blanks then these blanks are replaced by an underscore.


### Helper: `ifcond`

`If` condition and application of JSON path to specific attribute to JSON. The following template generates a header as comment for the javascript output. Dependent on the value of `data.superclassname` (string not empty) an additional name for the superclass is inserted in the header of generated output of code (see [Blog in StackOverflow](https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional))

#### Template: `ifcond`
Assume we have the following templates is stored `vDataJSON.tpl["mytpl"]` with
```javascript
//#################################################################
//# Javascript Class: {{data.classname}}()
{{#ifcond data.superclassname "!=" ""}}
//#       SuperClass: {{data.superclassname}}
{{/ifcond}}
//#
//# Author of Class:      {{data.reposinfo.author}}
//# email:                {{data.reposinfo.email}}
//#################################################################
```
The `ifcond` is an if-condition, that inserts a line with name of the super class if the `superclassname` is not empty.

#### JSON Data: `ifcond`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
      "comment": "Description of the class",
      "reposinfo": {
        "repository": "https://www.github.com/author/NewClass",
        "author": "My Name",
        "email": "name@example.com",
      },
    }
  };
```
The `superclassname` is not empty and has the value `"MySuperClass"`. The `ifcond` used in the template will insert a line by the use of an  if-condition.

#### Compiler Output: `ifcond`
The compiler call for the JSON data and the template generates the following code:

```javascript
//#################################################################
//# Javascript Class: NewClass()
//#       SuperClass: MySuperClass
//#
//# Author of Class:      My Name
//# email:                name@example.com
//#################################################################
```
The compiled result contains a comment about the super class, due to the fact that the attribute `superclassname` is not empty and contains the value `"MySuperClass"`.

### Helper: `require_class_list`
The helper function creates a list of liberaries that must be required/imported (e.g. Javascript) so that the defined libary for the new class can used the required resources in other modules. Some classes/instances are already defined by the programming language (e.g. `Math`, `JSON` in Javascript). Those libraries do not need a require command. The code generator should know about
* base classes  (`baseclasslist`) - no need to create require
* local classes  (`localclasslist`) - store in local directory, a path is necessary to these locally defined libraries (see `data.reposinfo.require_path`).
* remote classes  (`remoteclasslist`) - retrieved from a remote server via a package manager.


#### Template: `require_class_list`
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with
```javascript
{{{require_class_list data settings}}}
```
The helper needs the `data` and the `settings` attribute of the JSON input as parameter:
* `data` contains all the defined elements of the class.
* `settings` contain basic definitions for the classes that are available in the software development project.
* `data.superclassname` because a superclass will be handled with a separate `require` command.
* `settings.baseclasses` because those classes are provided by the programming language by default and they do not need a require command.
* `settings.localclasses` because those classes are created within the software developement of the repository and these modules need a special require command with a local pathname, where to to find the libraries, e.g. `require('./libs/mylocallib')`.
* `data.reposinfor.require_path` contain the local path to the libraries/modules of `localclasses`  `./libs/`.
* `settings.remoteclasses` remote classes are download with a package manager and these modules are required just by the module name, e.g. `require('mylocallib')`.

#### JSON Data: `require_class_list`
The following JSON
```json
var my_json = {
  "data": {
    "classname": "NewClass",
    "superclassname": "MySuperClass"
  },
  "settings": {
    "extension4code":".js",
    "localclasslist": [
      "App",
      "AppAbstract"
    ],
    "remoteclasslist": [
      "LinkParam",
      "JSONEditor"
    ],
    "baseclasslist": [
      "",
      "Array",
      "Boolean",
      "Float",
      "Function",
      "Hash",
      "Integer",
      "Object",
      "RegularExp",
      "String"
    ]
  }  
};
```

#### Compiler Output: `require_class_list`
Assume that `App`, `LinkParam` and `JSONEditor` are used in the class as attributes or returned instances of method. `App` is a locally defined class while `LinkParam` and `JSONEditor` are remote classes downloaded from the package manager (e.g. NPM).
The compiler call for the JSON data and the template generates the following code.

```javascript
require('./libs/app');
require('linkparam');
require('jsoneditor');
```


### Helper: `requirelibs`
The helper is designed to generate local and remote require commands in a class/module.

#### Template: `requirelibs`
Assume we have the following templates is stored `vDataJSON.tpl["requiretpl"]` with:
```javascript
// NodeJS: Require additional Modules
{{#requirelibs data.reposinfo.requirelist}}
const {{variable}} = require('{{module}}');
{{/requirelibs}}
```

#### JSON Data: `requirelibs`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "reposinfo": {
        "requirelist": [
          {
            "module":"handlebars",
            "variable":"Handlebars"
          },
          {
            "module":"filesaver",
            "variable":"FileSaver"
          },
          {
            "module":"jquery",
            "variable":"$"
          }
        ]
      },
    }
  };
```

#### Compiler Output: `requirelibs`
The compiler call `Handlebars4Code.compile.requiretpl(my_json)` for the JSON data `my_json` and the template generates the following code. The variable for the repository uses the module name in the `requirelist` and creates a variable name with an uppercase first character of the module name.

```javascript
const Handlebars = require('handlebars');
const Filesaver  = require('filesaver');  
const $          = require('jquery');     
```


### Helper: `foreach`
The example for the `foreach` helper will generate HTML code e.g. for the document explaining the available methods in the class. The example for the `paramcall` helper provides an application of `foreach` for code generation.

#### Template: `foreach`
Assume we have the following templates stored in `vDataJSON.tpl["htmltpl"]` with:
```html
<ul>
{{#foreach data.methods data}}
  <li>
  The {{visibility}} method {{name}} is defined in class {{data.classname}}
  </li>
{{/foreach}}
</ul>
```

#### Parameter of Helper:  `foreach`
The output format is HTML and the template uses
* the array `data.methods` to iterate over all methods and
* the hash `data` as second parameter of the helper, so that parent attribute of the JSON like `data.classname` are available in the content of the `foreach` definition as well.
* The second parameter `data` is added as `data` attribute to method items the array `data.methods`. You can assign a different hash e.g. `mydata` to the second parameter. For the template above the hash `mydata` needs the attribute `mydata.classname`. The second parameter is still mapped to `{{data}}` in the helper context. So if `mydata.classname="MyNewClass2"` the Handlebars `{{data.classname}}` will be set to `MyNewClass2`. With the new second parameter the template context will look this:

```html
<ul>
{{#foreach data.methods mydata}}
  <li>
  The {{visibility}} method {{name}}(params) is defined in class {{data.classname}}
  </li>
{{/foreach}}
</ul>
```
For a Handlebars4Code helper `foreach` helper is called for arrays `myarray` with:
```html
{{#foreach myarray data}}
    context for each array element
{{/foreach}}
```


#### JSON Data: `foreach`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "methods": [
        {
          "visibility": "public",
          "name": "init",
        },
        {
          "visibility": "private",
          "name": "create",
        },
        {
          "visibility": "public",
          "name": "display",
        }
    }
  };
```

#### Compiler Output: `foreach`
The template was stored in `vDataJSON.tpl["htmltpl"]`, so the compiler call will be `Handlebars4Code.compile.htmltpl(my_json)` for the JSON data `my_json`. The defined template generates the following code:


```html
<ul>
  <li>
  The public method init(params) is defined in class NewClass
  </li>
  <li>
  The private method create(params) is defined in class NewClass
  </li>
  <li>
  The public method display(params) is defined in class NewClass
  </li>
</ul>
```


### Helper: `paramcall`
The helper `paramcall` creates a list of parameter names of the method, that is comma separated.

#### Template: `paramcall`
Assume we have the following templates stored in `vDataJSON.tpl["methodtpl"]` with:
```
{{#foreach data.methods data}}
{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = function ({{#paramcall parameter}}{{/paramcall}})
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    // private function of class {{data.classname}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}})
{{/ifcond}}
{{/foreach}}
```
The `foreach` helper iterates of all method (here only one method is defined in the class). The `ifcond` helper distinguishes between different outputs for `public` and `private` methods in the class.

#### JSON Data: `paramcall`
The following JSON is used for the helper call. The JSON contains one method with
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
      "methods": [
        {
          "visibility": "public",
          "name": "init",
          "parameter": [
            {
              "name": "pJSON",
              "class": "Hash",
              "comment": "the parameter stores JSON definition for the class"
            },
            {
              "name": "pOptions",
              "class": "Hash",
              "comment": "the parameter stores the options for the JSON editor (developed by Jeremy Dorn)"
            },
            {
              "name": "pSchema",
              "class": "Hash",
              "comment": "the parameter contains the JSON Schema for JSON Editor"
            }
          ]
        }
    }
  };
```

#### Compiler Output: `paramcall`
The compiler call `Handlebars4Code.compile.methodtpl(my_json)` for the JSON data `my_json` and the template generates the following code:

```
NewClass.init = function (pJSON,pOptions,pSchmea)
```
The `ifcond` condition creates a different output if the `visibility` attribute is set to `private`. The generated code will be:

```
// private function of class NewClass
function init(pJSON,pOptions,pSchmea);
```


### Helper: `parameterlist`
The helper function `parameterlist` is mainly used to insert a comments for all parameter of a function in the header of a function.

#### Template: `parameterlist`
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
//#################################################################
//# {{visibility}} Method: {{name}}()  Class: {{data.classname}}
//# Parameter:
//#    {{parameterlist parameter "    //#    "}}
//#################################################################
```

#### JSON Data: `parameterlist`
The following JSON is used the helper call:
```
var my_json = {
  var my_json = {
      "data": {
        "classname": "NewClass",
        "superclassname": "MySuperClass",
        "methods": [
          {
            "visibility": "public",
            "name": "init",
            "parameter": [
              {
                "name": "pJSON",
                "class": "Hash",
                "comment": "the parameter stores JSON definition for the class"
              },
              {
                "name": "pOptions",
                "class": "Hash",
                "comment": "the parameter stores the options for the JSON editor (developed by Jeremy Dorn)"
              },
              {
                "name": "pEditorID",
                "class": "String",
                "comment": "the parameter provide DOM ID in which the JSON editor will be injected."
              }
            ]
          }
      }
    };
```

#### Compiler Output: `parameterlist`
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
//#################################################################
//# public Method: init()  Class: NewClass
//# Parameter:
//#    pJSON:Hash
//#      the parameter stores JSON definition for the class
//#    pOptions:Hash
//#      the parameter stores the options for the JSON editor (developed by Jeremy Dorn)
//#    pEditorID:String
//#      the parameter provide DOM ID in which the JSON editor will be injected.
//#
//#################################################################

```

### Helper: `indent`
The helper function `indent` takes two parameters.
* the text (e.g. comment or code)
* the indent which is injected for all newlines in the text parameter.
The `indent` helper shifts the text or code to the right.

#### Template: `indent`
Assume we have the following templates is stored `vDataJSON.tpl["mytpl"]` with:
```javascript
   //#################################################################
   //# Comment:
{{indent comment "    //#     "}}
   //# Line after Comment
   //#################################################################

```

#### JSON Data: `indent`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
      "methods": [
        {
          "visibility": "private",
          "name": "create",
          "comment":"one line \nsecond line\nthird  line"
        }
    },
    "settings": {

    }
  };
```

#### Compiler Output: `indent`
The compiler call `Handlebars4Code.compile.mytpl(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
    //#################################################################
    //# Comment:
    //#     one line
    //#     second line
    //#     third line
    //# Line after Comment
    //#################################################################

```
<!-- END:   src/readme/handlebars4code.md -->
<!-- BEGIN: src/readme/build_process.md -->

## Build Process of `npm run build`
As a developer it is assumed that you have:
* `NodeJS` and
* `git`
installed on your computer.

The build process must be called with `npm run build`. If you want change the existing code for `JSONEditor4Code` clone the code from the Git-repository with:
```shell
git clone https://github.com/niebert/jsoneditor4code.git
```
The you will have a folder `jsoneditor4code/` with all the files in your local file system.
The code part for the build process are stored in the folder `jsoneditor4code/src/`.

Now all the dependent libraries must be installed with:
```shell
npm install
```
You will find an additional folder `node_modules/` in your cloned copy of `jsoneditor4code`.

The build process is started by calling by `npm run build` which in turn call `build.js`. If you want to call the build process of `build.js` separately just call `build.js` with `node build.js` from the shell/console.

The templates for building the output are stored in the folder `src/`.

After the build process the `README.md` is generated and if you want to have the table of contents in the file for the concatenation of  files in `src/readme/` listed in `files4build.js` then you must run the DocToc generator for `README.md` by `doctoc README.md` from the shell to update the table of contents in `README.md`.

### Define Filename for build in `package.json`
In `package.json` defines the filename for the automated build for
* `README.md` for readme for the repository (parts in `src/readme`),
* `index.html` for the web demo (parts in `src/html`),
* `main.css` for the style sheet (part in `src/css`) and
* `src/main.js` is generated from the parts in `src/libs`
the sources in `src/`.
To specify these filenames add the following `build` section to the `package.json`:
```javascript
"build": {
  "readme": "README.md",
  "html": "docs/index.html",
  "css": "docs/css/main.css"
}
```
If you want to edit the generated file check the files that are selected for including into the generated files (see `files4build.js`) and set the files to a preliminary build name (e.g. like `index_build.html` instead of `index.html` to compare generated file `index_build.html` with the older version `index.html` for debugging

### Compress after Build
After building (concat the file parts) and replacement of package variables (e.g. see [`build4code`](https://www.npmjs.com/package/build4code) like  `jsoneditor4code` for package name) in the generated documents the module is browserified by the command
```javascript
uglifyjs dist/jsoneditor4code.js --compress -o dist/jsoneditor4code.min.js
```
This command is called after `build.js` and the final step of the build process is the [`doctoc`](https://www.npmjs.com/package/doctoc) call to update the table of contents in the `README.md`. All steps of the `npm run build` command are defined in the `script` section of the `package.json` file.
<!-- END:   src/readme/build_process.md -->
## Build and Compress with Browserify, Watchify, UglifyJS
The NodeJS modules can use `require()`-command. Browsers cannot execute the `require()`-command and other node specific programming features.
* `Browserify` loads the file `src/main.js` as input file and resolves e.g. the `require()`-command and creates an output file in `dist/jsoneditor4code.brows.js`
* `Watchify` observes any changes in the source files in `src/` and starts on the event of changes the build process of the file `src/main.js` as input file and creates an output file in `dist/jsoneditor4code.brows.js`.
* `UglifyJS` compresses the code in `dist` and takes the file `dist/jsoneditor4code.js` and generates the compressed library in `dist/jsoneditor4code.min.js`. The same is applied for `docs/js/jsoneditor4code.js` and the output is `docs/js/jsoneditor4code.min.js`. The compression of the source code can be perform without a total build by `npm run compress`.


### Browserify and Watchify
Browserify and Watchify are used in this repository to control the WebApp-javascript development with the required Javascript libraries installed with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node) and similar framework world that greatly improve your javascript workflow: Using them, you no longer need to micro-manage your script tags but instead you just declare the libraries each of your client-side modules is using - or you can even create your own reusable modules! Also, installing (or updating) javascript libraries is as easy as running a single command!
* [Additional Information about Browserify and Watchify on GitHub](https://spapas.github.io/2015/05/27/using-browserify-watchify/)
* [Youtube Video about Browserify and Watchify by Kyle Robinson Young 2015/04/16](https://www.youtube.com/watch?v=CTAa8IcQh1U)
In this repository Browserify and Watchify are used for javascript code development with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node).

### Global Installation of Browserify, Watchify, UglifyJS and DocToc
Requirement: [NPM](https://docs.npmjs.com/getting-started/installing-node) is intalled. Now call for global installation of Browserfy, Watchify, UglifyJS and DocToc by:

`npm install -g browserify watchify uglify-js doctoc`

This is recommended because your will not install Browserfy, Watchify and UglifyJS for all your repositories separately.
* ***Browserfy*** converts `node_modules` in a single library, that can be imported in WebApp. Browserify resolves dependencies and included the required libraries into the bundled javascript code.
* ***Watchify*** watches changes in the source code and runs the build process whenever it detects changes in the your source code.
* ***UglifyJS*** compresses the source code of `dist/class_editor_uml.js` into ```class_editor_uml.min.js``` to reduce download time and WebApp performance during load.
* ***DocToc*** is used to create a helpful table of contents in the README (see [DocToc-Installation]https://github.com/thlorenz/doctoc#installation) for further details on [NPM DocToc](https://www.npmjs.com/package/doctoc) ). Run `doctoc README.md` for updating the table of contents.
* ***jsLint*** is used to check the Javascript code, quality of code can be improved by application of jsLint

### Package Installation of Browserify and Watchify - Alternative
If your prefer that  browserify and watchify is installed with your `npm install` command, save these to modules to your dev-dependecies in your `package.json` by calling

* (Install Browsersify) `npm install browserify --save-dev`
* (Install Watchify) `npm install watchify --save-dev`
* (Install UglifyJS) `npm install uglify-js --save-dev`
* (Install DocToc) `npm install doctoc -g`
* (Install jshint) `npm install jslint -g`

The difference between `--save` and `--save-dev` is, that development dependencies are installed with `npm install` because they are required for the development process of the code but they are not added to the generated Javascript-bundle that are used in the WebApp ClassEditorUML. The `--save-dev` commands for `browserify` and `watchify` will install the two modules with all the the dependencies in `node_modules` and add the dev-dependencies to your `package.json`.
```json
"devDependencies": {
  "browserify": "^14.5.0",
  "watchify": "^3.9.0",
  "uglify-js": "^2.6.2",
  "doctoc":"^1.3.0",
  "lint": "^1.1.2"  
}
```
In the current repository `Browserfy` and `Watchify` are expected to be installed globally, because the `package.json` does not contain the dev-dependencies mentioned above.

### Start Watching the Files with Watchify
Watchify will trigger the `npm run build` process if files were change due to alteration of code. To start watching the files, run the npm-watch script by `npm run watch`, which is defined in `package.json`

### Source JS file and development bundle output
The main JS source file for the build process is `src/main.js`. The output library (resp. output file of build process) is stored in distrubtion library for browser based web-development in `dist/jsoneditor4code.js`. Compressed code is generated with `UglifyJS`. It takes the `dist/jsoneditor4code.js` as input file and creates the compressed file `dist/jsoneditor4code.min.js`.
The compression of `dist/jsoneditor4code.js` into `dist/jsoneditor4code.min.js` uses `uglify-js` module and can be started by

  `npm run compress`

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [Font Awesome Icons - 4.7.0](https://fontawesome.com/v4.7.0/icons/) thanks to [fontawesome.com](https://fontawesome.com) for providing the [free 4.7.0 version](https://fontawesome.com/v4.7.0/icons/) for local application for this WebApp. The [fonts in version 4.7.0](https://fontawesome.com/v4.7.0/icons/) are created by ***[Font Awesome](https://fontawesome.com)*** and
licensed under [SIL OFL 1.1](http://scripts.sil.org/OFL). The javascript-code for injecting the icon into the DOM licensed under [MIT License](http://opensource.org/licenses/mit-license.html). The
[Documentation](https://fontawesome.com/v4.7.0/examples/) for [Font Awesome - 4.7.0](https://fontawesome.com/v4.7.0/icons/) licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/). The [Font-Awesome GitHub-repository](https://github.com/FortAwesome/Font-Awesome) can be used for forking and adapting the javascript code to individual requirements and constraints.
* [HandleBars](http://handlebarsjs.com/) the code generation in Javascript was implemented
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the [JavascriptClassCreator Project](https://niebert.github.io/JavascriptClassCreator) `JSCC`.
The JSON-Editor of Jeremy Dorn has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI). This would lead to major code reduction of `JSCC` . Refactoring of `JSCC` would make more use of the JSON-Editor features. Check out an interactive demo (demo.html): http://jeremydorn.com/json-editor/
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* `[LoadFile4DOM](https://www.gitlab.com/niehausbert/loadfile4dom)` is a library that allows to load files into an application that run completely in a browser without the need to submit data to a server for processing. With this library the users are able load files into your browser application and process the data in the browser and provide the output to the user, without submitting any data to a server. **[Demo LoadFile4DOM](https://niehausbert.gitlab.io/loadfile4dom)**
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the `FileSaver.js` that is used to store created `JSCC` files to the local filesystem. `JSCC` uses the same mechanism of browsers, that allows a `Save as...` in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
* [JSZip](http://stuartk.com/jszip) - LibreOffice files, Geogebra files (Open Source applications) have file extensions that are actually ZIP files. To handle, change and generate those documents in a browser is possible the library JSZIP. Even a small file system for WebApps that can be stored with a folder structure in a ZIP file can be generated in a browser. So [JSZip](http://stuartk.com/jszip) is a multi-functional JavaScript class for generating and reading ZIP files. Thank you for sharing this great library with the Open Source community.

## Libraries required for  `JSONEditor4Code`
The following libraries are necessary for `jsoneditor4code.js`:
* Lib: `jquery` Version: `^3.4.1`
* Lib: `linkparam` Version: `^1.0.8`


## Libraries for Building and Developement
The following libraries are necessary for building the `jsoneditor4code`. 
These libraries are not included in `jsoneditor4code.js`, but e.g. are required in `build.js`.
* Lib: `build4code` Version: `^0.3.31`
* Lib: `concat-files` Version: `^0.1.1`
* Lib: `doctoc` Version: `^1.4.0`
* Lib: `jsdom` Version: `^15.1.1`
* Lib: `shelljs` Version: `^0.8.3`
* Lib: `uglify-js` Version: `^3.6.0`

## NPM Library Information
* Exported Module Variable: `JSONEditor4Code`
* Package:  `jsoneditor4code`
* Version:  `1.1.34`   (last build 2021/01/03 12:40:57)
* Homepage: `https://niebert.github.io/JSONEditor4Code`
* License:  MIT
* Date:     2021/01/03 12:40:57
* Require Module with:
```javascript
    const vJSONEditor4Code = require('jsoneditor4code');
```
* JSHint: installation can be performed with `npm install jshint -g`
<!-- BEGIN: src/readme/tail.md -->
<!-- END:   src/readme/tail.md -->
