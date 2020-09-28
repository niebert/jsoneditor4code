

## Installation `JSONEditor4Code`
There are two main types to use `JSONEditor4Code` for you projects. With a `script`-tag in your HTML file or with a package manager like [NPM](https://www.npmjs.com/) to use [JSONEditor4Code](https://www.npmjs.com/package/jsoneditor4code)with [NodeJS](https://nodejs.org/en/)
### Installation `JSONEditor4Code` with NPM for Scripts
Assume you have NPM installed and your have created e.g. a folder `mypackage/` for your package with `package.json` in the folder `. Go to the folder `mypackage/` and call
```javascript
npm install jsoneditor4code --save
```
Then you will find `jsoneditor4code` in the folder `mypackage/node_modules/jsoneditor4code`.
If you want to use `JSONEditor4Code` in your scripts use the following require-call:
```javascript
const  JSONEditor4Code = require('jsoneditor4code');
```
Now it is possible to use `JSONEditor4Code` in your scripts.

### Installation `JSONEditor4Code` for Browser for Scripts-Tags
If you want to use the library `jsoneditor4code.js` in a browser, please copy the file `dist/jsoneditor4code.js` into your library folder (e.g. `/js`) and
import the library with `script`-tag with:
```html
<script src="js/jsoneditor4code.js"></script>
```
Now it is possible to use `JSONEditor4Code` in your other imported scripts.
