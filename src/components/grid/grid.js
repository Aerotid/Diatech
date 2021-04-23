import {delay, innerHeight, listen, unlisten} from '../../common/helpers';

export default class Grid {
    static get ALLOWABLE_DROPOUT() {return -1}

    get nBody() {
        if (!this.body) {
            this.body = document.querySelector('body');
        }
        return this.body;
    }

    get nGridInnerWrapper() {
        if (!this.gridInnerWrapper) {
            this.gridInnerWrapper = this.nRoot.querySelector('[class*="__inner-wrapper"]');
        }
        return this.gridInnerWrapper;
    }

    get nBgImage() {
        if (!this.bgimage) {
            this.bgimage = this.nRoot.querySelector('[class$="__bg"]');
        }
        return this.bgimage;
    }
    
    constructor(nRoot) {
        this.nRoot = nRoot;
        this.onSomeNotFitContentBind = this.onSomeNotFitContent.bind(this);
        listen('fit-content-tracker:some-not-fit', this.onSomeNotFitContentBind);
        this.onAnyFitContentBind = this.onAnyFitContent.bind(this);
        listen('fit-content-tracker:any-fit', this.onAnyFitContentBind);
    }

    isFitContent() {
        const nRootCopy = this.nRoot.cloneNode(true);
        nRootCopy.classList.remove('auto-height');
        nRootCopy.removeAttribute('style');
        this.nBody.appendChild(nRootCopy);
        const containerHeight = innerHeight(nRootCopy);
        const contentHeight = [...nRootCopy.querySelectorAll('[class*="__row"]')].map(
                nRow => nRow.offsetHeight
            ).reduce((sum, rowHeight) => sum + rowHeight, 0);
        this.nBody.removeChild(nRootCopy);
        return containerHeight - contentHeight >= Grid.ALLOWABLE_DROPOUT;
    }

    onSomeNotFitContent() {
        this.nRoot.classList.add('auto-height');
        this.triggerResizeEvent();
    }

    onAnyFitContent() {
        this.nRoot.classList.remove('auto-height');
        this.triggerResizeEvent();
    }

    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    destroy() {
        unlisten('fit-content-tracker:some-not-fit', this.onSomeNotFitContentBind);
        unlisten('fit-content-tracker:any-fit', this.onAnyFitContentBind);
    }
}