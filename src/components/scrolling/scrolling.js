import $ from 'jquery';
import 'fullpage.js/vendors/scrolloverflow';
import 'fullpage.js';
import {animImg, animMassiveWDelay, animActivity, animTitle, animCaseTitle} from "../../common/animations";
import {hideFooter, hideHeader, showHeader} from "../../pages/index/animations";
import {
    leaveAnimation as firstScreenLeaveAnimation,
    arriveAnimationAlt as firstScreenArriveAnimationAlt
} from "../main-first-screen/animations";
import {
    leaveAnimation as secondScreenLeaveAnimation,
    arriveAnimation as secondScreenArriveAnimation
} from "../main-slider/animations";
import {enableMenu, disableMenu} from "../sandwich-menu-button/sandwich-menu-button";
import variables from "../../common/variables";
import TimelineLite from "gsap/TimelineLite";
import {canvasMove} from "../radiance/animation";
import ScrollMagic from 'scrollmagic';
import {debounce, emit, throttle, getDeviceType} from "../../common/helpers";

let controller = new ScrollMagic.Controller();

export default class Scrolling {
    constructor(mainSlider, caseIndicators) {
        const nHeader = document.querySelector('.header');
        const nFooter = document.querySelector('.footer');
        const nContent = document.querySelector('.main-first-screen .main-first-screen__inner-wrapper');
        const moveDebounce = debounce(canvasMove, 27, null, false);
        //const moveThrottle = throttle(canvasMove, 200);
        let activeSection;
        this.enabled = true;
        this.moveThrottle = canvasMove;
        this.customAnimationPlayed = false;
        this.initPromise = new Promise((resolve, reject) => {
            this.fullpageInstance = $('#fullpage').fullpage({
                licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
                scrollOverflow: true,
                scrollOverflowOptions: {
                    scrollbars: false,
                    indicators: caseIndicators,
                    keyBindings: true
                },
                onLeave: (index, nextIndex, direction) => {
                    if (document.documentElement.classList.contains('menu--show')) {
                        return false;
                    }
                    disableMenu(document.querySelector('.sandwich-menu-button'));
                    activeSection = index;
                    if (!this.enabled) {
                        return false;
                    }
                    let leavingSection = this;
                    if (index === 1 && !this.customAnimationPlayed) {
                        document.querySelector('body').classList.remove('awwwards');
                        this.disable();
                        this.disableCrop();
                        new TimelineLite()
                            .set(".radiance .radiance__crop", {className: "+=radiance__crop_biggest"});
                        setTimeout(() => {
                            firstScreenLeaveAnimation(() => {
                                this.customAnimationPlayed = true;
                                this.enable();
                                $.fn.fullpage.silentMoveTo(2);
                            });
                        }, 1000);
                        new TimelineLite()
                            .set(".radiance .radiance__crop", {className: "-=radiance__crop_biggest"}, 4);
                        return false;
                    }
                    if (index === 2 && nextIndex === 1 && !this.customAnimationPlayed) {
                        this.enableCrop();

                        this.disable();
                        secondScreenLeaveAnimation(() => {
                            this.customAnimationPlayed = true;
                            this.enable();
                            $.fn.fullpage.silentMoveTo(1);
                        });
                        return false;
                    }
                    if (index === 2 && nextIndex === 3 && window.animstop !== 2) {
                        var arrayOfAnimStrings = document.getElementById('activity_anim').innerHTML.split(' ');
                        document.getElementById('activity_anim').innerHTML = arrayOfAnimStrings.map(str => `<div class="thirdslide-infoblocks">${str}</div>`).join(' ');
                        arrayOfAnimStrings = document.getElementById('activity_anim_2').innerHTML.split(' ');
                        document.getElementById('activity_anim_2').innerHTML = arrayOfAnimStrings.map(str => `<div class="thirdslide-infoblocks">${str}</div>`).join(' ');
                        var divs = document.querySelectorAll('.thirdslide-infoblocks'), i;
                        animMassiveWDelay(divs, i);
                        if (document.querySelector('.activity__titles')) {
                            animActivity(document.querySelector('.activity__titles'));
                        }

                        const sceneCaseTitle = new ScrollMagic.Scene({
                            triggerElement: document.querySelector('.cases__title'),
                            triggerHook: 1,
                            reverse: false,
                            offset: -200
                        }).on('start', function () {
                            animCaseTitle(document.querySelector('.cases__title'));
                        }).addTo(controller);
                        window.animstop = 2;
                    }
                    if (nextIndex === 2) {
                        mainSlider.enableKeyControls();
                    } else {
                        mainSlider.disableKeyControls();
                    }
                    this.customAnimationPlayed = false;
                    if ((index === 2 && nextIndex === 3) || (index === 3 && nextIndex === 2)) {
                        hideHeader(nHeader);
                        hideFooter(nFooter);
                    }
                },
                afterLoad: (anchorLink, index) => {
                    setTimeout(() => {
                        resolve(() => {z});
                    }, 2000);

                    if (index === 1) {
                        document.querySelector('body').classList.add('awwwards');
                        this.enableCrop();
                        document.querySelector('.main-first-screen-wrapper').addEventListener('click', function () {
                            $.fn.fullpage.silentMoveTo(2);
                        });
                    }

                    let nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
                    if (nIscrollInstance) {
                        nIscrollInstance.scrollTo(0, 0, variables.SCROLL_UP_DURATION_S, IScroll.utils.ease.quadratic);
                    }
                    if (activeSection === 1 && index === 2) {
                        this.disable();
                        secondScreenArriveAnimation(() => {
                            this.enable()
                        }, document.querySelector('.main-first-screen .main-first-screen__bg'));
                    } else if (activeSection === 2 && index === 1) {
                        this.disable();
                        firstScreenArriveAnimationAlt(() => {
                            this.enable()
                        }, document.querySelector('.main-slider-slide_active .main-slider-slide__bg'));
                    } else if (activeSection === 2 && index === 3) {
                        nHeader.parentNode.removeChild(nHeader);
                        nFooter.parentNode.removeChild(nFooter);
                        document.querySelector('.active .fp-scroller').appendChild(nHeader);
                        document.querySelector('.active .fp-scroller').appendChild(nFooter);
                        showHeader(nHeader);
                        showHeader(nFooter);
                        document.querySelector('.sandwich-menu').classList.add('sandwich-menu_offset-top');

                        let sceneScroll = new ScrollMagic.Scene({
                            triggerElement: '.main-rest__wrapper',
                            triggerHook: 0,
                            offset: 200,
                        }).on('start', function () {
                            $.fn.fullpage.setKeyboardScrolling(false);
                        }).on('leave', function () {
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }).addTo(controller);

                    } else if (activeSection === 3 && index === 2) {
                        document.querySelector('.barba-container').appendChild(nHeader);
                        document.querySelector('.barba-container').appendChild(nFooter);
                        showHeader(nHeader);
                        showHeader(nFooter);
                        document.querySelector('.sandwich-menu').classList.remove('sandwich-menu_offset-top');
                    }
                    enableMenu(document.querySelector('.sandwich-menu-button'));
                },
            });
        });
    }

    disable() {
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
    }

    enableCrop() {
        document.addEventListener('mousemove', this.moveThrottle);
    }

    disableCrop() {
        document.removeEventListener('mousemove', this.moveThrottle);
    }
}
const subti = document.getElementsByClassName("case__sub-title");
for (let i = 0; i < subti.length; i++) {
    let scene = new ScrollMagic.Scene({
        triggerElement: subti[i],
        triggerHook: 1,
        reverse: false,
        offset: -60
    }).on('start', function () {
        animTitle(this.triggerElement());
    }).addTo(controller)
}

const nCaseLeft = document.getElementsByClassName("case__left");
for (let i = 0; i < nCaseLeft.length; i++) {
    let scene = new ScrollMagic.Scene({
        triggerElement: nCaseLeft[i],
        triggerHook: 1,
        reverse: false,
        offset: -60
    }).on('start', function () {
        animImg(this.triggerElement());
    }).addTo(controller)
}