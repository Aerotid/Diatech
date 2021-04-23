import Granim from 'granim';

export default class Pulse {
    get nCanvas() {
        if (!this.canvas) {
            this.canvas = this.nRoot.querySelector('.pulse__canvas');
        }
        return this.canvas;
    }

    get nMask() {
        if (!this.mask) {
            this.mask = this.nRoot.querySelector('.pulse__mask');
        }
        return this.mask;
    }

    get nShade() {
        if (!this.shade) {
            this.shade = this.nRoot.querySelector('.pulse__shade');
        }
        return this.shade;
    }

    constructor(nRoot) {
        this.nRoot = nRoot;
        this.granimInstance = new Granim({
            element: this.nCanvas,
            name: 'pulse-gradient',
            direction: 'radial',
            opacity: [1, 1],
            isPausedWhenNotInView: true,
            states : {
                transitionSpeed: 6000,
                "default-state": {
                    gradients: [
                        ['#79c8ff', '#fff'],
                        ['#C66cff', '#fff'],
                        ['#E26082', '#fff'],
                    ]
                }
            }
        });
    }

    pulse(onComplete) {
        new TimelineLite({
            onComplete: () => {
                onComplete();
            }
        })
            .fromTo(this.nMask, 3, {width: 0, height: 0}, {width: '100%', height: '100%'}, 0)
            .fromTo(this.nShade, 3, {width: 0, height: 0}, {width: '110%', height: '110%'}, 0)
            .fromTo(this.nCanvas, 3, {autoAlpha: 1}, {autoAlpha: 0}, 0);
    }
}