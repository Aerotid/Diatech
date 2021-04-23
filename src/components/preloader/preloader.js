import {emit} from '../../common/helpers';
import {TimelineLite} from 'gsap';

export default class Preloader {
    constructor() {
        this.nRoot = document.querySelector('.preloader');
    }

    show() {
        new TimelineLite()
            .to(this.nRoot, .5, {autoAlpha: 1});
    }

    hide() {
        new TimelineLite()
            .to(this.nRoot, .5, {autoAlpha: 0});
    }
}
