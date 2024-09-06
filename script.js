const apiKey = "865319c3f9b5683eeccd741cdd72cc57";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchCity = document.querySelector(".search-logo input");
const searchBtn = document.querySelector(".search-icon button");

// Mapping weather descriptions to their corresponding image URLs
const weatherIcons = {
    "clear sky": "https://openweathermap.org/img/wn/01d@2x.png",
    "few clouds": "https://openweathermap.org/img/wn/02d@2x.png",
    "scattered clouds": "https://openweathermap.org/img/wn/03d@2x.png",
    "broken clouds": "https://openweathermap.org/img/wn/04d@2x.png",
    "shower rain": "https://openweathermap.org/img/wn/09d@2x.png",
    "rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png",
    "snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "mist": "https://openweathermap.org/img/wn/50d@2x.png",

    // Thunderstorm variations
    "thunderstorm with light rain": "https://openweathermap.org/img/wn/11d@2x.png",
    "thunderstorm with rain": "https://openweathermap.org/img/wn/11d@2x.png",
    "thunderstorm with heavy rain": "https://openweathermap.org/img/wn/11d@2x.png",
    "light thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png",
    "heavy thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png",
    "ragged thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png",
    "thunderstorm with light drizzle": "https://openweathermap.org/img/wn/11d@2x.png",
    "thunderstorm with drizzle": "https://openweathermap.org/img/wn/11d@2x.png",
    "thunderstorm with heavy drizzle": "https://openweathermap.org/img/wn/11d@2x.png",

    // Drizzle variations
    "light intensity drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "heavy intensity drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "light intensity drizzle rain": "https://openweathermap.org/img/wn/09d@2x.png",
    "drizzle rain": "https://openweathermap.org/img/wn/09d@2x.png",
    "heavy intensity drizzle rain": "https://openweathermap.org/img/wn/09d@2x.png",
    "shower rain and drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "heavy shower rain and drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "shower drizzle": "https://openweathermap.org/img/wn/09d@2x.png",

    // Rain variations
    "light rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "moderate rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "heavy intensity rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "very heavy rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "extreme rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "freezing rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "light intensity shower rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "heavy intensity shower rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "ragged shower rain": "https://openweathermap.org/img/wn/10d@2x.png",

    // Snow variations
    "light snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "heavy snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "sleet": "https://openweathermap.org/img/wn/13d@2x.png",
    "light shower sleet": "https://openweathermap.org/img/wn/13d@2x.png",
    "shower sleet": "https://openweathermap.org/img/wn/13d@2x.png",
    "light rain and snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "rain and snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "light shower snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "shower snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "heavy shower snow": "https://openweathermap.org/img/wn/13d@2x.png",

    // Atmosphere conditions
    "smoke": "https://openweathermap.org/img/wn/50d@2x.png",
    "haze": "https://openweathermap.org/img/wn/50d@2x.png",
    "sand/dust whirls": "https://openweathermap.org/img/wn/50d@2x.png",
    "fog": "https://openweathermap.org/img/wn/50d@2x.png",
    "sand": "https://openweathermap.org/img/wn/50d@2x.png",
    "dust": "https://openweathermap.org/img/wn/50d@2x.png",
    "volcanic ash": "https://openweathermap.org/img/wn/50d@2x.png",
    "squalls": "https://openweathermap.org/img/wn/50d@2x.png",
    "tornado": "https://openweathermap.org/img/wn/50d@2x.png",
    "overcast clouds": "https://openweathermap.org/img/wn/02d@2x.png",
    "few clouds: 11-25%": "https://openweathermap.org/img/wn/02d@2x.png",
    "scattered clouds: 25-50%": "https://openweathermap.org/img/wn/02d@2x.png",
    "broken clouds: 51-84%": "https://openweathermap.org/img/wn/02d@2x.png"
};

// Function to get the correct weather icon based on description
function getWeatherIcon(description) {
    return weatherIcons[description] || "https://openweathermap.org/img/wn/01d@2x.png"; // Default to clear sky if description not found
}

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod === "404") {
            // City not found, display error message
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".city").innerHTML = "Invalid location name";
             // Hide weather info
        } else {
            // City found, display weather information
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".humidity-perc").innerHTML = data.main.humidity + `%`;
            document.querySelector(".wind-s").innerHTML = data.wind.speed + ` km/h`;
            document.querySelector(".temp").innerHTML = data.main.temp + `°C`;
            document.querySelector(".sea-l").innerHTML = data.main.sea_level ? data.main.sea_level + ` hPa` : 'N/A';
            document.querySelector(".atm-pressure").innerHTML = data.main.pressure + ` hPa`;
            document.querySelector(".weather-desc").innerHTML = data.weather[0].description;

            // Set weather icon
            document.querySelector(".weather img").src = getWeatherIcon(data.weather[0].description);
            document.querySelector(".weather").style.display = "block"; // Show weather info
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        document.querySelector(".city").innerHTML = "An error occurred. Please try again later.";
        document.querySelector(".weather").style.display = "none"; // Hide weather info
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    const city = searchCity.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        document.querySelector(".city").innerHTML = "Please enter a city name.";
        document.querySelector(".weather").style.display = "none"; // Hide weather info
    }
});