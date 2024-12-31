define([
    'jquery',
    'Magento_Ui/js/modal/confirm',
    'mage/translate',
    'mage/cookies'
], function ($, confirm, $t) {
    'use strict';

    $.widget('custom.deleteConfirmation', {
        _create: function () {
            this._on(this.element, {
                click: this._showConfirmation
            });
        },

        _showConfirmation: function (event) {
            event.preventDefault();

            let postData = this.element.data('post-remove');
            postData.data.form_key = $.mage.cookies.get('form_key')
            console.log('data:', postData)

            confirm({
                content: $t('Do you really want to delete this product?'),
                buttons: [{
                    text: $t('Yes'),
                    class: 'action-confirm',
                    click: function () {
                        $.mage.dataPost().postData(postData)
                        console.log('Action confirmed')
                        this.closeModal();
                    }
                }, {
                    text: $t('No'),
                    class: 'action-cancel',
                    click: function () {
                        console.log('Action canceled')
                        this.closeModal();
                    }
                }],
                clickableOverlay: true,
                opened: function () {
                    console.log('Modal opened')
                },
                closed: function () {
                    console.log('Modal cosed')
                }

            });
        }
    });

    return $.custom.deleteConfirmation;
});
