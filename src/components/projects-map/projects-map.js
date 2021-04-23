window.jQuery = jQuery;
import 'jquery-mousewheel';
import jQuery from 'jquery';
import mousewheel from 'jquery-mousewheel';
window.mousewheel = mousewheel;
import 'jquery-mapael';
import pin2 from "../../images/project-map/pin2.png";
import './diatech_world_map';

export default class MapProject {
    constructor(nRoot) {
        this.nRoot = nRoot;
        let selectCountry;
        let pin = jQuery(nRoot).data(pin);
        let Data = {
            'areas': {}
        };

        let Plots = {
            'plots': {}
        };

        projectCountries.forEach((item) => {
            Data.areas[item.id] = {
                cssClass: item.selected ? 'active selected' : 'active',
            }
        });

        projectCountries.forEach((item) => {
            let currentMargin;
            switch (item.position) {
                case 'top':
                    currentMargin = {x: 0, y: 5};
                    break;
                case 'bottom':
                    currentMargin = {x: 0, y: 4};
                    break;
                default:
                    currentMargin = {x: 4, y: 0}
            }
            Plots.plots[item.id] = {
                latitude: item.latitude,
                longitude: item.longitude,
                text: {
                    content: item.name,
                    position: item.position,
                    margin: currentMargin
                },
            }
        });

        const MapProject = jQuery(nRoot).mapael({
            map: {
                name: "diatech_world_map",
                defaultArea: {
                    eventHandlers: {
                        click: function (e, id, mapElem, textElem, elemOptions) {
                            let newData = {
                                'areas': {}
                            };
                            if (jQuery(e.target).hasClass("active")) {
                                jQuery('.active').removeClass('selected');
                                newData.areas[id] = {
                                    cssClass: "active selected"
                                };

                                selectCountry = newData.areas[id];
                                jQuery('[data-info]').hide();
                                jQuery('[data-info="' + id + '"]').fadeIn('slow');
                            } else {
                                newData.areas[id] = {
                                    return: false
                                };
                            }
                            jQuery(nRoot).trigger('update', [{mapOptions: newData}]);
                        }
                    },

                    attrs: {
                        fill: "#e5e7fb",
                    },

                    attrsHover: {
                        fill: "#e5e7fb"
                    }
                },

                defaultPlot: {
                    attrs: {
                        opacity: 1
                    }
                    , attrsHover: {
                        transform: "s1.2"
                    },
                    type: 'image',
                    url: pin2,
                    width: 8,
                    height: 8,
                    text: {
                        margin: {x: 4, y: 0}
                    },
                }
            },
            areas: Data.areas,
            plots: Plots.plots
        });
    }
}