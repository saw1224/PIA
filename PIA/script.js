console.log("hola desde script")


// Agregar evento de clic al botón de agendar cita
document.getElementById("agendar-cita-btn").addEventListener("click", function() {
    // Redirigir al usuario a la página deseada
    window.location.href = "citas.html"; // Cambia "otro_index.html" por la URL de tu otro índice
});




document.addEventListener("DOMContentLoaded", function() {
    // Encuentra el carrusel por su ID
    var carruselSalas = document.getElementById("carruselSalas");

    // Activa el carrusel
    var carousel = new bootstrap.Carousel(carruselSalas, {
        interval: 3000 // Cambia las diapositivas cada 3 segundos
    });
});


document.addEventListener("DOMContentLoaded", function() {
    console.log("hola desde script")
    document.getElementById("reserva").addEventListener("submit", function(event) {
        event.preventDefault(); // Previene el envío del formulario por defecto
        window.location.href = "index2.html"; // Redirige a index2.html
    });
});


document.getElementById("login-form").addEventListener("submit", function(event) { 
    event.preventDefault();
    console.log("dentro del submit")
    // Aquí podrías validar los datos del formulario si fuera necesario
    window.location.href = "CRUDPasientes.html";}
); 

   

// $(document).ready(function() {
//     $.ajax({
//         url: 'http://localhost:8080/Departamento', // URL de tu API
//         method: 'GET', // Método HTTP para la petición
//         dataType: 'json', // Tipo de datos que se espera recibir
//         success: function(data) { // Función que se ejecuta si la petición es exitosa
//             $('#departments-container').empty(); // Limpiar el contenedor

//             data.forEach(function(departamento) { // Iterar sobre los datos recibidos
//                 let departmentCard = `
//                     <div class="col-md-4">
//                         <div class="card mb-4">
//                             <img src="${departamento.imagen}" class="card-img-top" alt="${departamento.nombreDepartamento}">
//                             <div class="card-body">
//                                 <h5 class="card-title">${departamento.nombreDepartamento}</h5>
//                                 <p class="card-text">${departamento.descripcionDepartamento}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 $('#departments-container').append(departmentCard); // Añadir las tarjetas al contenedor
//             });
//         },
//         error: function(error) { // Función que se ejecuta si hay un error en la petición
//             console.error("Error al realizar la petición:", error);
//         }
//     });
// });
