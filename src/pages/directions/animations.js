import variables from '../../common/variables';
import {isFunction} from '../../common/helpers';

export const arriveAnimation = onComplete => {
    const nInfoBlock = document.querySelector('.info-block-1');
    const nBorder = nInfoBlock.querySelector('.info-block-1__title-border');
    const nTitleParts = [...nInfoBlock.querySelectorAll('.info-block-1__title > [data-text-part]')];
    const nInfoBlockText = nInfoBlock.querySelectorAll('.info-block-1__sub-text');
    const nCard = document.querySelector('.directions-map__card');
    //const nScrollDown = nInnerScreen.querySelector('.scroll-down');

    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    const nStaggerAnimationNodes = nTitleParts.concat([nInfoBlockText]);
    tll
        .set(nBorder, {height: 0})
        .set(nStaggerAnimationNodes, {transform: 'translateX(calc(-100% - 100px))'})
        .set(nCard, {transform: 'translateY(-100%)'})
        .to(nBorder, .5, {height: '100%', ease: Power0.easeNone}, '+=.5')
        .staggerTo(
            nStaggerAnimationNodes,
            variables.TEXT_APPEAR_DURATION_S,
            {transform: 'translateX(0)'},
            variables.TEXT_STAGGER_DURATION_S,
        )
        .to(nCard, .5, {transform: 'translateY(0)'});
};