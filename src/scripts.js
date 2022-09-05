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
                lazyLoad: oc.data('lazyLoad') === true ? true : false,
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

tpfObjects.singleProductThumb = function () {
    jQuery('.sProduct__thumb').click(function () {
        let _this = jQuery(this);
        let thumb_index = _this.data('index') - 1;
        let thumbSelector = _this.closest('.sProduct__thumbs');
        thumbSelector.find('.sProduct__thumb').each(function () {
            jQuery(this).removeClass('actived');
        });
        _this.addClass('actived');
        console.log(thumb_index);
        thumbSelector.find('.owl-dots .owl-dot').eq(thumb_index).addClass('AAAAAA').trigger('click');
    })
}

tpfObjects.updateCart = function () {
    fetch('/cart.js')
        .then((resp) => resp.json())
        .then((data) => {
            jQuery('.cart--totalItems').text(data.item_count);
        })
        .catch((err) => console.error(err));
}


if (jQuery('.sProduct').length > 0) {
    //SETTINGS PRODUCT VARIANTS
    var productObjects = {};
    var productVariants = {};
    var productOptions = {};
    var productQuantiy = {};
}


tpfObjects.singleProductSettings = function () {

    if (jQuery('.sProduct').length > 0) {

        //CHECK PRODUCT OBJECTS
        if (jQuery('#product-objects').length > 0) {
            productObjects = jQuery.parseJSON(jQuery('#product-objects').text());
        }

        //CHECK OPTIONS
        if (jQuery('#product-options').length > 0) {
            productOptions = jQuery.parseJSON(jQuery('#product-options').text());
        }

        //CHECK VARIANTS
        if (jQuery('#product-variants').length > 0) {
            productVariants = jQuery.parseJSON(jQuery('#product-variants').text());
        }

        let sProductQuantiySelect = jQuery('.sProduct--quantity');
        productQuantiy = sProductQuantiySelect.val() * 1;

        //SUM QUANTITY
        jQuery('.sProduct--qup').click(function () {
            productQuantiy = productQuantiy + 1;
            sProductQuantiySelect.val(productQuantiy);
        })

        //SUB QUANTITY
        jQuery('.sProduct--qdown').click(function () {
            if (productQuantiy > 0) {
                productQuantiy = productQuantiy - 1;
                sProductQuantiySelect.val(productQuantiy);
            }
        })
    }
}

