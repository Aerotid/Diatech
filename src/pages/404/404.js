import preloader from '../../components/preloader/preloader';
import {enableMenu} from "../../components/sandwich-menu-button/sandwich-menu-button";
import Barba from "barba.js";
import {hide} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "404",
    onEnter: function() {
        document.querySelector('body').classList.add('_is-404');
    },
    onEnterCompleted: async function() {
        enableMenu(document.querySelector('.sandwich-menu-button'));

        const nPreloader = document.querySelector('.preloader');
        hide(nPreloader);
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {
        document.querySelector('body').classList.remove('_is-404');
    }
}).init();

