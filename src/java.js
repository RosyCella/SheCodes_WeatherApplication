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
console.log(currentTime);

// -----------URL for Search City

function displayCity(response) {
  console.log(response.data);
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

function getForecast(coordinates) {
  apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  unit = "metric";
  apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrlForecast).then(displayForecast);
  axios.get(apiUrlForecast).then(displayForecastHourly);
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecastdays");

  let forecastHTML = `<div class="row"> `;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-sm-2">
       <div class="card" style="width: 10rem">
       <div class="card-body">
       <h6 class="card-subtitle mb-2 text-muted dateForecast">${day}</h6>
                  <i class="fas fa-cloud-sun-rain iconForecast"></i>
                  <br />
                 <span class="minForecast">2° </span> <span class="maxForecast"> 15°</span>
             </div>    
    </div> </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayForecastHourly() {
  let forecastElement = document.querySelector("#forecasthourly");

  let forecastHTML = `<div class="row"> `;
  let days = ["12:00pm", "2:00pm", "4:00pm", "6:00pm", "8:00pm"];
  days.forEach(function (hour) {
    forecastHTML =
      forecastHTML +
      `<div class="col-sm-2">
           <div class="card" style="width: 10rem">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">${hour}</h6>
                  <i class="fas fa-cloud-sun-rain iconForecast"></i>
                  <br />
                  <span>Wind Speed:</span>
                  <div id="hourlyWindSpeed">20 km/h</div>
                </div>
              </div></div>`;
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
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}
let fahrenheitElement = document.querySelector("#fahrenheitIcon");
fahrenheitElement.addEventListener("click", showFahrenheit);

let celsiusElement = document.querySelector("#celsiusIcon");
celsiusElement.addEventListener("click", showCelsius);

let celsiusTemp = null;

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentIcon");
button.addEventListener("click", getCurrentPosition);

search("Berlin");

// forecast 5 days
