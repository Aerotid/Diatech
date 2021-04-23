import {TimelineLite} from "gsap";

const ANIMATION_DURATION_S = .5;

const fadeOut = nNode => new Promise((resolve, reject) => {
    new TimelineLite({
        onComplete: resolve,
    })
        .to(nNode, ANIMATION_DURATION_S, {autoAlpha: 0});
});

const fadeIn = nNode => new Promise((resolve, reject) => {
    new TimelineLite({
        onComplete: resolve,
    })
        .to(nNode, ANIMATION_DURATION_S, {autoAlpha: 1});
});

const leaveFirstScreenAnimation = nFirstScreen => {
    const nHeader = nFirstScreen.querySelector('.header');
    const nFooter = nFirstScreen.querySelector('.footer');
    const nScrollDown = nFirstScreen.querySelector('.scrollDown');
};

export {
    fadeOut,
    fadeOut as hidePressAndHold,
    fadeOut as hideHeader,
    fadeOut as hideFooter,
    fadeIn,
    fadeIn as showPressAndHold,
    fadeIn as showHeader,
    fadeIn as showFooter,
    leaveFirstScreenAnimation,
}