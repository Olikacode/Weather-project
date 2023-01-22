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
  celsiusTemp = Math.round(response.data.main.temp);
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
  //Added real weather icon and changed div into img in html
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

//////////Unit conversion
function tempInCelsius(event) {
  event.preventDefault();
  //add the active class to the celTempLink and remove from fahTempLink
  celTempLink.classList.add("active");
  fahTempLink.classList.remove("active");

  let numberInCelsius = document.querySelector(".temperature");
  numberInCelsius.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

function tempInFahrenheit(event) {
  event.preventDefault();
  //remove the active class from the celTempLink and add to the fahTempLink
  celTempLink.classList.remove("active");
  fahTempLink.classList.add("active");

  let numberInFahrenheit = document.querySelector(".temperature");
  numberInFahrenheit.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}
let fahTempLink = document.querySelector("#fahrenheit-link");
fahTempLink.addEventListener("click", tempInFahrenheit);

let celTempLink = document.querySelector("#celsius-link");
celTempLink.addEventListener("click", tempInCelsius);

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
