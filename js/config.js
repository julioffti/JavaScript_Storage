function  setConfig() {
    var texts = {
      "title":"Shopping JS"
    };
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();