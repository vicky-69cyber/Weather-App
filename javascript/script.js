const apiKey = "dbd58e4c9e426e399bb943e3f1f52c76";

const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");

const loader = document.getElementById("loader");
const error = document.getElementById("error");
const weatherBox = document.getElementById("weatherBox");

const tempEl = document.getElementById("temperature");
const cityEl = document.getElementById("city");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("icon");

btn.addEventListener("click", () => {
    const city = input.value.trim();
    if (!city) return;

    getWeather(city);
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = input.value.trim();
        if (!city) return;

        getWeather(city);
    }
});

async function getWeather(city) {
    loader.style.display = "block";
    error.textContent = "";
    weatherBox.classList.remove("show");


    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();
        showWeather(data);
    } catch (err) {
        error.textContent = err.message;
    } finally {
        loader.style.display = "none";
    }
}


function showWeather(data) {
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    cityEl.textContent = data.name;
    conditionEl.textContent = data.weather[0].main;

    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} km/h`;

    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    setBackground(data.weather[0].main);

    weatherBox.classList.add("show");

}

function setBackground(weather) {
    document.body.className = "";

    if (weather.includes("Cloud")) document.body.classList.add("cloudy");
    else if (weather.includes("Rain")) document.body.classList.add("rainy");
    else if (weather.includes("Clear")) document.body.classList.add("sunny");
    else document.body.classList.add("night");
}
