let map;
let marker;

// Initialize and add the map
function initMap() {
    const busLocation = { lat: 29.3885, lng: 76.9669 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: busLocation,
        mapTypeId: 'roadmap',
    });

    marker = new google.maps.Marker({
        position: busLocation,
        map: map,
        // Use default Google Maps marker
    });

    recenterMap();
    adjustMapHeight();
}

// Function to recenter the map on the bus location
function recenterMap() {
    const busLocation = { lat: 29.3885, lng: 76.9669 };
    map.setCenter(busLocation);
    marker.setPosition(busLocation);
}

// Function to adjust the map height based on the bottom card height
function adjustMapHeight() {
    const bottomCard = document.querySelector(".bottom-card");
    const mapContainer = document.getElementById("map");
    const cardHeight = bottomCard.offsetHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate the new height for the map container
    const mapHeight = windowHeight - headerHeight - cardHeight - 20; // 20px margin

    mapContainer.style.height = `${mapHeight}px`;
}

// Function to fetch weather data from the API
async function fetchWeatherData() {
    const apiKey = 'YOUR_API_KEY';
    const lat = 29.3885; // Replace with dynamic latitude if needed
    const lon = 76.9669; // Replace with dynamic longitude if needed
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const weatherData = await response.json();

        // Update the weather information in the HTML
        document.getElementById('temperature').innerText = weatherData.main.temp;
        document.getElementById('conditions').innerText = weatherData.weather[0].description;
        document.getElementById('location').innerText = weatherData.name;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Call fetchWeatherData when the window loads
window.onload = () => {
    initMap();
    fetchWeatherData();
};

// Adjust map height on window resize
window.addEventListener('resize', adjustMapHeight);

// Adjusted selectBus function (removed driver details)
function selectBus() {
    // Here, you might want to refetch the weather data if the location changes
    // fetchWeatherData(); // Uncomment if weather data should be updated on bus selection
}
