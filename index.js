// ## Deliverables
// 1. SEE TITLE/SEARCH BAR UPON LOADING THE PAGE
// 2. SEARCH LOCATION
// 3. SHOW WEATHER INFO, RECS & COMMENTS
// 4. ADD NEW COMMENT WHEN COMMENT FORM IS SUBMITTED


const cityName = document.querySelector("#city-name");
const searchBar = document.querySelector("#searchbar");
const searchButton = document.querySelector("#search-button");
const commentsHeader = document.querySelector("#comments-header");
const weatherImage = document.querySelector("#weather-image");
const albumName = document.querySelector("#album-name");
const summary = document.querySelector("#weather-summary");
const tempData = document.querySelector("#temperature");
const justification = document.querySelector("#album-justification");
const commentsList = document.querySelector("#comments-list");
const commentForm = document.querySelector("#new-comment");
const commentInput = document.querySelector("#comment-input");

var cities = {};
document.addEventListener("DOMContentLoaded", function () {
  cities = fetchCities();
});

function fetchCities() {
  return fetch("http://localhost:3000/locations").then((resp) => resp.json());
} 

function searchFun() {
  let search = searchBar.value;
  if (search.length > 1) {
    getResults(cities, search);
  }
}

searchButton.addEventListener("click", searchFun);

function getResults(list, string) {
    list = fetch("http://localhost:3000/locations").then((resp) => resp.json())

    list.then((listResult) => {
        if (typeof string === "string") {
          for (let x of listResult) {
            if (x.name.toLowerCase() === string.toLowerCase()) {
                cityName.textContent = x.name;
                commentsHeader.textContent = `What KB album are people in ${x.name} listening to today?`;
              return x
            }
          }
        }
    }).then((match) => {
      fetchWeather(match)
    })
}


function fetchWeather(obj) {
    const locationResult = `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lng}&daily=weathercode&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York`;
    console.log(locationResult)
    fetch(locationResult)
    .then((resp) => resp.json())
    .then((data) => {
      tempData.textContent = ` | ${data.current_weather.temperature} °F`
      displayWeather(data, weatherTypes)})
    

const weatherTypes = [
  {code: 0, description: "Clear Sky"},
  {code: 1, description: "Mainly Clear"},
  {code: 2, description: "Partly Cloudy"},
  {code: 3, description: "Overcast"},
  {code: 45, description: "Fog"},
  {code: 48, description: "Depositing Rime Fog"},
  {code: 51, description: "Light Drizzle"},
  {code: 53, description: "Moderate Drizzle"},
  {code: 55, description: "Dense Drizzle"},
  {code: 56, description: "Light Freezing Drizzle"},
  {code: 57, description: "Dense Freezing Drizzle"},
  {code: 61, description: "Slight Rain"},
  {code: 63, description: "Moderate Rain"},
  {code: 65, description: "Heavy Rain"},
  {code: 66, description: "Light Freezing Rain"},
  {code: 67, description: "Heavy Freezing Rain"},
  {code: 71, description: "Slight Snow Fall"},
  {code: 73, description: "Moderate Snow Fall"},
  {code: 75, description: "Heavy Snow Fall"},
  {code: 77, description: "Snow Grains"},
  {code: 80, description: "Slight Rain Showers"},
  {code: 81, description: "Moderate Rain Showers"},
  {code: 82, description: "Violent Rain Showers"},
  {code: 85, description: "Slight Snow Showers"},
  {code: 86, description: "Heavy Snow Showers"},
  {code: 95, description: "Thunderstorm"},
  {code: 96, description: "Thunderstorm With Slight Hail"},
  {code: 99, description: "Thunderstorm With Heavy Hail"},
]

function displayWeather(location, array) {
  let code = location.daily.weathercode[0];
    for (const item of array) {
      if (item.code === code) {
      summary.textContent = item.description
      if (summary.textContent.includes("Snow")) {
      weatherImage.src = "https://m.media-amazon.com/images/I/71Xt7rPPn-L._SL1053_.jpg";
      albumName.textContent = "50 Words for Snow"
      justification.textContent = "This one speaks for itself. If Kate Bush claims this is an album about snow, this is an album about snow."
      }
      if (summary.textContent.includes("Overcast" || "Cloudy")) {
      weatherImage.src = "https://m.media-amazon.com/images/I/91nJMgcw4eL._AC_SL1500_.jpg";
      albumName.textContent = "Lionheart"
      justification.textContent = "I'm not gonna lie, I chose this because of the cracked lighting on the album cover. This album is basically the songs that didn't make The Kick Inside, but after the success of the debut they figured even Kate Bush's rejects are worth their own release."
      }
      if (summary.textContent.includes("Rain" || "Drizzle")) {
      weatherImage.src = "https://m.media-amazon.com/images/I/81p0B5CHy9L._AC_SL1500_.jpg";
      albumName.textContent = "The Sensual World"
      justification.textContent = "Don't let the The Dreaming nerds fool you, this is the single greatest Kate Bush album. Perfect for looking out the window and reflecting on one's emotions on a rainy day."
      }
      if (summary.textContent.includes("Thunderstorm")) {
      weatherImage.src = "https://m.media-amazon.com/images/I/7125Y-G2qJL._AC_SL1500_.jpg";
      albumName.textContent = "Hounds of Love"
      justification.textContent = "Every song on this album is designed to make you wish you were part of an all-girl cult stranded in the woods wearing wolf pelts."
      }
      if (summary.textContent.includes("Fog")) {
      weatherImage.src = "https://loudwomen.files.wordpress.com/2021/06/a1r-ulcyil._ac_sl1500_.jpg";
      albumName.textContent = "The Dreaming"
      justification.textContent = "This is a work of genius and it's only fitting to the mystifying backdrop of fog."
      }
      if (summary.textContent.includes("Clear")) {
      weatherImage.src = "https://m.media-amazon.com/images/I/81SwizK-LaL._SL1400_.jpg";
      albumName.textContent = "The Kick Inside"
      justification.textContent = "Racist font aside, The Kick Inside is the masterpiece that brought us Kate Bush for the first time, and its youthful spirit deserves a sunny day."
      }
      if (summary.textContent.includes("Moderate Rain" || "Heavy Rain")) {
      weatherImage.src = "https://benefitsofcoldcoffeemusicreview.files.wordpress.com/2012/09/never-for-ever-19801.jpg";
      albumName.textContent = "Never For Ever"
      justification.textContent = "Lean into the witchy vibes and light all the candles in your possession. Today is a good day for a tarot spread."
      }
    }
  }
}

const commentsList = document.querySelector("#comments-list");
const commentForm = document.querySelector("#new-comment");
const commentInput = document.querySelector("#comment-input")

commentForm.addEventListener("submit", addComment);
function addComment(e) {
  debugger;
  e.preventDefault();
  const li = document.createElement("li");
  li.textContent = commentInput.value;
  commentsList.appendChild(li);
  e.target.reset();

}}