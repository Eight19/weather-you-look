var textInput = document.querySelector(".searchWeather");
var city = document.querySelector(".cityWeather");
var day = document.querySelector(".todaysWeather");
var humidity = document.querySelector(".weather_detail--humidity>.value");
var pressure = document.querySelector(".weather_detail--pressure>.value");
var wind = document.querySelector(".weather_detail--wind>.value");
var photo = document.querySelector(".weatherPhoto");
var temperature = document.querySelector(".weatherTemp>.value");
var forecast = document.querySelector(".forecastDetails");
var weatherApiKey = "ba180dbe78d3d4d9710851c9e3f85643";
var weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=" + weatherApiKey; 
var forecastBaseEndpoint = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + weatherApiKey;
var cityBaseEndPoint = "https://api.teleport.org/api/cities/?search=";

//Weather images for cards//
var weatherPhotos = [
  {
    url: "Assets/Images/Sky.jpg",
    ids: [800]
  },
  {
    url: "Assets/Images/rain.jpg",
    ids: [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531]
  },
  { 
    url: "Assets/Images/thunderstorm.jpg",
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
  },
  { 
    url: "Assets/Images/snow.jpg",
    ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
  },
  { 
    url: "Assets/Images/day.jpg",
    ids: [801]
  },
  {
    url: "Assets/Images/partly cloudy.jpg",
    ids: [803, 804]
  },
  {
    url: "Assets/Images/fog.jpg",
    ids: [701, 711, 721, 731, 751, 761, 762, 771, 781]
  },
 ]

//Fetches city weather detail when searched//
var getWeatherByCityName = async (city) => {
  var endpoint = weatherBaseEndpoint + "&q=" + city;
  var response = await fetch(endpoint);
  var weather =  await response.json();
  console.log(weather);
  return weather;
 }

 //Retrieves forecast details for cities//
var getForecastByCityID = async (id) => {
  var endpoint = forecastBaseEndpoint + "&id=" + id;
  var result = await fetch(endpoint);
  var forecast = await result.json();
  var listForecast = forecast.list;
  var daily = [];

  listForecast.forEach(day => {
    var date = new Date(day.dt_txt.replace(" ", "T"));
    var hours = date.getHours();
    if(hours === 12) {
      daily.push(day);
    }
  })
  return daily;
}

//Activates search when enter is pressed//
textInput.addEventListener("keydown", async (e) => {
    if(e.keyCode === 13) {
      var weather = await getWeatherByCityName(textInput.value);
      var cityID = weather.id;
      currentWeatherUpdate(weather);
      var forecast = await getForecastByCityID(cityID);
      forecastUpdate(forecast);
    }
})

textInput.addEventListener("input", async () => {
  var endpoint = cityBaseEndPoint + textInput.value
  var result = await (await fetch(endpoint)).json();
  console.log(result);
})

//Displays humidity, pressure, wind direction(based off degrees), and temperature for each city per day//
var currentWeatherUpdate = (data) => {
  city.textContent = data.name + "," + data.sys.country;
  day.textContent = dayOfTheWeek();
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
  var windDirection;
  var deg = data.wind.deg;
  if(deg > 45 && deg <= 135) {
    windDirection = "East";
  } else if(deg > 135 && deg <= 225) {
    windDirection = "South";
  } else if(deg > 225 && deg <= 315) {
    windDirection = "West";
  } else {
    windDirection = "North";
  }
  wind.textContent = windDirection + "," + data.wind.speed;
  temperature.textContent = data.main.temp > 0 ?
                              "+" + Math.round(data.main.temp) : 
                              Math.round(data.main.temp);
}
//Displays current day on page//
var dayOfTheWeek = () => {
  return new Date().toLocaleDateString("en-EN", {"weekday": "long"});
}

