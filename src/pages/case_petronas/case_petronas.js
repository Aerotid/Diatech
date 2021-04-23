import preloader from '../../components/preloader/preloader';
import {enableMenu} from "../../components/sandwich-menu-button/sandwich-menu-button";
import Barba from "barba.js";
import {hide} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "case",
    onEnter: function() {

    },
    onEnterCompleted: async function() {
        enableMenu(document.querySelector('.sandwich-menu-button'));
        const nScrollUp = document.querySelector('.scroll-up');
        nScrollUp.addEventListener('click', function () {
            var nHeader = document.querySelector('.header');
            nHeader.scrollIntoView({ behavior: 'smooth' });
        });
        const nPreloader = document.querySelector('.preloader');
        hide(nPreloader);
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {

    }
}).init();