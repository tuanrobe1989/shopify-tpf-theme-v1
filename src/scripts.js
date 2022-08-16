import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import './styles/index.scss';
import MatchHeight from 'matchheight';
import LazyLoad from "vanilla-lazyload";
// import 'lazysizes';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
var string = "w-full w-1/2 w-1/3 w-1/4 md:w-full md:w-1/2 md:w-1/3 md:w-1/4 lg:w-full lg:w-1/2 lg:w-1/3 lg:w-1/4  xl:w-full xl:w-1/2 xl:w-1/3 xl:w-1/4";

var lazyLoadInstance = new LazyLoad({ // Your custom settings go here
});

window.lazyLoadOptions = { // Your custom settings go here
};

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

tpfObjects.defaultCarousel = function () {
    if (jQuery('.owl-carousel').length > 0) {
        jQuery('.owl-carousel').each(function (index, item) {
            var oc = $(this);
            var options = {
                items: oc.data('items') || 1,
                loop: oc.data('loop') === true ? true : false,
                margin: oc.data('margin') || 0,
                dots: oc.data('dots') === false ? false : true,
                nav: oc.data('nav') === true ? true : false,
                lazyLoad:oc.data('lazyLoad') === true ? true : false,
                responsive: {
                    0: {
                        items: oc.data('items-xs') || 1
                    },
                    567: {
                        items: oc.data('items-sm') || 1
                    },
                    768: {
                        items: oc.data('items-md') || 1
                    },
                    1024: {
                        items: oc.data('items-lg') || 1
                    },
                    1280: {
                        items: oc.data('items-xl') || 1
                    }
                }
            }
            oc.owlCarousel(options);
        });
    }
}

tpfObjects.menu = function () {
    var currentTop;
    jQuery(window).scroll(function (x) {
        currentTop = jQuery(window).scrollTop();
        if (currentTop >= 210) {
            jQuery('body').addClass('sticked');
        } else {
            jQuery('body').removeClass('sticked');
        }
    })
    jQuery('.header__hamb').click(function () {
        jQuery(this).toggleClass('actived');
        jQuery('body').toggleClass('menuActived');
    })
}

tpfObjects.singleProductThumb = function(){
    jQuery('.sProduct__thumb').click(function(){
        let _this =  jQuery(this);
        let thumb_index = _this.data('index') - 1;
        let thumbSelector = _this.closest('.sProduct__thumbs');
        thumbSelector.find('.sProduct__thumb').each(function(){
            jQuery(this).removeClass('actived');
        });
        _this.addClass('actived');
        console.log(thumb_index);
        thumbSelector.find('.owl-dots .owl-dot').eq(thumb_index).addClass('AAAAAA').trigger('click');
    })
}

tpfObjects.singleProductVariant = function(){
    var curVariant = 0;
    jQuery('input[data-action="product-select"]').change(function(){
        var curVariant = jQuery(this).filter(':checked');
        var curVariant_val = curVariant.val();
        var dataOption = curVariant.data('option');
        console.log(curVariant_val);
        console.log(dataOption);
    })
    // jQuery('.sProduct__select radio').change(function(){
    //     curVariant = jQuery(this).filter(':checked').val();
    //     console.log(curVariant);
    // })
}


jQuery(document).ready(function ($) {
    MatchHeight.init();
    tpfObjects.menu();
    tpfObjects.hemhamburger();
    tpfObjects.faqItem();
    tpfObjects.tabsContent();
    tpfObjects.defaultCarousel();
    tpfObjects.singleProductThumb();
    tpfObjects.singleProductVariant();
});
