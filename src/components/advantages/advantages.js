import {getElementWidth, debounce} from '../../common/helpers';

export default class Advantages {
    static get UPDATE_INTERVAL_MS() {return 100};

    get nAdvantageNumbers() {
        if (!this.advantageNumbers) {
            this.advantageNumbers = [...this.nRoot.querySelectorAll('.advantage__number')];
        }
        return this.advantageNumbers;
    }

    get nBody() {
        if (!this.body) {
            this.body = document.querySelector('body');
        }
        return this.body;
    }

    constructor(nRoot) {
        this.nRoot = nRoot;
        this.updateDebounceBind = debounce(
            this.update.bind(this),
            Advantages.UPDATE_INTERVAL_MS,
            null,
            false
        );
        window.addEventListener('resize', this.updateDebounceBind);
        this.updateDebounceBind();
    }

    update() {
        const maxNumberWidth = Math.max(
            ...this.nAdvantageNumbers.map(nNumber => {
                const nNumberCopy = nNumber.cloneNode(true);
                nNumberCopy.style.display = 'inline-block';
                nNumberCopy.style.opacity = 0;
                nNumberCopy.style.visibility = 'hidden';
                nNumberCopy.style.width = '';
                this.nBody.appendChild(nNumberCopy);
                const width = getElementWidth(nNumberCopy);
                this.nBody.removeChild(nNumberCopy);
                return width;
            })
        );
        this.nAdvantageNumbers.forEach(nNumber => nNumber.style.width = `${maxNumberWidth}px`);
    }

    destroy() {
        window.removeEventListener('resize', this.updateDebounceBind);
    }
}