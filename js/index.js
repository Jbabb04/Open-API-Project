const latitude = 38.7651;  // Latitude for Clinton, MD
const longitude = -76.8983;  // Longitude for Clinton, MD

// API URL with latitude and longitude for Clinton, MD, using Fahrenheit (imperial units)
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&units=imperial`;

// Fetch data from the Open-Meteo API
fetch(apiUrl)
  .then(response => response.json())  // Parse the JSON from the response
  .then(data => {
    // Extract temperature and weather code from the response
    const temperature = data.current_weather.temperature;
    const weatherCode = data.current_weather.weathercode;

    // Update the HTML content with the fetched data
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('weatherCode').textContent = weatherCode;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('temperature').textContent = 'Error';
    document.getElementById('weatherCode').textContent = 'Error';
  });
