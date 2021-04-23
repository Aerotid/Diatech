import Barba from 'barba.js';
import MainSliderSlide from '../../components/main-slider-slide/main-slider-slide';
import MainSlider from '../../components/main-slider/main-slider';
import MainFirstScreen from '../../components/main-first-screen/main-first-screen';
import PressAndHold from '../../components/press-and-hold/press-and-hold';
import Advantages from '../../components/advantages/advantages';
import {Img, listen, loadImages, throttle} from '../../common/helpers';
import Preloader from '../../components/preloader/preloader';
import Scrolling from '../../components/scrolling/scrolling';
import {arriveAnimation} from '../../components/main-first-screen/animations';
import $ from 'jquery';
import {canvasMove} from "../../components/radiance/animation";

import {
    showPressAndHold,
    hidePressAndHold,
} from './animations';
import Radiance from '../../components/radiance/radiance';
import variables from "../../common/variables";
import {hide, show} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "index",
    onEnter: function() {
    },
    onEnterCompleted: async function() {
        await loadImages(
            Img("scene-01", require("../../images/main-slider/scene-01.jpg")),
            Img("scene-02", require("../../images/main-slider/scene-02.jpg")),
            Img("scene-03", require("../../images/main-slider/scene-03.jpg")),
            Img("scene-04", require("../../images/main-slider/scene-04.jpg")),
            Img("scene-01-mobile", require("../../images/main-slider/scene-01-mobile.jpg")),
            Img("scene-02-mobile", require("../../images/main-slider/scene-02-mobile.jpg")),
            Img("scene-03-mobile", require("../../images/main-slider/scene-03-mobile.jpg")),
            Img("scene-04-mobile", require("../../images/main-slider/scene-04-mobile.jpg")),
            Img("crop", require("../../images/2.jpg")),
        );

        const slides = [
            ...document.querySelectorAll('.main-slider-slide')
        ].map(nSlide => new MainSliderSlide(nSlide));
        const fullScreenBlocks = slides.concat();
        fullScreenBlocks.push(
            new MainFirstScreen(document.querySelector('.main-first-screen'))
        );
        let nCases = document.getElementsByClassName('cases__case');
        let caseIndicators = [];
        let ratio = 30;

        this.moveThrottle = canvasMove;

        for (let i = 0; i < nCases.length; i++) {
            let nCase = nCases[i];
            let nCaseImg = nCase.querySelector('.case__img');

            nCaseImg.style.top = (nCase.offsetTop / ratio) + 'px';
            ratio = ratio / 1.3;

            caseIndicators[i] = {
                el: nCase.querySelector('.case__container'),
                resize: false,
                ignoreBoundaries: true,
                speedRatioY: 0.1
            };
        }

        const mainSlider = new MainSlider(document.querySelector('.main-slider'), slides);
        const pressAndHold = new PressAndHold(document.querySelector('.press-and-hold'), () => {
            pressAndHold.toInitialState();
            mainSlider.switchToNext();
        });
        new Advantages(document.querySelector('.advantages'));
        this.scrolling = new Scrolling(mainSlider, caseIndicators);
        listen(
            'main-slider:before-changed',
            () => {
                hidePressAndHold(pressAndHold.nRoot);
                this.scrolling.disable();
            },
            mainSlider.nRoot
        );
        listen(
            'main-slider:changed',
            () => {
                showPressAndHold(pressAndHold.nRoot);
                this.scrolling.enable();
            },
            mainSlider.nRoot
        );
        await this.scrolling.initPromise;
        document.querySelector('.preloader').style.backgroundColor = 'transparent';
        document.querySelector('.main-first-screen__bg-wrapper').appendChild(document.querySelector('.radiance'));
        hide(document.querySelector('.preloader'));

        let mouseY = 0, mouseX = 0;
        const mainFirstScreenBgWrapper = document.querySelector('.main-first-screen__bg-wrapper');
        document.addEventListener('mousemove', e => {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });
        await arriveAnimation();
        this.scrolling.enable();

        const nScrollDown = document.querySelector('.main-first-screen__scroll-down');
        nScrollDown.addEventListener('click', function () {
            $.fn.fullpage.moveSectionDown();
        });
        const nScrollUp = document.querySelector('.main-rest__scroll-up');
        nScrollUp.addEventListener('click', function () {
            const nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
            nIscrollInstance.scrollTo(0, 0, variables.SCROLL_UP_DURATION_S, IScroll.utils.ease.quadratic);
            setTimeout(function() {
                $.fn.fullpage.moveSectionUp();
            }, variables.SCROLL_UP_DURATION_S);
            setTimeout(function() {
                $.fn.fullpage.moveSectionUp();
            }, variables.SCROLL_UP_DURATION_S * 2);
        });
        listen('main-slider:changed', $.fn.fullpage.reBuild(), mainSlider.nRoot);

        this.setSize = function () {
            const nRadianceImage = document.querySelector('.radiance__image');
            nRadianceImage.style.width = document.querySelector('.main-first-screen__bg-wrapper').offsetWidth + 'px';
            nRadianceImage.style.height = document.querySelector('.main-first-screen__bg-wrapper').offsetHeight + 'px';
        };
        this.setSize();
        window.addEventListener("resize", this.setSize);
    },
    onLeave: function() {
        document.querySelector('body').classList.remove('awwwards');
        document.querySelector('.preloader').style.backgroundColor = '#fff';
        document.querySelector('.preloader').appendChild(document.querySelector('.radiance'));
        this.scrolling.disableCrop();
        show(document.querySelector('.radiance'));
        window.removeEventListener("resize", this.setSize)
    },
    onLeaveCompleted: function() {

    }
}).init();