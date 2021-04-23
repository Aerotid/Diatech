import TimelineLite from "gsap/TimelineLite";
import CSSRulePlugin from "gsap/CSSRulePlugin";

const nCanvas = document.querySelector('.radiance .radiance__canvas');
const nCanvasCrop = document.querySelector('.radiance .radiance__crop');
const nCanvasImg = nCanvasCrop.querySelector('img');

let moveAnimation = null;
let scaleAnimation = null;
let arriveAnimation = null;
let enableHandler;
let SimpleTimeout;

export const canvasMove = (e) => {
    if (!arriveAnimation) {
        arriveAnimation = new TimelineLite()
            .to(nCanvasCrop, 1, {autoAlpha: .3, delay: 2.5})
    }

    if (moveAnimation) {
        moveAnimation.kill();
    }
    // if (scaleAnimation) {
    //     scaleAnimation.kill();
    // }

    moveAnimation = new TimelineLite()
        .to(nCanvas, 1, {x: e.pageX - (nCanvas.offsetWidth / 2), y: e.pageY - (nCanvas.offsetHeight / 2)}, 0)
        .to(nCanvasCrop, 1, {x: e.pageX, y: e.pageY - (nCanvas.offsetHeight + 2)}, 0)
        .to(nCanvasImg, 1, {x: -e.pageX, y: -e.pageY - 2}, 0);
        // .to(nCanvas, 1, {left: e.pageX, top: e.pageY}, 0)
        // .to(nCanvasCrop, 1, {left: `${e.pageX}px`, top: `${e.pageY}px`}, 0)
        // .to(nCanvasImg, 1, {left: `-${e.pageX}px`, top: `-${e.pageY}px`}, 0);
    nCanvasCrop.classList.add('on');
    clearTimeout(SimpleTimeout);
    SimpleTimeout = setTimeout(()=>{nCanvasCrop.classList.remove('on')}, 700)
    // scaleAnimation = new TimelineLite()
    //     .to(CSSRulePlugin.getRule(".radiance__crop:before"), 1, {cssRule: { boxShadow: 'inset 0 0 10em 5em white' }, ease: Power0.easeNone})
    //     .to(CSSRulePlugin.getRule(".radiance__crop:before"), 1, {cssRule: { boxShadow: 'inset 0 0 10em 25em white' }, ease: Power0.easeNone});

};