tpfObjects.singleProductActions = function () {
    if (productVariants) {
        console.log(productVariants);
        //SETINGS PARAMS
        let productVariantId = '';
        let total_type_options = productOptions.length;
        let eventChange = jQuery('input[data-action="product-select"]');
        let options = {
            'option_1': '',
            // 'option_2': '',
            // 'option_3': ''
        };

        //SETUP DEFAULT VARIANT
        if (jQuery('.sProduct__variant').length > 0) {
            jQuery('.sProduct__variant').each(function () {
                let dataValue = jQuery(this).attr('data-value');
                if (jQuery(this).find('.sProduct__radio').hasClass('selected') == true) {
                    options['option_' + dataValue] = jQuery(this).find('.sProduct__radio').find('[type=radio]').val();
                }
            })
        }

        //OPTION CHANGE
        eventChange.change(function () {
            let sProduct__radio = jQuery(this).closest('.sProduct__radio');
            let curVariant = jQuery(this).filter(':checked');
            let curVariant_val = curVariant.val();
            let number_option = curVariant.data('option');
            let _index = eventChange.index(jQuery(this));
            let next = jQuery(this).attr('data-next');


            if (number_option == 1) {
                var sProduct__variant = jQuery('#sProduct__variant-' + next);
            } else if (next == 0) {
                var sProduct__variant = jQuery('#sProduct__variant-' + number_option);
            } else {
                var sProduct__variant = jQuery('#sProduct__variant-' + number_option);
            }

            let _sProduct__radio = jQuery('.sProduct__radio');

            //CHECK DO YOU HAVE NEXT OPTIONS
            if (next > 0) {
                _sProduct__radio.each(function () {
                    let _nextIndex = _sProduct__radio.index(jQuery(this));
                    if (_index != _nextIndex) {
                        jQuery(this).removeClass('selected');
                        jQuery(this).find('[type="radio"]').prop('checked', false);
                    }
                });
            }

            options['option_' + number_option] = curVariant.val();

            switch (number_option) {
                case 1:
                    //RESET NEXT OPTIONS
                    sProduct__variant.find('.sProduct__select').each(function () {
                        jQuery(this).addClass('unavailable');
                    })


                    // GET NEXT VARIANT
                    let sProduct__variantFunc = function (_sProduct__variant, _next_numb = '') {
                        var nextVariants = '';
                        if (_next_numb == '') {
                            _next_numb = next;
                            //FILTER PRODUCT SATISFY THE GIVEN CONDITIONS
                            nextVariants = productVariants.filter(function (product) {
                                if (product.option1.toLowerCase() == options['option_' + number_option] && product.available == true) {
                                    return product;
                                }
                            })
                        } else {
                            //FILTER PRODUCT SATISFY THE GIVEN CONDITIONS
                            nextVariants = productVariants.filter(function (product) {
                                if (product.option1.toLowerCase() == options['option_1'] && product.option2.toLowerCase() == options['option_2'] && product.available == true) {
                                    return product;
                                }
                            })
                        }


                        // RESET VARIANT
                        _sProduct__variant.find('.sProduct__radio').each(function () {
                            let _radio = jQuery(this).find('[type="radio"]');
                            _radio.prop('disabled', true);

                            //UNABLE OPTION AVAIABLE
                            for (let i = 0; i < nextVariants.length; i++) {
                                if (nextVariants[i]['option' + _next_numb].toLowerCase() == _radio.val()) {
                                    jQuery(this).removeClass('unavailable');
                                    _radio.prop('disabled', false);
                                }
                            }

                            if (nextVariants.length > 0) {
                                //ADD DEFAULT OPTION AVAIABLE
                                if (nextVariants[0]['option' + _next_numb].toLowerCase() == _radio.val()) {
                                    _radio.prop('checked', true);
                                    options['option_' + _next_numb] = _radio.val();
                                    jQuery(this).closest('.sProduct__radio').addClass('selected');
                                    let _next = _radio.attr('data-next');
                                    if (_next > 0) {
                                        let __sProduct__variant = jQuery('#sProduct__variant-' + _next);
                                        sProduct__variantFunc(__sProduct__variant, _next);
                                    }
                                }
                            }
                        })
                    }

                    // RUN ACTION
                    sProduct__variantFunc(sProduct__variant);

                    break;
                default:
                    sProduct__variant.find('.sProduct__radio').each(function () {
                        jQuery(this).removeClass('selected');
                    })
                    break;
            }

            //ACTIVED RADIO SELECTED 
            sProduct__radio.addClass('selected');

            //GET PRODUCT SELECTED
            if (Object.keys(options).length == total_type_options) {
                let productSelected = productVariants.filter(function (product) {
                    switch (total_type_options) {
                        case 2:
                            if (product.option1.toLowerCase() == options.option_1 && product.option2.toLowerCase() == options.option_2) {
                                return product;
                            }
                            break;
                        case 3:
                            if (product.option1.toLowerCase() == options.option_1 && product.option2.toLowerCase() == options.option_2 && product.option3.toLowerCase() == options.option_3) {
                                return product;
                            }
                            break;
                    }
                })
                if (productSelected) {
                    productSelected = productSelected[0];
                    jQuery('.sProduct--sku').text(productSelected.sku);
                    jQuery('.sProduct--variant option').each(function () {

                        if (jQuery(this).val() == productSelected.id) {
                            jQuery(this).prop("selected", true);
                            const variantPrice = jQuery(this).attr('data-price');
                            const variantComparePrice = jQuery(this).attr('data-compare-price');
                            jQuery('.sProduct--price').text(variantPrice);
                            jQuery('.sProduct--comparePrice').text(variantComparePrice);
                            return false;
                        }
                    })
                }
            }
        })

    }

    jQuery('form[action$="/cart/add"]').submit(function () {
        let _this = jQuery(this);
        let url = window.Shopify.routes.root + 'cart/add.js';
        let productId = _this.find('.sProduct--variant').val() * 1;
        let productQty = _this.find('.sProduct--quantity').val() * 1;

        let formData = {
            'items': [
                {
                    'id': productId,
                    'quantity': productQty
                }
            ]
        };

        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => {
                console.log(resp.json());
            })
            .then((data) => {
                tpfObjects.updateCart();
            })
            .catch((err) => {
                console.error('Error: ' + err);
            })



        return false;
    });

}

