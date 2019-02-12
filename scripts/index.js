import {text} from './text';
import * as reader from './reader';

const global = window;

const separator = /\s/;
const tokenize = (string) => {
    return string.split(separator).filter((item) => item);
};

const setContent = (elements, text) => {
    return Array.prototype.slice.call(elements).map((item) => {
        return item.innerText = text;
    })
};

const tokens = tokenize(text);

console.log(tokens);

let elements = global.document.getElementsByClassName('content');

console.log(elements);

let STEP = 0;
let INTERVAL = 999;

setInterval(() => {
    setContent(elements, tokens[STEP++])
}, INTERVAL);
