import ProgressBar from 'progressbar.js';
import {isFunction} from '../../common/helpers';

export default class PressAndHold {
    static get PRESS_DURATION_MS() { return 1000 };
    static get RELEASE_DURATION_MS() { return 300 };

    get nProgressBar() {
        if (!this.progressBar) {
            this.progressBar = this.nRoot.querySelector('.press-and-hold__progress-bar');
        }
        return this.progressBar;
    }

    get nProgressBarIeFix() {
        if (!this.progressBarIeFix) {
            this.progressBarIeFix = this.nRoot.querySelector('.press-and-hold__progress-bar-ie-fix');
        }
        return this.progressBarIeFix;
    }

    constructor(nRoot, onTrigger) {
        this.nRoot = nRoot;
        this.onTrigger = isFunction(onTrigger) ? onTrigger : () => {};
        this.onPressBind = this.onPress.bind(this);
        this.nRoot.addEventListener('mousedown', e => {
            if (e.which === 1) {
                e.preventDefault();
                this.onPressBind()
            }
        });
        this.nRoot.addEventListener('touchstart', this.onPressBind);
        this.onReleaseBind = this.toInitialState.bind(this);
        document.addEventListener('mouseup', this.onReleaseBind);
        document.addEventListener('touchend', this.onReleaseBind);
        this.progressBar = new ProgressBar.Circle(this.nProgressBar, {
            strokeWidth: 6,
            color: '#425cff',
        });
        this.progressBarIeFix = new ProgressBar.Circle(this.nProgressBarIeFix, {
            strokeWidth: 6,
            color: '#425cff',
        });
    }

    onPress() {
        this.progressBar.animate(
            1,
            {duration: PressAndHold.PRESS_DURATION_MS},
            this.onTrigger
        );
        this.progressBarIeFix.animate(
            1,
            {duration: PressAndHold.PRESS_DURATION_MS},
            this.onTrigger
        );
    }

    toInitialState() {
        this.progressBar.animate(
            0,
            {duration: PressAndHold.RELEASE_DURATION_MS},
        );
        this.progressBarIeFix.animate(
            0,
            {duration: PressAndHold.RELEASE_DURATION_MS},
        );
    }
}