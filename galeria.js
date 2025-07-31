// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formularioBusqueda");
    
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); 
    const busqueda = document.querySelector("#buscar").value.trim().toLowerCase();
    console.log("Texto buscado:", busqueda);
    apiGaleria(busqueda);
  });
});

// Función para llamar a la API y mostrar las imágenes
async function apiGaleria(busqueda) {
  const url = "https://jsonplaceholder.typicode.com/photos?_limit=100";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const galeria = document.querySelector(".galeria");
    galeria.innerHTML = ""; // Limpiar galería

    // Filtrar y mostrar imágenes que coincidan con el título
    data.forEach((item) => {
      if (item.title.toLowerCase().includes(busqueda)) {
        galeria.innerHTML += `
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src="${item.url}" class="card-img-top" alt="${item.title}">
              <div class="card-body">
                <p class="card-text">${item.title}</p>
              </div>
            </div>
          </div>`;
      }
    });

    // Si no se encuentra nada
    if (galeria.innerHTML === "") {
      galeria.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-warning">No se encontraron resultados para: <strong>${busqueda}</strong></div>
        </div>`;
    }

  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
  }
}

