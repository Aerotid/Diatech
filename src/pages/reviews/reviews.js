import {delay} from '../../common/helpers';
import $ from 'jquery';
import 'fullpage.js/vendors/scrolloverflow';
import 'fullpage.js';
import Reviews from '../../components/reviews/reviews';
import {hideHeader, showHeader} from "../index/animations";
import {listen} from '../../common/helpers';
import {enableMenu, disableMenu} from "../../components/sandwich-menu-button/sandwich-menu-button";
import Barba from "barba.js";
import {arriveAnimationReviews} from "../../components/inner-first-screen/animations";
import {hide} from "../../common/animations";

Barba.BaseView.extend({
    namespace: "reviews",
    onEnter: function() {
    },
    onEnterCompleted: async function() {
        let manualScrollLaunched = true;
        let keyEnable = true;
        const nHeader = document.querySelector('.header');
        const nFooter = document.querySelector('.footer');
        const nScrollDown = document.querySelector('.inner-first-screen__scroll-down');
        const nScrollUp = document.querySelector('.tail__scroll-up');
        nHeader.parentNode.removeChild(nHeader);
        nFooter.parentNode.removeChild(nFooter);
        document.querySelector('.section-reviews-first').appendChild(nHeader);
        document.querySelector('.section-reviews-second').appendChild(nFooter);
        let reviews = new Reviews(document.querySelector('.reviews'));
        $('#fullpage').fullpage({
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            scrollOverflow: false,
            responsiveWidth: 768,
            responsiveHeight: 667,
            onLeave: function (index, nextIndex, direction) {
                if (document.documentElement.classList.contains('menu--show')) {
                    return false;
                }
                disableMenu(document.querySelector('.sandwich-menu-button'));
                if (index === 1) {
                    if (!manualScrollLaunched) {
                        enableMenu(document.querySelector('.sandwich-menu-button'));
                        return false;
                    }
                }
                if (index === 1 && nextIndex === 2) {
                    hideHeader(nScrollDown);
                    keyEnable = false;
                }
                else if (index === 2 && nextIndex === 1) {
                    manualScrollLaunched = true;
                    showHeader(nScrollDown);
                }
            },
            afterLoad: function  (anchorLink, index) {
                enableMenu(document.querySelector('.sandwich-menu-button'));
                reviews.disableScrolling();
                if (index === 1) {
                    keyEnable = true;
                }
            }
        });
        $('.inner-first-screen__reviews').on('mouseenter', function(evt){
            reviews.enableScrolling();
            manualScrollLaunched = false;
        });
        $('.inner-first-screen__reviews').on('mouseleave', function(evt){
            reviews.disableScrolling();
            manualScrollLaunched = true;
        });
        $('.swiper-container').on('mouseenter', function(evt){
            if(this.dataset.slider === '3') {
                reviews.disableScrolling();
                reviews.companiesSelectorSlider.mousewheel.enable();
            }
        });
        $('.swiper-container').on('mouseleave', function(evt){
            if(this.dataset.slider === '3') {
                reviews.companiesSelectorSlider.mousewheel.disable();
                reviews.enableScrolling();
            }
        });
        document.querySelector('.sandwich-menu').classList.add('sandwich-menu_offset-top');
        document.body.classList.add('menu_reviews');
        listen(
            'reviews-slider:endSlideIn',
            () => {
                setTimeout(
                    function () {
                        manualScrollLaunched = true;
                    },
                    500
                );
            },
            reviews.nRoot
        );
        listen(
            'reviews-slider:endSlideOut',
            () => {
                manualScrollLaunched = false;
            },
            reviews.nRoot
        );
        await delay(2000);
        hide(document.querySelector('.preloader'));
        await arriveAnimationReviews(() => {
            let hash = window.location.hash;
            if (hash) {
                reviews.updateWithHash();
            }
        });
        nScrollDown.addEventListener('click', function () {
            $.fn.fullpage.moveSectionDown();
        });
        nScrollUp.addEventListener('click', function () {
            if ($(window).width() < 768) {
                var nHeader = document.querySelector('.header');
                nHeader.scrollIntoView({behavior: 'smooth'});
            }
            else {
                $.fn.fullpage.moveSectionUp();
            }
        });
        document.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 38) {
                if (keyEnable) {
                    reviews.textsSlider.slidePrev();
                }
            }
            if (evt.keyCode === 40) {
                if (keyEnable) {
                    reviews.textsSlider.slideNext();
                }
            }
        });
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {
        document.querySelector('.sandwich-menu').classList.remove('sandwich-menu_offset-top');
        document.body.classList.remove('menu_reviews');
    }
}).init();