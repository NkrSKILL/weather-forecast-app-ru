// API ключ для OpenWeatherMap (демо ключ, в реальном проекте используйте свой)
const API_KEY = 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Элементы DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');

// Элементы для отображения данных о погоде
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const visibility = document.getElementById('visibility');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');
const uvIndex = document.getElementById('uvIndex');
const forecastContainer = document.getElementById('forecastContainer');

// Демо данные для показа функциональности (поскольку нужен реальный API ключ)
const demoWeatherData = {
    'москва': {
        current: {
            temp: -5,
            feels_like: -8,
            humidity: 78,
            pressure: 1013,
            visibility: 10,
            wind_speed: 3.2,
            weather: [{
                main: 'Snow',
                description: 'легкий снег',
                icon: '13d'
            }]
        },
        forecast: [
            { date: 'Сегодня', temp_max: -3, temp_min: -7, description: 'снег', icon: '13d' },
            { date: 'Завтра', temp_max: -1, temp_min: -5, description: 'облачно', icon: '04d' },
            { date: 'Послезавтра', temp_max: 2, temp_min: -2, description: 'ясно', icon: '01d' },
            { date: 'Четверг', temp_max: 0, temp_min: -4, description: 'дождь', icon: '10d' },
            { date: 'Пятница', temp_max: -2, temp_min: -6, description: 'снег', icon: '13d' }
        ]
    },
    'санкт-петербург': {
        current: {
            temp: -3,
            feels_like: -6,
            humidity: 82,
            pressure: 1008,
            visibility: 8,
            wind_speed: 4.1,
            weather: [{
                main: 'Clouds',
                description: 'пасмурно',
                icon: '04d'
            }]
        },
        forecast: [
            { date: 'Сегодня', temp_max: -1, temp_min: -5, description: 'облачно', icon: '04d' },
            { date: 'Завтра', temp_max: 1, temp_min: -3, description: 'дождь', icon: '10d' },
            { date: 'Послезавтра', temp_max: 3, temp_min: -1, description: 'ясно', icon: '01d' },
            { date: 'Четверг', temp_max: 2, temp_min: -2, description: 'облачно', icon: '03d' },
            { date: 'Пятница', temp_max: 0, temp_min: -4, description: 'снег', icon: '13d' }
        ]
    },
    'лондон': {
        current: {
            temp: 8,
            feels_like: 6,
            humidity: 71,
            pressure: 1015,
            visibility: 12,
            wind_speed: 2.8,
            weather: [{
                main: 'Rain',
                description: 'небольшой дождь',
                icon: '10d'
            }]
        },
        forecast: [
            { date: 'Сегодня', temp_max: 10, temp_min: 6, description: 'дождь', icon: '10d' },
            { date: 'Завтра', temp_max: 12, temp_min: 8, description: 'облачно', icon: '04d' },
            { date: 'Послезавтра', temp_max: 15, temp_min: 10, description: 'ясно', icon: '01d' },
            { date: 'Четверг', temp_max: 13, temp_min: 9, description: 'дождь', icon: '10d' },
            { date: 'Пятница', temp_max: 11, temp_min: 7, description: 'облачно', icon: '03d' }
        ]
    },
    'нью-йорк': {
        current: {
            temp: 2,
            feels_like: -1,
            humidity: 65,
            pressure: 1020,
            visibility: 15,
            wind_speed: 3.5,
            weather: [{
                main: 'Clear',
                description: 'ясно',
                icon: '01d'
            }]
        },
        forecast: [
            { date: 'Сегодня', temp_max: 5, temp_min: 0, description: 'ясно', icon: '01d' },
            { date: 'Завтра', temp_max: 7, temp_min: 2, description: 'облачно', icon: '03d' },
            { date: 'Послезавтра', temp_max: 9, temp_min: 4, description: 'дождь', icon: '10d' },
            { date: 'Четверг', temp_max: 6, temp_min: 1, description: 'снег', icon: '13d' },
            { date: 'Пятница', temp_max: 3, temp_min: -2, description: 'ясно', icon: '01d' }
        ]
    },
    'токио': {
        current: {
            temp: 12,
            feels_like: 10,
            humidity: 58,
            pressure: 1018,
            visibility: 18,
            wind_speed: 2.1,
            weather: [{
                main: 'Clear',
                description: 'ясно',
                icon: '01d'
            }]
        },
        forecast: [
            { date: 'Сегодня', temp_max: 15, temp_min: 8, description: 'ясно', icon: '01d' },
            { date: 'Завтра', temp_max: 17, temp_min: 10, description: 'облачно', icon: '03d' },
            { date: 'Послезавтра', temp_max: 14, temp_min: 9, description: 'дождь', icon: '10d' },
            { date: 'Четверг', temp_max: 16, temp_min: 11, description: 'ясно', icon: '01d' },
            { date: 'Пятница', temp_max: 18, temp_min: 12, description: 'облачно', icon: '04d' }
        ]
    }
};

