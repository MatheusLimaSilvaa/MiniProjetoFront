window.addEventListener('load', function () {
    const savedMessages = JSON.parse(localStorage.getItem('meus-interesses')) || [];
    const messageList = document.getElementById('messageList');

    savedMessages.forEach(function (message) {
        const li = document.createElement('li');
        li.textContent = message;
        messageList.appendChild(li);
    });
});

document.getElementById('addButton').addEventListener('click', function () {
    const messageBox = document.getElementById('messageBox');
    const message = messageBox.value;

    if (message) {
        if (message.length <= 80) {
            const li = document.createElement('li');
            li.textContent = message;

            const messageList = document.getElementById('messageList');
            messageList.appendChild(li);

            saveMessage(message);

            messageBox.value = '';
        } else {
            alert('O máximo é 80 caracteres.');
        }
    } else {
        alert('Por favor, digite uma mensagem.');
    }
});

document.getElementById('clearButton').addEventListener('click', function () {
    const confirmClear = confirm('Tem certeza que deseja limpar a lista?');

    if (confirmClear) {
        const messageList = document.getElementById('messageList');
        messageList.innerHTML = '';
        localStorage.removeItem('meus-interesses');
    }
});

function saveMessage(message) {
    const savedMessages = JSON.parse(localStorage.getItem('meus-interesses')) || [];
    savedMessages.push(message);
    localStorage.setItem('meus-interesses', JSON.stringify(savedMessages));
}

const apiUrl = 'https://servicodados.ibge.gov.br/api/v3/noticias';

async function fetchFirstNewsTitle() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();

        const firstNewsItem = data.items[0];

        const firstNewsTitle = firstNewsItem.titulo;
        const firstNewsUrl = firstNewsItem.link;

        const newsLink = `<a href="${firstNewsUrl}" target="_blank">${firstNewsTitle}</a>`;

        document.getElementById('sponsor-box').innerHTML = newsLink;
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        document.getElementById('sponsor-box').textContent = 'Erro ao carregar notícias.';
    }
}

fetchFirstNewsTitle();

