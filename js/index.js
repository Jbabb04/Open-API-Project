const latitude = 38.7651;  // Latitude for Clinton, MD
const longitude = -76.8983;  // Longitude for Clinton, MD

// API URL with latitude and longitude for Clinton, MD
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&units=imperial`;

// Fetch weather data
function fetchWeatherData(dataType) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract weather data based on the selected type
            let selectedData;
            switch (dataType) {
                case 'temperature':
                    selectedData = `${data.current_weather.temperature} °F`;
                    break;
                case 'wind':
                    selectedData = `${data.current_weather.windspeed} mph`;
                    break;
                case 'weathercode':
                    selectedData = `Weather Code: ${data.current_weather.weathercode}`;
                    break;
                default:
                    selectedData = 'Unknown data';
            }
            // Display the selected data in the HTML
            document.getElementById('selected-data').textContent = selectedData;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('selected-data').textContent = 'Error';
        });
}

// Event listeners for buttons
document.getElementById('temperature-btn').addEventListener('click', () => fetchWeatherData('temperature'));
document.getElementById('wind-btn').addEventListener('click', () => fetchWeatherData('wind'));
document.getElementById('weathercode-btn').addEventListener('click', () => fetchWeatherData('weathercode'));

// Initial data fetch (default: temperature)
fetchWeatherData('temperature');
