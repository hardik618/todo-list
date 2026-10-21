document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const WeatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempeartureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = '2216f7ded9900a86cb9ad6485a1d89b1';

    // if somebody clicks on the button we need to grab some data
    getWeatherBtn.addEventListener('click',async()=>{
        // if somebody clicks on the button
        // firstly we will grab cityInput
        const city = cityInput.value.trim();
        if(!city) return; // if no city return

        // whenever u are requesting data from server
        // two things need to remeber---->
        // it may throw an error
        // therefore use try-catch
        // server/database is always in another continent therfore it takes some time so we use async-await

        try {
          const weatherData = await fetchWeatherData(city)
          displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    })
    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok){
            // if we write an invalid city
            throw new Error("City not Found")
        }
        // else we have a valid response
       const data = await response.json() // converted into json object
       return data // it will just request the data fetch it and return it its responsibility is not to display the data
    }
    function displayWeatherData(data){
        // display
        console.log(data); // it has data,main,weather see browser main is the object and weather is an array
        const {name,main,weather} = data
        cityNameDisplay.textContent = name
        tempeartureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        // unlock the display
        WeatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
        
    }
    function showError(){
        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden'); // it will show error
    }
});