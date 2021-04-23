import variables from '../../common/variables';
import {isFunction} from '../../common/helpers';

export const arriveAnimation = onComplete => {
    const nInnerScreen = document.querySelector('.inner-first-screen');
    const nWrapperTitle = nInnerScreen.querySelector('.inner-first-screen__wrapper-title');
    const nMainTitle = nWrapperTitle.querySelector('.info-block-4__title');
    let nTitleParts = [...nWrapperTitle.querySelectorAll('.inner-first-screen__title > [data-text-part]')];
    const nInnerBlockText = nInnerScreen.querySelectorAll('.inner-first-screen__text');
    const nInfoBlockFirstText = nInnerScreen.querySelectorAll('.info-block-1 .info-block-1__text');
    const nInfoBlockFirstSubText = nInnerScreen.querySelectorAll('.info-block-1 .info-block-1__sub-text');
    const nInnerScreenBg = nInnerScreen.querySelector('.inner-first-screen__background-img');
    const nStaggerAnimationNodes = [nMainTitle, ...nTitleParts, nInnerBlockText];
    const nStaggerAnimationNodesSecond = [nInfoBlockFirstText, nInfoBlockFirstSubText];
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    tll
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .set(nStaggerAnimationNodesSecond, {transform: 'translateX(calc(-100% - 100px))'})
        .from(nInnerScreenBg, 1, {scale: 1.2, clearProps: "scale"})
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            .25
        )
        .staggerTo(
            nStaggerAnimationNodesSecond,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            1
        );
};

export const arriveAnimationContacts = onComplete => {
    const nInnerScreen = document.querySelector('.inner-first-screen');
    const nWrapperTitle = nInnerScreen.querySelector('.inner-first-screen__wrapper-title');
    const nMainTitle = nWrapperTitle.querySelector('.info-block-4__title');
    let nTitleParts = [...nWrapperTitle.querySelectorAll('.inner-first-screen__title > [data-text-part]')];
    const nInnerBlockText = nInnerScreen.querySelectorAll('.inner-first-screen__text');
    const nInfoBlockFirstText = nInnerScreen.querySelectorAll('.info-block-1 .info-block-1__text');
    const nInfoBlockFirstSubText = nInnerScreen.querySelectorAll('.info-block-1 .info-block-1__sub-text');
    const nStaggerAnimationNodes = [nMainTitle, ...nTitleParts, nInnerBlockText];
    const nStaggerAnimationNodesSecond = [nInfoBlockFirstText, nInfoBlockFirstSubText];
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    tll
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .set(nStaggerAnimationNodesSecond, {transform: 'translateX(calc(-100% - 100px))'})
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            .25
        )
        .staggerTo(
            nStaggerAnimationNodesSecond,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            1
        );
};

export const arriveAnimationReviews = onComplete => {
    const nContainerInner = document.querySelector('.container-inner_cases_list');
    const nMainTitle = nContainerInner.querySelector('.info-block-4__title');
    const nInnerScreen = document.querySelector('.inner-first-screen');
    const nWrapperTitle = nInnerScreen.querySelector('.inner-first-screen__wrapper-title');
    const nReviewsTexts = document.querySelector('.reviews__texts');
    const nReviewsCompanies = document.querySelector('.reviews__companies');
    const nReviewsCounter = document.querySelector('.reviews__counter');
    const nReviewsCompaniesVertical = document.querySelector('.reviews__company-selector-wrapper');
    let nTitleParts = [...nWrapperTitle.querySelectorAll('.inner-first-screen__title > [data-text-part]')];
    const nInnerBlockText = nInnerScreen.querySelectorAll('.inner-first-screen__text');
    const nReviewsLink = document.querySelector('.reviews__link');
    const nReviewsYear = document.querySelector('.reviews__year');
    const nStaggerAnimationNodes = [nMainTitle, ...nTitleParts, nInnerBlockText];
    //const nStaggerAnimationNodesSecond = [nReviewsTexts];
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    tll
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .set(nReviewsTexts, {transform: 'translateX(calc(-100% - 100px))'})
        .set([nReviewsCompanies, nReviewsCounter, nReviewsCompaniesVertical, nReviewsLink, nReviewsYear], {transform: 'translateX(calc(-100% - 100px))'})
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
            .25
        )
        .to(
            [nReviewsTexts, nReviewsCompanies, nReviewsCounter, nReviewsCompaniesVertical, nReviewsLink, nReviewsYear],
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)', delay: 1},
            variables.TEXT_STAGGER_DURATION_S,
            1
        );
};