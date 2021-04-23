import TimelineLite from "gsap/TimelineLite";
import {isFunction} from "../../common/helpers";
import variables from "../../common/variables";
import CSSRulePlugin from "gsap/CSSRulePlugin";

export const leaveAnimation = onComplete => {
    const nFirstScreen = document.querySelector('.main-first-screen');
    const nActiveSlide = document.querySelector('.main-slider-slide_active');
    const nPressAndHold = document.querySelector('.main-slider__press-and-hold');
    const nNavigation  = document.querySelector('.main-slider__navigation');
    const nWrapper = nActiveSlide.querySelector('.main-slider-slide__inner-wrapper');
    //const nHeader = document.querySelector('.header');
    //const nFooter = document.querySelector('.footer');
    const nTitleParts = [...document.querySelectorAll('.main-slider__info-block-3 .info-block-3__title > *')];
    let nInfoBlockText = [...document.querySelectorAll(
        '.main-slider__info-block-3 .info-block-3__sub-text, .main-slider__info-block-3 .info-block-3__main-text, .main-slider__info-block-3 .info-block-3__link, .info-block-3__buttons, .fixed-buttons__container'
    )];
    nInfoBlockText = nInfoBlockText.concat(
        [...nActiveSlide.querySelectorAll(
            '.info-block-2'
        )]
    );
    const nStaggerAnimationNodes = nTitleParts.concat(nInfoBlockText).reverse();
    const nActiveSlideBgWrapper = nActiveSlide.querySelector('.main-slider-slide__bg-wrapper');
    const nActiveSlideBg = nActiveSlideBgWrapper.querySelector('.main-slider-slide__bg');
    const nRadiance = nFirstScreen.querySelector('.radiance');
    const nFirstScreenBgWrapper = nRadiance.parentNode;
    nActiveSlideBgWrapper.insertBefore(nRadiance, nActiveSlideBgWrapper.firstChild);
    const tll = new TimelineLite({
        onComplete: () => {
            isFunction(onComplete) ? onComplete() : null;
            nFirstScreenBgWrapper.appendChild(nRadiance)
        }
    })
        .to(CSSRulePlugin.getRule(".main-slider:before"), .5, {cssRule: { autoAlpha: 0 }, ease: Power0.easeNone})
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(calc(-100% - 100px))', ease: Power0.easeNone},
            variables.TEXT_STAGGER_DURATION_S,
            0
        )
        .addLabel('stagger-over')
        .fromTo(nActiveSlideBg, 1, {autoAlpha: 1}, {autoAlpha: 0}, 'stagger-over-=1')
        .fromTo(nRadiance, 1, {autoAlpha: 0}, {autoAlpha: 1}, 'stagger-over-=1')
        .to([nWrapper, nPressAndHold, nNavigation], .5, {autoAlpha: 0}, 'stagger-over-=.25');
};

export const arriveAnimation = (onComplete, nSourceImage) => {
    const nPressAndHold = document.querySelector('.main-slider__press-and-hold');
    const nNavigation  = document.querySelector('.main-slider__navigation');
    const nActiveSlide = document.querySelector('.main-slider-slide_active');
    const nWrapper = nActiveSlide.querySelector('.main-slider-slide__inner-wrapper');
    const nBgImage = nActiveSlide.querySelector('.main-slider-slide__bg');
    //const nHeader = document.querySelector('.header');
    //const nFooter = document.querySelector('.footer');
    const nTitleParts = [...document.querySelectorAll('.main-slider__info-block-3 .info-block-3__title > *')];
    let nInfoBlockText = [...document.querySelectorAll(
        '.main-slider__info-block-3 .info-block-3__sub-text, .main-slider__info-block-3 .info-block-3__main-text, .main-slider__info-block-3 .info-block-3__link, .info-block-3__buttons, .fixed-buttons__container'
    )];
    nInfoBlockText = nInfoBlockText.concat(
        [...nActiveSlide.querySelectorAll(
            '.info-block-2'
        )]
    );
    const nStaggerAnimationNodes = nTitleParts.concat(nInfoBlockText);
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    })
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .fromTo([nWrapper, nPressAndHold, nNavigation], .5, {autoAlpha: 0}, {autoAlpha: 1})
        .to(CSSRulePlugin.getRule(".main-slider:before"), .5, {cssRule: { autoAlpha: 1 }, ease: Power0.easeNone})
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            '-=.25'
        );
};