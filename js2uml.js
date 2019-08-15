const pkg = require('./package.json')
// const b4c = require('build4code');
const b4c = require('build4code');

let exportmod = b4c.codegen.load_file('./src/libs/exportmod.js');
let pos = exportmod.indexOf("function");
exportmod = exportmod.substring(pos);
exportmod = "function LinkParam() {\n\n}\n\n" + exportmod +"\n\nmodule.exports = "+pkg.exportvar+";";
b4c.codegen.save_file('./src/libs/exportmod4uml.js',exportmod);
let vConstructor = require('./src/libs/exportmod4uml.js');
let uml_filename = 'jscc/'+pkg.name+'_uml.json';
b4c.js2uml(pkg.exportvar,uml_filename,vConstructor,pkg);
