
vJSONEditor.update_filename = function () {
  var vNode = this.el(this.aOptions["filename_id"]); // e.g. filename_id = "load_filename";
  if (vNode) {
      var vJSON = this.getValue();
      if (vJSON.data) {
        if (vJSON.data.hasOwnProperty(this.aOptions["filename_key"])) {
          vNode.innerHTML = class2filename(vJSON.data.classname)+vJSON.settings.extension4code;
        }
      };
  } else {
      console.log("DOM node ["+this.aOptions["filename_id"]+"] not found");
  };
}
