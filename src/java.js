let now = new Date();
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
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
let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
let hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
let amPm = now.getHours() >= 12 ? "pm" : "am";
let currentTime = document.querySelector("#currentDate");
currentTime.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes} ${amPm} `;

// -----------URL for Search City

function displayCity(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let descriptionDay = document.querySelector("#description");
  descriptionDay.innerHTML = response.data.weather[0].description;
  let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let humitidy = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  celsiusTemp = response.data.main.temp;
  let iconElement = document.querySelector("#iconHeading");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);

  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

  let amPm = date.getHours() >= 12 ? "pm" : "am";
  let time = `${hours}:${minutes}${amPm}`;
  return time;
}

function getForecast(coordinates) {
  apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  unit = "metric";
  apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrlForecast).then(displayForecast);
  axios.get(apiUrlForecast).then(displayForecastHourly);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastdays");

  let forecastHTML = `<div class="row"> `;

  forecast.forEach(function (forecastDay, index) {
    if (index !== 0 && index <= 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm-2">
       <div class="card" style="width: 10rem">
       <div class="card-body">
       <h6 class="card-subtitle mb-2 text-muted dateForecast">${formatDay(
         forecastDay.dt
       )}</h6>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="Clear" width="80"/>
                  <br />
                 <span class="minForecast"> ${Math.round(
                   forecastDay.temp.min
                 )}° </span> <span class="maxForecast"> ${Math.round(
          forecastDay.temp.max
        )}°</span>
             </div>    
    </div> </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayForecastHourly(response) {
  console.log(response.data.hourly);
  let forecastHourly = response.data.hourly;
  let forecastElement = document.querySelector("#forecasthourly");

  let forecastHTML = `<div class="row"> `;

  forecastHourly.forEach(function (forecastHour, index) {
    if (index < 12 && index !== 0 && index % 2 === 0) {
      console.log(index);
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
           <div class="card" style="width: 10rem">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">${formatHour(
                    forecastHour.dt
                  )}</h6>
                <img src="http://openweathermap.org/img/wn/${
                  forecastHour.weather[0].icon
                }@2x.png" alt="Clear" width="80"/>
                  <br />
                         <span class="minForecast"> ${Math.round(
                           forecastHour.temp
                         )}° </span> 
                </div>
              </div></div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  unit = "metric";
  apiUrlDay = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrlDay).then(displayCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#searchCity");
  search(cityElement.value);
}

let form = document.querySelector("searchbar");
addEventListener("submit", handleSubmit);

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusElement = document.querySelector("#celsiusIcon");
celsiusElement.addEventListener("click", showCelsius);

let celsiusTemp = null;

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentIcon");
button.addEventListener("click", getCurrentPosition);

search("St Kilda");
