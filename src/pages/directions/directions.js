import Barba from 'barba.js';
import ScrollingAlt from "../../components/scrolling-alt/scrolling-alt";
import variables from "../../common/variables";
import initDirectionMap from '../../components/directions-map/direction-map';
import '../../components/sandwich-menu/sandwich-menu';
import $ from 'jquery';
import {arriveAnimation} from "../../components/inner-first-screen/animations";
import {hide} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "directions",
    onEnter: function() {

    },
    onEnterCompleted: async function() {
        const scrollingAlt = new ScrollingAlt();
        await scrollingAlt.initPromise;
        hide(document.querySelector('.preloader'));
        arriveAnimation();
        initDirectionMap();
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