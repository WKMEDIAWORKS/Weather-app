const globalContainer = document.getElementById("container");
const subBoxContainer = document.createElement("div");
subBoxContainer.setAttribute("id","");
const defaultLocation = "Baramulla";

window.onload = function (){
    fetchData(defaultLocation);
}

async function fetchData(value) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${value}?key=3HZPNPASZSQ2DKGU9FV3YUJVU`);
    const data = await response.json();
    requiredData(data);
}
function requiredData(data){
    const address = data.resolvedAddress;
    const temp = data.currentConditions.temp;
    const humidity = data.currentConditions.humidity;
    const windspeed = data.currentConditions.windspeed;
    const weatherConditions = data.currentConditions.conditions;
    const sunrise = data.currentConditions.sunrise;
    const sunset = data.currentConditions.sunset;

    updateBackground(weatherConditions);

    domRelatedStuff(temp,address,humidity,windspeed,weatherConditions,sunrise,sunset);
}
function search(){
    const input = document.createElement("input");
    input.setAttribute("id","input-box");
    const searchButton = document.createElement("button");
    searchButton.classList.add("search-button");
    searchButton.textContent = "Search";
    globalContainer.appendChild(input);
    globalContainer.appendChild(searchButton);
    searchButton.addEventListener("click", () => {
        subBoxContainer.innerHTML = "";
        if(input.value === ""){
            alert("Input box can't be empty.");
        }
        else{
        fetchData(input.value);
        }
    });
}

function domRelatedStuff(temp,address,humidity,windspeed,weatherConditions,sunrise,sunset){
    const tempValue = document.createElement("div");
    const conversion = (temp-32) * 5/9;
    tempValue.textContent = `${conversion.toFixed(0)}° C`;
    tempValue.classList.add("temp-value");
     
    const addressBox = document.createElement("div");
    addressBox.setAttribute("id","address-box");
    const addressValue = document.createElement("div");
    addressValue.classList.add("address-value");
    addressValue.textContent = address;
    const addressText = document.createElement("h4");
    addressText.classList.add("address-text");
    addressText.textContent = "Address";
    addressBox.appendChild(addressValue);
    addressBox.appendChild(addressText);


    const humidityBox = document.createElement("div");
    humidityBox.setAttribute("id","humidity-box");
    const humidityValue = document.createElement("p");
    humidityValue.classList.add("humidity-value");
    humidityValue.textContent = `${humidity} %`;
    const humidityText = document.createElement("h4");
    humidityText.classList.add("humidity-text");
    humidityText.textContent = "Humidity";
    humidityBox.appendChild(humidityValue);
    humidityBox.appendChild(humidityText);

    const windspeedBox = document.createElement("div");
    windspeedBox.setAttribute("id","windspeed-box")
    const windspeedValue = document.createElement("p");
    windspeedValue.classList.add("windspeed-value");
    windspeedValue.textContent = windspeed;
    const windspeedText = document.createElement("h4");
    windspeedText.classList.add("windspeed-text");
    windspeedText.textContent = "Windspeed";
    windspeedBox.appendChild(windspeedValue);
    windspeedBox.appendChild(windspeedText);

    const weatherConditionsBox = document.createElement("div");
    weatherConditionsBox.setAttribute("id","weather-conditions-box");
    const weatherConditionsValue = document.createElement("p");
    weatherConditionsValue.classList.add("weatherConditions-value");
    weatherConditionsValue.textContent = weatherConditions;
    const weatherConditionsText = document.createElement("h4");
    weatherConditionsText.classList.add("weatherConditions-text");
    weatherConditionsText.textContent = "Weather Conditions";
    weatherConditionsBox.appendChild(weatherConditionsValue);
    weatherConditionsBox.appendChild(weatherConditionsText);

    const sunriseBox = document.createElement("div");
    sunriseBox.setAttribute("id","sunrise-box");
    const sunriseValue = document.createElement("p");
    sunriseValue.classList.add("sunrise-value");
    sunriseValue.textContent = sunrise;
    const sunriseText = document.createElement("h4");
    sunriseText.classList.add("sunrise-text");
    sunriseText.textContent = "Sunrise";
    sunriseBox.appendChild(sunriseValue);
    sunriseBox.appendChild(sunriseText);
    
    const sunsetBox = document.createElement("div");
    sunsetBox.setAttribute("id","sunset-box");
    const sunsetValue = document.createElement("p");
    sunsetValue.classList.add("sunset-value");
    sunsetValue.textContent = sunset;
    const sunsetText = document.createElement("h4");
    sunsetText.classList.add("sunset-text");
    sunsetText.textContent = "Sunset";
    sunsetBox.appendChild(sunsetValue);
    sunsetBox.appendChild(sunsetText);
     
    subBoxContainer.appendChild(tempValue);
    subBoxContainer.appendChild(addressBox);
    subBoxContainer.appendChild(humidityBox);
    subBoxContainer.appendChild(windspeedBox);
    subBoxContainer.appendChild(weatherConditionsBox);
    subBoxContainer.appendChild(sunriseBox);
    subBoxContainer.appendChild(sunsetBox);
    
    globalContainer.appendChild(subBoxContainer);
}

function updateBackground(weatherConditions) {
    document.body.classList.remove('clear-sky', 'cloudy', 'rainy', 'sunny', 'windy', 'stormy');

    
    if (weatherConditions.toLowerCase().includes("clear") || weatherConditions.toLowerCase().includes("sunny")) {
        document.body.classList.add('sunny');
    } else if (weatherConditions.toLowerCase().includes("cloudy") || weatherConditions.toLowerCase().includes("overcast")) {
        document.body.classList.add('cloudy');
    } else if (weatherConditions.toLowerCase().includes("rain")) {
        document.body.classList.add('rainy');
    } else if (weatherConditions.toLowerCase().includes("windy")) {
        document.body.classList.add('windy');
    } else if (weatherConditions.toLowerCase().includes("storm")) {
        document.body.classList.add('stormy');
    } else {
        document.body.classList.add('clear-sky');
    }
}


search();