define([
    'jquery'
], function ($) {
    'use strict';

    return function (config, element) {
        const $button = $(element);
        const $menu = $('.nav-sections');

        $button.on('click', function () {
            $menu.toggleClass('active');
        });
    };
});
