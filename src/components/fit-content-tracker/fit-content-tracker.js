import {debounce, emit} from '../../common/helpers';

export default class FitContentTracker {
    static get UPDATE_INTERVAL_MS() {return 100}

    constructor(blocks) {
        this.blocks = blocks;
        this.updateDebounceBind = debounce(
            this.update.bind(this),
            FitContentTracker.UPDATE_INTERVAL_MS,
            null,
            false
        );
        window.addEventListener('resize', this.updateDebounceBind);
        this.updateDebounceBind();
        this.isSomeNotFit = null;
    }

    update() {
        const isSomeNotFit = this.blocks.some(
            block => !block.isFitContent()
        );
        if (
            this.isSomeNotFit === null
            || (this.isSomeNotFit ^ isSomeNotFit)
        ) {
            this.isSomeNotFit = isSomeNotFit;
            if (this.isSomeNotFit) {
                emit('fit-content-tracker:some-not-fit');
            } else {
                emit('fit-content-tracker:any-fit');
            }
        }
    }

    destroy() {
        window.removeEventListener('resize', this.updateDebounceBind);
    }
}