import Barba from "barba.js";

Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
Barba.Pjax.preventCheck = function(evt, element) {
    if (jQuery(element).attr('href') && jQuery(element).attr('href').indexOf('#') > -1)
        return true;
    else
        return Barba.Pjax.originalPreventCheck(evt, element)
};
Barba.Pjax.start();