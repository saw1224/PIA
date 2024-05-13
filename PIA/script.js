// Agregar evento de clic al botón de agendar cita
document.getElementById("agendar-cita-btn").addEventListener("click", function() {
    // Redirigir al usuario a la página deseada
    window.location.href = "citas.html"; // Cambia "otro_index.html" por la URL de tu otro índice
});

var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleSlidesOnly'), {
    interval: 2000 // Intervalo de cambio de diapositivas en milisegundos
});
