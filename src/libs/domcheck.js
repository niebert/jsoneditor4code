window = window || {
  "document":{
    "getElementById": function(id) {
      console.error("getElementById() is not defined");
    }
  }
}
