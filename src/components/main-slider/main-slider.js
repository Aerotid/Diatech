import SliderNavigation from '../slider-navigation/slider-navigation';
import {emit, listen, normalizeKey} from '../../common/helpers';
import {switchToAnimationOpacity, switchToAnimationVideo} from '../main-slider-slide/animations';

export default class MainSlider {
    get nSlides() {
        if (!this.slides) {
            this.slides = [...this.nRoot.children];
        }
        return this.slides;
    }

    get slideCount() {
        return this.nSlides.length;
    }

    constructor(nRoot, slides) {
        this.nRoot = nRoot;
        this.slides = slides;
        this.inProgress = false;
        this.currentSlideId = 0;
        this.onKeyupBind = this.onKeyUp.bind(this);
        const sliderNavigation = new SliderNavigation(nRoot.querySelector('.slider-navigation'), this);
        this.videoButtons = this.nRoot.querySelectorAll('.btn_watch');

        if (sliderNavigation.itemCount !== this.slideCount) {
            console.warn(
                'Кол-во слайдов не равно кол-ву элементов в навигации. Слайдер не проинициализирован'
            );
            return;
        }

        [...this.videoButtons].forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                if (this.currentSlideId < this.slides.length - 1) {
                    this.switchTo(this.currentSlideId + 1);
                } else {
                    this.switchTo(0);
                }
            });
        });

        this.equalizeSlideHeightsBind = this.equalizeSlideHeights.bind(this);
        listen('fit-content-tracker:some-not-fit', this.equalizeSlideHeightsBind);
        this.removeSlideExplicityHeightsBind = this.removeSlideExplicitHeights.bind(this);
        listen('fit-content-tracker:any-fit', this.removeSlideExplicityHeightsBind);
    }

    async equalizeSlideHeights() {
        const nBody = document.querySelector('body');
        const maxSlideHeight = Math.max(
            ...this.slides.map(slide => {
                const nRootCopy = slide.nRoot.cloneNode(true);
                nRootCopy.style.position = 'relative';
                nBody.appendChild(nRootCopy);
                const height = nRootCopy.offsetHeight;
                nBody.removeChild(nRootCopy);
                return height;
            })
        );
        this.slides.forEach(slide => slide.nRoot.style.height = `${maxSlideHeight}px`);
    }

    removeSlideExplicitHeights() {
        this.slides.forEach(slide => slide.nRoot.style.height = null);
    }

    async switchTo(nextSlideId) {
        if (this.inProgress || nextSlideId === this.currentSlideId) {
            return;
        }
        this.inProgress = true;
        const prevSlide = this.slides[this.currentSlideId];
        const nextSlide = this.slides[nextSlideId];
        let switchAnimation = null;
        let mobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !window.MSStream;
        if (nextSlideId - this.currentSlideId === 1) {
            if(mobile) {
                switchAnimation = switchToAnimationOpacity;
            }
            else {
                switchAnimation = switchToAnimationVideo;
            }
        } else {
            switchAnimation = switchToAnimationOpacity;
        }
        this.currentSlideId = nextSlideId;

        [...this.videoButtons].forEach(videoButton => {
            videoButton.classList.add('disabled');

            if (this.currentSlideId === 0) {
                videoButton.classList.remove('show-text');
            } else {
                videoButton.classList.add('show-text');
            }
        });

        emit('main-slider:before-changed', {}, false, this.nRoot);
        await switchAnimation(prevSlide, nextSlide);
        prevSlide.nRoot.classList.remove('main-slider-slide_active');
        nextSlide.nRoot.classList.add('main-slider-slide_active');
        emit('main-slider:changed', {}, false, this.nRoot);
        this.inProgress = false;

        [...this.videoButtons].forEach(videoButton => {
            videoButton.classList.remove('disabled');
        });
    }

    switchToNext() {
        this.switchTo((this.currentSlideId + 1) % this.slideCount);
    }

    switchToPrev() {
        let nextSlideId = this.currentSlideId - 1;
        nextSlideId = nextSlideId < 0 ? this.slideCount - 1 : nextSlideId;
        this.switchTo(nextSlideId);
    }

    onKeyUp(e) {
        const keyCode = normalizeKey(e);
        switch (keyCode) {
            case 'ArrowLeft':
                this.switchToPrev();
                break;
            case 'ArrowRight':
                this.switchToNext();
                break;
        }
    }

    enableKeyControls() {
        document.addEventListener('keyup', this.onKeyupBind);
    }

    disableKeyControls() {
        document.removeEventListener('keyup', this.onKeyupBind);
    }
}
