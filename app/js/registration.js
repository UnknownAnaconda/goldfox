$('body').on('click', '.registration__control', function () {
    const passwordInput = $('#password');

    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        setTimeout(function() {
            passwordInput.attr('type', 'password');
        }, 2000);
    }

    return false;
});