import variables from "../../common/variables";
import $ from 'jquery';
import ScrollingAlt from "../../components/scrolling-alt/scrolling-alt";
import {arriveAnimation} from "../../components/inner-first-screen/animations";
import Barba from "barba.js";
import {animPerson, hide} from "../../common/animations";
import ScrollMagic from "scrollmagic";

Barba.BaseView.extend({
    namespace: "company",
    onEnter: function() {

    },
    onEnterCompleted: async function() {
        setTimeout(function() {
            const scrollingAlt = new ScrollingAlt();
            scrollingAlt.initPromise;
            hide(document.querySelector('.preloader'));
            arriveAnimation();
        }, 3000);
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

        var controller = new ScrollMagic.Controller();
        var nPersons = document.getElementsByClassName("person");
        for (var i = 0; i < nPersons.length; i++) {
            if (i % 2 === 0) {
                nPersons[i].style.transform = 'translateY(300px)';
            }
            else {
                nPersons[i].style.transform = 'translateY(400px)';
            }

            var scene = new ScrollMagic.Scene({
                triggerElement: nPersons[i],
                triggerHook: 1,
                reverse: false,
                //offset: -120
            }).on('start', function () {
                animPerson(this.triggerElement());
            }).addTo(controller)
        }
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {

    }
}).init();


