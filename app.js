var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var cardsContainer = document.getElementById("cardsContainer");

searchBtn.addEventListener("click", function () {
  cardsContainer.innerHTML = "";
  getWeather(searchInput.value);
});

function getWeather(cityTosearch) {
  var weatherRequest = new XMLHttpRequest();

  weatherRequest.open(
    "GET",
    "https://api.weatherapi.com/v1/forecast.json?key=bf0828ba1a7e46e4a3f131433222606&q=" +
      cityTosearch +
      "&days=3&aqi=no&alerts=no"
  );

  weatherRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.response);
      var conditionDays = data.forecast.forecastday;
      var country = data.location.country;
      var city = data.location.name;
      for (var i = 0; i < conditionDays.length; i++) {
        cardsContainer.innerHTML += `
                <div class="card">
                    <div class="content">
                        <img src="https:${
                          conditionDays[i].day.condition.icon
                        }" class="icon" alt="weather icon">
                        <h3 class="temp">
                            ${conditionDays[i].day.avgtemp_c.toFixed(
                              0
                            )} <span class="celsius"><sub>&deg;</sub>c</span>
                        </h3>
                        <span class="city">${city}, ${country},</span>
                    </div>
                </div>
                `;
      }
    } else {
    }
  };

  weatherRequest.send();
}
