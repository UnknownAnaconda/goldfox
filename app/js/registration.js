import {initializeCustomSelect} from "./components/custom-select.js";
import {createImageUploader} from "./components/custom-file.js";

$(document).ready(function () {
    initializeCustomSelect();
    createImageUploader(8);
    $('body').on('click', '.registration__control', function () {
        const passwordInput = $('#password');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            setTimeout(function () {
                passwordInput.attr('type', 'password');
            }, 2000);
        }
        return false;
    });
});
$(document).ready(function () {
    const validationFields = [
        {
            input: $('#login'),
            errors: [
                {id: 'loginErrorLength', condition: (value) => value.length < 5},
                {id: 'loginErrorSymbols', condition: (value) => /[@!?:#$%^&*()_{}~\\/]+/.test(value)},
                {id: 'loginCyrillicError', condition: (value) => /[а-яА-Я]/.test(value)}
            ]
        },
        {
            input: $('#password'),
            errors: [
                {id: 'passwordErrorLength', condition: (value) => value.length < 7},
                {id: 'passwordError', condition: (value) => /[а-яА-Я]/.test(value)}
            ]
        },
        {
            input: $('#email'),
            errors: [
                {
                    id: 'emailErrorParameters',
                    condition: (value) => !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
                }
            ]
        },
        {
            input: $('#nickname'),
            errors: [
                {id: 'nicknameErrorLength', condition: (value) => value.length < 3},
                {id: 'nicknameErrorSymbols', condition: (value) => /[@!?:#$%^&*()_{}~\\/]+/.test(value)}
            ]
        }
    ];
    validationFields.forEach(field => {
        const $input = field.input;
        const errors = field.errors;

        $input.on('blur', function () {
            const value = $input.val();

            errors.forEach(error => {
                const $errorElement = $('#' + error.id);
                if (error.condition(value)) {
                    $errorElement.addClass('error--active');
                } else {
                    $errorElement.removeClass('error--active');
                }
            });
        });
    });
});
$(document).ready(function () {
    function validateField($input, $errorSymbols, $errorLength, minLength) {
        $input.on('blur', function () {
            const value = $input.val();
            $errorSymbols.removeClass('error--active');
            $errorLength.removeClass('error--active');

            const forbiddenCharactersRegex = /[@!?:#$%^&*()_{}~\\/0-9]+/;
            if (forbiddenCharactersRegex.test(value)) {
                $errorSymbols.addClass('error--active');
            } else if (value.length < minLength) {
                $errorLength.addClass('error--active');
            }
        });
    }

    validateField($('#haircut'), $('#haircutErrorSymbols'), $('#haircutErrorLength'), 3);
    validateField($('#appearance'), $('#appearanceErrorSymbols'), $('#appearanceErrorLength'), 4);
    validateField($('#hair_color'), $('#hairColorErrorSymbols'), $('#hairColorErrorLength'), 5);
    validateField($('#nationality'), $('#nationalityErrorSymbols'), $('#nationalityErrorLength'), 3);
    validateField($('#area'), $('#areaErrorSymbols'), $('#areaErrorLength'), 6);

    const numericFields = [
        {
            input: $('#age'),
            errorMin: $('#ageErrorMin'),
            errorMax: $('#ageErrorMax'),
            min: 18,
            max: 80
        },
        {
            input: $('#breast'),
            errorMin: $('#breastErrorMin'),
            errorMax: $('#breastErrorMax'),
            min: 1,
            max: 5
        },
        {
            input: $('#weight'),
            errorMin: $('#weightErrorMin'),
            errorMax: $('#weightErrorMax'),
            min: 45,
            max: 150
        },
        {
            input: $('#height'),
            errorMin: $('#heightErrorMin'),
            errorMax: $('#heightErrorMax'),
            min: 135,
            max: 240
        }
    ];

    numericFields.forEach(field => {
        field.input.on('blur', function () {
            const value = parseInt(field.input.val(), 10);
            field.errorMin.removeClass('error--active');
            field.errorMax.removeClass('error--active');

            if (isNaN(value)) {
                field.errorMin.addClass('error--active');
            } else if (value < field.min) {
                field.errorMin.addClass('error--active');
            } else if (value > field.max) {
                field.errorMax.addClass('error--active');
            }
        });
    });
});
$(document).ready(function () {
    const $ageLimitOt = $('#age_limit_ot');
    const $ageLimitDo = $('#age_limit_do');
    const $ageMaxMinLimitError = $('#ageMaxMinLimitErrorLength');
    const $ageMinLimitError = $('#ageMinLimitErrorLength');
    const $ageMaxLimitError = $('#ageMaxLimitErrorLength');

    function validateAgeLimitField() {
        const otValue = parseInt($ageLimitOt.val());
        const doValue = parseInt($ageLimitDo.val());

        $ageMaxMinLimitError.removeClass('error--active');
        $ageMinLimitError.removeClass('error--active');
        $ageMaxLimitError.removeClass('error--active');

        if (otValue < 18) {
            $ageMinLimitError.addClass('error--active');
        }

        if (doValue > 90) {
            $ageMaxLimitError.addClass('error--active');
        }

        if (!isNaN(otValue) && !isNaN(doValue)) {
            if (otValue > doValue) {
                $ageMaxMinLimitError.addClass('error--active');
            }
        }
    }

    $ageLimitOt.on('blur', validateAgeLimitField);
    $ageLimitDo.on('blur', validateAgeLimitField);
});
$(document).ready(function () {
    const $timeInputs = $('input[data-time-input]');

    $timeInputs.on('blur', function () {
        const $input = $(this);
        const value = $input.val();

        if (isValidTime(value)) {
            $('#work_limitError').removeClass('error--active');
        } else {
            $('#work_limitError').addClass('error--active');
        }
    });

    function isValidTime(value) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }
});
$(document).ready(function () {
    const $telegramInput = $('#telegram');
    const $telegramError = $('#telegramError');

    $telegramInput.on('blur', function () {
        const value = $telegramInput.val();

        if (isValidTelegram(value)) {
            $telegramError.removeClass('error--active');
        } else {
            $telegramError.addClass('error--active');
        }
    });

    function isValidTelegram(value) {
        return /^[a-zA-Z0-9_]+$/.test(value);
    }
});
$(document).ready(function () {
    const descriptionInput = $("#description");
    const descriptionScriptError = $("#descriptionScriptError");
    const descriptionError = $("#descriptionError");

    descriptionInput.on("input", function () {
        const descriptionValue = descriptionInput.val();
        if (containsScript(descriptionValue)) {
            descriptionScriptError.addClass("error--active");
        } else {
            descriptionScriptError.removeClass("error--active");
        }

        if (descriptionValue.length < 80) {
            descriptionError.addClass("error--active");
        } else {
            descriptionError.removeClass("error--active");
        }
    });

    function containsScript(text) {
        const scriptPattern = /<\s*script\s*>|<\/\s*script\s*>/i;
        return scriptPattern.test(text);
    }
});
$(document).ready(function () {
    const priceFields = [
        {
            fieldId: 'express_price',
            errorId: 'expressPriceError',
        },
        {
            fieldId: 'hour1_price',
            errorId: 'hour1PriceError',
        },
        {
            fieldId: 'hour2_price',
            errorId: 'hour2PriceError',
        },
        {
            fieldId: 'night_price',
            errorId: 'nightPriceError',
        },
        {
            fieldId: 'client_express_price',
            errorId: 'clientExpressPriceError',
        },
        {
            fieldId: 'client_hour1_price',
            errorId: 'clientHour1PriceError',
        },
        {
            fieldId: 'client_hour2_price',
            errorId: 'clientHour2PriceError',
        },
        {
            fieldId: 'client_night_price',
            errorId: 'clientNightPriceError',
        },
    ];

    const minPrice = 2000;
    const maxPrice = 10000000;

    function validatePriceField(fieldId, errorId) {
        const fieldValue = parseInt($('#' + fieldId).val());
        const errorElement = $('#' + errorId);

        if (isNaN(fieldValue) || fieldValue < minPrice || fieldValue > maxPrice) {
            errorElement.addClass('error--active');
        } else {
            errorElement.removeClass('error--active');
        }
    }

    priceFields.forEach(function (field) {
        $('#' + field.fieldId).on('blur', function () {
            validatePriceField(field.fieldId, field.errorId);
        });
    });
});
$(document).ready(function () {
    function updateErrorForSection(sectionId, minSelectedCount, errorElementId) {
        const section = $(`[data-category="${sectionId}"]`);
        const checkboxes = section.find(".custom-checkbox__input:checked");

        if (checkboxes.length < minSelectedCount) {
            $(`#${errorElementId}`).addClass("error--active");
        } else {
            $(`#${errorElementId}`).removeClass("error--active");
        }
    }

    $(".custom-checkbox__input").on("change", function () {
        updateErrorForSection("sex", 2, "checkboxSexError");
        updateErrorForSection("departure", 1, "checkboxDepartureError");
    });

    $("#submitButton").on("click", function () {
        updateErrorForSection("sex", 2, "checkboxSexError");
        updateErrorForSection("departure", 1, "checkboxDepartureError");
    });
});

function watchForErrors() {
    const $form = $('.registration__form');
    const $submitButton = $('#submitButton');

    function checkForErrors() {
        const $errorElements = $form.find('.error--active');

        if ($errorElements.length > 0) {
            $submitButton.prop('disabled', true);
        } else {
            $submitButton.prop('disabled', false);
        }
    }

    checkForErrors();
    setInterval(checkForErrors, 100);
}

watchForErrors();