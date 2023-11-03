$('.registration__control').click(function () {
    const passwordInput = $(this).siblings('.field--password');

    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        setTimeout(function () {
            passwordInput.attr('type', 'password');
        }, 2000);
    }
    return false;
});

$(document).ready(() => {
    const closeModals = () => {
        $('.modal').removeClass('modal--active');
        $('body').removeClass('body--active');
    };

    const openModal = (modalSelector) => {
        closeModals();
        $(modalSelector).addClass('modal--active');
        $('body').addClass('body--active');
    };

    const updateModal = (selectedOption) => {
        const modalLogin = $('#modalLogin');
        const modalTitle = modalLogin.find('.modal__title');
        modalTitle.text(selectedOption === "Я - Модель" ? "Войти как модель" : "Войти как клиент");
        modalLogin.addClass('modal--active');
        $('body').addClass('body--active');
        if (selectedOption === "Я - Модель") {
            const registrationLink = $('<a>', {
                class: 'modal__btn modal__btn--gray',
                id: 'registrationButton',
                href: 'registration.html',
                text: 'Зарегистрироваться'
            });
            $('#registrationButton').replaceWith(registrationLink);
        }
    };

    $('#btnModalChoice').click(() => {
        openModal('#modalChoice');
    });

    $('#modelButton, #clientButton').click(function () {
        const selectedOption = $(this).text();
        $('#modalChoice').removeClass('modal--active');
        updateModal(selectedOption);
    });

    $(document).on('mouseup keyup', (e) => {
        if ((e.type === 'mouseup' && !$('.modal').is(e.target) && !$('.modal').has(e.target).length) ||
            (e.type === 'keyup' && e.key === 'Escape')) {
            closeModals();
        }
    });

    $('.modal__btn-forward').click((e) => {
        e.preventDefault();
        openModal('#modalPassword');
    });

    $('#modalLogin').on('click', (e) => {
        e.stopPropagation();
    });

    $('#registrationButton').click(() => {
        closeModals();
        openModal('#modalRegistration');
    });

    $('#passwordResetBtn').click(() => {
        openModal('#modalPasswordComplete');
    });

    $('#passwordResetClose').click(() => {
        closeModals();
    });
});

$('#formRegistration #registrationButtonSubmit').click(() => {
    const emailValue = $('#email').val();
    const passwordValue = $('#formRegistration #password').val();
    const emailErrorParameters = $('#formRegistration #emailModalErrorParameters');
    const passwordError = $('#formRegistration #passwordModalError');
    const passwordErrorLength = $('#formRegistration #passwordModalErrorLength');
    const loginValue = $('#formRegistration #login').val();
    const loginError = $('#formRegistration #loginModalError');
    const loginErrorLength = $('#formRegistration #loginModalErrorLength');
    const loginErrorSymbols = $('#formRegistration #loginModalErrorSymbols');

    if (loginValue.length < 5) {
        loginErrorLength.addClass('error--active');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(loginValue)) {
        loginErrorSymbols.addClass('error--active');
    }

    $('#formRegistration .error').removeClass('error--active');
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailValue)) {
        emailErrorParameters.addClass('error--active');
    }
    if (/[а-яА-Я]/.test(passwordValue)) {
        passwordError.addClass('error--active');
    }
    if (passwordValue.length < 7) {
        passwordErrorLength.addClass('error--active');
    }
});