var search = document.querySelector(".searchWeather");
var city = document.querySelector(".weatherCity");
var day = document.querySelector(".weatherDay");
var humidity = document.querySelector(".weather_detail--humidity>.value");
var precipitation = document.querySelector(".weather_detail--precipitation>.value");
var wind = document.querySelector(".weather_detail--wind>.value");
var photo = document.querySelector(".weatherPhoto");
var temperature = document.querySelector(".weatherTemp>.value");
var weatherApiKey = "ba180dbe78d3d4d9710851c9e3f85643";
var weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=ba180dbe78d3d4d9710851c9e3f85643" 


var getWeatherByCityName = async (city) => {
  var endpoint = weatherBaseEndpoint + "&q=" + city;
  var response = await fetch(endpoint);
  var weather = await response.json();

  console.log(weather);
}

search.addEventListener("keydown" , (e) => {
  if(e.keyCode === 13) {
      let weather = getWeatherByCityName(search.value);
  }
})