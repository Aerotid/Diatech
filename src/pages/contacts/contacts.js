import MapGoogle from '../../components/map/map';
import Form from '../../components/form/form';
import '../../components/sandwich-menu-button/sandwich-menu-button';
import '../../components/sandwich-menu/sandwich-menu';
import {enableMenu} from "../../components/sandwich-menu-button/sandwich-menu-button";
import $ from "jquery";
import variables from "../../common/variables";
import ScrollingAlt from "../../components/scrolling-alt/scrolling-alt";
import {arriveAnimationContacts} from "../../components/inner-first-screen/animations";
import Barba from "barba.js";
import {hide} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "contacts",
    onEnter: function() {

    },
    onEnterCompleted: async function() {
        enableMenu(document.querySelector('.sandwich-menu-button'));
        const scrollingAlt = new ScrollingAlt();
        await scrollingAlt.initPromise;
        hide(document.querySelector('.preloader'));
        await arriveAnimationContacts();
        const nScrollDown = document.querySelector('.inner-first-screen__scroll-down');
        nScrollDown.addEventListener('click', function () {
            $.fn.fullpage.moveSectionDown();
        });
        const nScrollUp = document.querySelector('.tail__scroll-up');
        nScrollUp.addEventListener('click', function () {
            const nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
            nIscrollInstance.scrollTo(0, 0, variables.SCROLL_UP_DURATION_S, IScroll.utils.ease.quadratic);
            setTimeout(function() {
                $.fn.fullpage.moveSectionUp();
            }, variables.SCROLL_UP_DURATION_S);
        });
        let form = new Form(document.querySelector('.form'), () => {
            form();
        });
        new MapGoogle(document.querySelector('.js-map'));

        window.addEventListener('mousewheel', function(event) {
            const nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
            if(nIscrollInstance) {
                if (event.ctrlKey === true) {
                    event.preventDefault();
                    nIscrollInstance.disable();
                }
                else {
                    event.preventDefault();
                    nIscrollInstance.enable();
                }
            }
        });
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {

    }
}).init();