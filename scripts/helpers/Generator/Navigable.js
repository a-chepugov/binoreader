/**
 *
 */
export default class {
    /**
     *
     * @param {function} fn
     * @param {number} [portion=1]
     * @param {number} [position=0]
     */
    constructor(fn = (a) => a, portion = 1, position = 0) {
        this.portion = portion;
        this.position = position;
        this.fn = fn;
    }

    get portion() {
        return this._portion;
    }

    set portion(value) {
        this._portion = Number.isInteger(value) && value > 0 ? value : 1;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = Number.isInteger(value) && value > 0 ? value : 0;
    }

    previous() {
        return this.fn.call(this, this.position--, this.portion);
    }

    current() {
        return this.fn.call(this, this.position, this.portion);
    }

    next() {
        return this.fn.call(this, this.position++, this.portion);
    }
}