const userTab = document.querySelectorAll("[data-userWeather]");
const searchTab = document.querySelectorAll("[data-searchWeather]");

const yourWeather = document.querySelector(".yw");
const searchWeather = document.querySelector(".sw");

const tYourWeather = document.querySelector(".ty");
const tSearchWeather = document.querySelector(".ts");

const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(
  ".grant-location-container"
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

const errHandle = document.querySelector(".handle-error");

//initially variable need
let currentTab = userTab;
const newArr = Array.from(currentTab);
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

currentTab.forEach((current) => {
  current.classList.add("current-tab");
});

getfromSessionStorage();

function switchTab(clickedElement) {
  newArr.forEach((current, index) => {
    if (current.tagName == clickedElement.tagName) {
      current.classList.remove("current-tab");
      current = clickedElement;
      current.classList.add("current-tab");
      newArr[index] = current;

      if (current === searchWeather || current === tSearchWeather) {
        //kya search form wala container is invisible, if yes then make it visible
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
      } 
      if (current === yourWeather || current === tYourWeather) {
        //main pehle search wale tab pr tha, ab your weather tab visible karna h
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        errHandle.classList.remove("active");
        //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
        //for coordinates, if we had saved there.
        getfromSessionStorage();

        //clear the input value of search form
        searchInput.value = "";
      }
    }
  });
}

userTab.forEach((element) => {
  element.addEventListener("click", () => {
    switchTab(element);
  });
});

searchTab.forEach((element) => {
  element.addEventListener("click", () => {
    switchTab(element);
    errHandle.classList.remove("active")

    //Select the input tag when the element click
    searchInput.focus();
  });
});

//check if coordinates are already present in session storage
function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    //agar local coordinates nhi mile
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;

  //make grant container invisible
  grantAccessContainer.classList.remove("active");
  //make loader visible
  loadingScreen.classList.add("active");

  //API Call
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    //now remove loader
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");

    renderWeatherInfo(data);
  } catch (err) {
    loadingScreen.classList.remove("active"); 
    errHandle.classList.add("active")
    //HW
    alert("can't access API");
  }
}

function renderWeatherInfo(weatherInfo) {
  //firstly, we have to fetch the elements

  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windSpeed = document.querySelector("[data-windSpeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-cloudiness]");

  if (weatherInfo.cod != 200) {
    userInfoContainer.classList.remove("active");
    errHandle.classList.add("active");
    return;
  }

  //fetch values from weatherInfo object and put in UI elements
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weatherInfo?.main?.temp} °C`;
  windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //HW
    alert("Geolocation is not supported by this browser");
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

//when search button triggers
const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;

  if (cityName === "") return;
  else fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  errHandle.classList.remove("active");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    //now remove loader
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");

    renderWeatherInfo(data);
  } catch (err) {
    loadingScreen.classList.remove("active");
    errHandle.classList.add("active")
  }
}

// on bars icon
const bars = document.querySelector(".barsIcon");
const menuListItems = document.querySelectorAll(".menu-list li");
const menuList = document.querySelector(".menu-list");

bars.addEventListener("click", () => {
  if (menuList.classList.contains("active"))
    menuList.classList.remove("active");
  else menuList.classList.add("active");
});

menuListItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuList.classList.remove("active");
  });
});

function closeMenuOnClickOutside(menuList) {
  document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    // console.log(clickedElement);

    // Check if the clicked element is outside the menu and menu button
    if (bars != clickedElement) {
      menuList.classList.remove("active");
    }
  });
}

closeMenuOnClickOutside(menuList);
