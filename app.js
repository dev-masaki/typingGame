var question = localStorage.question || 'kagawa univercity';

var types = [];
function init() {
	document.querySelector('.container').innerHTML = '';
	// .split
	types = question.split('').map(function(str) {
		var type = document.createElement('span');
		type.className = 'type';
		type.textContent = str;
		document.querySelector('.container').appendChild(type);
		return type;
	});
	timerEnd();
	document.querySelector('.timer').textContent = '0.000';
}
init();

var timer = null;
var startTime = 0;
function timerStart() {
	startTime = new Date().getTime();
	timer = setInterval(function() {
		var time = (new Date().getTime() - startTime) / 1000;
		document.querySelector('.timer').textContent = time.toFixed(3);
	}, 10)
}

function timerEnd() {
	clearInterval(timer);
	timer = null;
}

document.addEventListener('keydown', function(event) {
	var keyCode = event.keyCode;

	if (keyCode === 13) {  // enter key
		init();
		return;
	}

	var key = '';  // keyの初期化

	if (keyCode === 32) {  // space key
		key = ' ';
	}

	if (keyCode >= 65 && keyCode <= 90) {  // a to z
		key = String.fromCharCode(keyCode);
		if (event.shiftKey) {
			key = key.toUpperCase();
		} else {
			key = key.toLowerCase();
		}
	}

	if (key) {

		if (timer === null) {
			timerStart();
		}

		var next = types[0];
		if (next.textContent === key) {
			next.classList.add('ok');
			types.shift();
			if (types.length === 0) {
				timerEnd();
			} 
		} else {
				next.classList.add('ng');
		}
	}

});

document.querySelector('.container').addEventListener('click', function(event) {
	var text = prompt('問題文を入力してください');

	if (text) {
		localStorage.question = question = text;
		init();
	}
});