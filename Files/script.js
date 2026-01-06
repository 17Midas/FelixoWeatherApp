const API_KEY = "b1781bac0c1af2067ddc881fe6bdb858"; // PASTE YOUR KEY HERE

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const display = document.getElementById('weatherDisplay');
    const status = document.getElementById('statusMsg');

    if (!city) return alert("Please enter a city name");

    status.innerText = "Fetching weather...";
    status.classList.remove('hidden');
    display.classList.add('hidden');

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateDashboard(data);
        
        status.classList.add('hidden');
        display.classList.remove('hidden');
    } catch (error) {
        status.innerText = error.message;
    }
}

function updateDashboard(data) {
    document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} m/s`;
    document.getElementById('description').innerText = data.weather[0].description;
    
    // Set Weather Icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
