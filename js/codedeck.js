
function runCode(element) {
  iframe = document.createElement("IFRAME"); 
   iframe.style.width = ($(element).width()-2) + "px";
   iframe.style.height = ($(element).height()-2) + "px";
   iframe.style.overflow = 'auto';
   iframe.style.border ="none";

   var dest = $(element).attr('data-target');
   var destination = $("#" + dest );
   $(destination).html("").append(iframe);

   var editor = $(element).data('editor');
   var code = editor.getSession().getValue();

   var language = $(element).attr('data-language');

   if(language == 'js') {
     code = "<scr" + "ipt>\n" + code + "\n</scr" + "ipt>";
   }

   code = "<html><head><scr" + "ipt src='js/jquery.min.js'></scr" + "ipt></head><body>" + code + '</body></html>';

   writeIFrame(iframe,code);
}

function writeIFrame(iframe,code) {
  iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
  iframe.document.open();
  iframe.document.write(code);
  iframe.document.close();
}



$(document).ready(function() {

  var JavaScriptMode = require("ace/mode/javascript").Mode;

  $("a").attr('target','_blank');

 function focusCallback() {
   disableKeyboardEvents = true;
  }

  function blurCallback() {
    disableKeyboardEvents = false;
  }

  $(document).bind("slideenter",function(e) {
    var current = $(".current");
    current.find(".editor").each(function() {
      if(!$(this).hasClass('codeEditor')) {
        var element = this;
        var editor = ace.edit(this.id);
        $(this).addClass('codeEditor');
        editor.getSession().setMode(new JavaScriptMode());

        $(this).data('editor',editor);
        editor.on('focus', focusCallback);
        editor.on('blur', blurCallback);
        $("<button>Run</button>").insertBefore(this).click(function() {
          runCode(element);
        });
      }
    });

  });

});
