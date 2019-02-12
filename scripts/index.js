import {text} from './text';
import Reader from './Reader';
import * as tokenize from './helpers/String/tokenize';
import stripHTML from './helpers/String/stripHTML';

const global = window;


class Ratio {
    constructor(direct = a => a, inverse = a => a, value){
	this.direct = direct;
	this.inverse = inverse;
	this.value = value;
    }
    set ratio(value){
	this.value = this.inverse(value);
    }
    get ratio(){
	return this.direct(this.value);
    }
}

let FPM = new Ratio((F) => 60 / F, (I) => 60 / I, 60);

const reader = new Reader(text, {portion: 1, analizer: {charFilter: stripHTML, tokenizer: tokenize.standart}});

const feed = reader[Symbol.iterator](2);

const setContent = (elements, text) => {
    return Array.prototype.slice.call(elements).map((item) => {
        return item.innerText = text;
    })
};

let elements = global.document.getElementsByClassName('content');

function run(feed) {
    console.log(FPM.value, FPM.ratio);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(setContent(elements, feed.next()));
            } catch (error) {
                reject(error);
            }
        }, FPM.ratio * 1000)
    })
        .then(() => run(feed))
}


//run(feed);

document.addEventListener('keydown', function (event) {
    console.log(event.keyCode);
    switch (true) {
        // left
        case event.keyCode === 37:
            feed.position--;
            setContent(elements, feed.current());
            break;
        // right
        case event.keyCode === 39:
            feed.position++;
            setContent(elements, feed.current());
            break;
        // up
        case event.keyCode === 38:
            FPM.value += 1;
            break;
        // down
        case event.keyCode === 40:
            FPM.value = FPM.value > 1? FPM.value - 1 : 1;
            break;
    }
});