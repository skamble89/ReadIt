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
            readWords = 5;
        if (textArray.length > 0) {
            (function ReadText(readText) {
                var audio = document.createElement('audio');
                audio.autoplay = true;
                audio.addEventListener('ended', function (e) {
                    index += readWords;
                    document.body.removeChild(this);
                    ReadText(textArray.slice(index, index + readWords).join(' '));
                });

                document.body.appendChild(audio);
                audio.src = 'http://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURI(readText) + '&tl=en&total=1&idx=0&textlen=' + readText.length + '&prev=input';
            })(textArray.slice(index, index + readWords).join(' '))
        }
    }

    Read(GetSelectedText());
})();