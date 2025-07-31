const apiKey = "2fe3968ff66f053b9429359b97b183c9"; 
const urlBase = "https://api.openweathermap.org/data/2.5/weather";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formularioClima");
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const ciudad = document.querySelector("#ciudad").value.trim();
    if (ciudad !== "") {
      apiClima(ciudad);
    }
  });
});

async function apiClima(ciudad) {
  const url = `${urlBase}?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`;
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ciudad no encontrada");
    }

    const data = await response.json();

    resultado.innerHTML = `
      <div class="card shadow-sm mx-auto" style="max-width: 400px;">
        <div class="card-body text-center">
          <h4 class="card-title">${data.name}</h4>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
          <p class="fs-5">🌡️ Temperatura: <strong>${data.main.temp} °C</strong></p>
          <p> Humedad: ${data.main.humidity}%</p>
          <p> Estado: ${data.weather[0].description}</p>
        </div>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Error: ${error.message}
      </div>
    `;
    console.error("Error al obtener el clima:", error);
  }
}
