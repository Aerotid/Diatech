import {openMenu} from "../components/sandwich-menu-button/sandwich-menu-button";
import {hide} from "./animations";
import preloader from "../components/preloader/preloader";
import {enableMenu, disableMenu} from '../components/sandwich-menu-button/sandwich-menu-button';

import variables from "./variables";



const FadeTransition = (transitions) => {
    const nOldPage = transitions.oldContainer;
    const nNewPaGE = transitions.newContainer;

    const preloader = document.querySelector('.preloader');
    let nHeader =  transitions.oldContainer.querySelector('.header');
    let nFooter =  transitions.oldContainer.querySelector('.footer');

    // document.querySelector('body').scrollTop = 0;


    const tl = new TimelineLite();

    tl.to(nOldPage, 0.5, {autoAlpha: 0 , onComplete: () => {

        nHeader.remove();
        nFooter.remove();
        transitions.done();

        //document.querySelector('body').scrollTop = 0;

        hide(preloader);
        // disableMenu();
        


    }})


};

const CasesToCase = (transitions) => {
    const nOldPage = transitions.oldContainer;
    const nNewPage = transitions.newContainer;

    const preloader = document.querySelector('.preloader');
    const nHeader =  nOldPage.querySelector('.header');
    const nFooter =  nOldPage.querySelector('.footer');
    const nHeaderNew = nNewPage.querySelector('.header');

    const nTopCap = nOldPage.querySelector('.container-inner_cases_list');

    const nBorderNew =  nNewPage.querySelector('.info-block-1__title-border');
    const nTextPartNew = [...nNewPage.querySelectorAll('[data-text-part]')];

    const nContainerInner = nNewPage.querySelector('.container-inner');

    const nsliderNavigation = nOldPage.querySelector('.slider-navigation');
       
   
    const tl = new TimelineLite({
        onComplete: () => {
            
            nHeader.remove();
            nFooter.remove();
            // disableMenu();

            tl.kill()

                const t = new TimelineLite({
                    onComplete: () => {
                        t.kill()
                    }
                })

            t

                .to(nNewPage.querySelector('.info-block-4__title'), 0.6, {autoAlpha: 1}, 0)

                .to(nHeaderNew, 0.6, {autoAlpha: 1}, 0)

                .to(nContainerInner, 0.6, {marginTop: '-25vh'})

                .to(nBorderNew, 0.5, {height: '100%',  ease: Power0.easeNone})

                .staggerTo(nTextPartNew, variables.TEXT_APPEAR_DURATION_S, {transform: 'translateX(0)'}, variables.TEXT_STAGGER_DURATION_S)
        }
    });

    tl  
        .set(nContainerInner, {marginTop: 0})

        .set(nNewPage.querySelector('.info-block-4__title'), {autoAlpha: 0,  onComplete: ()=> {
            hide(preloader);
        }}, 0)


        .set(nHeaderNew, {autoAlpha: 0, onComplete: ()=> nHeaderNew.remove}, 0)
        
        .set(nBorderNew, {height: 0}, 0)

        .set(jQuery('.inner-first-screen'), {className: '-=inner-first-screen__cases-list'} , 0)

        .set(nTextPartNew, {transform: 'translateX(calc(-100% - 150px))'}, 0)
    
        .to(nTopCap, 0.6, {y: '-100%'}, 0)
        
        .to(nHeader, 0.6, {y: '-100%' }, 0)
        // .to(nHeader, 0.6, {autoAlpha:0}, 0)

        .to(nFooter, 0.6, {autoAlpha: 0}, 0)
        .to(nsliderNavigation, 0.6, {autoAlpha: 0}, 0)

        .to(document.querySelector('.swiper-slide-active .info-block-4__title'), 0.6, {autoAlpha: 0, onComplete: () => {
            transitions.done();
        }}, 0)

};


const CaseToCases = (transitions) => {
    const nOldPage = transitions.oldContainer;
    const nNewPage = transitions.newContainer;

    const preloader = document.querySelector('.preloader');
    const nHeaderOld =  nOldPage.querySelector('.header');
    const nFooterOld =  nOldPage.querySelector('.footer');

    const nHeaderNew =  nNewPage.querySelector('.header');
    const nFooterNew =  nNewPage.querySelector('.footer');

    const nTopCap = nNewPage.querySelector('.container-inner_cases_list');

    const nContainerInner = nOldPage.querySelector('.container-inner');

    const nsliderNavigation = nNewPage.querySelector('.slider-navigation');

    if(nNewPage.offsetParent.classList.contains('_is-cases')) {
        nNewPage.offsetParent.classList.remove('_is-cases');
    }

    
  
    const tl = new TimelineLite({
        onComplete: ()=> {
            transitions.done();
            tl.kill()
            
            const t = new TimelineLite({
                onComplete: () => {
                    t.kill()
                }
            })
      
                t
                    .to(nTopCap, 0.6, {y: 0}, 0)
                    .to(nHeaderNew, 0.6, {autoAlpha: 1}, 0)   
                    
                    .set(jQuery('.inner-first-screen'), {className: '+=inner-first-screen__cases-list'} , 0)

                    .to(nFooterNew, 0.6, {autoAlpha: 1}, 0)
                    .to(nsliderNavigation, 0.6, {autoAlpha: 1}, 0)

                    .to([...nNewPage.querySelectorAll('.info-block-4__title')], 0.6 ,{autoAlpha: 1})
        }
    });


    tl


        .set(nHeaderNew, {autoAlpha:0}, 0)
        .set(jQuery('.inner-first-screen'), {className: '-=inner-first-screen__cases-list'} , 0)
        .set(nTopCap,  {y: -nTopCap.clientHeight}, 0)

        .set(nFooterNew, {autoAlpha: 0}, 0)
        .set(nsliderNavigation, {autoAlpha: 0}, 0)

        .to(nContainerInner, 0.6, {marginTop: 0}, 0)

        .to(nHeaderOld, 0.6, {autoAlpha: 0, clear: true, onComplete: () => {
            nHeaderOld.remove();
            nFooterOld.remove();
            //disableMenu();
            hide(preloader);

        }}, 0)
    
        .to(nOldPage.querySelector('.info-block-4__title'), 0.6, {autoAlpha: 0 })
    
    




};



const transitions = {
    index: {
    //    cases: FadeTransition,
    //    inner: FadeTransition,
    },
    cases: {
    //   index: FadeTransition,
    //   inner: FadeTransition,

      case: CasesToCase,
    },
    inner: {
    //    cases: FadeTransition,
    //    inner: FadeTransition,
    //    index: FadeTransition,
    },
    case: {
        //case: FadeTransition,

        cases: CaseToCases,
    }

};

const namespaceSubstitute = {
    index: "index",
    cases: "cases",
    company: 'inner',
    'case': 'case',
    // 'case_gazprom': 'case',
    // 'case_petronas': 'case',
    // 'case_total': 'case',
};

export const getTransition = (source, target) => {
    return (transitions[source] && transitions[source][target])
    || (transitions[source] && transitions[source][namespaceSubstitute[target]])
    || (transitions[namespaceSubstitute[source]] && transitions[namespaceSubstitute[source]][target])
    || (transitions[namespaceSubstitute[source]] && transitions[namespaceSubstitute[source]][namespaceSubstitute[target]]);
};



