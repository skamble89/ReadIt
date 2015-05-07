(function () {
    function GetSelectedText() {
        if (window.getSelection) {
            return window.getSelection().toString();
        } else {
            if (document.selection.createRange) {
                return document.selection.createRange().text;
            }
        }
    }

    function Read(text) {
        var textArray = text.split(' '),
            index = 0,
            readWords = 10;
        if (textArray.length > 0) {
            (function ReadText(readText) {
                if (index < textArray.length) {
                    var iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.addEventListener('load', function () {
                        var self = this;
                        setTimeout(function () {
                            index += readWords;
                            document.body.removeChild(self);
                            ReadText(textArray.slice(index, index + readWords).join(' '));
                        }, 5000);
                    });

                    document.body.appendChild(iframe);
                    iframe.src = '//translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURI(readText) + '&tl=en&total=1&idx=0&textlen=' + readText.length + '&prev=input';
                }
            })(textArray.slice(index, index + readWords).join(' '))
        }
    }

    Read(GetSelectedText());
})();
