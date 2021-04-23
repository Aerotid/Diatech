import variables from '../../common/variables';
import {isFunction} from '../../common/helpers';

export const arriveAnimation = onComplete => {
    const nHeader = document.querySelector('.header');
    const nFooter = document.querySelector('.footer');

    const nFirstScreen = document.querySelector('.main-first-screen');
    const nWrapper = nFirstScreen.querySelector('.main-first-screen__inner-wrapper');
    const nInfoBlock = document.querySelector('.info-block-1');
    const nTitleParts = [...nInfoBlock.querySelectorAll('.info-block-1__title > [data-text-part]')];
    const nInfoBlockText = nInfoBlock.querySelectorAll('.info-block-1__text');
    const nStaggerAnimationNodes = nTitleParts.concat([nInfoBlockText]);
    const nBorder = nInfoBlock.querySelector('.info-block-1__title-border');
    const nScrollDown = nFirstScreen.querySelector('.scroll-down');
    const nCanvasCrop = document.querySelector('.radiance .radiance__crop');
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    tll
        .set([nWrapper, nHeader, nFooter], {autoAlpha: 0})
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .set(nBorder, {height: 0})
        .to([nWrapper, nHeader, nFooter, nScrollDown], .5, {autoAlpha: 1}, 0)
        .to(nBorder, .5, {height: '100%', ease: Power0.easeNone}, 0)
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)', ease: Power1.easeOut},
            variables.TEXT_STAGGER_DURATION_S,
            .25
        )
        //.to(nCanvasCrop, 2, {visibility: 'visible', opacity: .3});
};

export const arriveAnimationAlt = onComplete => {
    const nFirstScreen = document.querySelector('.main-first-screen');
    const nWrapper = nFirstScreen.querySelector('.main-first-screen__inner-wrapper');
    const nInfoBlock = document.querySelector('.info-block-1');
    const nTitleParts = [...nInfoBlock.querySelectorAll('.info-block-1__title > [data-text-part]')];
    const nInfoBlockText = nInfoBlock.querySelectorAll('.info-block-1__text');
    const nStaggerAnimationNodes = nTitleParts.concat([nInfoBlockText]);
    const nBorder = nInfoBlock.querySelector('.info-block-1__title-border');
    const nScrollDown = nFirstScreen.querySelector('.scroll-down');

    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    tll
        .set([nWrapper], {autoAlpha: 0})
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .set(nBorder, {height: 0})
        .to([nWrapper, nScrollDown], .5, {autoAlpha: 1}, 0)
        .to(nBorder, .5, {height: '100%', ease: Power0.easeNone}, 0)
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            .25
        );
};

export const leaveAnimation = onComplete => {
    const nHeader = document.querySelector('.header');
    const nFooter = document.querySelector('.footer');

    const nFirstScreen = document.querySelector('.main-first-screen');
    const nRadiance = nFirstScreen.querySelector('.radiance');
    const nWrapper = nFirstScreen.querySelector('.main-first-screen__inner-wrapper');
    const nBgImage = nFirstScreen.querySelector('.main-first-screen__bg');
    const nBgWrapper = nFirstScreen.querySelector('.main-first-screen__bg-wrapper');
    const nInfoBlock = document.querySelector('.info-block-1');
    const nTitleParts = [...nInfoBlock.querySelectorAll('.info-block-1__title > [data-text-part]')];
    const nInfoBlockText = nInfoBlock.querySelectorAll('.info-block-1__text');
    const nStaggerAnimationNodes = nTitleParts.concat([nInfoBlockText]);
    const nBorder = nInfoBlock.querySelector('.info-block-1__title-border');
    const nScrollDown = nFirstScreen.querySelector('.scroll-down');
    const nActiveSlide = document.querySelector('.main-slider-slide_active');
    const nActiveSlideBgWrapper = nActiveSlide.querySelector('.main-slider-slide__bg-wrapper');
    let mobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !window.MSStream;
    let nActiveSlideBg = null;
    if(mobile) {
        nActiveSlideBg = nActiveSlideBgWrapper.querySelector('.main-slider-slide__bg_mobile');
    }
    else {
        nActiveSlideBg = nActiveSlideBgWrapper.querySelector('.main-slider-slide__bg');
    }
    nBgWrapper.insertBefore(nActiveSlideBg, nBgWrapper.firstChild);
    const tll = new TimelineLite({
        onComplete: () => {
            isFunction(onComplete) ? onComplete() : null;
            nActiveSlideBgWrapper.insertBefore(nActiveSlideBg, nActiveSlideBgWrapper.firstChild);
        }
    })
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(calc(-100% - 100px))', ease: Power0.easeNone},
            variables.TEXT_STAGGER_DURATION_S,
            0
        )
        .addLabel('stagger-over')
        .fromTo(nActiveSlideBg, 1, {autoAlpha: 0}, {autoAlpha: 1}, 'stagger-over-=1')
        .fromTo(nRadiance, 1, {autoAlpha: 1}, {autoAlpha: 0}, 'stagger-over-=1')
        .to(nBorder, .5, {height: 0, ease: Power0.easeNone}, 'stagger-over-=.25')
        .to([nWrapper, nScrollDown], .5, {autoAlpha: 0}, 'stagger-over-=.25');
};