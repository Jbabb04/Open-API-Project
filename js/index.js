const latitude = 38.7651;  // Latitude for Clinton, MD
const longitude = -76.8983;  // Longitude for Clinton, MD

// API URLs for current weather and hourly forecast with units=imperial for Fahrenheit
const currentWeatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&units=imperial`;
const forecastApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m&units=imperial`;

// Fetch current weather data
function fetchCurrentWeatherData(dataType) {
    fetch(currentWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            let selectedData;
            switch (dataType) {
                case 'temperature':
                    selectedData = `${data.current_weather.temperature} °F`;  // Display in Fahrenheit
                    break;
                case 'wind':
                    selectedData = `${data.current_weather.windspeed} mph`;  // Display wind in mph
                    break;
                case 'weathercode':
                    selectedData = `Weather Code: ${data.current_weather.weathercode}`;  // Display weather code
                    break;
                default:
                    selectedData = 'Unknown data';
            }
            document.getElementById('selected-data').textContent = selectedData;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            document.getElementById('selected-data').textContent = 'Error';
        });
}

// Fetch hourly forecast data (with units=imperial)
function fetchForecastData() {
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            // Example: Show the temperature and windspeed for the first forecast hour
            const forecastTemperature = data.hourly.temperature_2m[0];
            const forecastWind = data.hourly.windspeed_10m[0];
            const forecastData = `Forecast - Temp: ${forecastTemperature} °F, Wind: ${forecastWind} mph`;  // Fahrenheit and mph
            document.getElementById('selected-data').textContent = forecastData;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            document.getElementById('selected-data').textContent = 'Error';
        });
}

// Event listeners for buttons (current weather)
document.getElementById('temperature-btn').addEventListener('click', () => fetchCurrentWeatherData('temperature'));
document.getElementById('wind-btn').addEventListener('click', () => fetchCurrentWeatherData('wind'));
document.getElementById('weathercode-btn').addEventListener('click', () => fetchCurrentWeatherData('weathercode'));

// Event listener for forecast button
document.getElementById('forecast-btn').addEventListener('click', fetchForecastData);

// Initial data fetch (default: current temperature)
fetchCurrentWeatherData('temperature');
