import Swiper from 'swiper';
import {enableMenu} from "../../components/sandwich-menu-button/sandwich-menu-button";
import variables from "../../common/variables";
import Barba from "barba.js";
import {hide} from "../../common/animations";

export let mySwiper;


const nBody = document.querySelector('body');

Barba.BaseView.extend({
    namespace: "cases",
    onEnter: function() {
        document.querySelector('body').classList.add('_is-cases');
    },
    onEnterCompleted: async function() {
        enableMenu(document.querySelector('.sandwich-menu-button'));
        setTimeout(function(){
            hide(document.querySelector('.preloader'));
        }, 3000);


        nBody.style.overflowY='scroll';

        mySwiper = new Swiper('.swiper-container', {
            mousewheel: true,
            invert: true,
            releaseOnEdges: true,
            effect: 'fade',
            speed: 1200,
            //virtualTranslate: true,
            fadeEffect: {
                crossFade: false
            },
            pagination: {
                el: '.slider-navigation__items',
                type: 'bullets',
                bulletClass: 'slider-navigation__item',
                bulletActiveClass: 'slider-navigation__item_active',
                clickable: true

            },
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            hashNavigation: {
                watchState: true,
            },
        });

        const nCases = document.querySelector('._is-cases');
        const nArrSliders = mySwiper.slides;
        const tl = new TimelineLite();

        if(nCases) {
            const tla = new TimelineLite({
                onComplete: () => {
                    document.querySelector('body').classList.remove('_is-cases');
                }
            });

            tla
                .set([...document.querySelectorAll('.swiper-wrapper .info-block-4__title')], {transform: 'translateX(0)'})

                .set([...document.querySelectorAll('.swiper-wrapper [data-title-item-anim]')], {transform: 'translateX(calc(-100% - 100px))', onComplete: () => {
                    tla.staggerTo([...document.querySelectorAll('.swiper-slide-active [data-title-item-anim]')],
                    variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(calc(-100% - 100px))'},
                    variables.SANDWICH_STAGGER_DURATION_S)

                    // .from(document.querySelector('.swiper-slide-active .img-block__img'), 5, {scale: 1.2})
                    .to(document.querySelector('.swiper-slide-active .info-block-4__title'), variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(calc(-100% - 150px))',
                        onComplete: () => {
    
                            tla
                                .from(document.querySelector('.swiper-slide-active .img-block__img'), 1, {scale: 1.2}, '+=2.2')
                            .to(document.querySelector('.swiper-slide-active .info-block-4__title'), variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)'}, '-=.7')
    
                                .staggerTo([...document.querySelectorAll('.swiper-slide-active [data-title-item-anim]')],
                                    variables.SANDWICH_APPEAR_DURATION_S , {transform: 'translateX(0)'}, variables.SANDWICH_STAGGER_DURATION_S)
    
                        }
                    }, '-=0.7')
                    }});
        } else {
            tl
            .set([...document.querySelectorAll('.swiper-wrapper .info-block-4__title')], {transform: 'translateX(0)'})

            .set([...document.querySelectorAll('.swiper-wrapper [data-title-item-anim]')], {transform: 'translateX(calc(-100% - 100px))', onComplete: () => {
                    tl.set( [...document.querySelectorAll('.swiper-slide-active [data-title-item-anim]')], {transform: 'translateX(0)'} )
                        .set([...document.querySelectorAll('.swiper-slide-active .info-block-4__title')], {transform: 'translateX(0)'})
                }});
        }

        mySwiper.on('slideChangeTransitionStart', () => {
            tl.from(document.querySelector('.swiper-slide-active .img-block__img'), 2, {scale: 1.2}, '-=.7');
        });

        mySwiper.on('slideChange', () => {
            tl.staggerTo([...document.querySelectorAll('.swiper-slide-active [data-title-item-anim]')],
                variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(calc(-100% - 100px))'},
                variables.SANDWICH_STAGGER_DURATION_S)

                .to(document.querySelector('.swiper-slide-active .info-block-4__title'), variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)',
                    onComplete: () => {

                        tl
                        //.to(document.querySelector('.swiper-slide-active .info-block-4__title'), variables.SANDWICH_APPEAR_DURATION_S, {transform: 'translateX(0)'}, '-=1.5')

                            .staggerTo([...document.querySelectorAll('.swiper-slide-active [data-title-item-anim]')],
                                variables.SANDWICH_APPEAR_DURATION_S , {transform: 'translateX(0)'}, variables.SANDWICH_STAGGER_DURATION_S, '-=1')

                    }
                }, '-=0.7')
        });

        let counter = document.querySelector('.slider-navigation__counter'),
            current = counter.querySelector('.slider-navigation__current'),
            total = counter.querySelector('.slider-navigation__total'),
            slidesCount = mySwiper.slides.length;

        function pad(num, size) {
            let s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        }

        total.innerHTML = pad(slidesCount, 2);
        current.innerHTML =  pad(mySwiper.activeIndex + 1, 2) + '/';


        mySwiper.on('slideChange', function() {
            current.innerHTML =  pad(mySwiper.activeIndex + 1, 2) + '/';
        });
    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {
        mySwiper.destroy();
        nBody.style.overflowY='';
    }
}).init();