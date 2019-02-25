export default class {
	constructor(direct = a => a, inverse = a => a, value) {
		this.direct = direct;
		this.inverse = inverse;
		this.value = value;
	}

	set ratio(value) {
		this.value = this.inverse(value);
	}

	get ratio() {
		return this.direct(this.value);
	}
}
