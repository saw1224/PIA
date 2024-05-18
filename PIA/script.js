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




document.getElementById("login-form").addEventListener("submit", function(event) { 
    event.preventDefault();
    console.log("dentro del submit")
    // Aquí podrías validar los datos del formulario si fuera necesario
    window.location.href = "index2.html";}
); 
   
