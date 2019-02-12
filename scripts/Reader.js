import analize from './helpers/String/analize';
import Navigable from './helpers/Generator/Navigable';

export default class {
    constructor(text = '', options = {}) {
        this._text = text;
        this._options = options;
        const {portion, analizer: {charFilter, tokenizer, filters}} = this._options;

        this.portion = portion;
        this._analizer = (text) => analize(text, charFilter, tokenizer, filters);
        this._tokens = this.analize(text);
    }

    analize() {
        return this._analizer(this._text)
    }

    slice(step, portion) {
        return this._tokens.slice(step * portion, (step + 1) * portion);
    }

    [Symbol.iterator](portion = 1, step = 0) {
        const slice = this.slice.bind(this);
        return new Navigable(slice, portion, step);
    }
}