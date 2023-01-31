/*Added variables to pull details from OpenAPI*/
var searchText = document.querySelector(".searchWeather");
var city = document.querySelector(".weatherLocation");
var day = document.querySelector(".dayWeather");
var humidity = document.querySelector(".weather_detail--humidity>.value");
var precipitation = document.querySelector(".weather_detail--precipitation>.value");
var wind = document.querySelector(".weather_detail--wind>.value");
var photo = document.querySelector(".weatherPhoto");
var temp = document.querySelector(".temperature>.value");
/*Fetched city weather info using OpenWeatherAPI*/
var weatherApiKey = "92ca0200c0393370e2aa006ad308d849";
var weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
var getWeatherByCityName = async (city) => {
  var endpoint = weatherBaseEndpoint + "&q=" + city;
  var response = await fetch(endpoint);
  var weather = await response.json();
  console.log (weather);
}
/*Search bar action*/
searchText.addEventListener("keydown", (e) => {
  if(e.keyCode ===13) {
    var weather = getWeatherByCityName(searchText.value);
  }
})