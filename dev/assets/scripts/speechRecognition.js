'use strict';

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = 'en-US';

recognition.onresult = function(event) {
	console.log(event.results[0][0].transcript);
}

recognition.start();