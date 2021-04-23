import Inputmask from 'inputmask';
import autosize from 'autosize';
import {isFunction} from '../../common/helpers';


export class Input {
    get nInput () {
        if (!this.input) {
            this.input = this.nRoot.querySelector('[data-input]');
        }
        return this.input;
    }

    constructor(nRoot) {
        this.nRoot = nRoot;
        let input = nRoot.querySelector('[data-input]');
        let label = nRoot.querySelector('[data-label]');
        input.addEventListener('focus', () => {
            label.classList.add('transform');
        });
        input.addEventListener('blur', () => {
            if (input.value.length === 0) {
                label.classList.remove('transform');
            }
        });

        this.nInput.addEventListener('input', this.validate.bind(this));
    }

    validate(customValidate) {
        let isValid = !(this.nInput.hasAttribute('required') && this.nInput.value.length === 0);
        if (isFunction(customValidate)) {
            isValid &= customValidate();
        }
        if (!isValid) {
            this.markAsInvalid();
        } else {
            this.clearInvalid();
        }
        return isValid;
    }

    markAsInvalid() {
        this.nInput.classList.add('input-group__input_invalid');
    }

    clearInvalid() {
        this.nInput.classList.remove('input-group__input_invalid');
    }
}

export class Phone extends Input{
    constructor(nRoot) {
        super(nRoot);
        let im = new Inputmask({
            mask: '+7 (999) 999 99 99',
            showMaskOnHover: false
        });
        im.mask(this.nInput);
    }

    validate() {
        return super.validate(() => this.nInput.value.indexOf('_') === -1);
    }
}

export class Message extends Input{
    constructor(nRoot) {
        super(nRoot);
        autosize(this.nInput)
    }
}

export class Email extends Input{
    constructor(nRoot) {
        super(nRoot);
    }

    validate() {
        return super.validate(() => (/\S+@\S+\.\S+/.test(this.nInput.value)));
    }
}