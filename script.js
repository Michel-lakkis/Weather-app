
const apiKey = "d8e9f10dbc2b909b3d6242f0aae0c172";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      console.log(data);

      // Extracting data
      const { name } = data;
      const { temp } = data.main;
      const { speed } = data.wind;
      const { lat } = data.coord;

      // Displaying data
      document.getElementById("city-name").innerText = `City: ${name}`;
      document.getElementById("temperature").innerText = `Temperature: ${temp}°C`;
      document.getElementById("wind-speed").innerText = `Wind Speed: ${speed} m/s`;
      document.getElementById("latitude").innerText = `Latitude: ${lat}`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    });
});

  
  
  
  
  