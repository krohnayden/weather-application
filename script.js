var currentWeatherEl = document.querySelector("#currentWeather");
var forecastEl = document.querySelector("#forecast");
var cardEl = document.querySelector(".card");
var cardImgEl = document.querySelector(".card-img-top");
var cityInputEl = document.querySelector("#citySearch");
var cityHistoryEl = document.querySelector("#cityHistory");
var cityInput = document.getElementById('cityInput');
var cityName = document.getElementById('cityName');
var apiKey = '2dc6d899eaadebc826a5379a400f6d63';

// Write function to display current weather based on the user input on city.

// Write function to display 5-day forecast.

// Write function to make 5-day forecast.
// 1. 

// Write function to make photos of cards change based on weather.
// // 1. Make a series of if statements that change the img based on weather. 
// // 2. Add img's on to cards(forecast). 

// Write function to save history of searched cities.
// // 1. Set user inputed city in local storage.
// // 2. Get user inputed city to apply to list of recent searches.

// Write function to find location in lat&long based off city name.
// // 1. Run city name through API to get lat&long of location.
// // 2. Use lat&long to get weather data from that location.
// // 3. Use parameters in fetch request to narrow weather data collected.
// // 4. Use data returned to apply to the current weather and 5-day forecast.

function convertLocation(cityName) {
  geolocationURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  fetch(geolocationURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentWeatherEl.innerHTML = `            <div id="currentWeather">
      <h2>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")})<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="#"></h2>
      <p>Temp: ${data.main.temp}</p>
      <p>Humidity: ${data.main.humidity}</p>
      <p>Wind: ${data.wind.speed}</p>
    </div>
`
    });
  geolocationURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
  fetch(geolocationURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecastEl.innerHTML = ""
      for (i = 2; i < data.list.length; i = i + 8) {
        console.log(data.list[i]);
        forecastEl.innerHTML += `                <div class="card" id="card1" style="width: 18rem;">
        <img class="card-img-top" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> 
`
      }
    })
}


cityInput.addEventListener('submit', function (event) {
  event.preventDefault();
  convertLocation(cityName.value);
})