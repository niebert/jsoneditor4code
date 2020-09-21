const fs = require("fs");
const pkg = require("./package.json");
const b4c = require("build4code").codegen;

// replace <div id4marker="version">2.0.2</div> with current version
console.log("Set version build.js for '" + pkg.name + "' version "+pkg.version);

function replace_version(data) {
  data = data.replace(/<div\s+id="version"\s+style[^<]+<\/div>/g,"___PKG_");
  data = data.replace(/<div\s+id="version">[^<]+<\/div>/g,"<div id4marker=\"version\">"+pkg.version+"</div>");
  data = data.replace(/<div\s+id4marker="version"[^<]+<\/div>/g,"<div id4marker=\"version\" style=\"display: inline-block\">"+pkg.version+"</div>");
  return data;
}

var outfile = "undefined content";
  fs.readFile('docs/index.html', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        outfile = replace_version(data);
      }
    });

setTimeout(function () { b4c.save_file('docs/index.html', outfile); },1500);
