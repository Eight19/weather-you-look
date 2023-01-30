/*Added variables for weather api selections*/
var city = document.querySelector(".weatherLocation");
var day = document.querySelector(".dayWeather");
var humidity = document.querySelector(".weather_detail--humidity");
var precipitation = document.querySelector(".weather_detail--precipitation");
var wind = document.querySelector(".weather_detail--wind");
var photo = document.querySelector(".weatherPhoto");
var temp = document.querySelector(".temperature");

/*Fetched city weather info using OpenWeatherAPI*/
var weatherApiKey = "92ca0200c0393370e2aa006ad308d849";
var weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
var getWeatherByCityName = async (city) => {
  var endpoint = weatherBaseEndpoint + "&q=" + city;
  var response = await fetch(endpoint);
  var weather = await response.json();
  console.log (weather);
}

getWeatherByCityName("Charlotte");