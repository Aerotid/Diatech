import Grid from '../grid/grid';

export default class MainSliderSlide extends Grid {
    get nVideo() {
        if (!this.video) {
            this.video = this.nRoot.querySelector('[class$="video"]');
        }
        return this.video;
    }
}