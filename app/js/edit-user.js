document.getElementById('searchButton').addEventListener('click', function () {
    const searchValue = document.getElementById('searchInput').value.trim();
    const errorElement = document.getElementById('editErrorSearch');
    const resultsList = document.querySelector('.edit__results');
    const searchForm = document.querySelector('.edit__search');

    if (searchValue === '') {
        errorElement.classList.add('error--active');
        setTimeout(function () {
            errorElement.classList.remove('error--active');
        }, 3000);
        return;
    }

    searchForm.classList.add('edit__search--active');
    const fakeData = [
        {login: 'user1', password: 'pass123', email: 'user1@example.com', id: 123},
        {login: 'user2', password: 'pass456', email: 'user2@example.com', id: 456},
        {login: 'user3', password: 'pass789', email: 'user3@example.com', id: 789}
    ];

    resultsList.innerHTML = '';
    fakeData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('edit__item');

        const button = document.createElement('button');
        button.classList.add('edit__link');
        button.setAttribute('data-user-id', item.id);
        button.innerHTML = `${item.login}, ${item.email}`;

        listItem.appendChild(button);
        resultsList.appendChild(listItem);

        button.addEventListener('click', function () {
            showUserInfo(parseInt(item.id));
            clearSearchAndResults();
        });
    });
});

function showUserInfo(userID) {
    const fakeData = [
        {login: 'user1', password: 'pass123', email: 'user1@example.com', id: 123},
        {login: 'user2', password: 'pass456', email: 'user2@example.com', id: 456},
        {login: 'user3', password: 'pass789', email: 'user3@example.com', id: 789}
    ];

    const user = fakeData.find(item => item.id === userID);
    renderUserInfo(user);
    attachResetButtonListener(user);
    attachDeleteButtonListener(user);
}

let userInfoDiv = null;

function renderUserInfo(user) {
    if (userInfoDiv) {
        userInfoDiv.remove();
    }
    userInfoDiv = document.createElement('div');
    userInfoDiv.innerHTML = `
        <form class="edit__user" method="post">
        <span class="error error__filters" id="unchangedError">Данные не были изменены</span>
            <ul class="edit__user-list">
                <li class="edit__user-item">
                    <label class="label" for="login">Логин</label>
                    <span class="error error__registration" id="loginClientError">Логин уже используется</span>
                    <input class="field" type="text" id="login" name="login" placeholder="Введите логин" required value="${user.login}">
                </li>
                <li class="edit__user-item">
                    <label class="label" for="password">Пароль</label>
                    <div class="modal__item-password">
                        <input class="field field--password" type="password" id="password" name="password"
                               placeholder="Введите пароль" required value="${user.password}" autocomplete="off">
                        <a class="registration__control" data-target="password" href="#"></a>
                    </div>
                </li>
                <li class="edit__user-item">
                    <label class="label" for="email">Электронная почта</label>
                    <input class="field field--password" type="email" id="email" name="email"
                           placeholder="Введите вашу почту" required value="${user.email}">
                </li>
            </ul>
            <label class="edit__root custom-checkbox">
                <input class="custom-checkbox__input" type="checkbox" id="root_user"
                       name="root_user" value="Права админа">
                <span class="checkmark"></span>
                Дать права админа
            </label>
            <div class="edit__buttons">
                <button class="edit__action edit__action--reset" type="button">Отправить письмо для сброса</button>
                <button class="edit__action edit__action--delete" type="button">Удалить клиента</button>
                <button class="edit__action edit__action--save" type="submit">Сохранить</button>
            </div>
        </form>
    `;

    const existingUserInfo = document.querySelector('.user-info');
    if (existingUserInfo) {
        existingUserInfo.remove();
    }

    const resultsContainer = document.querySelector('.edit__results');
    resultsContainer.insertAdjacentElement('afterend', userInfoDiv);

    const form = userInfoDiv.querySelector('.edit__user');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameInput = form.querySelector('#login');
        const passwordInput = form.querySelector('#password');
        const emailInput = form.querySelector('#email');

        const nameChanged = nameInput.value !== user.login;
        const passwordChanged = passwordInput.value !== user.password;
        const emailChanged = emailInput.value !== user.email;
        const unchangedError = document.getElementById('unchangedError');

        if (!nameChanged && !passwordChanged && !emailChanged) {
            unchangedError.style.display = 'block';
            setTimeout(function () {
                unchangedError.style.display = 'none';
            }, 3000)
        } else {
            unchangedError.style.display = 'none';
        }
        // код для отправки данных на сервер
    });
}

function attachResetButtonListener(user) {
    const resetButton = document.querySelector('.edit__action--reset');
    resetButton.addEventListener('click', function () {
        alert(`Письмо было успешно отправлено на почту пользователю ${user.login}`);
    });
}

function attachDeleteButtonListener(user) {
    const deleteButton = document.querySelector('.edit__action--delete');
    const modal = document.getElementById('modalDeleteClient');
    const cancelDeleteClientButton = document.getElementById('cancelDeleteClient');
    const confirmDeleteClientButton = document.getElementById('confirmDeleteClient');
    const modalTitle = modal.querySelector('.modal__title');

    deleteButton.addEventListener('click', function () {
        const loginSpan = `<span class="modal__title--span">${user.login}</span>`;
        modalTitle.innerHTML = `Вы действительно хотите удалить клиента ${loginSpan}?`;
        modal.classList.add('modal--active');
        document.body.classList.add('body--active');
    });

    cancelDeleteClientButton.addEventListener('click', function () {
        modal.classList.remove('modal--active');
        document.body.classList.remove('body--active');
    });

    confirmDeleteClientButton.addEventListener('click', function () {
        // Здесь написать логику удаления клиента
        modal.classList.remove('modal--active');
        document.body.classList.remove('body--active');
    });

    document.addEventListener('mouseup', function (e) {
        if (!modal.contains(e.target) && e.target !== modal) {
            modal.classList.remove('modal--active');
            document.body.classList.remove('body--active');
        }
    });

    document.addEventListener('keyup', function (e) {
        if (e.key === 'Escape') {
            modal.classList.remove('modal--active');
            document.body.classList.remove('body--active');
        }
    });
}

function clearSearchAndResults() {
    const searchForm = document.querySelector('.edit__search');
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.querySelector('.edit__results');

    searchForm.classList.remove('edit__search--active');
    searchInput.value = '';
    resultsList.innerHTML = '';
}