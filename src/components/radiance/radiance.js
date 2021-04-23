import {TimelineLite} from 'gsap';

export default class Radiance {
    get nCanvas() {
        if (!this.canvas) {
            this.canvas = this.nRoot.querySelector('.radiance__canvas');
        }
        return this.canvas;
    }
    constructor(nRoot) {
        this.nRoot = nRoot;
        this.radiance = this.nRoot.querySelectorAll('.radiance__item_on');
        this.radianceLast = this.nRoot.querySelector('.radiance__item_four');
        const ANIMATION_DURATION_S = 10;

        const myAnimation = new TimelineLite({
            onComplete: () => {
                const myAnimation2 = new TimelineLite();
                myAnimation2
                    .set(this.radiance, {autoAlpha: 0})
                    .set(this.radianceLast, {autoAlpha: 1})
                    .to(this.radianceLast, 5, {autoAlpha: 0, onComplete: () => myAnimation.restart()}, ANIMATION_DURATION_S);
            }
        });

        myAnimation.staggerTo(this.radiance, 5, {
            autoAlpha: 1,
            delay: ANIMATION_DURATION_S,
        }, ANIMATION_DURATION_S);
    }
}