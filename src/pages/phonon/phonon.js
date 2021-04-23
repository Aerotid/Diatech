import Barba from "barba.js";
import variables from "../../common/variables";
import $ from 'jquery';
import ScrollingAlt from "../../components/scrolling-alt/scrolling-alt";
import {arriveAnimation} from "../../components/inner-first-screen/animations";
import {hide} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "phonon",
    onEnter: function() {

    },
    onEnterCompleted: async function() {
        const scrollingAlt = new ScrollingAlt();
        await scrollingAlt.initPromise;
        hide(document.querySelector('.preloader'));
        await arriveAnimation();
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
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {

    }
}).init();