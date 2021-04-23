import TweenMax from "gsap/TweenMax";
import { normalizeWheel } from "../../common/helpers";
import $ from 'jquery';
const nWindow = $(window);

const scrollTime = 0.5;
const speedMultiplier = 3;

export const config = {
  disabled: false
};

const smooth = (event) => {
  if (config.disabled) {
    return;
  }
  event.preventDefault();
  const delta = normalizeWheel(event.originalEvent).pixelY;
  let scrollTop = nWindow.scrollTop();
  const finalScroll = scrollTop + delta * speedMultiplier;
  TweenMax.to(nWindow, scrollTime, {
    scrollTo: { y: finalScroll, autoKill: true },
    ease: Power1.easeOut,
    autoKill: true,
    overwrite: 5
  });
};

export const smoothScroll = () => {
  nWindow.on("wheel.smooth mousewheel.smooth DOMMouseScroll.smooth", e => smooth(e));
};

export const smoothScrollDestroy = () => {
  nWindow.off("wheel.smooth mousewheel.smooth DOMMouseScroll.smooth");
};


