var currentWeatherEl = document.querySelector("#currentWeather");
var forecastEl = document.querySelector("#forecast");
var cityInputEl = document.querySelector("#citySearch");
var cityHistoryEl = document.querySelector("#cityHistory");
var cityInput = document.getElementById('cityInput');
var cityName = document.getElementById('cityName');
var displayDate = document.getElementById('displayDate')
var cardTitle = document.querySelectorAll('.card-title');
var apiKey = '2dc6d899eaadebc826a5379a400f6d63';
const currentDate = dayjs().format("MM/DD/YYYY");
displayDate.innerHTML = `<h2 id="displayDate">${currentDate}</h2>
`

// Function to apply weather information to HTML.
function convertLocation(cityName) {
  // Current weather API
  geolocationURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  fetch(geolocationURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentWeatherEl.innerHTML = `<div id="currentWeather">
      <h2>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")})<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="#"></h2>
      <p>Temp: ${data.main.temp}&#176F</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed}(mph)</p>
    </div>
`

    });
    // Forecast API
  geolocationURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
  fetch(geolocationURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecastEl.innerHTML = ""
      for (i = 2; i < data.list.length; i = i + 8) {
        console.log(data.list[i]);
        forecastEl.innerHTML += `<div class="card" id="card1" style="width: 18rem;">
        <img class="card-img-top" src="Images/thunderbolt-1905603_640.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${data.list[i].dt_txt}</h5>
          <p class="card-text">Temp: ${data.list[i].main.temp}&#176F</p>
          <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
          <p class="card-text">Wind Speed: ${data.list[i].wind.speed}(mph)</p>
        </div>
      </div>`
      }
    })
}

// Event listener to run function when city is entered.
cityInput.addEventListener('submit', function (event) {
  event.preventDefault();
  convertLocation(cityName.value);
})