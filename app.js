// interaçâo
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

// exibiçâo
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelslikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");

const api_key = "4479a8c8b5fbc7c7d16efced1978ca7b";

citySearchButton.addEventListener("click", () => {
    let cityName = citySearchInput.value
    getCityWeather(cityName)
})

// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}

navigator.geolocation.getCurrentPosition(
     (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        getCurrentLocationWeather(lat, lon)

     },
     (err) => {
        if (err.code ===1) {
            alert("geolocalização negada pelo usuario, busque manualmente por uma cidade através da barra de pesquisa")
        } else {
            console.log(err)
        }
     }
)

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((Response) => Response.json())
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

    weatherIcon.src = `./assets/loading-icon.svg`

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((Response) => Response.json())
        .then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main:{ temp, feels_like, humidity },
        wind: { speed },
        sys:{ sunrise, sunset },
    } = data

    currentDate.textContent = formtDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `./assets/${icon}.svg`
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed + 3.6)}km/h`;
    feelslikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formtDate(epochtime) {
   let date = new Date(epochtime + 1000)
   let formattedDate = date.toLocaleDateString('pt-br', { month: "long", day: 'numeric' })
   return `hoje, ${formattedDate}`
}

function formatTime(epochTIme) {
    let date = new Date(epochTIme + 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}