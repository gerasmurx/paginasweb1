
// ------------------ incializacion de variables globales -------------------
let fechahoy = document.getElementById("fecha");
let currentTime = new Date();
let ingresar = document.getElementById("ingresar");
let locacionActual = document.getElementById("localizar");
let celcius = document.getElementById("celsios");
let faren = document.getElementById("farenheit");
let unidadesTemp = document.getElementsByClassName("tipo-unidades");
let ciudad1 = document.getElementById("ciudad1");
let ciudad2 = document.getElementById("ciudad2");
let ciudad3 = document.getElementById("ciudad3");
let ciudad4 = document.getElementById("ciudad4");
let ciudad5 = document.getElementById("ciudad5");
let ciudad6 = document.getElementById("ciudad6");
let simbolTemp = "°C";
let consultaActual = "";
let unidadesConsulta = "metric";

// ------------------ Eventos especiales de tags -------------------
locacionActual.addEventListener("click", geolocalizacion);
ingresar.addEventListener("click", manejarIngreso);
celcius.addEventListener("click", Celsius);
faren.addEventListener("click", Fahrenheit);
ciudad1.addEventListener("click", listaCiudades);
ciudad2.addEventListener("click", listaCiudades1);
ciudad3.addEventListener("click", listaCiudades2);
ciudad4.addEventListener("click", listaCiudades3);
ciudad5.addEventListener("click", listaCiudades4);
ciudad6.addEventListener("click", listaCiudades5);

// ------------------ asignaciones especiales -------------------
fechahoy.innerHTML = formatDate(currentTime);
celcius.style.backgroundColor = "white";

// ------------------ Funciones del Java -------------------

function formatDate(date) {
  // let hours = date.getHours();
  // if (hours < 10) {
  //   hours = `0${hours}`;
  // }
  // let minutes = date.getMinutes();
  // if (minutes < 10) {
  //   minutes = `0${minutes}`;
  // }
  let diaN = date.getDate();

  let mesindex = date.getMonth()
  let meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ];
  let mes = meses[mesindex];
  let dayIndex = date.getDay();
  let days = [
    "Dom",
    "Lun",
    "Mar",
    "Mier",
    "Jue",
    "Vie",
    "Sab"
  ];
  let day = days[dayIndex];

  return `${day} ${diaN} ${mes}`;
}

function renderCiudad(response) {
  consultaActual = response.data.name;
  let humedad = response.data.main.humidity;
  let imgs = response.data.weather[0].main;
  let localizacion = response.data.name;
  let visibilidad = ((response.data.visibility)/1000).toFixed(1);
  let medidaViento = Math.round(response.data.wind.speed);
  if(unidadesConsulta == "imperial"){
    medidaViento = Math.round(medidaViento*0.45);
  }
  document.getElementById("hero1").src=`./weather-app-master/${imgs}.png`;

  document.getElementById("locacion").innerHTML = localizacion;
  document.getElementById("grados").innerHTML = Math.round(
    response.data.main.temp
  );

  document.getElementById("humedad-rel").innerHTML = humedad;
  document.getElementById("vientos").innerHTML = medidaViento;
  document.getElementById("tipo-clima").innerHTML =
    response.data.weather[0].description;
  
  document.getElementById("barra-humedad").style.width=`${humedad}%`;
  document.getElementById("visibilidad").innerHTML = visibilidad;

  document.getElementById("presion-atmosferica").innerHTML = response.data.main.pressure;
  consultaForecast(localizacion);
}

function consultaForecast(loc){
  let apiKey = "e78144700f33f371e15b25a3c6695ccb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${apiKey}&units=${unidadesConsulta}&lang=sp`;
  axios.get(apiUrl).then(filtrarForecast);
}

function filtrarForecast(response) {
  let diaHoy = currentTime.getDate();
  let filteredList = response.data.list.filter((forecast)=>{
    if (parseInt(forecast.dt_txt.substr(8, 2)) != diaHoy){
      diaHoy++;
      return forecast;
    }
  })
  renderForecast(filteredList);
}

function renderForecast(array){
  let sum = 2;
  if (array.length > 5){
    array.pop()
  }
// ciclo para la escritura en el dom de los siguientes 4 dias en el forecast 
  for (let i = 1; i < array.length; i++) {
    let tomorrow =  new Date()
    tomorrow.setDate(currentTime.getDate() + sum)
    let nuevoDia = (formatDate(tomorrow));
    document.getElementById(`caja${i}`).innerHTML = nuevoDia;
    sum++;
  }
  for (let i = 0; i < array.length; i++) {
    let tempMax = array[i].main.temp_max;
    let tempMin = array[i].main.temp_min;
    document.getElementById(`tempsmax${i}`).innerHTML = Math.round(tempMax);
    document.getElementById(`temp-min-${i}`).innerHTML = Math.round(tempMin);
  }
  for (let i = 0; i < array.length; i++) {
    let estadoDelClima = array[i].weather[0].main;
    document.getElementById(`img-caja${i}`).src=`./weather-app-master/${estadoDelClima}.png`;
  }
}

function searchCity(city) {
  let apiKey = "e78144700f33f371e15b25a3c6695ccb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unidadesConsulta}&lang=sp`;
  axios.get(apiUrl).then(renderCiudad);
}

function manejarIngreso(event) {
  event.preventDefault();
  let ciudad = document.getElementById("busqueda").value;
  searchCity(ciudad);
}

function searchLocation(position) {
  let apiKey = "e78144700f33f371e15b25a3c6695ccb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=sp`;
  axios.get(apiUrl).then(renderCiudad);
}

function geolocalizacion(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function Fahrenheit(event) {
  event.preventDefault();
  unidadesConsulta = "imperial"
  let apiKey = "e78144700f33f371e15b25a3c6695ccb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${consultaActual}&appid=${apiKey}&units=imperial&lang=sp`;
  faren.style.backgroundColor = "white"
  celcius.style.removeProperty("background-color");
  simbolTemp = "°F";
  for(var i = 0; i < unidadesTemp.length; i++){
    unidadesTemp[i].innerText=simbolTemp; 
    }
  axios.get(apiUrl).then(renderCiudad);
}

function Celsius(event) {
  event.preventDefault();
  unidadesConsulta = "metric"
  let apiKey = "e78144700f33f371e15b25a3c6695ccb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${consultaActual}&appid=${apiKey}&units=metric&lang=sp`;
  celcius.style.backgroundColor = "white";
  faren.style.removeProperty("background-color");
  simbolTemp = "°C";
  for(var i = 0; i < unidadesTemp.length; i++){
    unidadesTemp[i].innerText=simbolTemp; 
    }
  axios.get(apiUrl).then(renderCiudad);
}

function listaCiudades(event){
  event.preventDefault();
  searchCity(ciudad1.textContent);
}

function listaCiudades1(event){
  event.preventDefault();
  searchCity(ciudad2.textContent);
}

function listaCiudades2(event){
  event.preventDefault();
  searchCity(ciudad3.textContent);
}
function listaCiudades3(event){
  event.preventDefault();
  searchCity(ciudad4.textContent);
}
function listaCiudades4(event){
  event.preventDefault();
  searchCity(ciudad5.textContent);
}
function listaCiudades5(event){
  event.preventDefault();
  searchCity(ciudad6.textContent);
}

searchCity("jiutepec")