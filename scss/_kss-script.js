document.addEventListener("DOMContentLoaded", function(event) {

  // Pushes the preview size of some examples up
  var subjects = [
    "#kssref-components-viewport-overlay .kss-modifier__example",
    "#kssref-components-modal .kss-modifier__example"
  ];

  for (var i = 0; i < subjects.length; i++) {
    var target = document.querySelector(subjects[i]);
    if(target) target.style["min-height"] = "20em";
  }


  // Add CodeMirror editable examples
  var targets = document.querySelectorAll('.prettyprint.linenums.lang-html'),
      targlen = targets.length,
      editors = [];

  for(var i = 0; i < targlen; i++) {
    var _val = targets[i].innerText;
    var _editorId = "editor_" + i;
    targets[i].innerHTML = ''; // set to nothing first
    targets[i].innerHTML = '<textarea class="codemirror" id="'+_editorId+'"></textarea>';
    if(document.getElementById(_editorId)){
      document.getElementById(_editorId).value = _val;
      editors.push({id: _editorId, val: _val});
    }
  }

  for(var i = 0; i < editors.length; i++) {
    var targId = editors[i].id;
    var _editor = CodeMirror.fromTextArea(document.getElementById(targId), {
      mode: 'xml',
      htmlMode: true,
      val: targId.value,
      theme: 'material',
      styleSelectedText: true,
      lineNumbers: true
    }).on('change', function(cm, change){
      var _curContent = cm.getValue();
      var _curParent = cm.display.wrapper.closest('.kss-section');
      var _canvas = _curParent.getElementsByClassName('kss-modifier__example');
      _canvas[0].innerHTML = _curContent;
    });
  }
  //End CodeMirror

});
