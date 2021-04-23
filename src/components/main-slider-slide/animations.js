import {TimelineLite} from 'gsap';
import {animMassiveWDelay, animTitle} from '../../common/animations';
import {showPressAndHold} from "../../pages/index/animations";
import CSSRulePlugin from "gsap/CSSRulePlugin";

const getNCells = nSlide => [...nSlide.querySelectorAll(
    '.main-slider-slide__left, .main-slider-slide__middle, .main-slider-slide__right'
)];

export const switchToAnimationVideo = (prevSlide, nextSlide) => {
    const hideContent = () => new Promise((resolve, reject) => {
        new TimelineLite({
            onComplete: resolve,
        })
            .to(CSSRulePlugin.getRule(".main-slider:before"), .5, {cssRule: { autoAlpha: 0 }, ease: Power0.easeNone})
            .to(getNCells(prevSlide.nRoot), .5, {autoAlpha: 0})
            .set(getNCells(nextSlide.nRoot), {autoAlpha: 0});
    });

    const runVideo = () => new Promise((resolve, reject) => {
        const nVideo = prevSlide.nVideo;
        const nImg = nextSlide.nRoot.querySelector('[class$="bg"]');
        nVideo.style.opacity = 1;
        nImg.style.opacity = 0;
        nImg.style.visibility = 'hidden';
        nVideo.style.visibility = 'visible';
        nVideo.play();

        const onVideoEnded = async () => {
            setTimeout(function () {
                resolve();
                nVideo.removeEventListener('ended', onVideoEnded);
            }, (nVideo.duration - 2) * 1000)
        };
        nVideo.addEventListener('timeupdate', onVideoEnded);
    });

    const showContent = () => new Promise((resolve, reject) => {
        const nPress = document.querySelector('.press-and-hold');
        const nImg = nextSlide.nRoot.querySelector('[class$="bg"]');
        showPressAndHold(nPress);
        new TimelineLite({
            onComplete: () => {
                prevSlide.nVideo.currentTime = 0;
                resolve();
            },
        })
            .to(CSSRulePlugin.getRule(".main-slider:before"), .5, {cssRule: { autoAlpha: 1 }, ease: Power0.easeNone})
            .set(nextSlide.nRoot, {autoAlpha: 1})
            .to(getNCells(nextSlide.nRoot), .5, {autoAlpha: 1})
            .set(nImg, {autoAlpha: 1, delay: 2.5})
            .set(prevSlide.nRoot, {autoAlpha: 0})
            .set(prevSlide.nVideo, {autoAlpha: 0});

        var divs = nextSlide.nRoot.querySelectorAll('[class^="info-block"]'),
            i;
        animMassiveWDelay(divs, i)
    });

    return hideContent()
        .then(() => runVideo())
        .then(() => showContent());
};

export const switchToAnimationOpacity = (prevSlide, nextSlide) => {
    return new Promise((resolve, reject) => {
        new TimelineLite({
            onComplete: resolve,
        })

            .to(getNCells(prevSlide.nRoot), .5, {autoAlpha: 0}, 0)
            .to(prevSlide.nRoot, 1, {autoAlpha: 0}, .25)
            .to(nextSlide.nRoot, 1, {autoAlpha: 1}, .25)
            .fromTo(getNCells(nextSlide.nRoot), .5, {autoAlpha: 0}, {autoAlpha: 1}, .75)

    });

};