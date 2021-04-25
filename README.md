# weather-application
== Created in 2020 ==\
My own weather app created using the OpenWeather API to get weekly and hourly weather forecasts in a user-chosen city or country region.\
All it uses is Google's geocoder API to extract country coordinates that is required in the OpenWeather API call itself.\
All adobrable weather icons were personally created by myself, giving users a spike of positive energy even if it's a gloomy day, endlessly soaked in rain.
>👉 **_NOTE:_** Extra functions present in the side nav have not been added, but the basic retrieval of weather forecasts for different locations has been implemented 😃

## How To Setup
**Open app.js and replace the GOOGLE_API_KEY and WEATHER_API_KEY with your own generated API key.**<br>

To generate your WEATHER_API_KEY:
1. Go to this site: https://openweathermap.org/api and create your own account.
2. Click on your profile in the navigation menu and select "my API keys". 

To generate your GOOGLE_API_KEY:
1. Go to this site: https://developers.google.com/maps/gmp-get-started#quickstart 
2. Follow the steps from 1 to 3, but ensure in step 2 that you select or search for the geocode API.
>👉 **_NOTE:_** It is important that <ins>**billing is enabled**</ins> on your account or the API will not work.
####
**Once all the API key values have been replaced, in command line, navigate to this project's directory and paste the following command:**
```
node app.js
```
**In a browser window, paste the following in the URL bar:**
```
http://localhost:3000/
```
## How it should look
![Screen Shot 2021-04-25 at 2 45 37 pm](https://user-images.githubusercontent.com/57920696/115981127-f5c65e00-a5d4-11eb-9369-3e7201222032.png)
