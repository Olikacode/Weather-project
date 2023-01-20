//Feature #1 In your project, display the current date and time using JavaScript: Tuesday 16:00/////
function currentTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let now = new Date();
let date = document.querySelector("h2");
date.innerHTML = currentTime(now);

/////Task 1 week5: when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city./////

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#humidity-unit`).innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector(`#wind-unit`).innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(`span.explanation`).innerHTML =
    response.data.weather[0].description;

  function formatTime(timestamp) {
    let time = new Date(timestamp);
    let hours = time.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }
  document.querySelector(`#sunrise-unit`).innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector(`#sunset-unit`).innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
}

function search(city) {
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let hey = document.querySelector("#city-input");
  let heading = document.querySelector("h1");
  let heyYou = hey.value;
  if (heyYou === "") {
    alert(`Hey! Type a city 🏙`);
    heading.innerHTML = `Waiting...`;
  }
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let button = document.querySelector("#search-button");
button.addEventListener("click", searchInput);

/////Feature #3 Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius./////

//function tempInCelsius(event) {
//event.preventDefault();
// let numberInCelsius = document.querySelector(".temperature");
// numberInCelsius.innerHTML = 19;
//}
//let celTemp = document.querySelector("#celsius-link");
//celTemp.addEventListener("click", tempInCelsius);

//function tempInFahrenheit(event) {
// event.preventDefault();
//let numberInFahrenheit = document.querySelector(".temperature");
//numberInFahrenheit.innerHTML = Math.round((19 * 9) / 5 + 32);
//}
//let fahTemp = document.querySelector("#fahrenheit-link");
//fahTemp.addEventListener("click", tempInFahrenheit);

function getCoords(position) {
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCoords);
}

let buttonLocation = document.querySelector(`#location-button`);
buttonLocation.addEventListener(`click`, getCurrentLocation);

search("Kyiv");
