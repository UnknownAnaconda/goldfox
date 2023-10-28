document.addEventListener("DOMContentLoaded", function () {
    let timeInput = document.querySelectorAll('input[data-time-input]');

    let onTimeInput = function (e) {
        let input = e.target;
        let inputValue = input.value;
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = inputValue.slice(0, 4);
        if (inputValue.length > 2) {
            inputValue = inputValue.slice(0, 2) + ':' + inputValue.slice(2);
        }
        input.value = inputValue;
    }

    for (let i = 0; i < timeInput.length; i++) {
        let input = timeInput[i];
        input.addEventListener("input", onTimeInput);
    }
});