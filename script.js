const apiKeyWeather = "d8e9f10dbc2b909b3d6242f0aae0c172";
const apiKeyUnsplash = "emXIGcrQsIAaK5kaD0RS8tOmMjk-5bIU2ys6pH70g5g";

// Initialize event listener
document.getElementById("search-btn").addEventListener("click", handleSearch);

function handleSearch() {
    const city = document.getElementById("city-input").value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    getWeatherData(city);
    getCityImage(city);
}

// Fetch weather data from OpenWeather API
function getWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again.");
        });
}

// Update the weather information in the DOM
function updateWeatherInfo(data) {
    const { name } = data;
    const { temp } = data.main;
    const { speed } = data.wind;
    const { lat } = data.coord;

    document.getElementById("city-name").innerText = `City: ${name}`;
    document.getElementById("temperature").innerText = `Temperature: ${temp} °C`;
    document.getElementById("wind-speed").innerText = `Wind Speed: ${speed} m/s`;
    document.getElementById("latitude").innerText = `Latitude: ${lat}`;
}

// Fetch city image from Unsplash API
function getCityImage(city) {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyUnsplash}`;

    fetch(unsplashUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const imageUrl = data.results[0].urls.full;
                setBackgroundImage(imageUrl);
            } else {
                alert("No photo found for this city!");
            }
        })
        .catch(error => {
            console.error("Error fetching city image:", error);
        });
}

// Set the background image of the body
function setBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}
