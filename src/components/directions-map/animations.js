import variables from '../../common/variables';
import {isFunction} from '../../common/helpers';

export const arriveAnimation = onComplete => {
    const nCard = document.querySelector('.directions-map__card_active');
    const nCardTitle = nCard.querySelector('.directions-map__card-title');
    const nListTitle = [nCard.querySelector('.directions-map__card-block-title')];
    const nListItems = [...nCard.querySelectorAll('.directions-map__card-list > .directions-map__card-item')];
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    let nStaggerAnimationNodes = nListTitle.concat(nListItems);
    if(nStaggerAnimationNodes.length !== 1) {
        tll
            .set(nCardTitle, {transform: 'translateX(calc(-100% - 100px))'})
            .set(nListTitle, {transform: 'translateX(calc(-100% - 100px))'})
            .set(nListItems, {transform: 'translateX(calc(-100% - 100px))'})
            .to(
                nCardTitle,
                variables.DIRECTION_LIST_APPEAR_DURATION_S,
                {transform: 'translateX(0)'},
                variables.TEXT_STAGGER_DURATION_S,
            )
            .staggerTo(
                nStaggerAnimationNodes,
                variables.DIRECTION_LIST_APPEAR_DURATION_S,
                {transform: 'translateX(0)'},
                variables.TEXT_STAGGER_DURATION_S,
                '-=.5'
            );
    }
    else {
        tll
            .set(nCardTitle, {transform: 'translateX(calc(-100% - 100px))'})
            .to(
                nCardTitle,
                variables.DIRECTION_LIST_APPEAR_DURATION_S,
                {transform: 'translateX(0)'},
                variables.TEXT_STAGGER_DURATION_S,
            );
    }
};

export const leaveAnimation = onComplete => {
    const nCard = document.querySelector('.directions-map__card_active');
    const nCardTitle = [nCard.querySelector('.directions-map__card-title')];
    const nListTitle = [nCard.querySelector('.directions-map__card-block-title')];
    const nListItems = [...nCard.querySelectorAll('.directions-map__card-list > .directions-map__card-item')];
    const tll = new TimelineLite({
        onComplete: () => isFunction(onComplete) ? onComplete() : null,
    });
    let nStaggerAnimationNodes = nListTitle.concat(nListItems);
    //nStaggerAnimationNodes = nStaggerAnimationNodes.concat(nListItems);
    if(nStaggerAnimationNodes.length !== 1) {
        tll
            .set(nCardTitle, {transform: 'translateX(0)'})
            .set(nStaggerAnimationNodes, {transform: 'translateX(0)'})
            .staggerTo(
                nStaggerAnimationNodes.reverse(),
                variables.DIRECTION_LIST_APPEAR_DURATION_S,
                {transform: 'translateX(calc(-100% - 100px))'},
                variables.TEXT_STAGGER_DURATION_S,
            )
            .to(
                nCardTitle,
                variables.DIRECTION_LIST_APPEAR_DURATION_S,
                {transform: 'translateX(calc(-100% - 100px))'},
                variables.TEXT_STAGGER_DURATION_S,
            )
            .set(nCard, {className: '-=directions-map__card_active'});
    }
    else {
        tll
            .set(nCardTitle, {transform: 'translateX(0)'})
            .to(
                nCardTitle,
                variables.DIRECTION_LIST_APPEAR_DURATION_S,
                {transform: 'translateX(calc(-100% - 100px))'},
                variables.TEXT_STAGGER_DURATION_S,
            )
            .set(nCard, {className: '-=directions-map__card_active'});
    }
};