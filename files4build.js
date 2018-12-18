/* The Arrays contains all libraries
   that are included in the 'build.js' call
   with 'npm run build'
*/
const getLibs4Build = function (pLibPath) {
  var vLibs4Build = [
    'src/npm_header.js',
    pLibPath+'arrayhash.js',
    pLibPath+'blob.js',
    pLibPath+'bootstrap.js',
    pLibPath+'classeditor.js',
    pLibPath+'date.js',
    pLibPath+'savefile.js',
    pLibPath+'filesaver.js',
    pLibPath+'jsoneditor.js',
    //-----------------------------------------------
    //---- Load Handlebars4Code or ------------------
    //pLibPath+'handlebars4code.js',
    //- OR Load Handlebars with Handlebars Helpers---
    pLibPath+'handlebars.js',
    pLibPath+'handlebars_helper.js',
    //-----------------------------------------------
    pLibPath+'linkparam.js',
    //pLibPath+'localstorage.js',
    pLibPath+'exportmod.js'
  ];
  return vLibs4Build;
}

const getHtml4Build = function (pPath) {
  var vArray = [
    pPath+'header.html',
    './src/html_title.html',
    pPath+'datajson.html',
    pPath+'headerscript.html',
    pPath+'headerlibs.html',
    pPath+'bodyheader.html',
    './src/html_description.html',
    pPath+'body.html',
    pPath+'bodytail.html',
    './src/html_tail.html',
    pPath+'tailscript.html',
    pPath+'tail.html'
  ];
  return vArray;
}

const getCss4Build = function (pPath) {
  var vArray = [
    pPath+'main.css'
  ];
  return vArray;
}


const getReadme4Build = function (pPath) {
  var vArray = [
    './src/readme_header.md',
    pPath+'headerintro.md',
    pPath+'doctoc.md',
    './src/readme_install.md',
    pPath+'usage.md',
    pPath+'handlebars4code.md',
    /*
    pPath+'headerlibs.md',
    pPath+'headerscript.md',
    pPath+'bodyheader.md',
    pPath+'body.md',
    pPath+'bodytail.md',
    */
    //pPath+'jsonschema.md',
    pPath+'build_process.md',
    pPath+'browserify.md',
    pPath+'acknowledgement.md',
    './src/readme_devlibs.md',
    './src/readme_tail.md',
    pPath+'tail.md'
  ];
  return vArray;
}

module.exports = {
  "getLibs4Build"   : getLibs4Build,
  "getHtml4Build"   : getHtml4Build,
  "getCss4Build"    : getCss4Build,
  "getReadme4Build" : getReadme4Build
}
