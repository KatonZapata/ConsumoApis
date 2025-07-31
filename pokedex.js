const inicio = document.querySelector('.inicio');
const final = document.querySelector('.final');
const btnBuscar = document.querySelector('.btn-buscar');
const lista = document.querySelector('.lista');
const url = 'https://pokeapi.co/api/v2/pokemon/';


btnBuscar.addEventListener('click', () => {
conectarApi(inicio.value, final.value);


});

async function conectarApi(ini, fin) {
   lista.innerHTML = ''; 

   for (let i = Number(ini); i <= Number(fin) ; i++){
    let respuesta = await fetch(url+i)
    let datos = await respuesta.json();
    console.log(datos);
    
     const {name,types, sprites} =datos
    
    
    // Iterar sobre todos los tipos
    const tiposHtml = types.map(t => t.type.name).join(', ');
    lista.innerHTML += `
    <div class="card" style="width: 18rem;">
      <img src="${sprites.front_default}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">nombre : ${name}</p>
        <p class="card-text">tipos : ${tiposHtml}</p>
      </div>
    </div>`


   }
   

 
}