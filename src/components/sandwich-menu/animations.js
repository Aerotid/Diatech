import TimelineLite from "gsap/TimelineLite";
import {isFunction} from "../../common/helpers";
import variables from "../../common/variables";
import $ from "jquery";

export const leaveAnimation = onComplete => {
    const nMenuButton = document.querySelector('.sandwich-menu-button');
    const nMenuButtonText = nMenuButton.querySelector('.sandwich-menu-button__text');
    const nBreadCrumb = document.querySelector('.breadcrumb');
    const nSandwichMenu = document.querySelector('.sandwich-menu');
    const nPreloader = document.querySelector('.preloader');
    let nSandwichMenuOffset = nSandwichMenu.classList.contains('sandwich-menu_offset-top');
    let nMenuItem = [...nSandwichMenu.querySelector('.sandwich-menu__list').children];
    let nSubMenuItem = [...nSandwichMenu.querySelectorAll('.sandwich-menu__list--submenu')];
    let nFooter = document.querySelector('.footer');
    let menuText = null;
    if(document.body.dataset.lang === 'EN') {
        menuText = 'menu';
    }
    else {
        menuText = 'меню';
    }
    nMenuItem = nMenuItem.reverse();
    if(nSandwichMenuOffset) {
        const tll = new TimelineLite({
            onComplete: () => isFunction(onComplete) ? onComplete() : null,
        })
            .staggerTo(nSubMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {
                transform: 'translateX(calc(-100% - 100px))',
                ease: Power0.easeNone
            }, variables.SANDWICH_STAGGER_DURATION_S)
            .staggerTo(nMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {
                transform: 'translateX(calc(-100% - 100px))',
                ease: Power0.easeNone
            }, variables.SANDWICH_STAGGER_DURATION_S)
            .to([nSandwichMenu, nBreadCrumb], .5, {autoAlpha: 0})
            .to(nFooter, .5, {backgroundColor: 'transparent'}, '-=.5')
            .set(document.documentElement, {className: '-=menu--show'})
            .set(nMenuButtonText, {textContent: menuText});
    }
    else {
        const tll = new TimelineLite({
            onComplete: () => isFunction(onComplete) ? onComplete() : null,
        })
            .staggerTo(nSubMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {
                transform: 'translateX(calc(-100% - 100px))',
                ease: Power0.easeNone
            }, variables.SANDWICH_STAGGER_DURATION_S)
            .staggerTo(nMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {
                transform: 'translateX(calc(-100% - 100px))',
                ease: Power0.easeNone
            }, variables.SANDWICH_STAGGER_DURATION_S)
            .to([nSandwichMenu, nBreadCrumb], .5, {autoAlpha: 0})
            //.to(nFooter, .5, {backgroundColor: 'transparent'})
            .set(document.documentElement, {className: '-=menu--show'}, '-=.5')
            .set(nMenuButtonText, {textContent: menuText});
    }
};

export const arriveAnimation = (onComplete, nSourceImage) => {
    const nMenuButton = document.querySelector('.sandwich-menu-button');
    const nMenuButtonText = nMenuButton.querySelector('.sandwich-menu-button__text');
    const nSandwichMenu = document.querySelector('.sandwich-menu');
    let nSandwichMenuOffset = nSandwichMenu.classList.contains('sandwich-menu_offset-top');
    const nBreadCrumb = document.querySelector('.breadcrumb');
    let nFooter = document.querySelector('.footer');
    let nMenuItem = [...nSandwichMenu.querySelector('.sandwich-menu__list').children];
    let nSubMenuItem = [...nSandwichMenu.querySelectorAll('.sandwich-menu__list--submenu')];
    let menuText = null;
    if(document.body.dataset.lang === 'EN') {
        menuText = 'close';
    }
    else {
        menuText = 'закрыть';
    }

    if(nSandwichMenuOffset){
        const tll = new TimelineLite({
            onComplete: () => isFunction(onComplete) ? onComplete() : null,
        })
            .set(nFooter, {backgroundColor: '#fff'})
            .set(nMenuButtonText, {textContent: menuText})
            .set(document.documentElement, {className: '+=menu--show'})
            .set([nMenuItem, nSubMenuItem], {transform: 'translateX(calc(-100% - 100px))'})
            .fromTo([nSandwichMenu, nBreadCrumb, nFooter], .5, {autoAlpha: 0}, {autoAlpha: 1})
            .staggerTo(nMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)'}, variables.SANDWICH_STAGGER_DURATION_S, '+=.15')
            .staggerTo(nSubMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)'}, variables.SANDWICH_STAGGER_DURATION_S, '+=.15');
    }
    else {
        const tll = new TimelineLite({
            onComplete: () => isFunction(onComplete) ? onComplete() : null,
        })
            .set(nMenuButtonText, {textContent: menuText})
            .set(document.documentElement, {className: '+=menu--show'})
            .set([nMenuItem, nSubMenuItem], {transform: 'translateX(calc(-100% - 100px))'})
            .fromTo([nSandwichMenu, nBreadCrumb], .5, {autoAlpha: 0}, {autoAlpha: 1})
            .staggerTo(nMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)'}, variables.SANDWICH_STAGGER_DURATION_S, '+=.15')
            .staggerTo(nSubMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)'}, variables.SANDWICH_STAGGER_DURATION_S, '+=.15');
    }
};