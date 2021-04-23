import {TimelineLite} from 'gsap';

export const animMassiveWDelay = (divs, i) => {
    var del = 0;
    for (i = 0; i < divs.length; ++i) {
        del += 0.08;
        TweenMax.from(divs[i], 0.8, {
            xPercent: -100, delay: del
        })
        ;
    }
};
export const animTitle = (title) => {
    TweenMax.from(title, 0.8, {
        xPercent: -100,
    })
    ;
    TweenMax.from(title.nextSibling, 0.8, {
            xPercent: -100,
            delay: 0.16
        }
    )
    ;
};

export const hide = (el) => {
    new TimelineLite().to(el, .75, {autoAlpha: 0});
};

export const show = (el) => {
    new TimelineLite().to(el, .5, {autoAlpha: 1});
};

export const animImg = (image) => {
    TweenMax.fromTo(image, 1, {transform: 'scale(0.9)', autoAlpha: 0}, {transform: 'scale(1)', autoAlpha: 1});
};

export const animPerson = (person) => {
    TweenMax.to(person, 1, {transform: 'translateY(0)', autoAlpha: 1});
};

export const animActivity = (activity) => {
    TweenMax.fromTo(activity, 1, {transform: 'translateY(200px)', autoAlpha: 0}, {transform: 'translateY(0)', autoAlpha: 1});
};

export const animCaseTitle = (caseTitle) => {
    TweenMax.from(caseTitle, 1, {xPercent: -100});
};