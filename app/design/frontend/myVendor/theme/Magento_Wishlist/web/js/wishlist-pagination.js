define(['jquery', 'mage/translate'], function ($, $t) {
    'use strict';

    return function (config, element) {
        const $button = $(element)
        const items = $('.product-items .product-item');
        const itemsPerPage = config.itemsPerPage;
        let currentIndex = items.filter(':visible').length;
        const totalItems = config.totalItems;

        const updateBtnText = () => {
            const remainingItems = totalItems - currentIndex
            const itemsToShow = Math.min(remainingItems, itemsPerPage)
            const btnText = $t('Show more %1 items').replace('%1', itemsToShow)
            $button.find('wishlist-pagination__text').text(btnText)

            if(remainingItems <= 0) {
                $button.hide()
            }
        }
        updateBtnText()
        $button.on('click', function () {
            const itemsToShow = items.slice(currentIndex, currentIndex + itemsPerPage);
            itemsToShow.show();
            currentIndex += itemsPerPage;
            updateBtnText()
        });
    };
});
