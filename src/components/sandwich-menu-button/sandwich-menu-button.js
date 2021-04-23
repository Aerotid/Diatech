import {
    leaveAnimation as hideAnimation,
    arriveAnimation as showAnimation
} from "../sandwich-menu/animations";
import $ from "jquery";

let animationInProgress = false;

const openMenu = function(e) {
    if (animationInProgress) {
        return;
    }
    if (document.querySelector('.sandwich-menu-button').dataset.menuOpen === 'off') {
        document.querySelector('.sandwich-menu-button').dataset.menuOpen = 'on';
        document.body.querySelector('.header__logo-link').dataset.linkType = 'index-menu-on';
        let nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
        if (nIscrollInstance) {
            nIscrollInstance.disable();
        }
        animationInProgress = true;
        showAnimation(() => {
            animationInProgress = false;
        });
    }
    else if (document.querySelector('.sandwich-menu-button').dataset.menuOpen === 'on') {
        document.querySelector('.sandwich-menu-button').dataset.menuOpen = 'off';
        document.body.querySelector('.header__logo-link').dataset.linkType = 'index-menu-off';
        hideAnimation(() => {
            let nIscrollInstance = $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');
            if (nIscrollInstance) {
                nIscrollInstance.enable();
            }
        });
    }
};

const enableMenu = function(nMenuButton) {
    nMenuButton.addEventListener('click', openMenu, false);
};
const disableMenu = function(nMenuButton) {
    nMenuButton.removeEventListener('click', openMenu, false);
};

export {
    enableMenu,
    disableMenu,
}