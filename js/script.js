const apiKey = "29dd23c096972f7507bc7341e68bde0e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchInputTag = document.querySelector(".searchInput");
const imageTag = document.querySelector(".image");
const weatherImageTag = document.querySelector(".weatherImage");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".invalidCity").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else {
        var data = await response.json();

        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°c";
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + "km/h";
    
        if (data.weather[0].main === "Clouds") {
            weatherImageTag.src = "../images/clouds.png"
        }else if (data.weather[0].main === "Clear") {
            weatherImageTag.src = "../images/clear.png"
        }else if (data.weather[0].main === "Drizzle") {
            weatherImageTag.src = "../images/drizzle.png"
        }else if (data.weather[0].main === "Mist") {
            weatherImageTag.src = "../images/mist.png"
        }else if (data.weather[0].main === "Rain") {
            weatherImageTag.src = "../images/rain.png"
        }else if (data.weather[0].main === "Snow") {
            weatherImageTag.src = "../images/snow.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".invalidCity").style.display = "none";
    
        searchInputTag.value = "";
    }

}

imageTag.addEventListener("click", () => {
    if (searchInputTag.value.length > 0) {
        checkWeather(searchInputTag.value);
    }else {
        searchInputTag.classList.add("error");
        
        setTimeout(() => {
            searchInputTag.classList.remove("error");
        }, 1000)
    }
    
})

const cityContainerTag = document.querySelector(".cityContainer");

const city = [
    "Afghanistan", "Albania", "Argentina", "Australia", "Austria", "Bangaldesh", "Brazil", "Brunei", "Bulgaria",
    "Cambodia", "Canada", "China", "Cyprus", "Denmark", "Egypt", "Estonia", "France", "Germany", "Greece", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Korea", "Loas", "Lebanon", "Macedonia",
    "Malaysia", "Mexico", "Mongolia", "Nepal", "Netherlands", "New Zealand", "Norway", "Pakistan", "Philippines",
    "Poland", "Portugal", "Russia", "Serbia", "Singapore", "Somalia", "South Africa", "Switzeriland", "Thailand", 
    "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam", "Zambia", "Berlin", "Bangalore" 
]

searchInputTag.addEventListener("keyup", function () {
    document.querySelector(".weather").style.display = "none";
    let result = [];
    cityContainerTag.innerHTML = "";
    let input = searchInputTag.value.toLowerCase();
    if (input.length > 0) {
        result = city.filter((keyword) => {
            return keyword.toLowerCase().includes(input)
        })
        for (let i = 0; i < result.length; i++) {
            const divTag = document.createElement("div");
            divTag.addEventListener("click", () => {
                searchInputTag.value = divTag.innerHTML;
                cityContainerTag.textContent = "";
            })
            divTag.innerHTML = result[i];

            cityContainerTag.append(divTag);
        }
    }
})

// searchInputTag.addEventListener("keyup", function () {
//     let result = [];
//     cityContainerTag.innerHTML = "";
//     let input = searchInputTag.value.toLowerCase();
//     if (input.length > 0) {
//         result = city.filter((keyword) => {
//             return keyword.toLowerCase().includes(input)
//         })
//         for (let i = 0; i < result.length; i++) {
//             const divTag = document.createElement("div");

//             divTag.innerHTML = result[i];

//             cityContainerTag.append(divTag);
//         }
//     }
//     displayCity(result);
// })

// function displayCity(resultCity) {
//     const content = resultCity.map((div) => {
//         return "<div onclick = selectInput(this)>" + div + "</div>";
//     })

//     cityContainerTag.innerHTML = content.join("");
// }

// function selectInput (div) {
//     searchInputTag.value = div.innerHTML;
//     cityContainerTag.textContent = "";
// }

