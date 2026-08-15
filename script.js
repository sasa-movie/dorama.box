// Вставьте сюда вашу ссылку от Vercel (обязательно БЕЗ косой черты "/" на конце)
curl "api_endpoint_here"
  -H "mdl-api-key: [https://my-drama-list-unofficial-api-livid.vercel.app]"
const API_URL = "https://my-drama-list-unofficial-api-livid.vercel.app"; 

// Находим элементы на странице (проверьте, чтобы ID совпадали с вашим index.html)
const searchInput = document.querySelector('.search-input') || document.querySelector('input[type="text"]');
const resultsContainer = document.getElementById('results-container') || document.body; // куда вставлять результаты

// Функция, которая делает запрос к вашему API
async function searchDorama(query) {
    if (!query.trim()) return; // Если строка пустая, ничего не делаем

    try {
        // Делаем запрос к эндпоинту поиска MyDramaList API
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const doramas = await response.json();

        // Очищаем контейнер перед выводом новых результатов
        resultsContainer.innerHTML = ""; 

        if (doramas.length === 0) {
            resultsContainer.innerHTML = "<p style='color: white; padding: 20px;'>Ничего не найдено</p>";
            return;
        }

        // Выводим каждую дораму на экран
        doramas.forEach(dorama => {
            const card = document.createElement('div');
            card.className = 'dorama-card'; // Стили для карточки настройте в style.css
            
            card.innerHTML = `
                <div style="color: white; margin: 10px; padding: 10px; background: #1a1a1a; border-radius: 8px;">
                    <img src="${dorama.image}" alt="${dorama.title}" style="max-width: 150px; display: block; border-radius: 4px;">
                    <h3 style="margin: 5px 0 0 0; font-size: 16px;">${dorama.title}</h3>
                </div>
            `;
            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Ошибка при поиске:", error);
    }
}

// Отслеживаем нажатие клавиши Enter в поисковой строке
if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchDorama(searchInput.value);
        }
    });
}
