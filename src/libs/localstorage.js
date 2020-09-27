function get_id4localstorage(pPrefix) {
  var vID = pPrefix || "LS";
  if (document) {
    if (document.location) {
      if (document.location.href) {
        var vURL = document.location.href;
        vURL = vURL.replace(/[^A-Za-z0-9]/g,"");
        vID += vURL;
      } else {
        console.error("ERROR in get_id4localstorage() object 'document.location.href' not defined!");
      }
    } else {
      console.error("ERROR in get_id4localstorage() object 'document.location' not defined!");
    }
  } else {
    console.error("ERROR in get_id4localstorage() object 'document' not defined!");
  }
  console.log("Localstorage ID:'" + vID + "'");
  return vID;
}

function loadJS(pName) {
    var vName = pName || "class.json";
    if (typeof(Storage) != "undefined") {
        // Store
        if (typeof(localStorage.getItem(get_id4localstorage(vFileBase))) !== undefined) {
          console.log("JSON Data '"+vName+"' try loading from Local Storage");
          var vJSONstring = localStorage.getItem(vFileBase);
          if (!vJSONstring) {
            console.log("JSON-DB '"+vName+"' undefined in Local Storage.\nSave default as JSON");
            localStorage.setItem(vFileBase, JSON.stringify(editor.getValue()));
          } else {
            console.log("parse DB '"+vName+"') from LocalStorage JSONstring='"+vJSONstring.substr(0,120)+"...'");
            try {
                this.setEditorData(JSON.parse(vJSONstring));
            } catch(e) {
                alert(e);
            }
          }
        } else {
          console.log("JSON-Data '"+vName+"' is undefined in Local Storage.\nSave default as JSON");
          localStorage.setItem(get_id4localstorage(vFileBase), JSON.stringify(editor.getValue()));
        }
        // Load the last edited filename from LocalStorage
        if (typeof(localStorage.getItem("filename")) !== undefined) {
          var vFile = localStorage.getItem("filename");
          $('#load_filename').html(vFile); // this.value.replace(/.*[\/\\]/, '')
        }
    }	 else {
        console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
    }
}


function saveLS(pName) {
  var vData = editor.getValue();
  var vName = pName || "class.json";
  if (typeof(Storage) != "undefined") {
      // Store
      if (typeof(vData) != undefined) {
        console.log("JSON-DB '"+vName+"' is defined, JSONDB in  Local Storage");
        if (vData) {
          //console.log("pJSONDB '"+vName+"' is saved to Local Storage");
          var vJSONstring = JSON.stringify(vData);
          console.log("saveLS('"+vName+"') JSONstring='"+vJSONstring.substr(0,120)+"...'");
          localStorage.setItem(get_id4localstorage(vFileBase),vJSONstring);
          localStorage.setItem("filename",vName);
        } else {
          console.log("vData with JSON is NOT defined");
        }
      } else {
        console.log("JSON Data is undefined");
      }
    }	 else {
      console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
    }
}
