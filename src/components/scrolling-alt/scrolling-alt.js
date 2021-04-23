import $ from 'jquery';
import 'fullpage.js/vendors/scrolloverflow';
import 'fullpage.js';
import {hideFooter, hideHeader, showHeader} from "../../pages/index/animations";
import {enableMenu, disableMenu} from "../sandwich-menu-button/sandwich-menu-button";
import variables from "../../common/variables";
import ScrollMagic from "scrollmagic";


export default class ScrollingAlt {
    constructor() {
        const nHeader = document.querySelector('.header');
        const nFooter = document.querySelector('.footer');
        let contrastHeader = false;
        let contrastFooter = false;
        let activeSection;
        this.initPromise = new Promise((resolve, reject) => {
            this.fullpageInstance = $('#fullpage').fullpage({
                licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
                scrollOverflow: true,
                scrollOverflowOptions: {
                    scrollbars: false,
                    keyBindings: true
                },
                lockAnchors: true,
                anchors:['firstPage', 'secondPage'],
                onLeave: function (index, nextIndex, direction) {
                    activeSection = index;
                    if (document.documentElement.classList.contains('menu--show')) {
                        return false;
                    }
                    hideHeader(nHeader);
                    hideFooter(nFooter);
                    disableMenu(document.querySelector('.sandwich-menu-button'));
                    if (index === 1 && nextIndex === 2 && window.animstop !== 2)  {
                        window.animstop = 2;
                    }
                    nHeader.parentNode.removeChild(nHeader);
                    nFooter.parentNode.removeChild(nFooter);
                },
                afterLoad: function (anchorLink, index) {
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                    let nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
                    if (nIscrollInstance) {
                        nIscrollInstance.scrollTo(0, 0, variables.SCROLL_UP_DURATION_S, IScroll.utils.ease.quadratic);
                    }
                    if (activeSection === 1 && index === 2) {
                        document.querySelector('.tail').appendChild(nHeader);
                        document.querySelector('.tail').appendChild(nFooter);
                        document.querySelector('.sandwich-menu').classList.add('sandwich-menu_offset-top');

                        let controller = new ScrollMagic.Controller();

                        let sceneScroll = new ScrollMagic.Scene({
                            triggerElement: '.tail',
                            triggerHook: 0,
                            offset: 200,
                        }).on('start', function() {
                            $.fn.fullpage.setKeyboardScrolling(false);
                        }).on('leave', function () {
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }).addTo(controller);
                    }
                    else if (activeSection === 2 && index === 1) {
                        document.querySelector('.barba-container').appendChild(nHeader);
                        document.querySelector('.barba-container').appendChild(nFooter);
                        document.querySelector('.sandwich-menu').classList.remove('sandwich-menu_offset-top');
                    }
                    if (index === 1) {
                        if (contrastHeader) {
                            contrastHeader = false;
                            nHeader.classList.add('contrast_header');
                        }
                        if (contrastFooter) {
                            contrastFooter = false;
                            nFooter.classList.add('contrast_footer');
                        }
                    }
                    else if (index === 2) {
                        if (nHeader.classList.contains('contrast_header')) {
                            contrastHeader = true;
                            nHeader.classList.remove('contrast_header');
                        }
                        if (nFooter.classList.contains('contrast_footer')) {
                            contrastFooter = true;
                            nFooter.classList.remove('contrast_footer');
                        }
                        let anchorSecondPage = window.location.hash;
                        if(anchorSecondPage === '#secondPage') {
                            const nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
                            nIscrollInstance.scrollToElement('.projects-map', variables.SCROLL_UP_DURATION_S, 0, 0, IScroll.utils.ease.quadratic)
                        }
                    }
                    enableMenu(document.querySelector('.sandwich-menu-button'));
                    showHeader(nHeader);
                    showHeader(nFooter);
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
};