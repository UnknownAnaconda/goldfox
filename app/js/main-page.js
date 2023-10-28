$(document).ready(function () {
    $('.filters__btn').on('click', function () {
        const filtersContent = $('.filters__content');
        const filtersBtn = $('.filters__btn');
        const currentHeight = filtersContent.css('height');

        if (currentHeight !== '0px' && currentHeight !== 'auto') {
            filtersContent.css('height', '0px');
            filtersContent.css('marginTop', '0px');
            filtersBtn.removeClass('active');
            filtersBtn.blur();
        } else {
            const clone = filtersContent.clone(true);
            clone.css('position', 'absolute');
            clone.css('visibility', 'hidden');
            clone.css('height', 'auto');
            filtersBtn.toggleClass('active');
            filtersBtn.blur();
            $('body').append(clone);
            const contentHeight = clone.height();
            $('body').remove(clone);
            filtersContent.css('height', contentHeight + 'px');
            filtersContent.css('marginTop', '50px');
        }
    });

    const showAllButton = $('#showAllButton');
    const modelsList = $('.models__list');
    const modelsContainer = $('.models');

    showAllButton.on('click', function () {
        modelsContainer.addClass('show-all');
        showAllButton.removeClass('active');
    });

    const models = modelsList.find('.model');
    if (models.length > 6) {
        showAllButton.addClass('active');
    }
});