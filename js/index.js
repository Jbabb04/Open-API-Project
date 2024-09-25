const latitude = 38.7651;  // Latitude for Clinton, MD
const longitude = -76.8983;  // Longitude for Clinton, MD

// API URLs for current weather and hourly forecast with units=imperial for Fahrenheit
const currentWeatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&units=imperial`;
const forecastApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m&units=imperial`;

// Function to fetch current weather data based on dataType
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

// Function to fetch forecast data
function fetchForecastData() {
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
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

// Function to determine which data to fetch based on the URL query parameter
function determineDataToFetch() {
    const params = new URLSearchParams(window.location.search);
    const dataType = params.get('data');  // Get the 'data' query parameter from the URL

    if (dataType === 'temperature' || dataType === 'wind' || dataType === 'weathercode') {
        fetchCurrentWeatherData(dataType);  // Fetch current weather data based on the selected type
    } else if (dataType === 'forecast') {
        fetchForecastData();  // Fetch hourly forecast data
    } else {
        document.getElementById('selected-data').textContent = 'Select an option above to view weather data.';
    }
}

// Run when the page loads to determine what data to show
determineDataToFetch();
