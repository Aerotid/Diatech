import {normalizeWheel, debounce, throttle} from '../../common/helpers';
import {TimelineLite} from 'gsap';
import ScrollMagic from 'scrollmagic';

export default class ScrollController {
    constructor(nParts) {
        this.nParts = nParts;
        this.currentPartIndex = 0;
        this.onWheelBind = this.onWheel.bind(this);
        this.onScrollDebounceBind = debounce(this.onScroll.bind(this), 500, null, false);
        this.moveBindThrottle = throttle(this.move.bind(this), 1000);
        this.onTouchStartBind = this.onTouchStart.bind(this);
        this.onTouchEndBind = this.onTouchEnd.bind(this);
        this.inProgress = false;
        this.touchStartY = null;
        this.enable();
    }

    enable() {
        window.addEventListener('wheel', this.onWheelBind);
        window.addEventListener('scroll', this.onScrollDebounceBind);
        window.addEventListener('touchmove', this.onTouchMove, {passive: false});
        window.addEventListener('touchstart', this.onTouchStartBind);
        window.addEventListener('touchend', this.onTouchEndBind);
    }

    disable() {
        window.removeEventListener('wheel', this.onWheelBind);
        window.removeEventListener('scroll', this.onScrollDebounceBind);
        window.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener('touchstart', this.onTouchStartBind);
        window.removeEventListener('touchend', this.onTouchEndBind);
    }

    onTouchMove(e) {
        e.preventDefault();
    }

    onTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    onTouchEnd(e) {
        const delta = e.changedTouches[0].clientY - this.touchStartY;
        if (delta === 0) {
            return;
        }
        delta > 0 ? this.moveBackward() : this.moveForward();
    }

    onWheel(e) {
        e.preventDefault();
        this.moveBindThrottle(e);
    }

    move(e) {
        const isForward = (x, y) => x > 0 || y > 0;
        const { spinX: x, spinY: y } = normalizeWheel(e);
        isForward(x, y) ? this.moveForward() : this.moveBackward();
    }

    moveForward() {
        if (this.isNearRightBound() || this.inProgress) {
            return;
        }
        this.inProgress = true;
        const nNextPart = this.nParts[++this.currentPartIndex];
        new TimelineLite({
            onComplete: this.onMoveComplete.bind(this),
        })
            .to(window, .5, {scrollTo: nNextPart});
    }

    moveBackward() {
        if (this.isNearLeftBound() || this.inProgress) {
            return;
        }
        this.inProgress = true;
        const nNextPart = this.nParts[--this.currentPartIndex];
        new TimelineLite({
            onComplete: this.onMoveComplete.bind(this),
        })
            .to(window, .5, {scrollTo: nNextPart});
    }

    moveTo(index) {
        if (this.isOutOfBounds(index) || this.inProgress) {
            return;
        }
        this.inProgress = true;
        const nNextPart = this.nParts[index];
        this.currentPartIndex = index;
        new TimelineLite({
            onComplete: this.onMoveComplete.bind(this),
        })
            .to(window, .5, {scrollTo: nNextPart});
    }

    onMoveComplete() {
        this.inProgress = false;
        const nPart = this.nParts[this.currentPartIndex];
        const ctrl = new ScrollMagic.Controller();
        if (nPart.hasAttribute('data-smooth-part')) {
            this.disable();
            new ScrollMagic.Scene({
                triggerElement: nPart,
                triggerHook: 'onLeave',
            })
                .on('leave', e => {
                    ctrl.destroy(true);
                    this.enable();
                    this.moveTo(this.currentPartIndex - 1);
                })
                .addTo(ctrl);
        } else {
        }
    }

    isNearLeftBound() {
        return this.currentPartIndex === 0;
    }

    isNearRightBound() {
        return this.currentPartIndex === this.nParts.length - 1;
    }

    isOutOfBounds(index) {
        return index < 0 || index >= this.nParts.length;
    }

    onScroll(e) {
        e.preventDefault();
    }
}