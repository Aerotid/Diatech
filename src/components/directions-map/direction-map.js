import {
    arriveAnimation as cardArriveAnimation,
    leaveAnimation as cardLeaveAnimation,
} from '../../components/directions-map/animations'
export default () => {
    const nMap = document.querySelector('.directions-map');
    const nPins = nMap.querySelector('.directions-map__pins');
    const nCard = nMap.querySelectorAll('.directions-map__card');

    const removeActive = function () {
        var pin = document.querySelectorAll('.directions-map__pin');
        for (var i = 0; i < pin.length; i++) {
            pin[i].classList.remove('directions-map__pin_active');
        }
    };

    nPins.addEventListener('click', function(evt) {
        if (evt.target.dataset.pin) {
            removeActive();
            evt.target.classList.add('directions-map__pin_active');
            for (var i = 0; i < nCard.length; i++) {
                let pinId = evt.target.dataset.pin;
                let cardId = nCard[i].dataset.pin;
                if (pinId === cardId) {
                    let activeCard = nCard[i];
                    cardLeaveAnimation(() => {
                        activeCard.classList.add('directions-map__card_active');
                        cardArriveAnimation();
                    });
                }
            }
        }
    }, true);
};