tpfObjects.addressFunctions = function () {
    const selectors = {
        customerAddresses: "[data-customer-addresses]",
        addressCountrySelect: "[data-address-country-select]",
        addressContainer: "[data-address]",
        toggleAddressButton: "button[aria-expanded]",
        cancelAddressButton: 'button[type="reset"]',
        deleteAddressButton: "button[data-confirm-message]",
    };

    const attributes = {
        expanded: "aria-expanded",
        confirmMessage: "data-confirm-message",
        ariaControls: "aria-controls",
    };

    class CustomerAddresses {
        constructor() {
            this.elements = this._getElements();
            if (Object.keys(this.elements).length === 0) return;
            this._setupCountries();
            this._setupEventListeners();
        }

        _getElements() {
            const container = document.querySelector(selectors.customerAddresses);
            return container
                ? {
                    container,
                    addressContainer: container.querySelector(
                        selectors.addressContainer
                    ),
                    toggleButtons: document.querySelectorAll(
                        selectors.toggleAddressButton
                    ),
                    cancelButtons: container.querySelectorAll(
                        selectors.cancelAddressButton
                    ),
                    deleteButtons: container.querySelectorAll(
                        selectors.deleteAddressButton
                    ),
                    countrySelects: container.querySelectorAll(
                        selectors.addressCountrySelect
                    ),
                }
                : {};
        }

        _setupCountries() {
            if (Shopify && Shopify.CountryProvinceSelector) {
                // eslint-disable-next-line no-new
                new Shopify.CountryProvinceSelector(
                    "AddressCountryNew",
                    "AddressProvinceNew",
                    {
                        hideElement: "AddressProvinceContainerNew",
                    }
                );
                this.elements.countrySelects.forEach((select) => {
                    const formId = select.dataset.formId;
                    // eslint-disable-next-line no-new
                    new Shopify.CountryProvinceSelector(
                        `AddressCountry_${formId}`,
                        `AddressProvince_${formId}`,
                        {
                            hideElement: `AddressProvinceContainer_${formId}`,
                        }
                    );
                });
            }
        }

        _setupEventListeners() {
            this.elements.toggleButtons.forEach((element) => {
                element.addEventListener("click", this._handleAddEditButtonClick);
            });
            this.elements.cancelButtons.forEach((element) => {
                element.addEventListener("click", this._handleCancelButtonClick);
            });
            this.elements.deleteButtons.forEach((element) => {
                element.addEventListener("click", this._handleDeleteButtonClick);
            });
        }

        _toggleExpanded(target) {
            target.setAttribute(
                attributes.expanded,
                (target.getAttribute(attributes.expanded) === "false").toString()
            );
            const container = document.querySelector(selectors.customerAddresses);
            const ariaControlsValue = target.getAttribute(attributes.ariaControls);
            const editFormContainer = container.querySelector(
                `#${ariaControlsValue}`
            );
            if (editFormContainer) {
                if (editFormContainer.classList.contains("hidden")) {
                    editFormContainer.classList.remove("hidden");
                    editFormContainer.classList.add("block");
                } else {
                    editFormContainer.classList.remove("block");
                    editFormContainer.classList.add("hidden");
                }
            }
        }

        _handleAddEditButtonClick = ({ currentTarget }) => {
            this._toggleExpanded(currentTarget);
        };

        _handleCancelButtonClick = ({ currentTarget }) => {
            this._toggleExpanded(currentTarget);
        };

        _handleDeleteButtonClick = ({ currentTarget }) => {
            // eslint-disable-next-line no-alert
            if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
                Shopify.postLink(currentTarget.dataset.target, {
                    parameters: { _method: "delete" },
                });
            }
        };
    }

    new CustomerAddresses()
};



jQuery(document).ready(function ($) {
    MatchHeight.init();
    tpfObjects.menu();
    tpfObjects.hemhamburger();
    tpfObjects.faqItem();
    tpfObjects.tabsContent();
    tpfObjects.defaultCarousel();
    tpfObjects.singleProductThumb();
    tpfObjects.singleProductSettings();
    tpfObjects.singleProductActions();
    tpfObjects.addressFunctions();
});
