import Swiper from 'swiper';
import {throttle, normalizeWheel} from '../../common/helpers';
import {emit} from '../../common/helpers';
import $ from "jquery";

export default class Reviews {
    get nTexts() {
        if (!this.texts) {
            this.texts = this.nRoot.querySelector('.reviews__texts');
        }
        return this.texts;
    }

    get nCompanies() {
        if (!this.companies) {
            this.companies = this.nRoot.querySelector('.reviews__companies');
        }
        return this.companies;
    }

    get nCompanySelector() {
        if (!this.companySelector) {
            this.companySelector = this.nRoot.querySelector('.reviews__company-selector');
        }
        return this.companySelector;
    }

    get nCounterCurrent() {
        if (!this.counterCurrent) {
            this.counterCurrent = this.nRoot.querySelector('.reviews__counter-current');
        }
        return this.counterCurrent;
    }

    get nCounterTotal() {
        if (!this.counterTotal) {
            this.counterTotal = this.nRoot.querySelector('.reviews__counter-total');
        }
        return this.counterTotal;
    }

    get currentReviewCompanyIndex() {
        const nReview = this.textsSlider.slides[this.textsSlider.activeIndex];
        return nReview.dataset.companyIndex;
    }

    get nCurrentCompany() {
        return this.companiesSelectorSlider.slides[this.companiesSelectorSlider.activeIndex];
    }

    get nCurrentReview() {
        return this.textsSlider.slides[this.textsSlider.activeIndex];
    }

    get currentCompanyReviewCount() {
        return this.nCurrentCompany.dataset.reviewCount;
    }

    get nLink() {
        if (!this.link) {
            this.link = this.nRoot.querySelector('.reviews__link');
        }
        return this.link;
    }

    get nYear() {
        if (!this.year) {
            this.year = this.nRoot.querySelector('.reviews__year');
        }
        return this.year;
    }

    constructor(nRoot) {
        this.nRoot = nRoot;
        this.textsSlider = new Swiper(this.nTexts, {
            //slidesPerView: 'auto',
            speed: 600,
            keyboard: {
                enabled: false,
            },
            breakpoints: {
                768: {
                    spaceBetween: 25,
                }
            },
            grabCursor: true
        });
        this.companiesSlider = new Swiper(this.nCompanies, {
            //slidesPerView: 'auto',
            speed: 600,
            autoHeight: true,
            breakpoints: {
                768: {
                    spaceBetween: 25,
                    slidesPerView: 1,
                }
            },
            navigation: {
                nextEl: '.reviews__companies-arrow_next',
                prevEl: '.reviews__companies-arrow_prev',
            },
            grabCursor: true,
            hashNavigation: {
                watchState: true,
                replaceState: true
            },
        }); 
        this.companiesSlider.on('resize orientationchange', ()=> {
            this.companiesSlider.update();
        });

        this.companiesSelectorSlider = new Swiper(this.nCompanySelector, {
            speed: 600,
            direction: 'vertical',
            height: 70,
            slideToClickedSlide: true,
            grabCursor: true
        });
        this.companiesSelectorSlider.on('resize orientationchange', ()=> {
            this.companiesSelectorSlider.update()
        });
        this.textsSlider.on('resize orientationchange', ()=> {
            this.textsSlider.update()
        });
        this.companiesSelectorSlider.on('slideChange', () => {
            const activeCompanyIndex = this.companiesSelectorSlider.activeIndex;
            this.companiesSlider.slideTo(activeCompanyIndex);
            const nActiveCompany = this.companiesSelectorSlider.slides[activeCompanyIndex];
            if (parseInt(activeCompanyIndex) !== parseInt(this.currentReviewCompanyIndex)) {
                this.textsSlider.slideTo(nActiveCompany.dataset.firstTextIndex);
                this.updateCounter();
                this.updateFooter();
                this.hideLink();
            }
        });
        this.companiesSlider.on('slideChange', () => {
            const activeCompanyIndex = this.companiesSlider.activeIndex;
            this.companiesSelectorSlider.slideTo(activeCompanyIndex);
            const nActiveCompany = this.companiesSelectorSlider.slides[activeCompanyIndex];
            if (parseInt(activeCompanyIndex) !== parseInt(this.currentReviewCompanyIndex)) {
                this.textsSlider.slideTo(nActiveCompany.dataset.firstTextIndex);
                this.updateCounter();
                this.updateFooter();
                this.hideLink();
            }
        });
        this.textsSlider.on('slideChange', () => {
            this.companiesSelectorSlider.slideTo(this.currentReviewCompanyIndex);
            this.updateCounter();
            this.updateFooter();
            this.hideLink();
        });
        this.textsSlider.on('fromEdge', () => {
            emit('reviews-slider:endSlideOut', {}, false, this.nRoot);
        });
        this.textsSlider.on('reachEnd', () => {
            emit('reviews-slider:endSlideIn', {}, false, this.nRoot);
        });
        this.updateCounter();
        this.updateFooter();
        this.hideLink();
        this.onWheelThrottled = throttle(this.onWheel.bind(this), 500);
        this.enableScrolling();
    }

    updateWithHash() {
        const activeCompanyIndex = this.companiesSlider.activeIndex;
        this.companiesSelectorSlider.slideTo(2);
        const nActiveCompany = this.companiesSelectorSlider.slides[activeCompanyIndex];
        if (parseInt(activeCompanyIndex) !== parseInt(this.currentReviewCompanyIndex)) {
            this.textsSlider.slideTo(nActiveCompany.dataset.firstTextIndex);
            this.updateCounter();
            this.updateFooter();
            this.hideLink();
        }
    }

    updateFooter() {
        this.nYear.innerHTML = this.nCurrentReview.dataset.year;
        this.nLink.setAttribute('href', this.nCurrentReview.dataset.fullLink);
    }

    hideLink() {
        if (!this.nCurrentReview.dataset.fullLink) {
            this.nLink.style.display = 'none';
        }
        else {
            this.nLink.style.display = 'inline-block';
        }
    }

    updateCounter() {
        let current = this.textsSlider.activeIndex - parseInt(this.nCurrentCompany.dataset.firstTextIndex) + 1;
        current = current.toString().length === 1 ? `0${current}` : current;
        const total = this.currentCompanyReviewCount.toString().length === 1
            ? `0${this.currentCompanyReviewCount}` : this.currentCompanyReviewCount;
        this.nCounterCurrent.innerHTML = current;
        this.nCounterTotal.innerHTML = total;
    }

    onWheel(e) {
        if (normalizeWheel(e).spinY > 0) {
            this.textsSlider.slideNext();
        } else {
            this.textsSlider.slidePrev();
        }
    }

    disableScrolling() {
        document.removeEventListener('wheel', this.onWheelThrottled);
    }

    enableScrolling() {
        document.addEventListener('wheel', this.onWheelThrottled);
    }
}