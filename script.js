// Элементы страницы
const catalog = document.getElementById('catalog');
const searchInput = document.getElementById('search');
const modal = document.getElementById('player-modal');
const modalTitle = document.getElementById('modal-title');
const videoPlayer = document.getElementById('video-player');
const closeBtn = document.querySelector('.close-btn');

let allDoramas = [];

// Выводит карточки дорам в каталог
function renderCatalog(list) {
    catalog.innerHTML = '';

    if (list.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Ничего не найдено';
        message.style.cssText = 'color: white; padding: 20px;';
        catalog.appendChild(message);
        return;
    }

    list.forEach(dorama => {
        const card = document.createElement('div');
        card.className = 'dorama-card';

        const img = document.createElement('img');
        img.src = dorama.image || '';
        img.alt = dorama.title || '';

        const title = document.createElement('h3');
        title.textContent = dorama.title || 'Без названия';

        card.appendChild(img);
        card.appendChild(title);
        card.addEventListener('click', () => openPlayer(dorama));
        catalog.appendChild(card);
    });
}

// Открывает окно плеера с выбранной дорамой
function openPlayer(dorama) {
    modalTitle.textContent = dorama.title || '';
    videoPlayer.src = dorama.video || '';
    modal.classList.remove('hidden');
}

// Закрывает окно и останавливает видео
function closePlayer() {
    modal.classList.add('hidden');
    videoPlayer.src = '';
}

closeBtn.addEventListener('click', closePlayer);

// Закрытие по клику на тёмный фон вокруг окна
modal.addEventListener('click', (event) => {
    if (event.target === modal) closePlayer();
});

// Поиск по названию: фильтрует при каждом изменении текста
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allDoramas.filter(dorama =>
        (dorama.title || '').toLowerCase().includes(query)
    );
    renderCatalog(filtered);
});

// Загружает список из movies.json
async function loadDoramas() {
    try {
        const response = await fetch('movies.json');
        if (!response.ok) {
            throw new Error(`movies.json не найден, статус ${response.status}`);
        }
        allDoramas = await response.json();
        renderCatalog(allDoramas);
    } catch (error) {
        console.error('Ошибка загрузки каталога:', error);
        catalog.innerHTML = '<p style="color: white; padding: 20px;">Не удалось загрузить каталог</p>';
    }
}

loadDoramas();
