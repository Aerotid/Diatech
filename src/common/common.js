import elementDatasetPolyfill from 'element-dataset';
import 'objectFitPolyfill';
import '../components/sandwich-menu-button/sandwich-menu-button';
import '../components/sandwich-menu/sandwich-menu';
import IScroll from 'iscroll';
window.IScroll = IScroll;
import Barba from 'barba.js';
import $ from 'jquery';
window.jQuery = $;
import Radiance from "../components/radiance/radiance";
import {getTransition} from './page-transition';
import {isFunction, isIE, nGetBody} from './helpers'
import TimelineLite from "gsap/TimelineLite";
import variables from "./variables";
import {enableMenu} from "../components/sandwich-menu-button/sandwich-menu-button";

window.addEventListener('load', () => {
    elementDatasetPolyfill();
    objectFitPolyfill();
});

const nPreloader = document.querySelector('.preloader');
new TimelineLite()
    .set(nPreloader, {autoAlpha: 1});

enableMenu(document.querySelector('.sandwich-menu-button'));

let radiance = new Radiance(document.querySelector('.radiance'));

// let nLangSelector = document.querySelector('.lang-selector_mobile');
// nLangSelector.parentNode.removeChild(nLangSelector);
// document.querySelector('.sandwich-menu').appendChild(nLangSelector);

const GeneralTransition = Barba.BaseTransition.extend({
    sourceNamespace: null,
    targetNamespace: null,
    start: function() {
       
      this.newContainerLoading.then(() => {
        const [sourceNamespace, targetNamespace] = [...document.querySelectorAll("[data-namespace]")].map(node => node.dataset.namespace);
        const transition = getTransition(sourceNamespace, targetNamespace);
        if (isFunction(transition)) {
          transition(this);
        }
      });
    },
});

const InnerTransition = Barba.BaseTransition.extend({
    sourceNamespace: null,
    targetNamespace: null,
    start: function() {
        this.newContainerLoading.then(() => {

            const tll = new TimelineLite({
                onComplete: () => {
                    window.scrollTo(0, 0);
                    if(document.querySelector('.sandwich-menu').classList.contains('sandwich-menu_offset-top')) {
                        document.querySelector('.sandwich-menu').classList.remove('sandwich-menu_offset-top');
                    }
                    if ($('html').hasClass('fp-enabled')) {
                        $.fn.fullpage.destroy('all');
                    }
                    this.done();
                }
            })
            .to(nPreloader, .5, {autoAlpha: 1});
        });
    },
});

const MenuTransition = Barba.BaseTransition.extend({
    sourceNamespace: null,
    targetNamespace: null,
    start: function() {
        this.newContainerLoading.then(() => {
            const nHeader = this.oldContainer.querySelector('.header');
            const nFooter = this.oldContainer.querySelector('.footer');
            const nBreadCrumb = nHeader.querySelector('.breadcrumb');
            const nMenuButton = document.querySelector('.sandwich-menu-button');
            const nMenuButtonText = nMenuButton.querySelector('.sandwich-menu-button__text');
            const nSandwichMenu = document.querySelector('.sandwich-menu');
            let nMenuItem = [...nSandwichMenu.querySelector('.sandwich-menu__list').children];
            let nSubMenuItem = [...nSandwichMenu.querySelectorAll('.sandwich-menu__list--submenu')];
            nMenuItem = nMenuItem.reverse();
            const tll = new TimelineLite({
                onComplete: () => {
                    document.documentElement.classList.remove('menu--show');
                    if(document.querySelector('.sandwich-menu').classList.contains('sandwich-menu_offset-top')) {
                        document.querySelector('.sandwich-menu').classList.remove('sandwich-menu_offset-top');
                    }
                    if ($('html').hasClass('fp-enabled')) {
                        $.fn.fullpage.destroy('all');
                    }
                    this.done();
                }
            })
                .staggerTo(nSubMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(calc(-100% - 100px))', ease: Power0.easeNone}, variables.SANDWICH_STAGGER_DURATION_S)
                .staggerTo(nMenuItem, variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(calc(-100% - 100px))', ease: Power0.easeNone}, variables.SANDWICH_STAGGER_DURATION_S, '+=.15')
                .to(nBreadCrumb, .5, {autoAlpha: 0})
                .to(nPreloader, .5, {autoAlpha: 1}, '-=.8')
                .to([nHeader, nFooter], .5, {autoAlpha: 0}, '-=.5')
                .to(nSandwichMenu, .1, {autoAlpha: 0})
                .set(nMenuButtonText, {textContent: 'меню'}, '-=.5')
                .set(document.body, {overflow: 'hidden'})
        });
    },
});

Barba.Dispatcher.on('linkClicked', elm => {
    const $elm = $(elm);
    if ($elm.data('link-type') === 'inner') {
        Barba.Pjax.getTransition = () => InnerTransition;
    }
    if ($elm.data('link-type') === 'menu') {
        Barba.Pjax.getTransition = () => MenuTransition;
    }
    if ($elm.data('link-type') === 'index-menu-off') {
        Barba.Pjax.getTransition = () => InnerTransition;
    }
    if ($elm.data('link-type') === 'index-menu-on') {
        Barba.Pjax.getTransition = () => MenuTransition;
    }
    if ($elm.data('link-type') === 'case') {
        Barba.Pjax.getTransition = () => GeneralTransition;
    }
});

Barba.Dispatcher.on('newPageReady', (currentStatus) => {
    if (isIE()) {
        nGetBody().classList.add('ie');
    }
});

if (!($("body").data("admin") === true)) Barba.Prefetch.init();

function LinkWithReload(nRoot) {
    let links = nRoot.querySelectorAll("a[href]");
    let cbk = function(e) {
        if (
            $("body").data("admin") === true
        ) {
            window.location = e.currentTarget.href;
        }
        if (
            e.currentTarget.href === window.location.href &&
            !($("body").data("admin") === true)
        ) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", cbk);
    }
}
LinkWithReload(document);