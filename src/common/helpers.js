import VARIABLES from './variables';
import Bowser from "bowser";

export const isIE = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.parsedResult.browser.name === 'Internet Explorer';
};

export const nGetBody = () => document.querySelector('body');

export const debounce = (
    func,
    wait,
    context,
    noTrailing = true,
    setTimeoutFunc = setTimeout,
    clearTimeoutFunc = clearTimeout
) => {
    let timeout;

    function debouncer(...args) {
        if (!timeout && noTrailing) {
            func.apply(context, args);
        }
        debouncer.reset();

        const callback = () => {
            if (!noTrailing) {
                func.apply(context, args);
            }
            timeout = null;
        };

        timeout = setTimeoutFunc(callback, wait);
    }

    debouncer.reset = () => {
        clearTimeoutFunc(timeout);
    };

    return debouncer;
};

export const throttle = (func, ms, noTrailing = true) => {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                if (!noTrailing) {
                    wrapper.apply(savedThis, savedArgs);
                }
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
};

export const innerHeight = (node) => {
    const computedStyle = getComputedStyle(node);
    const elementHeight = node.clientHeight;
    return elementHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
};

export const listen = (evtType, handler, env = document) => {
    env.addEventListener(evtType, handler);
};
export const unlisten = (evtType, handler, env = document) =>
    env.removeEventListener(evtType, handler);

export const emit = (
    evtType,
    evtData,
    shouldBubble = false,
    env = document
) => {
    let evt;
    if (typeof CustomEvent === "function") {
        evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
        });
    } else {
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    env.dispatchEvent(evt);
};

export const isFunction = (obj) => {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

export const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};

export const getElementWidth = nElement => {
    const computedStyle = getComputedStyle(nElement);
    return parseFloat(computedStyle.width);
};

export const requestAnimationFrame = () => {
    return new Promise((resolve, reject) => {
        requestAnimationFrame(resolve);
    });
};

export const normalizeWheel = event => {
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;

    if ("detail" in event) {
        sY = event.detail;
    }
    if ("wheelDelta" in event) {
        sY = -event.wheelDelta / 120;
    }
    if ("wheelDeltaY" in event) {
        sY = -event.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in event) {
        sX = -event.wheelDeltaX / 120;
    }

    if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
    }

    pX = sX * 10;
    pY = sY * 10;

    if ("deltaY" in event) {
        pY = event.deltaY;
    }
    if ("deltaX" in event) {
        pX = event.deltaX;
    }

    if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode === 1) {
            pX *= 40;
            pY *= 40;
        } else {
            pX *= 800;
            pY *= 800;
        }
    }

    if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
    }

    return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
    };
};

export const offset = el => {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        bottom: rect.bottom + scrollTop,
        right: rect.right + scrollLeft,
    }
};

export const windowScrollTop = () => {
    return (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
};

export const normalizeKey = event => {
    let code;
    if (event.key !== undefined) {
        code = event.key;
    } else if (event.keyIdentifier !== undefined) {
        code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        code = event.keyCode;
    }
    return code;
};

export const Img = (label, src) => ({ label, src });

export const loadImages = (...images) => {
    const pageImgs = [...document.querySelectorAll("img[data-img]")];
    const filteredImages = label =>
        pageImgs.filter(img => img.dataset.img === label);
    const setSrc = src => img => (img.src = src);

    return Promise.all(
        images
            .reduce((acc, { label, src }) => {
                const resolvedImages = filteredImages(label).map(setSrc(src));
                if (resolvedImages.length) acc = [...acc, ...resolvedImages];
                return acc;
            }, [])
            .map(src => {
                const tmpImg = new Image();
                tmpImg.src = src;
                return new Promise(resolve => {
                    tmpImg.addEventListener("load", resolve);
                    tmpImg.addEventListener("error", resolve);
                });
            })
    );
};

export const deviceTypeConfig = {
    forceDevice: null,
};

export const getDeviceType = () => {
    let res = '';
    if (window.matchMedia(`(min-width: ${VARIABLES.SCREEN_MD_MIN_PX}px)`).matches) {
        res = 'desktop';
    } else {
        res = 'mobile';
    }
    return deviceTypeConfig.forceDevice === 'mobile'
    || (res === 'mobile' && deviceTypeConfig.forceDevice !== 'desktop' )
        ? 'mobile' : 'desktop';

};