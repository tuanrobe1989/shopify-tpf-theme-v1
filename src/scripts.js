import './styles/index.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';
import MatchHeight from 'matchheight';
import LazyLoad from "vanilla-lazyload";
// import 'lazysizes';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';

var lazyLoadInstance = new LazyLoad({
    // Your custom settings go here
});

var tpfObjects = {};

tpfObjects.hemhamburger = function () {
    jQuery('.hemhamburger').click(function () {
        jQuery(this).toggleClass('actived');
        jQuery('.header__menuWrap').toggleClass('actived');
    })
}

tpfObjects.faqItem = function () {
    if (jQuery('.faqItem').length > 0) {
        jQuery('.faqItem__title').click(function () {
            jQuery(this).closest('.faqItem').toggleClass('actived');
        })
    }

}


tpfObjects.tabsContent = function () {
    if (jQuery('.tabsContent').length > 0) {
        jQuery('.tabsContent__tab').click(function () {
            var id = jQuery(this).data('id');
            var tabsContents = jQuery(this).closest('.tabsContents');
            tabsContents.find('.tabsContent__tab').each(function () {
                jQuery(this).removeClass('actived');
            })
            jQuery(this).toggleClass('actived');
            tabsContents.find('.tabsContent__content').each(function () {
                jQuery(this).removeClass('actived');
            })
            tabsContents.find('#' + id).toggleClass('actived');
        })
    }
}

tpfObjects.defaultCarousel = function(){
    if (jQuery('.owl-carousel').length > 0) {
        jQuery('.owl-carousel').each(function (index, item) {
            var oc = $(this);
            var options = {
                items: oc.data('items') || 1,
                loop: oc.data('loop') === true ? true : false,
                margin: oc.data('margin') || 0,
                dots: oc.data('dots') === false ? false : true,
                nav: oc.data('nav') === true ? true : false,
                responsive: {
                    580: {
                        items: oc.data('items-580') || 1
                    },
                    992: {
                        items: oc.data('items-992') || 1
                    },
                    1024: {
                        items: oc.data('items-1024') || 1
                    }
                },
            }
            oc.owlCarousel(options);
        });
    }
}


jQuery(document).ready(function ($) {
    MatchHeight.init();
    tpfObjects.hemhamburger();
    tpfObjects.faqItem();
    tpfObjects.tabsContent();
    tpfObjects.defaultCarousel();
});