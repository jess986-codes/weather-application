const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const GOOGLE_API_KEY = "REPLACE-WITH-YOUR-OWN-KEY";
const WEATHER_API_KEY = "REPLACE-WITH-YOUR-OWN-KEY";
const NAME_OF_DAYS = new Array("Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"); 

app.get("/", function(req, res) {
    getWeatherResults("Melbourne", res);
});

app.post("/", function(req, res) {

    const location = req.body.cityName;
    getWeatherResults(location, res);

});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

function getWeatherResults(location, res) {
    
    const geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + GOOGLE_API_KEY;
    console.log(geoUrl);

    https.get(geoUrl, (response1) => {
        let chunks = [];
        response1.on("data", (data1) => {
            chunks.push(data1);
        }).on("end", () => {
            data1 = Buffer.concat(chunks);
            const geoData = JSON.parse(data1);
            const lat = parseFloat(geoData.results[0].geometry.location.lat).toFixed(2);
            const lng = parseFloat(geoData.results[0].geometry.location.lng).toFixed(2);
            const len = geoData.results[0].address_components.length;
            const country = geoData.results[0].address_components[len-1].long_name;
            const city = geoData.results[0].address_components[0].long_name;
            const weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely&appid=" + WEATHER_API_KEY + "&units=metric";
            console.log(weatherUrl);
            
            https.get(weatherUrl, (response2) => {
                let chunks2 = [];
                response2.on("data", (data2) => {
                    chunks2.push(data2);
                }).on("end", () => {
                    data2 = Buffer.concat(chunks2);
                    const weatherData = JSON.parse(data2);
                    const currentTemp = Math.round(Number(weatherData.current.temp));
                    const desc = weatherData.current.weather[0].description;
                    const iconCode = weatherData.current.weather[0].icon.replace("n", "d");
                    const icon = "images/"+ iconCode +".svg";
                    // const min = weatherData.daily[0].temp.min;
                    // const max = weatherData.daily[0].temp.max;
                    const hourly = weatherData.hourly;

                    const hourlyTime = [];
                    const hourlyTemp = [];

                    // get hourly forecast data for graph
                    for (let hour = 0; hour < 12; hour++) {
                        const time = new Date(hourly[hour].dt * 1000);
                        let suffix = ((time.getHours() >= 12) ? " pm" : " am");
                        hourlyTime.push(time.getHours() + suffix);
                        hourlyTemp.push(hourly[hour].temp);

                    }
                    // console.log(hourlyTime);
                    // console.log(hourlyTemp);

                    // get forecast data for the week
                    var daily = [];
                    for (let i = 1; i <= 7; i++) {
                        let dailyCode = weatherData.daily[i].weather[0].icon;
                        let dailyDate = new Date(weatherData.daily[i].dt * 1000);

                        daily.push(
                            {
                                dailyTemp: Math.round(Number(weatherData.daily[i].temp.day)),
                                dailyIcon: "images/"+ dailyCode +".svg",
                                dailyWeekday: NAME_OF_DAYS[dailyDate.getDay()],
                                dailyDay: dailyDate.getDate()
                            }
                        )
                    }

                    // format data to send back
                    const currentData = {
                        lng: lng, 
                        lat: lat, 
                        temp: currentTemp, 
                        city: city, 
                        country: country, 
                        desc: desc, 
                        icon: icon, 
                        dailyData: daily, 
                        hourlyTime: hourlyTime, 
                        hourlyTemp: hourlyTemp};

                    // console.log(currentData);

                    res.render("weather", currentData);

                });
            });

        });
    });
}
