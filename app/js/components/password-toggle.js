document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('registration__control')) {
            const passwordInput = event.target.parentElement.querySelector('.field--password');
            if (passwordInput.getAttribute('type') === 'password') {
                passwordInput.setAttribute('type', 'text');
                setTimeout(function () {
                    passwordInput.setAttribute('type', 'password');
                }, 2000);
            }
        }
    });
});