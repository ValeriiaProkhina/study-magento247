define([
    'jquery',
    'Magento_Ui/js/modal/confirm',
    'mage/translate'
], function ($, confirm, $t) {
    'use strict';

    $.widget('custom.clearWishlist', {
        _create: function () {
            this._on(this.element, {
                click: this._showConfirmation
            });
        },

        _showConfirmation: function (event) {
            event.preventDefault();

            confirm({
                content: $t('Do you want to clear all wishlist?'),
                buttons: [{
                    text: $t('Yes'),
                    class: 'action-confirm',
                    click: () => {
                        console.log('Confirmed');
                        this._confirmAction();
                    }
                }, {
                    text: $t('No'),
                    class: 'action-cancel',
                    click: () => {
                        console.log('Canceled');
                    }
                }]
            });
        },

        _confirmAction: function () {
            $.ajax({
                url: this.options.clearWishlistUrl,
                type: 'POST',
                success: (response) => {
                    if (response.success) {
                        console.log('Wishlist cleared');
                        location.reload();
                    } else {
                        alert(response.message || $t('An error occurred.'));
                    }
                },
                error: () => {
                    alert($t('An error occurred while processing your request.'));
                }
            });
        }
    });

    return $.custom.clearWishlist;
});
