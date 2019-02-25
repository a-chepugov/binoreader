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

	slice(position, portion) {
		return this._tokens.slice(position * portion, (position + 1) * portion);
	}

	[Symbol.iterator](portion = 1, position = null) {
		const navigable = new Navigable((position) => {
			const value = this.slice.call(this, position, portion);
			return ({value, done: !Boolean(value)})
		});
		navigable.position = position;
		return navigable
	}
}
