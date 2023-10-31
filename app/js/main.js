$(document).ready(function () {
    $('#btnModalChoice').click(function () {
        openModal();
    });
});

$(document).ready(function () {
    $('#modelButton, #clientButton').click(function () {
        const selectedOption = $(this).text();
        updateModal(selectedOption);
    });
});

function updateModal(selectedOption) {
    const modalLogin = $('#modalLogin');
    const modalTitle = modalLogin.find('.modal__title');

    if (selectedOption === "Я - Модель") {
        modalTitle.text("Войти как модель");
        modalLogin.addClass('modal--active');
        $('body').addClass('body--active');
    } else if (selectedOption === "Я - Клиент") {
        modalTitle.text("Войти как клиент");
        modalLogin.addClass('modal--active');
        $('body').addClass('body--active');
    }
}

function openModal() {
    $('#modalChoice').addClass('modal--active');
    $('body').addClass('body--active');
}