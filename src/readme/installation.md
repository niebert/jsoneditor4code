## Start WebApp `___PKG_EXPORTVAR___`
* [`___PKG_EXPORTVAR___`](___PKG_URL4WWW___) 

## Installation `___PKG_EXPORTVAR___`
The library was designed to used in a browser (WebApp). So use the installation for your browser by using a bundle `dist/___PKG_NAME___.js`  - see example [`Demo ___PKG_EXPORTVAR___`](___PKG_URL4WWW___) .

### Installation for Browsers
If you want to use the library `___PKG_NAME___.js` in a browser, please copy the file `dist/___PKG_NAME___.js` into your library folder of WebApp that you want to test with a browser (e.g. `js/___PKG_NAME___.js`). If you want expand existing examples check the basic example in `docs/index.html` first and play around with that HTML-file. If you want to import the library with `script`-tag do it in the standard way with:
```html
<script src="js/___PKG_NAME___.js"></script>
```
Now it is possible to use the constructor of `___PKG_EXPORTVAR___`
```javascript
if (JSONEditor4Code) {
  var vJSONEditor = new ___PKG_EXPORTVAR___();
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
After the `initDoc()` call the `___PKG_EXPORTVAR___` is aware about the `document` in the browser.

### Init the JSON Editor
The init method of the JSON Editor gets as parameter the follow JavaScript objects:
* `pJSON` is JSON data with which the JSON Editor is populated,
* `pDefaultJSON` is the JSON data which is used, when the JSON Editor is resetted,
* `pSchema` is JSON Schema which defines the input elements of JSON Editor `___PKG_EXPORTVAR___`
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
