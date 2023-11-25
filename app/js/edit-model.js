document.getElementById('searchButton').addEventListener('click', function () {
    const searchValue = document.getElementById('searchInput').value.trim();
    const errorElement = document.getElementById('editErrorSearch');
    const searchForm = document.querySelector('.edit__search');
    const resultsList = document.querySelector('.edit__results');

    if (searchValue === '') {
        errorElement.classList.add('error--active');
        setTimeout(function () {
            errorElement.classList.remove('error--active');
        }, 3000);
        return;
    }

    searchForm.classList.add('edit__search--active');

    const modelsData = [
        {id: 1, login: 'login1', name: '✨🌸Anastasia 🌸✨'},
        {id: 2, login: 'login2', name: '✨🌸Anastasia 23 🌸✨'},
        {id: 3, login: 'login3', name: 'Золотой ларек'}
    ];

    resultsList.innerHTML = '';
    modelsData.forEach(model => {
        const listItem = document.createElement('li');
        listItem.classList.add('edit__item');

        const link = document.createElement('a');
        link.classList.add('edit__link');
        link.setAttribute('href', `/edit-model/${model.id}`);
        link.textContent = `${model.login}, ${model.name}`;

        listItem.appendChild(link);
        resultsList.appendChild(listItem);
    });
});