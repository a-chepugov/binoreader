import Reader from './Reader';
import Ratio from './Ratio';
import * as tokenize from './helpers/String/tokenize';
import stripHTML from './helpers/String/stripHTML';
import sleep from './helpers/Promise/sleep/index';
import {text} from './text';


const global = window;
const PORTION = 2;

const setContent = (elements, text) => {
	return Array.prototype.slice.call(elements).map((item) => {
		return item.innerText = text;
	})
};

async function scrollDown(feed, FPM, elements) {
	for (let portion of feed) {
		setContent(elements, portion);
		await sleep(FPM.ratio * 1000);
	}
}

function mount(elements, reader, portion) {
	const feed = reader[Symbol.iterator](portion);

	function HotKeysListener(event) {
		switch (true) {
			case event.keyCode === 37: // left
				// feed.position--;
				setContent(elements, feed.back().value);
				break;
			case event.keyCode === 39: // right
				setContent(elements, feed.next().value);
				break;
			case event.keyCode === 38: // up
				FPM.value += 1;
				break;
			case event.keyCode === 40: // down
				FPM.value = FPM.value > 1 ? FPM.value - 1 : 1;
				break;
		}
	}

	document.addEventListener('keydown', HotKeysListener);

	const FPM = new Ratio((F) => 60 / F, (I) => 60 / I, 60);
	scrollDown(feed, FPM, elements);
}

function init(text, portion) {
	let elements = global.document.getElementsByClassName('content');
	const reader = new Reader(text, {portion: portion, analizer: {charFilter: stripHTML, tokenizer: tokenize.standart}});
	return mount(elements, reader, portion);
}

init(text, PORTION);

function onChange(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onload = (event) => init(event.target.result);
	reader.readAsText(file);
}

const file = document.getElementById('file');
file.addEventListener('change', onChange);