// Функция для получения иконки погоды
function getWeatherIcon(weatherMain, iconCode) {
    const iconMap = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain',
        'Drizzle': 'fas fa-cloud-drizzle',
        'Thunderstorm': 'fas fa-bolt',
        'Snow': 'fas fa-snowflake',
        'Mist': 'fas fa-smog',
        'Fog': 'fas fa-smog',
        'Haze': 'fas fa-smog'
    };
    
    return iconMap[weatherMain] || 'fas fa-sun';
}

// Функция для отображения данных о погоде
function displayWeatherData(data) {
    const current = data.current;
    const forecast = data.forecast;
    
    // Отображение текущей погоды
    temperature.textContent = Math.round(current.temp);
    cityName.textContent = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
    weatherDescription.textContent = current.weather[0].description;
    weatherIcon.className = getWeatherIcon(current.weather[0].main);
    
    // Дополнительная информация
    visibility.textContent = `${current.visibility} км`;
    humidity.textContent = `${current.humidity}%`;
    windSpeed.textContent = `${current.wind_speed} м/с`;
    feelsLike.textContent = `${Math.round(current.feels_like)}°C`;
    pressure.textContent = `${current.pressure} гПа`;
    uvIndex.textContent = Math.floor(Math.random() * 10) + 1; // Случайный УФ-индекс для демо
    
    // Отображение прогноза
    forecastContainer.innerHTML = '';
    forecast.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-date">${day.date}</div>
            <div class="forecast-icon">
                <i class="${getWeatherIcon(day.icon === '01d' ? 'Clear' : day.icon === '04d' ? 'Clouds' : day.icon === '10d' ? 'Rain' : day.icon === '13d' ? 'Snow' : 'Clear')}"></i>
            </div>
            <div class="forecast-temp">${day.temp_max}° / ${day.temp_min}°</div>
            <div class="forecast-desc">${day.description}</div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
    
    // Показать информацию о погоде
    hideAllSections();
    weatherInfo.style.display = 'block';
}

// Функция для скрытия всех секций
function hideAllSections() {
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    loading.style.display = 'none';
}

// Функция для показа ошибки
function showError() {
    hideAllSections();
    errorMessage.style.display = 'block';
}

// Функция для показа загрузки
function showLoading() {
    hideAllSections();
    loading.style.display = 'block';
}

// Функция поиска погоды
async function searchWeather() {
    const city = cityInput.value.trim().toLowerCase();
    
    if (!city) {
        alert('Пожалуйста, введите название города');
        return;
    }
    
    showLoading();
    
    // Имитация задержки API запроса
    setTimeout(() => {
        if (demoWeatherData[city]) {
            displayWeatherData(demoWeatherData[city]);
        } else {
            showError();
        }
    }, 1000);
}

// Реальная функция для работы с API (требует настоящий API ключ)
async function searchWeatherReal() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Пожалуйста, введите название города');
        return;
    }
    
    showLoading();
    
    try {
        // Получение текущей погоды
        const currentResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        );
        
        if (!currentResponse.ok) {
            throw new Error('Город не найден');
        }
        
        const currentData = await currentResponse.json();
        
        // Получение прогноза на 5 дней
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        );
        
        const forecastData = await forecastResponse.json();
        
        // Обработка данных прогноза
        const dailyForecast = [];
        const days = ['Сегодня', 'Завтра', 'Послезавтра', 'Четверг', 'Пятница'];
        
        for (let i = 0; i < 5; i++) {
            const dayData = forecastData.list[i * 8]; // Каждые 8 записей = 1 день
            if (dayData) {
                dailyForecast.push({
                    date: days[i],
                    temp_max: Math.round(dayData.main.temp_max),
                    temp_min: Math.round(dayData.main.temp_min),
                    description: dayData.weather[0].description,
                    icon: dayData.weather[0].icon
                });
            }
        }
        
        const weatherData = {
            current: currentData,
            forecast: dailyForecast
        };
        
        displayWeatherData(weatherData);
        
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        showError();
    }
}

// Обработчики событий
searchBtn.addEventListener('click', searchWeather);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Инициализация - показать погоду для Москвы по умолчанию
window.addEventListener('load', () => {
    cityInput.value = 'Москва';
    searchWeather();
});

// Функция для переключения на реальный API
function enableRealAPI() {
    // Замените 'demo_key' на ваш реальный API ключ от OpenWeatherMap
    // API_KEY = 'ваш_реальный_api_ключ';
    // Затем замените вызовы searchWeather() на searchWeatherReal()
    console.log('Для использования реального API получите ключ на https://openweathermap.org/api');
}
