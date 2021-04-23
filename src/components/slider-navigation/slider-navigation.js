import {listen} from '../../common/helpers';

export default class SliderNavigation {
    get nItems() {
        if (!this.items) {
            this.items = [...this.nRoot.querySelectorAll('.slider-navigation__item')];
        }
        return this.items;
    }

    get nCurrent() {
        if (!this.current) {
            this.current = this.nRoot.querySelector('.slider-navigation__current');
        }
        return this.current;
    }

    get itemCount() {
        return this.nItems.length;
    }

    removeArrowDisabled() {
        [...this.nArrows].forEach((nArrow) => {
            nArrow.classList.remove('disabled');
        });
    }

    constructor(nRoot, slider) {
        this.nRoot = nRoot;
        this.slider = slider;
        this.nItems.forEach(nItem => {
            nItem.addEventListener('click', () => {
                const itemId = parseInt(nItem.dataset.id);
                this.slider.switchTo(itemId);
            });
        });

        this.updateBind = this.update.bind(this);
        listen('main-slider:before-changed', this.updateBind, this.slider.nRoot);

        this.removeArrowDisabled = this.removeArrowDisabled.bind(this);

        this.nArrows = [...this.nRoot.querySelectorAll('.slider-navigation__arrow')];

        this.nArrows.forEach(arrow => {
            arrow.addEventListener('click', (e) => {
                let nTarget = e.currentTarget;

                [...this.nArrows].forEach((nArrow) => {
                    nArrow.classList.add('disabled');
                });

                if (nTarget.dataset.direction === 'left') {
                    if (this.slider.currentSlideId > 0) {
                        this.slider.switchTo(this.slider.currentSlideId - 1);
                    } else {
                        this.slider.switchTo(this.slider.slides.length - 1);
                    }
                } else {
                    if (this.slider.currentSlideId < this.slider.slides.length - 1) {
                        this.slider.switchTo(this.slider.currentSlideId + 1);
                    } else {
                        this.slider.switchTo(0);
                    }
                }

                listen('main-slider:changed', this.removeArrowDisabled, this.slider.nRoot);
            });
        });
    }


    update() {
        this.nCurrent.innerHTML = `0${this.slider.currentSlideId + 1}`;
        this.nItems.forEach(
            nItem => nItem.classList.remove('slider-navigation__item_active')
        );
        this.nItems[this.slider.currentSlideId].classList.add(
            'slider-navigation__item_active'
        );
    }
}